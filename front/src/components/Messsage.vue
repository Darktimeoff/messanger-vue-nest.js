<template>
    <div class="message__content">
        <div v-if="text || isTyping || audio || isDeleted" class="message__bubble">
            <p v-if="text" class="message__text">
                {{isDeleted ? 'Сообщение удалено' : text}}
            </p>
            <MessageTyping v-if="isTyping" />
            <MessageAudio v-if="audio" :audio="audio" />
        </div>

        <MessageAttachments v-if="isHasAttachment" :attachments="(attachments as IFile[])" :isLarge="!text"/>
    </div>
</template>

<script setup lang="ts">
import { IFile } from '~/types';

interface IProps {
    text: string | null;
    isTyping?: boolean;
    attachments?: IFile[];
    audio?: string;
    isDeleted?: boolean | undefined;
}


const props = defineProps<IProps>()
const isHasAttachment = computed(() => Boolean(props.attachments?.length))
</script>

<style lang="scss" scoped>
.message__content {
    display: flex;
    flex-direction: column;
    text-align: left;
}
.message__bubble {
    background: $blue;
    box-shadow: 0px 5px 5px rgba(54, 116, 255, 0.196733);
    border-radius: 12px 12px 12px 0;
    padding: 13px;
    margin-bottom: px($messageMB);
    width: fit-content;
    position: relative;
    overflow: hidden;
}

.message__text {
    color: $white;
    font-size: 14px;
    word-break: break-all;
    line-height: 20px;
    margin-bottom: 0;
}

.message--attachment .message__bubble {
    margin-bottom: px($messageMB / 2);
}

.message--isme {
    .message__content {
        align-items: flex-end;
    }
    .message__bubble {
        background: $white;
        border: 1px solid $gray1;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.0220444);
        border-radius: 12px 12px 0 12px;
    }

    .message__text {
        color: $black;
    }
}
.message--is-typing {
    .message__bubble {
        background: $message-typing-bg;
        box-shadow: 0px 5px 5px rgba(54, 116, 255, 0.04)
    }
}

.message--is-audio {
    .message__bubble {
        width: 280px;
    }
}
</style>