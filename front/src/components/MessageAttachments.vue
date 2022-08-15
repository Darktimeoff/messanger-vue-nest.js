<template>
    <div class="messageattachment">
        <AppImage class="messageattachment-img" v-for="a in attachments" :key="a.url" :url="a.url" :alt="a.filename" />
    </div>
</template>

<script setup lang="ts">
import { IAttachment } from '~/types';

interface IProps {
    attachments: IAttachment[]
}
defineProps<IProps>()
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
</style>
