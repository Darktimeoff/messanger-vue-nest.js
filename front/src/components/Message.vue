<template>
    <div class="message" :class="{'message--isme': isMe}">
        <div class="message__avatar">
            <img class="message__avatar__img" :src="avatar" :alt="`Avatar ${user?.fullname}`" >
        </div>
        <div class="message__content">
            <div class="message__bubble">
                <p class="message__text">{{text}}</p>
            </div>
            <div class="message__date">{{formatDate}}</div>
        </div>
        <transition enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
            <AppSvgIcon v-if="isReaded" class="message__readed" icon="read-message" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import type {IUser} from '~/types';
import {formatDistanceToNow} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

interface IProps {
    avatar: string;
    text: string;
    date: string;
    user: IUser;
    isMe?: boolean;
    isReaded?: boolean;
}

const props = defineProps<IProps>()

const formatDate = computed(() => {
    return formatDistanceToNow(new Date(props.date), {addSuffix: true, locale: ruLocale});
})
</script>

<style lang="scss" scoped>
$marginFromDate: 10px;
$messageReadedM: 10px;
.message {
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
    width: 33px;
    height: 33px;
    margin-right: 13px;
    margin-bottom: $marginFromDate;
    flex-shrink: 0;
}

.message__bubble {
    background: $blue;
    box-shadow: 0px 5px 5px rgba(54, 116, 255, 0.196733);
    border-radius: 12px 12px 12px 0;
    padding: 15px;
    margin-bottom: 10px;
    width: fit-content;
}

.message__readed {
    font-size: 12px;
    color: $blue1;
    margin-bottom: $marginFromDate;
    margin-left: $messageReadedM;
}

.message__content {
    position: relative;
    text-align: left;
}

.message__text {
    color: $white;
    font-size: 14px;
    word-break: break-all;
    line-height: 20px;
}

.message__date {
    position: absolute;
    font-size: 12px;
    opacity: $opDis;
    white-space: nowrap;
    bottom: -$marginFromDate;
}

.message--isme {
    margin-left: auto;
    flex-direction: row-reverse;
    .message__bubble {
        background: $white;
        border: 1px solid $gray1;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.0220444);
        border-radius: 12px 12px 0 12px;
    }

    .message__content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
    }

    .message__avatar__img {
        margin-right: 0;
        margin-left: 13px;
    }

    .message__readed {
        font-size: 12px;
        color: $blue1;
        margin-bottom: $marginFromDate;
        margin-right: $messageReadedM;
    }

    .message__text {
        color: $black;
    }
}
</style>