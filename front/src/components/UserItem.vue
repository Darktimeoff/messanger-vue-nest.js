<template>
    <div class="useritem">
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
                :isOnline="user.isOnline" 
                :last_seen="user.last_seen"
             />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IUser } from '~/types';

interface IProps {
    user: IUser
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.useritem {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0 10px;
    padding: 5px;
    cursor: pointer;
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
}
.useritem__content {
    line-height: normal;
}
</style>