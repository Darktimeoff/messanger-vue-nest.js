import { useField, useForm, useIsFieldDirty } from 'vee-validate';
import {string} from 'zod';
import { toFieldValidator } from '@vee-validate/zod';
import {computed, Ref} from 'vue';

function isConfirmPassword(password: Ref<string>) {
  return (v: string) => v === password.value; 
}

export function useRegisterForm() {
    interface IRegisterSchema {
        email: string;
        name: string;
        password: string;
        confirmPassword: string;
    }

    const {isSubmitting, resetForm, submitForm} = useForm<IRegisterSchema>();

    const {value: email, errorMessage: eError} = useField<IRegisterSchema['email']>(
        'email', 
        toFieldValidator(string().email('Введите коректный емайл').min(1, 'Заполните поле'))
    );

    const isEmailTouched = useIsFieldDirty('email');

    const {value: name, errorMessage: nError} = useField<IRegisterSchema['name']>(
        'name', 
        toFieldValidator(string().min(1, 'Заполните поле'))
    );

    const isNameTouched = useIsFieldDirty('name');


    const {value: password, errorMessage: pError} = useField<IRegisterSchema['password']>(
        'password',
        toFieldValidator(string().min(3, 'Пароль должен быть больше 3 символов'))
    )

    const isPasswordTouched = useIsFieldDirty('password');

    const {value: conPassword, errorMessage: cPError} = useField<IRegisterSchema['confirmPassword']>(
        'confirmPassword',
      toFieldValidator(string().min(3, 'Пароль должен быть больше 3 символов').refine(isConfirmPassword(password), 'Пароль не совпадает'))
    )

    const isConPasswordTouched = useIsFieldDirty('confirmPassword');

    const disabledBtn = computed(() => {
        return Boolean(!isEmailTouched.value || !isNameTouched.value 
            || !isPasswordTouched.value  || !isConPasswordTouched.value
            || isSubmitting.value || eError.value 
            || pError.value || cPError.value || nError.value
        )
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
        name,
        nError,
        isNameTouched,
        conPassword,
        cPError,
        disabledBtn,
        submitForm,
        validateStatus,
        resetForm,
        isConPasswordTouched
    }
}