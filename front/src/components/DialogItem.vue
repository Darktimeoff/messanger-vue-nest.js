<template>
    <div class="dialogs__item" :class="{'dialogs__item--online': isOnline}">
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

const item = computed(() => props.item);
const lastMessage = computed(() => item.value.lastMessage);
const isOnline = computed(() => item.value.user?.isOnline)
const isMe = computed(() => lastMessage.value.isMe);
const isReaded = computed(() => lastMessage.value.isReaded);
const isShowUnread = computed(() => item.value.unreadMessageCount > 0);
const isShowAuthor = computed(() => item.value.lastMessage.author && !isMe.value)
</script>

<style lang="scss" scoped>
.dialogs__item {
    width: 300px;
    display: flex;
    align-items: center;
    gap: 0 10px;
    padding: 10px 0;
}
.dialogs__item__content {
    display: grid;
    gap: 7px 0;
    height: 100%;
    grid-template: "name date" auto "message unread" 1fr / 1fr auto;
    align-items: center;
}
.dialogs__item__name {
    font-weight: 600;
    font-size: 14px;
    grid-area: name;
}
.dialogs__item__date {
    grid-area: date;
    justify-self: flex-end;
    opacity: $opDis;
}
.dialogs__item__message {
    grid-area: message;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    opacity: $opDis;
}

.dialogs__item__unread {
    grid-area: unread;
    justify-self: flex-end;
}
.dialogs__item__avatar__img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
}
.dialogs__item__avatar {
    position: relative;
    flex-shrink: 0;
}

.dialogs__item--online .dialogs__item__avatar::before {
    content: '';
    width: 13px;
    height: 13px;
    background: $green;
    position: absolute;
    border-radius: 50%;
    bottom: -2px;
    right: 0;
    border: 3px solid $white;
}
</style>