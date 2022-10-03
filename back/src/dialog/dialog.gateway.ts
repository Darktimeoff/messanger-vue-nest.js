import { Logger, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { WebSocketGateway,OnGatewayInit, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket, WsException, BaseWsExceptionFilter} from "@nestjs/websockets";
import { ValidationError } from "class-validator";
import { MongooseError } from "mongoose";
import { Server, Socket } from "socket.io";
import { BadRequestTransformationFilter } from "~/filter/badRequestException.filter";
import { CreateMessageDto } from "~/message/dto/create-message.dto";
import { Message } from "~/message/entities/message.entity";
import { wsAuthMiddleware } from "~/middleware/ws-auth.middleware";
import { IUserId } from "~/user/entities/user.entity";
import UserService from "~/user/user.service";
import { AuthUtils } from "~/utils/auth.utils";
import { DIALOG_NOT_FOUND, EMIT_EVENT, EXCEPTION, SUBSCRIBE_EVENT } from "./const";
import { DialogService } from "./dialog.sevice";
import { MessageDialogDto } from "./dto/message-dialog.dto";
import { Dialog } from "./entities/dialog.entity";

@UseFilters(BadRequestTransformationFilter)
@UsePipes(ValidationPipe)
@WebSocketGateway(3002, {cors: true})
export class DialogGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly authUtils: AuthUtils,
        private readonly userService: UserService,
        private readonly dialogService: DialogService
    ) {

    }

    @WebSocketServer()
    server: Server;
    connectedUser: Record<string, string> = {};
    private readonly logger = new Logger('DialogGateway')


    async afterInit(server: Server) {
        const authUtils = this.authUtils;

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

    getRoom(client: Socket): string {
        return client.data.user._id.toString();
    }

    exception(type: `${EXCEPTION}`, message: string): never {
        throw new WsException({
            type,
            message
        })
    }

    messageException(message: string): never {
        this.exception(EXCEPTION.message, message);
    }

    addConnectedUser(user: IUserId, socket: Socket) {
        this.connectedUser[user._id.toString()] = user._id.toString();
        this.userService.updateOnline(user._id.toString(), true);
        socket.join(user._id.toString());
        this.onlinesEmit(user, true)
    }

    removeConnectedUser(user: IUserId, socket: Socket) {
        delete this.connectedUser[user._id.toString()];
        this.userService.updateOnline(user._id.toString(), false);
        socket.leave(user._id.toString())
        this.onlinesEmit(user, false);
    }

    dialogMembersConnectedEmit<D>(dialog: Dialog, event: `${EMIT_EVENT}`, data: D) {
        dialog.members.forEach(u => {
            const id = (u as any).toString();
            console.log(`dialogMembersConnectedEmit: ${event}:${id}`);
            if(id in this.connectedUser) {
                this.server.to(id).emit(event, data)
            }
        })
    }

    async onlinesEmit(user: IUserId, isOnline: boolean) {
        const data = {
            userId: user._id.toString(),
            isOnline
        }

        const idUsers = await this.dialogService.getAllIdUsers(user._id);

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
}