import { DialogsAPI } from "~/api";
import { useDialogStore } from "~/store";
import { useQuery } from "vue-query";
import { storeToRefs } from "pinia";

export function useDialogs() {
    const dialogsStore = useDialogStore();
    const {items, messages, currentDialogId, isSelectDialog, currentDialog,isOnline} = storeToRefs(dialogsStore);
  
    const dialogsQuery = useDialogsQuery();
    const dialogQuery = useDialogQuery();

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
        currentDialog,
        dialogQuery,
        dialogsQuery,
        useDialogsQuery,
        items,
        messages,
        currentDialogId,
        isSelectDialog,
        isOnline
    }
}