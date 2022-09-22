import { Logger } from "@nestjs/common";
import { WebSocketGateway,OnGatewayInit, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { wsAuthMiddleware } from "~/middleware/ws-auth.middleware";
import { AuthUtils } from "~/utils/auth.utils";
import { EMIT_EVENT, SEND_EVENT } from "./const";

@WebSocketGateway(3002, {cors: true})
export class DialogGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly authUtils: AuthUtils) {
        
    }

    @WebSocketServer()
    server: Server;
    connectedUsers: Record<string, string> = {};
    private readonly logger = new Logger()


    async afterInit(server: Server) {
        const authUtils = this.authUtils;

        server.use(wsAuthMiddleware(authUtils))
    }

    async handleConnection(
        @ConnectedSocket() client: Socket
    ) { //when user connected take dialog list and connect user to room use dialog id
        client.emit(EMIT_EVENT.test, {user: {id: client.id}})
        console.log('connect',  client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('disconnect', client.id);
    }

    @SubscribeMessage(SEND_EVENT.test1)
    test1(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
    ) {
        console.log('test1', client.id, data)
    }
}