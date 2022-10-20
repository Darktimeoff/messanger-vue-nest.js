import {  IDialog, IMessage } from "~/types"
import { defineStore } from "pinia";
import {ref, computed} from 'vue';
import type {IOnlinesDataEmit} from '~/socket'
export const useDialogStore = defineStore('dialogs', () => {
    const items = ref<IDialog[]>();
    const messages = ref<IMessage[]>();
    const currentDialogId = ref<string>();

    const isSelectDialog = computed(() => Boolean(currentDialogId.value));
    const currentDialog = computed(() => items.value?.find(d => d._id === currentDialogId.value));
    const isOnline = computed<boolean>(() => {
        return Boolean(currentDialog.value?.lastMessage.author?.isOnline || false)
    })

    function updateOnlines({userId, isOnline}: IOnlinesDataEmit) {
        items.value?.forEach(d => {
            const member = d.members.find(u => u._id === userId);
            if(member) member.isOnline = isOnline;
        })
    }


    return {
        currentDialog,
        items,
        messages,
        currentDialogId,
        isSelectDialog,
        isOnline,
        updateOnlines
    }
})