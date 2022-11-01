import { SOCKET_EMIT } from "~/const";
import { useSocket } from "~/hooks";

export interface IMessageEmit {
    message: {
        text: string;
    }
    dialogId: string;
}

export interface IMessageRemoveEmit {
    dialogId: string;
    messageId: string;
}

export function messageEmit(data: IMessageEmit) {
    const {send} = useSocket();
    console.log('messageEmit')
    send<IMessageEmit>(SOCKET_EMIT.message, data);
}

export function messageRemoveEmit(data: IMessageRemoveEmit) {
    const {send} = useSocket();
    console.log('messageEmit');
    send<IMessageRemoveEmit>(SOCKET_EMIT.messageRemove, data);
}