import { IUser } from "./user";

export interface IMessage {
    _id: string;
    text: string;
    isRead: boolean;
    attachments: string[]
    audio: string;
    author: IUser;
    dialog: IDialog;
    createdAt: string;
    updatedAt: string;
}

export interface IDialog {
    _id: string;
    isDialog: boolean;
    lastMessage: IMessage;
    members: IUser[];
    message: IMessage[];
}