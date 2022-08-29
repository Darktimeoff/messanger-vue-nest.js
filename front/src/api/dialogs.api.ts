import { IDialog, IMessage } from "~/types";
import { apiAxios } from "./core";

export function getAll() {
    return apiAxios.get<IDialog[]>('/dialogs');
}

export function getById(id: string) {
    return apiAxios.get<IMessage[]>(`/messsages?dialog=${id}`)
}