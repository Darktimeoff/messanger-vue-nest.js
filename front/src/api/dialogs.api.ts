import { IDialog, IMessage } from "~/types";
import { apiAxios } from "./core";

export type IGetAllSuccessResponse = IDialog[];

export function getAll() {
    return apiAxios.get<IGetAllSuccessResponse>('/dialog');
}

export function getById(id: string) {
    return apiAxios.get<IDialog>(`/dialog/${id}/`)
}