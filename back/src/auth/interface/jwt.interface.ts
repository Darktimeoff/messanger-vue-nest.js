import { User } from "~/user/entities/user.entity";

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