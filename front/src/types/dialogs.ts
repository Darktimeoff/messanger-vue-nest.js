import { IUser } from "./user";

export interface IMessage {
    _id: string;
    text: string;
    textEdited: string;
    isRead: boolean;
    attachments: string[]
    audio: string;
    author: IUser;
    dialog: IDialog;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string
    isDeleted?: boolean;
    isEdited?: boolean;
}

export interface IDialog {
    _id: string;
    isDialog: boolean;
    lastMessage: IMessage | undefined;
    members: IUser[];
    message: IMessage[];
    createdAt: string;
    updatedAt: string;
}