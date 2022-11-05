import { Logger, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { WebSocketGateway,OnGatewayInit, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket, WsException, BaseWsExceptionFilter} from "@nestjs/websockets";
import { ValidationError } from "class-validator";
import { MongooseError } from "mongoose";
import { Server, Socket } from "socket.io";
import { AuthService } from "~/auth/auth.service";
import { BadRequestTransformationFilter } from "~/filter/badRequestException.filter";
import { NOT_FOUND } from "~/message/const";
import { CreateMessageDto } from "~/message/dto/create-message.dto";
import { EditedDialogMessageDto } from "~/message/dto/edited-message.dto";
import { MessageDeleteDto } from "~/message/dto/message-delete.dto";
import { ReadMessageDto } from "~/message/dto/read-message.dto";
import { Message } from "~/message/entities/message.entity";
import { MessageService } from "~/message/message.service";
import { wsAuthMiddleware } from "~/middleware/ws-auth.middleware";
import { IUserId } from "~/user/entities/user.entity";
import UserService from "~/user/user.service";
import { DIALOG_NOT_FOUND, EMIT_EVENT, EXCEPTION, SUBSCRIBE_EVENT } from "./const";
import { DialogService } from "./dialog.sevice";
import { MessageDialogDto } from "./dto/message-dialog.dto";
import { Dialog } from "./entities/dialog.entity";

@UseFilters(BadRequestTransformationFilter)
@UsePipes(ValidationPipe)
@WebSocketGateway(3002, {cors: true})
export class DialogGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly dialogService: DialogService,
        private readonly messageService: MessageService
    ) {

    }

    @WebSocketServer()
    server: Server;
    connectedUser: Record<string, string> = {};
    private readonly logger = new Logger('DialogGateway')


    async afterInit(server: Server) {
        const authUtils = this.authService;

        server.use(wsAuthMiddleware(authUtils))
        this.logger.log('Init socket middlewares');
    }

    async handleConnection(
        @ConnectedSocket() client: Socket
    ) { //when user connected take dialog list and connect user to room use dialog id
        this.addConnectedUser(client.data.user as IUserId, client)
        this.logger.log('handleConnection:' + client.data.user._id);
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        this.removeConnectedUser(client.data.user as IUserId, client);
        this.logger.log('handleDisconnect:' + client.data.user._id);
    }

    @SubscribeMessage(SUBSCRIBE_EVENT.message)
    async message(
        @MessageBody() data: MessageDialogDto,
        @ConnectedSocket() client: Socket
    ) {
        try {
            const userId = client.data.user._id;
            this.logger.log(`get message\nuser:${userId}\ndialog: ${data.dialogId}\nmessage:${data.message}`)

            let dialog = await this.dialogService.dialogWhereUserMember(data.dialogId, userId);

            if(!dialog) {
                this.messageException(DIALOG_NOT_FOUND)
            }

            const messageDto: CreateMessageDto = {
                ...data.message,
                dialogId: dialog._id,
                authorId: userId
            }

            const message = await this.dialogService.addMessage(messageDto.dialogId, messageDto);

            this.messagesEmit(dialog, message);
        } catch(e) {
            if(e instanceof Error) {
                this.logger.error(`get message ${e}`) 
                this.messageException(e.message)
            }
        }
    }

    @SubscribeMessage(SUBSCRIBE_EVENT.messageRemove)
    async messageRemove(
        @MessageBody() data: MessageDeleteDto,
        @ConnectedSocket() client: Socket
    ) {
        try {
            const userId = client.data.user._id;
            let dialog = await this.dialogService.dialogWhereUserMember(data.dialogId, userId);

            if(!dialog) {
                this.messageException(DIALOG_NOT_FOUND)
            }

            const message = await this.messageService.remove(data.messageId);

            if(!message) {
                this.messageException(NOT_FOUND)
            }

            this.messagesEmit(dialog, message);
        } catch(e) {
            if(e instanceof Error) {
                this.logger.error(`remove message ${e}`) 
                this.messageException(e.message)
            }
        }
    }

    @SubscribeMessage(SUBSCRIBE_EVENT.messageEdited)
    async messageEdited(
        @MessageBody() data: EditedDialogMessageDto,
        @ConnectedSocket() client: Socket
    ) {
        try {
            const userId = client.data.user._id;
            let dialog = await this.dialogService.dialogWhereUserMember(data.dialogId, userId);

            if(!dialog) {
                this.messageException(DIALOG_NOT_FOUND)
            }

            const message = await this.messageService.edited(data.messageId, data);

            if(!message) {
                this.messageException(NOT_FOUND)
            }

            this.messagesEmit(dialog, message);
        } catch(e) {
            if(e instanceof Error) {
                this.logger.error(`edit message ${e}`) 
                this.messageException(e.message)
            }
        }
    }

    @SubscribeMessage(SUBSCRIBE_EVENT.messageRead) 
    async messageRead( 
        @MessageBody() data: ReadMessageDto,
        @ConnectedSocket() client: Socket
    ) {
        try {
            const userId = client.data.user._id;
            let dialog = await this.dialogService.dialogWhereUserMember(data.dialogId, userId);

            if(!dialog) {
                this.messageException(DIALOG_NOT_FOUND)
            }

            if(!data.messageId) {
                const messages = await this.messageService.readUserDialogMessage(userId, dialog._id as any);
                console.log('messages', messages)
                if(!messages) return;

                this.dialogMembersConnectedEmit(dialog, EMIT_EVENT.messageRead, {
                    dialogId: dialog._id,
                    userId,
                })
            } else {
                const message = await this.messageService.readOneMessage(data.messageId);
                if(!message) return;

                this.dialogMembersConnectedEmit(dialog, EMIT_EVENT.messageRead, {
                    dialogId: dialog._id,
                    userId,
                    messageId: message._id
                })
            }
        } catch(e) {
            if(e instanceof Error) {
                this.logger.error(`read message ${e}`) 
                this.messageException(e.message)
            }
        }
    }

    async onlinesEmit(user: IUserId, isOnline: boolean) {
        const data = {
            userId: user._id.toString(),
            isOnline
        }

        const idUsers = await this.dialogService.getAllIdUserWithDialogs(user._id);

        idUsers.forEach(id => {
            const idString = id.toString();
            if(idString in this.connectedUser) {
                this.server.to(idString).emit(EMIT_EVENT.onlines, data);
                this.logger.log('onlinesEmit:'+ `${data.userId}-${isOnline}`)
            }
        })
    }


    dialogsEmit(dialog: Dialog, isDeleted = false) {
        this.dialogMembersConnectedEmit(dialog, EMIT_EVENT.dialogs, {
            dialog,
            isDeleted
        });
        this.logger.log(`dialogsEmit\n members: ${dialog.members}`)
    }

    

    messagesEmit(dialog: Dialog & {_id: any}, message: Message & {_id: any}) {
        this.dialogMembersConnectedEmit(dialog, EMIT_EVENT.messages, {
            dialogId: dialog._id,
            message: message
        });
        this.logger.log(`messagesEmit\n author: ${message.author} dialog: ${dialog._id}-${message._id} `)
    }

    private exception(type: `${EXCEPTION}`, message: string): never {
        throw new WsException({
            type,
            message
        })
    }

    private messageException(message: string): never {
        this.exception(EXCEPTION.message, message);
    }

    private addConnectedUser(user: IUserId, socket: Socket) {
        this.connectedUser[user._id.toString()] = user._id.toString();
        this.userService.updateOnline(user._id.toString(), true);
        socket.join(user._id.toString());
        this.onlinesEmit(user, true)
    }

    private removeConnectedUser(user: IUserId, socket: Socket) {
        delete this.connectedUser[user._id.toString()];
        this.userService.updateOnline(user._id.toString(), false);
        socket.leave(user._id.toString())
        this.onlinesEmit(user, false);
    }

    private dialogMembersConnectedEmit<D>(dialog: Dialog, event: `${EMIT_EVENT}`, data: D) {
        dialog.members.forEach(u => {
            const id = typeof u === 'string' ? (u as string).toString() : (u as IUserId)._id.toString();
            console.log(`dialogMembersConnectedEmit: ${event}:${id}`);
            if(id in this.connectedUser) {
                this.server.to(id).emit(event, data)
            }
        })
    }
}