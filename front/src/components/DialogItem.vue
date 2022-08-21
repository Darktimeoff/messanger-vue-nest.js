<template>
    <div class="dialogs__item">
        <div class="dialogs__item__avatar">
            <Avatar 
                class="dialogs__item__avatar__img" 
                :avatar="item.avatar" 
                :width="40" 
                :height="40" 
                :alt="item.name" 
                isRound
            />
        </div>
        <div class="dialogs__item__content">
            <div class="dialogs__item__name">
                {{item.name}}
            </div>
            <div class="dialogs__item__date">
                {{getDialogTime(item.lastMessage.created_at)}}
            </div>
            <div class="dialogs__item__message">
                <span v-if="isShowAuthor">{{item.lastMessage.author}}</span>
                {{item.lastMessage.text}}
            </div>
            <UnReadCount v-if="isShowUnread" class="dialogs__item__unread">
                {{item.unreadMessageCount}}
            </UnReadCount>
            <ReadedIcon
                v-else-if="isMe" 
                class="dialogs__item__unread"
                :isRead="isReaded"
                :isSend="!isReaded"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTime } from '~/hooks';
import { IDialog } from '~/types';

interface IProps {
    item: IDialog
}

const props = defineProps<IProps>();

const {
    getDialogTime
} = useTime()

const item = computed(() => props.item)
const lastMessage = computed(() => item.value.lastMessage)
const isMe = computed(() => lastMessage.value.isMe);
const isReaded = computed(() => lastMessage.value.isReaded);
const isShowUnread = computed(() => item.value.unreadMessageCount > 0);
const isShowAuthor = computed(() => item.value.lastMessage.author && !isMe.value)
</script>

<style lang="scss" scoped>
.dialogs__item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0 10px;
}
.dialogs__item__content {
    display: grid;
    gap: 5px 0;
    padding: 10px 0;
    border-bottom: 2px solid $black;
    height: 100%;
    grid-template: "name date" 23px "message unread" 1fr / 1fr 50px;
    align-items: center;
}
.dialogs__item__name {
    font-weight: 500;
    font-size: 14px;
    grid-area: name;
}
.dialogs__item__date {
    grid-area: date;
    justify-self: flex-end;
}
.dialogs__item__message {
    grid-area: message;
}

.dialogs__item__unread {
    grid-area: unread;
    justify-self: flex-end;
}
.dialogs__item__avatar__img {
    width: 40px;
    height: 40px;
}
</style>