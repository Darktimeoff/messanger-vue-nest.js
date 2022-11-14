export interface IUser {
    _id: string;
    email: string;
    avatar: string;
    fullname: string;
    isOnline: boolean;
    isConfirmed: boolean;
    last_seen: string;
    dialog: [];
    createdAt: string;
    updatedAt: string;
}