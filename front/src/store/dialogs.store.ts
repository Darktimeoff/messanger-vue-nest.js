import { IDialog, IMessage } from "~/types"
import { defineStore } from "pinia";
import {ref, computed} from 'vue';

export const useDialogStore = defineStore('dialogs', () => {
    const items = ref<IDialog[]>();
    const messages = ref<IMessage[]>();
    const currentDialogId = ref<string>();

    const isSelectDialog = computed(() => Boolean(currentDialogId.value));
    const currentDialog = computed(() => items.value?.find(d => d.id === currentDialogId.value));
    const isOnline = computed<boolean>(() => {
        return currentDialog.value?.lastMessage.user?.isOnline || false
    })


    return {
        currentDialog,
        items,
        messages,
        currentDialogId,
        isSelectDialog,
        isOnline
    }
})