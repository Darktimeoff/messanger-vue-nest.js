import { IUser, IUser1 } from "./user";

export interface IDialog {
    id: string;
    avatar: string | null,
    name: string;
    lastMessage: {
        id: string;
        text: string; 
        isReaded: boolean;
        created_at: string;
        isMe: boolean;
        user?: IUser;
    },
    isDialog: boolean;
    unreadMessageCount: number;
}

export interface IMessage {
    id:         string;
    text:       string;
    created_at: string;
    user:       IUser;
    dialog:     string;
    isMe:       boolean;
    isRead:     boolean;
}

export interface IMessage1 {
    text: string;
    isRead: boolean;
    attachments: string[]
    audio: string;
    author: IUser1
    dialog: IDialog1
    created_at: string;
    updated_at: string;
}

export interface IDialog1 {
    _id: string;
    isDialog: boolean;
    lastMessage: IMessage1;
    members: IUser1[];
    message: IMessage1[];
}