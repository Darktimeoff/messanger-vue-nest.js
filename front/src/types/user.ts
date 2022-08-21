export interface IUser {
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
    user?: IUser;
    lastMessage: {
        author: IUser['fullname'] | null,
        text: string; 
        isReaded: boolean;
        created_at: string;
        isMe: boolean;
    },
    unreadMessageCount: number;
}