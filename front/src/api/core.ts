import axios from 'axios';
import router from '~/router';

export interface IErrorResponse<T extends number, D extends string | string[], S extends string> {
    statusCode: T;
    message: D;
    error: S;
    
}

export type IValidationDataReponse = IErrorResponse<400, string[], 'Bad Request'> 


export const  apiAxios = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
});

// apiAxios.interceptors.response.use(undefined, error => {
//     if(error.response.status === 401) {
//         router.push({name: "Login"})
//     }
// });
