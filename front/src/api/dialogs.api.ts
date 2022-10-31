import { IMessageEmit } from "~/socket";
import { IDialog } from "~/types";
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