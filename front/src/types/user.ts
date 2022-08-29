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