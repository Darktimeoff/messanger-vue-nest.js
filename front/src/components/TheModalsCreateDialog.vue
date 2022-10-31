<template>
    <a-modal title="Создать диалог">
        <UserSearch v-model:text="text" :users="sortUserByDate" :isLoading="isFetching" />
    </a-modal>
</template>

<script lang="ts" setup>
import { useUserSearch } from '~/hooks';

const {isFetching, text, sortUserByDate} = useUserSearch()
</script>