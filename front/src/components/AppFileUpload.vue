<template>
    <div class="file-upload" @click="onFileClick" :disabled="disabled">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import {useFileUpload} from '~/hooks';
import { IUploadFile } from '~/types';

interface IProps {
    accept: HTMLInputElement['accept'],
    multiple?: HTMLInputElement['multiple'],
    capture?: HTMLInputElement['capture'],
    fileList: IUploadFile[];
    disabled?: boolean;
}

const props = defineProps<IProps>();
const fileList = useVModel(props, 'fileList');

const {open} = useFileUpload(fileList)

function onFileClick() {
    open({
        accept: props.accept,
        multiple: props.multiple,
        capture: props.capture
    })
}
</script>

<style lang="scss" scoped>
.file-upload {
    &:disabled {
        opacity: $opDis;
        cursor: not-allowed;
    }
}
</style>