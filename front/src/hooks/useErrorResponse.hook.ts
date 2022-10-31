import { AxiosError } from "axios";
import { useNotification } from "./useNotificaiton.hook";

export function useErrorReponse() {
    const notification = useNotification();

    function showError(e: unknown) {
        let message;

        if(e instanceof AxiosError) {
            message =  e.response?.data.message;
            message = typeof message === 'object' ? message[0] : message;
        } else if(e instanceof Error) {
            message = e.message
        }

        notification.error({
            message: 'Error!',
            description: message
        })
    }

    return {
        showError
    }
}