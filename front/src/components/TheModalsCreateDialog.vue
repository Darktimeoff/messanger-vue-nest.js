<template>
    <a-modal 
        okText="Создать" 
        cancelText="Закрыть"  
        title="Создать диалог"
        :onOk="createDialog"
        :onCancel="hideModal"
        :confirmLoading="isFetching || isLoadingCreateDialog" 
    >
        <UserSearch 
            v-model:text="text" 
            :selectedUser="selectedUser"
            :users="sortUserByDate" 
            :isLoading="isFetching" 
            @userSelect="onUserSelect"
        />
    </a-modal>
</template>

<script lang="ts" setup>
import { useDialogs, useModal, useNotification, useUserSearch } from '~/hooks';
import type { IUser } from '~/types';

const selectedUser = ref<IUser | null>()
const isLoadingCreateDialog = ref(false)
const {isFetching, text, sortUserByDate} = useUserSearch();
const {findOrCreateAndOpen} = useDialogs();
const {info} = useNotification()
const {hideModal} = useModal();

function onUserSelect(user: IUser) {
    if(selectedUser.value?._id === user._id) {
        selectedUser.value = null;
    } else {
        selectedUser.value = user;
    }
}

async function createDialog() {
    if(!selectedUser.value) {
        info({
            message: "Select user before create"
        });
        
        return;
    };

    isLoadingCreateDialog.value  = true;

    try {
        await findOrCreateAndOpen(selectedUser.value);
        hideModal();
    } catch(e) {
        console.log('onUserSelect', e)
    } finally {
        isLoadingCreateDialog.value = false;
    }
}
</script>