import { IDialog1, IMessage } from "~/types";
import { apiAxios } from "./core";

export type IGetAllSuccessResponse = IDialog1[];

export function getAll() {
    return apiAxios.get<IGetAllSuccessResponse>('/dialog');
}

export function getById(id: string) {
    return apiAxios.get<IMessage[]>(`/messsages?dialog=${id}`)
}