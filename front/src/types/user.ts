export interface IUser {
    id: string;
    fullname: string;
    avatar: string | null;
    isOnline?: boolean;
}

export interface IAttachment {
    filename: string;
    url: string;
}

export interface IDialog {
    id: string;
    avatar: string,
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