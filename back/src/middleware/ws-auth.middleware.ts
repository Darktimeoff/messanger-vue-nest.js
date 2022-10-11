import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { AuthService } from "~/auth/auth.service";
import { EXCEPTION } from "~/dialog/const";

export function wsAuthMiddleware(authService: AuthService) {
    return async function(socket: Socket, next: (err?: ExtendedError) => void) {
        
        const token = socket.handshake.auth?.token;
    
        if(!token) {
            const err = new WsException({
                type: EXCEPTION.socket,
                message: 'USER_UNATHORIZED'
            });
            next(err);
        }

        try {
            const user = await authService.validateToken(token);
            socket.data.user = user;
            next()
        } catch(err) {
            if(err instanceof Error) {
                next(err);
            }
        }
    }
}