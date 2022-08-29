import { DialogsAPI } from "~/api";
import { useDialogStore } from "~/store";
import { useQuery } from "vue-query";
import { storeToRefs } from "pinia";

export function useDialogs() {
    const dialogsStore = useDialogStore();
    const {items, currentDialog, currentDialogId, isSelectDialog} = storeToRefs(dialogsStore);
  
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
                currentDialog.value = data
            }
        })
    }
 

    return {
        dialogQuery,
        dialogsQuery,
        useDialogsQuery,
        items,
        currentDialog,
        currentDialogId
    }
}