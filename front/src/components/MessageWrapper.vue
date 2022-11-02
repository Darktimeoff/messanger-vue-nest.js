<template>
    <div class="message" :class="{
        'message--isme': isMe,
        'message--attachment': isHasAttachment,
        'message--is-typing': isTyping,
        'message--is-audio': isAudio
    }">
        <div class="message__avatar">
            <Avatar class="message__avatar__img" 
                :avatar="avatar" 
                :username="user?.fullname"
                :hash="user._id"
                :width="40" 
                :height="40" 
                :alt="`Avatar ${user?.fullname}`" 
                isRound
            />
        </div>
        <slot />
        <div class="message__date">{{isEdited ? `Изменено ${formatDate}` : formatDate}}</div>
        <ReadedIcon :isRead="Boolean(isMe && isReaded)" :isSend="Boolean(isMe)" />
    </div>
</template>

<script setup lang="ts">
import type {IUser} from '~/types';
import { useTime } from '~/hooks';

interface IProps {
    avatar: string | null;
    date?: string;
    user: IUser;
    isMe?: boolean;
    isReaded?: boolean;
    isHasAttachment?: boolean;
    isTyping?: boolean;
    isAudio?: boolean;
    isDeleted?: boolean;
    isEdited?: boolean;
    deletedAt?: string;
    updatedAt?: string;
}

const props = defineProps<IProps>()

const {getDistanceTime} = useTime()

const formatDate = computed(() => {
    return props.updatedAt && getDistanceTime.value(props.updatedAt)
})
</script>

<style lang="scss" scoped>
$marginFromDate: 10px;
$messageReadedM: 10px;
$avatarSize: 33px;
$avatarMargin: 13px;
.message {
    position: relative;
    display: flex;
    align-items: flex-end;
    max-width: 440px;
    margin-bottom: 15px + $marginFromDate;
}
.message__avatar {
    flex-shrink: 0;
}
.message__avatar__img {
    border-radius: 50%;
    width: $avatarSize;
    height: $avatarSize;
    margin-right: $avatarMargin;
    margin-bottom: $marginFromDate;
    flex-shrink: 0;
}

.message__readed {
    margin-bottom: $marginFromDate;
    margin-left: $messageReadedM;
}

.message__date {
    position: absolute;
    font-size: 12px;
    opacity: $opDis;
    white-space: nowrap;
    bottom: -$marginFromDate;
    left: $avatarSize + $avatarMargin;
}

.message--isme {
    margin-left: auto;
    flex-direction: row-reverse;
    .message__avatar__img {
        margin-right: 0;
        margin-left: $avatarMargin;
    }

    .message__date {
        left: initial;
        right: $avatarSize + $avatarMargin;
    }

    .message__readed {
        font-size: 12px;
        color: $blue1;
        margin-bottom: $marginFromDate;
        margin-right: $messageReadedM;
    }
}
</style>