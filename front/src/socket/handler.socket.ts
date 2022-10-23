import { useDialogs } from "~/hooks";
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
    const {addMessage} = useDialogs();

    addMessage(dialogId, message);
    console.log('event: message', message)
}

export function connect_error(data: any) {
    console.error('connect_error', data)
}

export function exception(data: any) {
    console.error('exception', data)
}