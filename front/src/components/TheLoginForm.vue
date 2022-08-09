<template>
    <a-form
        :model="formState"
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
            <a-input size="large" placeholder="Почта" v-model:value="formState.username"  >
                <template #prefix>
                    <MailOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item
            name="password"
            has-feedback
        >
            <a-input-password  size="large" placeholder="Пароль" v-model:value="formState.password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item>
            <AppButton type="primary" size="large" :disabled="disabled" class="login-form-button">
                Войти в аккаунт
            </AppButton>
        </a-form-item>
  
        <RouterLink  class="auth__link" :to="{name: 'Register'}">Зарегистрироваться</RouterLink>
    </a-form>
</template>
<script lang="ts" setup>
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});

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