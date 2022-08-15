import { Ref } from 'vue';
import {string} from 'zod';

export const emailValidation = string().email('Введите коректный емайл').min(1, 'Введите E-Mail');
export const passwordValidation =  (message: string) => string().min(8, message)
export const nameValidation = string().min(1, 'Введите имя')

export function isConfirmPassword(password: Ref<string>) {
    return (v: string) => v === password.value; 
}