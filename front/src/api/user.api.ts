import { IUser1 } from "~/types";
import { apiAxios, IErrorResponse } from "./core";

export type IGetMeSuccessResponse = IUser1;
export type IGetMeFailedReponse = IErrorResponse<404, string, 'Not Found'> | IErrorResponse<401, string, 'Unauthorized'>

export function getMe() {
    return apiAxios.get<IGetMeSuccessResponse>('/user/')
}