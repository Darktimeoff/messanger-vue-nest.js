<template>
    <div class="file-upload" @click="onFileClick">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { UploadFile } from 'ant-design-vue';
import {useFileUpload} from '~/hooks';

interface IProps {
    accept: HTMLInputElement['accept'],
    multiple?: HTMLInputElement['multiple'],
    capture?: HTMLInputElement['capture'],
    fileList: UploadFile[]
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
.file-upload__input {
    display: none;
}
</style>