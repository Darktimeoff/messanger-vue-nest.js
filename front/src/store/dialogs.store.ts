import {  IDialog1, IMessage } from "~/types"
import { defineStore } from "pinia";
import {ref, computed} from 'vue';

export const useDialogStore = defineStore('dialogs', () => {
    const items = ref<IDialog1[]>();
    const messages = ref<IMessage[]>();
    const currentDialogId = ref<string>();

    const isSelectDialog = computed(() => Boolean(currentDialogId.value));
    const currentDialog = computed(() => items.value?.find(d => d._id === currentDialogId.value));
    const isOnline = computed<boolean>(() => {
        return Boolean(currentDialog.value?.lastMessage.author?.isOnline || false)
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