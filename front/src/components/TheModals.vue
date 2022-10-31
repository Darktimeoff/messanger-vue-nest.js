<template>
    <component :visible="isShowModal" v-bind="payload" :is="modalComponent" @cancel="onCancel" />
</template>

<script lang="ts" setup>
import { useModal } from '~/hooks';


const {isShowModal, modalName, hideModal, payload, MODAL_NAME} = useModal()

const modalComponent = computed(() => {
    if(!isShowModal.value) return undefined;
    return defineAsyncComponent(() => import(`./TheModals${modalName.value}.vue`))
});

onMounted(() => {
    const query = useUrlSearchParams('history', {removeFalsyValues: true});
    
    if(query?.modal && (query.modal as string) in MODAL_NAME) {
        modalName.value = (query.modal as any);
    } else {
        query.modal = '';
    }
});

function onCancel() {
    hideModal();
}
</script>