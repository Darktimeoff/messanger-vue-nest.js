<template>
    <a-form
        v-if="false"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
        <a-form-item
            name="email"
            has-feedback
            validateStatus="success"
        >
            <a-input size="large" placeholder="Почта"  >
                <template #prefix>
                    <MailOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

         <a-form-item
            name="name"
        >
            <a-input size="large" placeholder="Ваше имя">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

         <a-form-item
            name="new-password"
        >
            <a-input-password  size="large" placeholder="Пароль">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item
            name="new-password-repeat"
        >
            <a-input-password  size="large" placeholder="Повторите пароль">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item>
            <AppButton type="primary" size="large" :disabled="disabled" class="login-form-button">
              Зарегистрироваться
            </AppButton>
        </a-form-item>
  
        <RouterLink  class="auth__link" :to="{name: 'Login'}">Войти в аккаунт</RouterLink>
    </a-form>
    <TheRegisterFormSuccess v-else />
</template>
<script lang="ts" setup>
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons-vue';


const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return false;
});

</script>
<style lang="scss" scoped>
.login-form-button {
  width: 100%;
}
.button {
    font-weight: 500;
    line-height: px(16);
    letter-spacing: px(0.1);
    font-size: px(14);
    text-transform: uppercase;
}
.auth__link {
    display: block;
    color: $gray;
    text-align: center;
    letter-spacing: 0.1px;
    transition: color $animationDuration;
    &:hover {
        color: darken($color: $gray, $amount: 15%)
    }
}

.site-form-item-icon {
    opacity: $opDis;
}
</style>