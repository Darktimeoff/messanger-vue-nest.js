import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { USER_UNATHORIZED } from "~/auth/const";
import { EXCEPTION } from "~/dialog/const";
import { AuthUtils } from "~/utils/auth.utils";

export function wsAuthMiddleware(authUtils: AuthUtils) {
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
            const user = await authUtils.validate(token);
            socket.data.user = user;
            next()
        } catch(err) {
            if(err instanceof Error) {
                next(err);
            }
        }
    }
}