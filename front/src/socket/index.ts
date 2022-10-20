import { IDialog, IMessage1 } from "~/types";

interface IOnlinesDataEmit {
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
    console.log('event: onlines', data)
}

export function dialogs(dialog: IDialogsDataEmit) {
    console.log('event: dialogs', dialog)
}

export function message(message: IMessageDataEmit) {
    console.log('event: message', message)
}