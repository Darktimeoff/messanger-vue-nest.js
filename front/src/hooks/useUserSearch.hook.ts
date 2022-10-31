import { useQuery } from "vue-query";
import { DialogsAPI } from "~/api";
import {ref, computed} from 'vue';
import { compareDesc } from "date-fns";
import { refDebounced } from '@vueuse/core'

export function useUserSearch() {
    const text = ref<string>('')
    const debouncedText = refDebounced(text, 500);

    const {isLoading, isFetching, data: users} = useUserSearch();
    const sortUserByDate = computed(() => {
        return users.value?.sort((u1, u2) => compareDesc(new Date(u1.last_seen), new Date(u2.last_seen)))
    })

    function useUserSearch() {
        return useQuery(
            ['dialog/search/user', debouncedText], 
            () => DialogsAPI.findUsers(text.value),
            {
                select: (user) => user.data,
            }
        )
    }

    return  {
        users,
        isLoading,
        sortUserByDate,
        text,
        isFetching
    }
}