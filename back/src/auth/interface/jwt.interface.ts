import { User } from "~/user/entities/user.entity";
import { Request } from 'express'
import { Types } from "mongoose";

export interface IJWTPayload {
    email: string;
    sub: string;
}

export interface IJWTResponse extends User {
    _id: Types.ObjectId
}

export class LoginReponse extends User {
    token: string;
}

export interface IReqAuth extends Request {
    user: IJWTResponse
}