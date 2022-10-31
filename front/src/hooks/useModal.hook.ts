import { Pinia } from "pinia";
import { IModalPayload, useModalStore } from "~/store";
import {useUrlSearchParams} from '@vueuse/core';
import { MODAL_NAME } from "~/const/modal.const";
import {storeToRefs} from 'pinia';

export function useModal(store?: Pinia) {
    const modalStore = useModalStore(store);
    const modalStoreField = storeToRefs(modalStore);

    function showModal(name: `${MODAL_NAME}`, payload?: IModalPayload) {
        const query = useUrlSearchParams('history');
        query.modal = name;

        modalStore.showModal(name, payload);
    }

    function hideModal() {
        const query = useUrlSearchParams('history', {removeFalsyValues: true});
        query.modal = '';

        modalStore.hideModal();
    }

    return {
        ...modalStoreField,
        showModal,
        hideModal,
        MODAL_NAME
    }
}