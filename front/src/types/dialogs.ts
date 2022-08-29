import { IUser } from "./user";

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