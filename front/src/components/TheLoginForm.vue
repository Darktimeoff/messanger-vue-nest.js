<template>
    <a-form
        name="login"
        class="login-form"
    >
        <a-form-item
            name="email"
            :has-feedback="isEmailTouched"
            :validateStatus="validateStatus(eError || '')"
            :extra="eError"
        >
            <a-input size="large" autocomplete="username" placeholder="Почта" v-model:value="email"  >
                <template #prefix>
                    <MailOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item
            name="password"
            :has-feedback="isPasswordTouched"
            :validateStatus="validateStatus(pError || '')"
            :extra="pError"
        >
            <a-input-password autocomplete="current-password" size="large" placeholder="Пароль" v-model:value="password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item>
            <AppButton type="primary" htmlType="submit" size="large" :disabled="disabledBtn" @click="onSubmit" class="login-form-button">
                Войти в аккаунт
            </AppButton>
        </a-form-item>
  
        <RouterLink  class="auth__link" :to="{name: 'Register'}">Зарегистрироваться</RouterLink>
    </a-form>
</template>
<script lang="ts" setup>
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useLoginForm } from '~/hooks';
import {sleep} from '~/helpers';

const {
    disabledBtn,
    email,
    password,
    eError,
    pError,
    isEmailTouched,
    isPasswordTouched,
    submitForm,
    validateStatus,
    resetForm,
    isSubmitting
} = useLoginForm();

async function onSubmit() {
    isSubmitting.value = true;
    try {
        await sleep(500);
        submitForm();

        if(Math.random() > 0.5) throw new Error('Не правильный пароль');

        resetForm();
    } catch(e) {
        if(e instanceof Error) {
            submitForm(e?.message)
        }
        console.log('onSumbit login error')
    } finally {
        isSubmitting.value = false;
    }
};
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