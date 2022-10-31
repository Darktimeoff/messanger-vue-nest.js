import {computed} from 'vue';
import { DialogsAPI } from "~/api";
import { useDialogStore } from "~/store";
import { useQuery } from "vue-query";
import { Pinia, storeToRefs } from "pinia";
import { IDialog, IUser } from "~/types";
import { useAuth } from "./useAuth.hook";
import { messageEmit } from '~/socket';
import router from '~/router';
import { AxiosError } from 'axios';
import { useErrorReponse } from './useErrorResponse.hook';

export function useDialogs(store?: Pinia) {
    const dialogsStore = useDialogStore(store);
    const {showError} = useErrorReponse()
    const {isMe, user} = useAuth(store)
    const { currentDialogId, isSelectDialog, currentDialog, items, ...dialogsState} = storeToRefs(dialogsStore);

    const getDialogByPartner = computed(() => (id: string) => items.value.find(d => d.members.find(u => u._id === id)));
    const dialogPartner = computed(() => (dialog: IDialog) => dialog?.members.find(u => !isMe.value(u._id)));
    const getDialogName = computed(() => (d: IDialog) => dialogPartner.value(d)?.fullname);
    const isEmpty  = computed(() =>  !currentDialog.value?.lastMessage);
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
            enabled: isSelectDialog.value && !isEmpty.value,
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

    async function createDialog(partner: IUser) {
        try {
            const {data} = await DialogsAPI.createDialog({
                membersId: [partner._id, user.value?._id as any],
                isDialog: true
            })

            dialogsStore.addDialog(data);

            return data;
        } catch(e) {
           return Promise.reject(e);
        }
    }

    async function findOrCreateAndOpen(partner: IUser) {
        try {
            let dialog = getDialogByPartner.value(partner._id);

            if(!dialog) {
                dialog = await createDialog(partner);
            }

            currentDialogId.value  = dialog?._id;

            router.push({
                name: "Dialog",
                params: {
                    id: currentDialogId.value
                }
            })
        } catch(e) {
            showError(e);

            return Promise.reject(e)
        }
    }
 

    return {
        getMessageAuthorInfo,
        isMe,
        getDialogName,
        dialogPartner,
        useDialogQuery,
        currentDialog,
        useDialogsQuery,
        ...dialogsState,
        currentDialogId,
        isSelectDialog,
        updateOnlines: dialogsStore.updateOnlines,
        removeDialog,
        addDialog: dialogsStore.addDialog,
        addMessage: dialogsStore.addMessage,
        messageEmit,
        createDialog,
        findOrCreateAndOpen,
        items,
        getDialogByPartner,
        isEmpty
    }
}