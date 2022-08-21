<template>
    <div class="dialogs">
        <DialogItem v-for="c in sortItems" :key="c.id" :item="c" />
    </div>
</template>

<script lang="ts" setup>
import { compareAsc } from 'date-fns';
import { IDialog } from '~/types';

interface IProps {
    items: IDialog[]
}

const props = defineProps<IProps>()

const sortItems = computed(() => [...props.items].sort((a, b) => {
    return compareAsc(new Date(b.lastMessage.created_at),new Date(a.lastMessage.created_at))
}));
</script>

<style lang="scss" scoped>
.dialogs {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    padding-top: 20px;
}
</style>