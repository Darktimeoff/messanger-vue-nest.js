import { IUser, IUser1 } from "./user";

export interface IMessage {
    id:         string;
    text:       string;
    createdAt: string;
    user:       IUser;
    dialog:     string;
    isMe:       boolean;
    isRead:     boolean;
}

export interface IMessage1 {
    _id: string;
    text: string;
    isRead: boolean;
    attachments: string[]
    audio: string;
    author: IUser1;
    dialog: IDialog;
    createdAt: string;
    updatedAt: string;
}

export interface IDialog {
    _id: string;
    isDialog: boolean;
    lastMessage: IMessage1;
    members: IUser1[];
    message: IMessage1[];
}