import {  IUser } from "~/types"
import { defineStore } from "pinia";
import {ref, computed} from 'vue';
import { Storage } from "~/helpers";
import { token as tokenLocal } from "~/const";
import { computedEager } from "@vueuse/core";

export const useUserStore = defineStore('user', () => {
    const user = ref<IUser>();
    const token = ref(Storage.get<string, null>(tokenLocal, null));

    const isAuth = computedEager(() => Boolean(token.value));
    const userId = computed(() => user.value?._id)

    function setToken(value: string) {
        Storage.set(tokenLocal, value);
        token.value = value;
    }

    function removeToken() {
        Storage.remove(tokenLocal);
        token.value = '';
    }

    function reset() {
        user.value = undefined;
        token.value = '';
        removeToken();
    }

    return {
        userId,
        token,
        user,
        isAuth,
        setToken,
        removeToken,
        reset
    }
})