import { apiAxios, IErrorResponse, IValidationDataReponse } from "./core";
import {IUser1} from '~/types';

export type ILoginResponseSuccess =  {
    access_token: string;
} & IUser1;

export type ILoginResponseFailed = IValidationDataReponse | IErrorResponse<401, string, 'Unauthorized'>

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest extends ILoginRequest {
    fullname: string;
}


export function login(data: ILoginRequest) {
    return apiAxios.post<ILoginResponseSuccess>('/auth/login/', data);
}

export function register(data: IRegisterRequest) {
    return apiAxios.post<ILoginResponseSuccess>('/auth/register/', data);
}