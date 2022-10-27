import { apiAxios, IErrorResponse, IValidationDataReponse } from "./core";
import {IUser} from '~/types';

export type ILoginResponseSuccess =  {
    access_token: string;
} & IUser;

export type ILoginResponseFailed = IValidationDataReponse | IErrorResponse<401, string>

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IVerifyResponse {
    message: string;
}

export type IVerifyResponseFailed = IErrorResponse<400, string> | IErrorResponse<401, string>

export interface IRegisterRequest extends ILoginRequest {
    fullname: string;
}


export function login(data: ILoginRequest) {
    return apiAxios.post<ILoginResponseSuccess>('/auth/login/', data);
}

export function register(data: IRegisterRequest) {
    return apiAxios.post<ILoginResponseSuccess & {confirm_hash: string}>('/auth/register/', data);
}

export function verifyHash(hash: string) {
    return apiAxios.get<IVerifyResponse>(`/auth/verify?hash=${hash}`);
}