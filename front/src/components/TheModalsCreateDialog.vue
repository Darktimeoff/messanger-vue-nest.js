<template>
    <a-modal title="Создать диалог">
        <UserSearch 
            v-model:text="text" 
            :users="sortUserByDate" 
            :isLoading="isFetching" 
            @userSelect="onUserSelect"
        />
    </a-modal>
</template>

<script lang="ts" setup>
import { useDialogs, useModal, useUserSearch } from '~/hooks';
import type { IUser } from '~/types';

const {isFetching, text, sortUserByDate} = useUserSearch();
const {findOrCreateAndOpen} = useDialogs();
const {hideModal} = useModal();

async function onUserSelect(user: IUser) {
    try {
        await findOrCreateAndOpen(user);
        hideModal();
    } catch(e) {
        console.log('onUserSelect', e)
    }
}
</script>