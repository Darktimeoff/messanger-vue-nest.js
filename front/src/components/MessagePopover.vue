<template>
    <a-popover class="messagepopover" :title="title" :trigger="trigger" :placement="placement">
        <template #content>
            <MessagePopoverItem icon="delete-outlined" @click="emit('delete')">
                <template #icon>
                    <DeleteOutlined />
                </template>
                Delete
            </MessagePopoverItem>
        </template>
        <slot />
    </a-popover>
</template>

<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue';

interface IProps {
    title?: string;
    trigger?: string;
    placement?: string;
}

interface  IEmit {
    (event: 'delete'): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmit>()
</script>

<style lang="scss">
.ant-popover-inner-content {
    padding: 0;
}
</style>