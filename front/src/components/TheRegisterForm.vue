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
            :validateStatus="validateStatus(customError || cPError || '')"
            :extra="customError || cPError"
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
import { useAuth, useRegisterForm } from '~/hooks';
import {IRegisterRequest, ILoginResponseFailed} from '~/api/auth.api';
import { AxiosError } from 'axios';

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
    disabledBtn,
    customError
} = useRegisterForm();

const {
 AuthAPI,
 onLogin
} = useAuth();

const router = useRouter()

const isSuccuses = ref(false);
const data = computed<IRegisterRequest>(() => ({
    email: email.value,
    fullname: name.value,
    password: password.value
}))

async function onSubmit() {
    isSubmitting.value = true;
    try {
        const response = await AuthAPI.register(data.value);

        const respData = response.data;
        const {access_token, ...user} = respData;

        onLogin(user, access_token);

        submitForm();
        resetForm();

        router.push({name: "Home"})
    } catch(e) {
        if(e instanceof AxiosError<ILoginResponseFailed>) {
            const error = e as AxiosError<ILoginResponseFailed>;
            const messageData = error.response?.data.message || '';
            const message = typeof messageData === 'string' ? messageData : messageData[0];
         
            submitForm(message);
            
            customError.value = message;
            console.log('axios error', message)
        } else if(e instanceof Error) {
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