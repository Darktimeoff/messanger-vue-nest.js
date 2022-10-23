import { useDialogs } from "~/hooks";
import { store } from "~/store";
import { IDialog, IMessage1 } from "~/types";

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
    message: IMessage1;
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

export function message(message: IMessageDataEmit) {
    console.log('event: message', message)
}