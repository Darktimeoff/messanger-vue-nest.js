import { User } from "~/user/entities/user.entity";
import { Request } from 'express'

export interface IJWTPayload {
    email: string;
    sub: string;
}

export interface IJWTResponse {
    email: IJWTPayload['email'],
    id: IJWTPayload['sub']
}

export class LoginReponse extends User {
    token: string;
}

export interface IReqAuth extends Request {
    user: IJWTResponse
}