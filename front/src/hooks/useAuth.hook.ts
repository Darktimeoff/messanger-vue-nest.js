import {computed, ComputedRef} from 'vue';
import { AuthAPI, UserAPI } from "~/api";
import { useUserStore } from "~/store";
import { IUser } from "~/types";
import {Pinia, storeToRefs} from 'pinia'
import { useQuery } from "vue-query";

export function useAuth(store?: Pinia) {
    const userStore = useUserStore(store);
    const {user, token, isAuth, userId} = storeToRefs(userStore);

    const isMe = computed(() => (id: string) => userId.value === id);
    const getUserId = computed(() => (user: IUser | string) => {
        return typeof user === 'object' ? user._id : user;
    })

    function onLogin(userData: IUser, access_token: string) {
        user.value = userData;
        userStore.setToken(access_token)
    }

    function onLogout() {
        userStore.reset();
        userStore.removeToken();
    }

    function useUserQuery() {
        return useQuery('user', UserAPI.getMe, {
            select: (user) => user.data,
            onSuccess(data) {
                user.value = data
            },
        });
    }
    return {
        userId,
        user,
        token,
        isAuth,
        AuthAPI,
        onLogin,
        onLogout,
        useUserQuery,
        isMe,
        getUserId
    }
}
