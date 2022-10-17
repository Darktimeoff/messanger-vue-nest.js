import { useField, useForm, useIsFieldDirty, useIsFormValid, useIsFormDirty } from 'vee-validate';
import { toFieldValidator } from '@vee-validate/zod';
import {computed, Ref, ref, watch} from 'vue';
import { ILoginSchema } from '~/types/auth';
import { emailValidation, passwordValidation } from '~/helpers';

export function useLoginForm() {
    const {isSubmitting, resetForm, submitForm} = useForm<ILoginSchema>();
    const isFormValid = useIsFormValid()
    const isFormTouched = useIsFormDirty();

    const {value: email, errorMessage: eError} = useField<string>(
        'email', 
        toFieldValidator(emailValidation)
    );

    const isEmailTouched = useIsFieldDirty('email');

    const {value: password, errorMessage: pError} = useField<string>(
        'password',
        toFieldValidator(passwordValidation('Неверный пароль'))
    )

    const isPasswordTouched = useIsFieldDirty('password');

    const customError = ref<string>();

    const disabledBtn = computed(() => {
        return Boolean(!isFormTouched.value  || isSubmitting.value || !isFormValid.value)
    });

    const validateStatus = computed(() => (error: string | Ref<string>) => error ? "error" : 'success');

    watch([password, email], () => {
        if(customError.value) {
            customError.value = ''
        }
    })

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
        resetForm,
        customError
    }
}