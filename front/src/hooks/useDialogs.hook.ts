import {computed} from 'vue';
import { DialogsAPI } from "~/api";
import { useDialogStore } from "~/store";
import { useQuery } from "vue-query";
import { Pinia, storeToRefs } from "pinia";
import { IDialog } from "~/types";
import { useAuth } from "./useAuth.hook";
import { messageEmit } from '~/socket';
import router from '~/router';

export function useDialogs(store?: Pinia) {
    const dialogsStore = useDialogStore(store);
    const {isMe} = useAuth(store)
    const {items, messages, currentDialogId, isSelectDialog, currentDialog,isOnline} = storeToRefs(dialogsStore);

    const dialogPartner = computed(() => (dialog: IDialog) => dialog?.members.find(u => !isMe.value(u._id)));
    const getDialogName = computed(() => (d: IDialog) => dialogPartner.value(d)?.fullname);
    const getMessageAuthorInfo = computed(() => (authorId: string) => {
        return currentDialog.value?.members.find(u => u._id === authorId)
    })

    function useDialogsQuery() {
        return useQuery('dialogs', DialogsAPI.getAll, {
            select: (dialog) => dialog.data,
            onSuccess(data) {
                dialogsStore.setDialogs(data);
            },
        });
    }

    function useDialogQuery() {
        return useQuery(['dialog', currentDialogId], () => DialogsAPI.getById(currentDialogId.value || ''), {
            enabled: isSelectDialog,
            select: (dialog) => dialog.data?.message,
            onSuccess(data) {
                if(currentDialogId.value) dialogsStore.addMessage(currentDialogId.value, data);
                console.log('data1', data)
            },
            onError(data) {
                console.log('data', data)
            }
        })
    }

    function removeDialog(dialog: IDialog) {
        router.push({
            name: 'Home'
        });

        dialogsStore.removeDialog(dialog);

        currentDialogId.value = undefined;
    }
 

    return {
        getMessageAuthorInfo,
        isMe,
        getDialogName,
        dialogPartner,
        useDialogQuery,
        currentDialog,
        useDialogsQuery,
        items,
        messages,
        currentDialogId,
        isSelectDialog,
        isOnline,
        updateOnlines: dialogsStore.updateOnlines,
        removeDialog,
        addDialog: dialogsStore.addDialog,
        addMessage: dialogsStore.addMessage,
        messageEmit
    }
}