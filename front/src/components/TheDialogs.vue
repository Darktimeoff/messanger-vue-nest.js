<template>
    <div class="dialogs">
        <DialogItem v-for="c in items" :key="c.id" :item="c" />
    </div>
</template>

<script lang="ts" setup>
import { IDialog } from '~/types';

interface IProps {
    items: IDialog[]
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.dialogs {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    padding-top: 20px;
}
</style>