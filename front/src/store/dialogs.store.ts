import { IDialog, IMessage } from "~/types"
import { defineStore } from "pinia";
import {ref, computed} from 'vue';

export const useDialogStore = defineStore('dialogs', () => {
    const items = ref<IDialog[]>();
    const currentDialog = ref<IMessage[]>();
    const currentDialogId = ref<string>();

    const isSelectDialog = computed(() => Boolean(currentDialogId.value))

    return {
        items,
        currentDialog,
        currentDialogId,
        isSelectDialog
    }
})