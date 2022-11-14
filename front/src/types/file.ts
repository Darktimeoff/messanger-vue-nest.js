import { UploadFile } from "ant-design-vue";
import { IDialog, IMessage } from "./dialogs";
import { IUser } from "./user";

export interface IFile {
    _id: string;

    filename: string;

    width?: number;

    height?: number;

    size: number;

    orig_url: string;

    optimize_url?: string

    resource_type: string;

    format: string;

    user: IUser | string;

    message?: IMessage | string;

    dialog?: IDialog | string;
    createdAt: string;
    updatedAt: string;
}

export type IUploadFile = UploadFile<IFile> & {_id: string}