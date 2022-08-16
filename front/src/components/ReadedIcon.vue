<template>
    <transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
        <AppSvgIcon v-if="isRead" class="message__readed" icon="read-message" />
        <AppSvgIcon v-else-if="isSend" class="message__readed" icon="send-message" />
    </transition>
</template>

<script lang="ts" setup>
interface IProps {
    isRead: boolean;
    isSend: boolean;
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.message__readed {
    font-size: 12px;
    color: $blue1;
}
</style>
