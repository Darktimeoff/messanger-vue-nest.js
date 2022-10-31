<template>
    <div class="useritem" :class="{'select': isSelect}">
        <Avatar 
            class="useritem__avatar"
            :avatar="user?.avatar || null"
            :hash="user._id"
            :username="user.fullname"
            :width="40"
            :height="40"
            :alt="user.fullname"
            isRound
        />
        <div class="useritem__content">
            <div class="useritem__title">
                {{user.fullname}}
            </div>
            <UserVisitTime 
                class="useritem__description"
                :isOnline="user.isOnline" 
                :last_seen="user.last_seen"
             />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IUser } from '~/types';

interface IProps {
    user: IUser;
    selectedUser: IUser | null | undefined;
}

const props = defineProps<IProps>();

const isSelect = computed(() => props.user?._id === props.selectedUser?._id)
</script>

<style lang="scss" scoped>
.useritem {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0 10px;
    padding: 5px;
    cursor: pointer;
    transition: background $animationDuration;
    &.select {
        background: $dialogActive;
        .useritem__title {
            color: $white;
        }
        .useritem__description {
            color: $white;
        }
    }
}
.useritem__content {
    display: flex;
    flex-direction: column;
    gap: 3px 0;
}
.useritem__avatar {
    width: 40px;
    height: 40px;
}
.useritem__title {
    font-weight: bold;
    transition: color $animationDuration;
}
.useritem__content {
    line-height: normal;
}
.useritem__description  {
    transition: color $animationDuration;
}
</style>