import { WebSocketGateway,OnGatewayInit, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3002)
export class DialogGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;


    afterInit(server: Server) {
        console.log('socket init')
    }

    handleConnection(client: Socket) {
        console.log('connect', client);
    }

    handleDisconnect(client: Socket) {
        console.log('disconnect', client);
    }
}