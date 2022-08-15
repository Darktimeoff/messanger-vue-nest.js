<template>
    <div class="message" :class="{
        'message--isme': isMe,
        'message--attachment': isHasAttachment,
    }">
        <div class="message__avatar">
            <img class="message__avatar__img" :src="avatar" :alt="`Avatar ${user?.fullname}`" >
        </div>
        <slot />
        <div class="message__date">{{formatDate}}</div>
        <transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
            <AppSvgIcon v-if="isMe && isReaded" class="message__readed" icon="read-message" />
            <AppSvgIcon v-else-if="isMe" class="message__readed" icon="send-message" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import type {IUser} from '~/types';
import {formatDistanceToNow} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

interface IProps {
    avatar: string;
    date: string;
    user: IUser;
    isMe?: boolean;
    isReaded?: boolean;
    isHasAttachment?: boolean;
}

const props = defineProps<IProps>()

const formatDate = computed(() => {
    return formatDistanceToNow(new Date(props.date), {addSuffix: true, locale: ruLocale});
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
    font-size: 12px;
    color: $blue1;
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