<template>
    <a-form
        v-if="!isSuccuses"
        name="register"
        class="register-form"
    >
        <a-form-item
            name="email"
            :has-feedback="isEmailTouched"
            :validateStatus="validateStatus(eError || '')"
            :extra="eError"
        >
            <a-input autocomplete="username"  size="large" placeholder="Почта" v-model:value="email"  >
                <template #prefix>
                    <MailOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

         <a-form-item
            name="name"
            :has-feedback="isNameTouched"
            :validateStatus="validateStatus(nError || '')"
            :extra="nError"
        >
            <a-input size="large" placeholder="Ваше имя" v-model:value="name">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

         <a-form-item
            name="new-password"
            :has-feedback="isPasswordTouched"
            :validateStatus="validateStatus(pError || '')"
            :extra="pError"
        >
            <a-input-password autocomplete="new-password"  size="large" placeholder="Пароль" v-model:value="password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item
            name="confirm-password"
            :has-feedback="isConPasswordTouched"
            :validateStatus="validateStatus(cPError || '')"
            :extra="cPError"
        >
            <a-input-password autocomplete="confirm-password"  size="large" placeholder="Повторите пароль" v-model:value="conPassword">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item>
            <AppButton type="primary"  htmlType="submit" size="large" :disabled="disabledBtn"  @click="onSubmit" class="login-form-button">
              Зарегистрироваться
            </AppButton>
        </a-form-item>
  
        <RouterLink  class="auth__link" :to="{name: 'Login'}">Войти в аккаунт</RouterLink>
    </a-form>
    <TheRegisterFormSuccess v-else />
</template>
<script lang="ts" setup>
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRegisterForm } from '~/hooks';
import {sleep} from '~/helpers';

const {
    email,
    eError,
    isEmailTouched,
    name,
    nError,
    isNameTouched,
    password,
    pError,
    isPasswordTouched,
    conPassword,
    cPError,
    isConPasswordTouched,
    isSubmitting,
    submitForm,
    resetForm,
    validateStatus,
    disabledBtn
} = useRegisterForm();

const isSuccuses = ref(false);

async function onSubmit() {
    isSubmitting.value = true;
    try {
        await sleep(500);
        submitForm();

        if(Math.random() > 0.5) throw new Error('Не правильный пароль');

        resetForm();
        isSuccuses.value = true;
        
        await sleep(3000)
        isSuccuses.value = false;
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