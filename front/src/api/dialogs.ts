import { apiAxios } from "./core";

export function getAll() {
    return apiAxios.get('/dialogs');
}