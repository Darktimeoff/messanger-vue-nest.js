export interface IUser {
    id: string;
    fullname: string;
    avatar: string | null;
    isOnline?: boolean;
}

export interface IUser1 {
    _id: string;
    email: string;
    fullname: string;
    isOnline: string;
    isConfirmed: boolean;
    last_seen: string;
    dialog: [];
    createdAt: string;
    updatedAt: string;
}

export interface IAttachment {
    filename: string;
    url: string;
}