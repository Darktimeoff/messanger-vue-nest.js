import { useDialogs, useNotification } from "~/hooks";
import { store } from "~/store";
import { IDialog, IMessage } from "~/types";

export interface IOnlinesDataEmit {
    userId: string;
    isOnline: boolean;
}

interface IDialogsDataEmit {
    dialog: IDialog,
    isDeleted: boolean;
}

interface IMessageDataEmit {
    dialogId: string;
    message: IMessage;
}

interface IExceptionEmit {
    status: string;
    message: string | string[];

}

export function onlines(data: IOnlinesDataEmit) {
    const {updateOnlines} = useDialogs(store)
    updateOnlines(data);
    console.log('event: onlines', data)
}

export function dialogs({dialog, isDeleted}: IDialogsDataEmit) {
    const {removeDialog, addDialog} = useDialogs(store);
    if(isDeleted) {
        removeDialog(dialog);
    } else {
        addDialog(dialog)
    }
    console.log('event: dialogs', dialog)
}

export function messages({dialogId, message}: IMessageDataEmit) {
    const {addMessage, removeMessage} = useDialogs();

    if(!message.isDeleted) addMessage(dialogId, message);
    else removeMessage(dialogId, message)
    console.log('event: message', message)
}

export function connect_error(data: any) {
    console.error('connect_error', data)
}

export function exception(data: IExceptionEmit) {
    const {error} = useNotification();
    error({
        message: data.status,
        description: typeof data.message === 'object' ? data.message[0] : data.message
    })
}