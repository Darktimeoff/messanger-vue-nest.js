import {  IDialog,IMessage } from "~/types"
import { defineStore } from "pinia";
import {ref, computed} from 'vue';
import type {IOnlinesDataEmit} from '~/socket'
export const useDialogStore = defineStore('dialogs', () => {
    const items = ref<IDialog[]>();
    const currentDialogId = ref<string>();

    const isSelectDialog = computed(() => Boolean(currentDialogId.value));
    const currentDialog = computed(() => items.value?.find(d => d._id === currentDialogId.value));
    const isOnline = computed<boolean>(() => {
        return Boolean(currentDialog.value?.lastMessage.author?.isOnline || false)
    })
    const messages = computed(() => currentDialog.value?.message)

    function addMessage(dialogId: string, message: IMessage | IMessage[]) {
        const dialog = items.value?.find(d => d._id === dialogId);
        if(!dialog) return;
        
        if(typeof message === 'object' && Array.isArray(message)) {
            dialog.message = message;
        } else {
            dialog.message.push(message);
        }
    }

    function setDialogs(dialogs: IDialog[]) {
        if(!items.value?.length) {
            items.value = dialogs;

            return;
        }

        dialogs.forEach(newDialog => {
            let dialog = items.value?.find(d => d._id === newDialog._id);
            if(!dialog) {
                addDialog(newDialog);
            } else {
                const message = dialog.message;
                dialog = {...newDialog, message}
            }
        })
    } 

    function updateOnlines({userId, isOnline}: IOnlinesDataEmit) {
        items.value?.forEach(d => {
            const member = d.members.find(u => u._id === userId);
            if(member) member.isOnline = isOnline;
        })
    }

    function removeDialog(dialog: IDialog) {
        items.value = items.value?.filter(d => d._id !== dialog._id);
    }

    function addDialog(dialog: IDialog) {
        if(!items.value) {
            items.value = [dialog];
            return;
        }
        
        items.value?.push(dialog);
    }


    return {
        currentDialog,
        items,
        messages,
        currentDialogId,
        isSelectDialog,
        isOnline,
        updateOnlines,
        removeDialog,
        addDialog,
        addMessage,
        setDialogs
    }
})