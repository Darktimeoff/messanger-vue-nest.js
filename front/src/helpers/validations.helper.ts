import { Ref } from 'vue';
import {string} from 'zod';

export const emailValidation = string().email('Введите коректный емайл').min(1, 'Заполните поле');
export const passwordValidation = string().min(8, 'Пароль должен быть больше 8 символов')
export const nameValidation = string().min(1, 'Заполните поле')

export function isConfirmPassword(password: Ref<string>) {
    return (v: string) => v === password.value; 
}
  