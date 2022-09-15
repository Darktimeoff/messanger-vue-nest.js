import { WebSocketGateway,OnGatewayInit, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { EMIT_EVENT, SEND_EVENT } from "./const";

@WebSocketGateway(3002, {cors: true})
export class DialogGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;


    afterInit(server: Server) {
        console.log('socket init')
    }

    handleConnection(client: Socket) { //when user connected take dialog list and connect user to room use dialog id
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