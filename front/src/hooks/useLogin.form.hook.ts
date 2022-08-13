import { useField, useForm, useIsFieldDirty } from 'vee-validate';
import {string} from 'zod';
import { toFieldValidator } from '@vee-validate/zod';
import {computed, Ref} from 'vue';

export function useLoginForm() {
    interface ILoginSchema {
        email: string;
        password: string;
    }

    const {isSubmitting, resetForm, submitForm} = useForm<ILoginSchema>();

    const {value: email, errorMessage: eError} = useField(
        'email', 
        toFieldValidator(string().email('Введите коректный емайл').min(1, 'Заполните поле'))
    );

    const isEmailTouched = useIsFieldDirty('email');

    const {value: password, errorMessage: pError} = useField(
        'password',
        toFieldValidator(string().min(3, 'Пароль должен быть больше 3 символов').min(1, 'Заполните поле'))
    )

    const isPasswordTouched = useIsFieldDirty('password');

    const disabledBtn = computed(() => {
        return Boolean(!isEmailTouched.value || !isPasswordTouched.value  || isSubmitting.value || eError.value || pError.value)
    });

    const validateStatus = computed(() => (error: string | Ref<string>) => error ? "error" : 'success');

    return {
        email,
        eError,
        isEmailTouched,
        password,
        pError,
        isPasswordTouched,
        isSubmitting,
        disabledBtn,
        submitForm,
        validateStatus,
        resetForm
    }
}