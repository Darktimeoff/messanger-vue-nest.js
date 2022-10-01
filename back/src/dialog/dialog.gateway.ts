import { Logger } from "@nestjs/common";
import { WebSocketGateway,OnGatewayInit, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { wsAuthMiddleware } from "~/middleware/ws-auth.middleware";
import { IUserId } from "~/user/entities/user.entity";
import UserService from "~/user/user.service";
import { AuthUtils } from "~/utils/auth.utils";
import { EMIT_EVENT, SEND_EVENT } from "./const";

@WebSocketGateway(3002, {cors: true})
export class DialogGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly authUtils: AuthUtils,
        private readonly userService: UserService
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

    @SubscribeMessage(SEND_EVENT.test1)
    test1(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
    ) {
        this.server.to(this.getRoom(client)).emit('test', data);
        this.logger.log(`test1 message: ${data}, ${client.rooms}`)
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

    onlinesEmit(user: IUserId, isOnline: boolean) {
        const data = {
            userId: user._id.toString(),
            isOnline
        }

        this.server.emit(EMIT_EVENT.onlines, data);
        this.logger.log('onlinesEmit:'+ `${data.userId}-${isOnline}`)
    }
}