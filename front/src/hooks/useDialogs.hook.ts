import {computed} from 'vue';
import { DialogsAPI } from "~/api";
import { useDialogStore } from "~/store";
import { useQuery } from "vue-query";
import { Pinia, storeToRefs } from "pinia";
import { IDialog } from "~/types";
import { useAuth } from "./useAuth.hook";

export function useDialogs(store?: Pinia) {
    const dialogsStore = useDialogStore(store);
    const {isMe} = useAuth(store)
    const {items, messages, currentDialogId, isSelectDialog, currentDialog,isOnline} = storeToRefs(dialogsStore);

    const dialogPartner = computed(() => (dialog: IDialog) => dialog?.members.find(u => !isMe.value(u._id)));

    function useDialogsQuery() {
        return useQuery('dialogs', DialogsAPI.getAll, {
            select: (dialog) => dialog.data,
            onSuccess(data) {
                items.value = data
            },
        });
    }

    function useDialogQuery() {
        return useQuery(['dialog', currentDialogId], () => DialogsAPI.getById(currentDialogId.value || ''), {
            enabled: isSelectDialog,
            select: (dialog) => dialog.data,
            onSuccess(data) {
                messages.value = data
            }
        })
    }
 

    return {
        dialogPartner,
        useDialogQuery,
        currentDialog,
        useDialogsQuery,
        items,
        messages,
        currentDialogId,
        isSelectDialog,
        isOnline,
        updateOnlines: dialogsStore.updateOnlines
    }
}