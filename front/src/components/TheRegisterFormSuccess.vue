<template>
    <div class="auth__success-block">
        <ExclamationCircleTwoTone class="auth__success__icon" />
        <h class="title">Потвердите свой аккаунт</h>
        <p class="description">
            На Вашу почту отправленно письмо с ссылкой на потверждение аккуанта.
        </p>
    </div>
</template>

<script lang="ts" setup>
import { ExclamationCircleTwoTone } from '@ant-design/icons-vue';
</script>

<style lang="scss" scoped>
.auth__success-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: px(359);
    .title {
        font-size: px(28);
        color: $black;
        margin-bottom: px(5);
        margin-top: px(10)
    }
    .description {
        font-size: px(14);
        color: $black;
        line-height: px(21);
        letter-spacing: px(0.1);
        opacity: $opDis;
        text-align: center;
    }
}

.auth__success__icon {
    display: block;
    font-size: 48px;
}
</style>