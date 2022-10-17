import {  IUser1 } from "~/types"
import { defineStore } from "pinia";
import {ref, computed} from 'vue';
import { Storage } from "~/helpers";
import { token as tokenLocal } from "~/const";

export const useUserStore = defineStore('user', () => {
    const user = ref<IUser1>();
    const token = ref(Storage.get<string, null>(tokenLocal, null));

    const isAuth = computed(() => token.value);

    function setToken(value: string) {
        Storage.set(tokenLocal, value);
        token.value = value;
    }

    return {
        token,
        user,
        isAuth,
        setToken
    }
})