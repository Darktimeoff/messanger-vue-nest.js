import axios from 'axios';
import { useAuth, useErrorReponse } from '~/hooks';
import router from '~/router';
import { store } from '~/store';

export interface IErrorResponse<T extends number, D extends string | string[]> {
    statusCode: T;
    message: D;
    error: string;
    
}

export type IValidationDataReponse = IErrorResponse<400, string[]> 


export const  apiAxios = axios.create({
    baseURL: 'http://localhost:3001/api/v1'
});

apiAxios.interceptors.response.use(undefined, error => {
    const {showError} = useErrorReponse();

    if(error.response.status === 401) {
        const {onLogout} = useAuth()
        router.push({name: "Login"})
        onLogout();
    } else {
        showError(error);
        throw error;
    }
});

apiAxios.interceptors.request.use(config => {
    if(config.headers) config.headers['Authorization'] = `Bearer ${validToken()}`

    return config
})


function validToken() {
    const {token} = useAuth(store);

    return token.value;
}