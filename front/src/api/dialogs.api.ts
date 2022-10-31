import { IMessageEmit } from "~/socket";
import { IDialog, IUser } from "~/types";
import { apiAxios, IErrorResponse } from "./core";

export type IGetAllSuccessResponse = IDialog[];

export interface ICreateDialogRequest {
    membersId: string[];
    isDialog: boolean;
    message?: IMessageEmit
}

export interface ICreateDialogResponseSuccess extends IDialog {}

export type ICreateDialogResponseError = IErrorResponse<400, string[]>;

export function getAll() {
    return apiAxios.get<IGetAllSuccessResponse>('/dialog');
}

export function getById(id: string) {
    return apiAxios.get<IDialog>(`/dialog/${id}/`)
}

export function createDialog(dialogRequest: ICreateDialogRequest) {
    return apiAxios.post<ICreateDialogResponseSuccess>('/dialog', dialogRequest)
}

export function findUsers(text: string) {
    console.log('text', text)
    return apiAxios.get<IUser[]>(`/dialog/search/user?text=${text}`)
}