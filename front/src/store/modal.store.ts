import { defineStore } from "pinia";
import { MODAL_NAME } from "~/const/modal.const";
import {computed, ref} from 'vue';
import { ModalProps } from "ant-design-vue";

export interface IModalPayload extends ModalProps{
}

export const useModalStore = defineStore('modal', () => {
    const modalName = ref<`${MODAL_NAME}` | null>();
    const payload = ref<IModalPayload | null>()
    const isShowModal = computed(() => Boolean(modalName.value));

    function showModal(name: `${MODAL_NAME}`, payloadProp?: IModalPayload) {
        if(name) modalName.value = name;
        if(payload) payload.value = payloadProp;
    }

    function hideModal() {
        modalName.value = null;
        payload.value = null
    }

    return {
        modalName,
        payload,
        isShowModal,
        showModal,
        hideModal
    }
})