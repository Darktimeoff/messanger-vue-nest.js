<template>
    <a-popover v-model:visible="visiable" class="messagepopover" :title="title" :trigger="trigger" :placement="placement">
        <template #content>
            <MessagePopoverItem @click="emit('delete'), visiable = false">
                <template #icon>
                    <DeleteOutlined />
                </template>
                Delete
            </MessagePopoverItem>
            <MessagePopoverItem icon="delete-outlined" @click="emit('edit'), visiable = false">
                <template #icon>
                    <EditOutlined />
                </template>
                Edit
            </MessagePopoverItem>
            <MessagePopoverItem icon="delete-outlined" @click="emit('copy'), visiable = false">
                <template #icon>
                    <EditOutlined />
                </template>
                Copy
            </MessagePopoverItem>
        </template>
        <slot />
    </a-popover>
</template>

<script lang="ts" setup>
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';

interface IProps {
    title?: string;
    trigger?: string;
    placement?: string;
}

interface  IEmit {
    (event: 'delete'): void;
    (event: 'edit'): void;
    (event: 'copy'): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmit>();
const visiable = ref<boolean>();
</script>

<style lang="scss">
.ant-popover-inner-content {
    padding: 0;
}
</style>