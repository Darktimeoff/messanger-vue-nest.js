import { IUser } from "~/types";
import { apiAxios, IErrorResponse } from "./core";

export type IGetMeSuccessResponse = IUser;
export type IGetMeFailedReponse = IErrorResponse<404, string> | IErrorResponse<401, string>

export function getMe() {
    return apiAxios.get<IGetMeSuccessResponse>('/user/')
}

export function findUser(text: string) {
    console.log('text', text)
    return apiAxios.get<IUser[]>(`/user/search?text=${text}`)
}