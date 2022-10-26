import { SOCKET_EMIT } from "~/const";
import { useSocket } from "~/hooks";

export interface IMessageEmit {
    message: {
        text: string;
    }
    dialogId: string;
}

export function messageEmit(data: IMessageEmit) {
    const {send} = useSocket();
    console.log('messageEmit')
    send<IMessageEmit>(SOCKET_EMIT.message, data);
}