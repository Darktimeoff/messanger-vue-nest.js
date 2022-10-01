import { Logger, UsePipes, ValidationPipe } from "@nestjs/common";
import { WebSocketGateway,OnGatewayInit, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket, WsException} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "~/message/dto/create-message.dto";
import { Message } from "~/message/entities/message.entity";
import { wsAuthMiddleware } from "~/middleware/ws-auth.middleware";
import { IUserId } from "~/user/entities/user.entity";
import UserService from "~/user/user.service";
import { AuthUtils } from "~/utils/auth.utils";
import { DIALOG_NOT_FOUND, EMIT_EVENT, SUBSCRIBE_EVENT } from "./const";
import { DialogService } from "./dialog.sevice";
import { CreateDialogDto } from "./dto/create-dialog.dto";
import { MessageDialogDto } from "./dto/message-dialog.dto";
import { Dialog } from "./entities/dialog.entity";

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

    @UsePipes(ValidationPipe)
    @SubscribeMessage(SUBSCRIBE_EVENT.message)
    async message(
        @MessageBody() data: MessageDialogDto,
        @ConnectedSocket() client: Socket
    ) {
        let dialog = await this.dialogService.find(data.dialogId);

        if(!dialog) throw new WsException(DIALOG_NOT_FOUND)

        const messageDto: CreateMessageDto = {
            ...data.message,
            dialogId: dialog._id,
            authorId: client.data.user._id
        }

        const message = await this.dialogService.addMessage(messageDto.dialogId, messageDto);

        this.messagesEmit(dialog, message);
    }

    getRoom(client: Socket): string {
        return client.data.user._id.toString();
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
            if(id in this.connectedUser) {
                this.server.to(id).emit(event, data)
            }
        })
    }

    onlinesEmit(user: IUserId, isOnline: boolean) {
        const data = {
            userId: user._id.toString(),
            isOnline
        }

        this.server.emit(EMIT_EVENT.onlines, data);
        this.logger.log('onlinesEmit:'+ `${data.userId}-${isOnline}`)
    }


    dialogsEmit(dialog: Dialog) {
        this.dialogMembersConnectedEmit(dialog, EMIT_EVENT.dialogs, dialog);
    }

    messagesEmit(dialog: Dialog, message: Message) {
        this.dialogMembersConnectedEmit(dialog, EMIT_EVENT.messages, message)
    }
}