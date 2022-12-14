<template>
    <div class="dialogs__item" :class="{'dialogs__item--online': isOnline, 'active': isActive}">
        <div class="dialogs__item__avatar">
            <Avatar 
                class="dialogs__item__avatar__img" 
                :avatar="partner?.avatar || null" 
                :hash="partner?._id"
                :username="dialogName"
                :width="40" 
                :height="40" 
                :alt="dialogName" 
                isRound
            />
        </div>
        <div class="dialogs__item__content">
            <div class="dialogs__item__name">
                {{dialogName}}
            </div>
            <div class="dialogs__item__date">
                {{item.lastMessage?.deletedAt ? 
                    getDialogTime(item?.lastMessage.deletedAt) : 
                    getDialogTime(item.lastMessage?.createdAt || '')
                }}
            </div>
            <div class="dialogs__item__message">
                <span v-if="isShowAuthor">{{item.lastMessage?.author?.fullname}}</span>
                {{item.lastMessage?.isDeleted ? 'Сообщение удалено' :  getMessageText(item.lastMessage as any)}}
            </div>
            <UnReadCount v-if="isShowUnread" class="dialogs__item__unread">
                <!-- TODO IMPLEMETED UNREAD MESSAGE COUND -->
            </UnReadCount>
            <ReadedIcon
                v-else-if="isMyMessage" 
                class="dialogs__item__unread"
                :isRead="isReaded"
                :isSend="!isReaded"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth, useDialogs, useTime } from '~/hooks';
import { IDialog } from '~/types';

interface IProps {
    item: IDialog,
    isActive?: boolean
}

const props = defineProps<IProps>();

const {
    getDialogTime
} = useTime();

const {
    isMe
} = useAuth();

const {
    dialogPartner,
    getDialogName,
    getMessageText
} = useDialogs()


const item = computed(() => props.item);
const dialogName = computed(() => getDialogName.value(item.value));
const partner = computed(() => dialogPartner.value(item.value));
const lastMessage = computed(() => item.value.lastMessage);
const isOnline = computed(() => partner.value?.isOnline);
const authorId = computed(() => lastMessage.value?.author._id || '');
const isMyMessage = computed(() => isMe.value(authorId.value));
const isReaded = computed(() => Boolean(lastMessage.value?.isRead));
const isShowUnread = computed(() => false);
const isShowAuthor = computed(() => !item.value.isDialog && !isMe.value)
</script>

<style lang="scss" scoped>
.dialogs__item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0 10px;
    padding: 10px px($chatPadding);
    cursor: pointer;
    &:hover {
        background-color: #f3f7ff;
    }
    &.active {
        background-color: $dialogActive;
        color: $white;
        .dialogs__item__date {
            opacity: 1;
        }
        .dialogs__item__message {
            opacity: 1;
        }
        .dialogs__item__unread  {
            box-shadow: none;
        }
    }
}
.dialogs__item__content {
    display: grid;
    gap:5px 0;
    height: 100%;
    grid-template: "name date" auto "message unread" 1fr / 1fr auto;
    align-items: center;
    width: 100%;
}
.dialogs__item__name {
    font-weight: 500;
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
    span {
        color: $blue1;
        opacity: 1;
    }
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