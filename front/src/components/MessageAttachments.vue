<template>
    <div class="messageattachment" :class="{'large': isLarge}">
        <AppImage class="messageattachment-img" v-for="a in attachments" :key="a.url" :url="a.url" :alt="a.filename" />
    </div>
</template>

<script setup lang="ts">
import { IAttachment } from '~/types';

interface IProps {
    attachments: IAttachment[],
    isLarge?: boolean;
}


const props = defineProps<IProps>()

const columnGrid = computed(() => props.attachments.length > 1 ? 2 : 1);
const rowGrid = computed(() => Math.ceil(props.attachments.length / 2))
</script>

<style lang="scss" scoped>
.messageattachment {
    display: flex;
    align-items: center;
    gap: 0 5px;
    margin-bottom: px($messageMB);
}

.messageattachment-img {
    width: 45px;
    height: 45px;
    border-radius: px($borderR / 2);
}

.messageattachment.large {
    display: grid;
    width: 100%;
    align-items: stretch;
    grid-template-columns: repeat(v-bind(columnGrid), auto);
    grid-template-rows: repeat(v-bind(rowGrid), auto);
    box-shadow: 2px 2px 7px rgb(0 0 0 / 20%);
    border-radius: px($borderR / 2);
    padding: 2px;
    gap: 2px;
    .messageattachment-img  {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
}
</style>
