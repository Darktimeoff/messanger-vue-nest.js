import { AuthAPI } from "~/api";
import { useUserStore } from "~/store";
import { IUser1 } from "~/types";
import {storeToRefs} from 'pinia'

export function useAuth() {
    const userStore = useUserStore();
    const {user, token, isAuth} = storeToRefs(userStore);

    function onLogin(userData: IUser1, access_token: string) {
        user.value = userData;
        userStore.setToken(access_token)
    }

    return {
        user,
        token,
        isAuth,
        AuthAPI,
        onLogin
    }
}
