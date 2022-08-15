export interface ILoginSchema {
    email: string;
    password: string;
}

export interface IRegisterSchema extends ILoginSchema {
    name: string;
    confirmPassword: string;
}