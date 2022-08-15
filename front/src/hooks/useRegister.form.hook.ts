import { useField, useForm, useIsFieldDirty, useIsFormValid, useIsFormDirty } from 'vee-validate';
import { toFieldValidator } from '@vee-validate/zod';
import {computed, Ref} from 'vue';
import { IRegisterSchema } from '~/types/auth';
import { emailValidation, nameValidation, passwordValidation, isConfirmPassword } from '~/helpers';


export function useRegisterForm() {
    const {isSubmitting, resetForm, submitForm} = useForm<IRegisterSchema>();
    const isFormValid = useIsFormValid()
    const isFormTouched = useIsFormDirty();
    const passValid = passwordValidation("Пароль должен быть больше 8 символов")

    const {value: email, errorMessage: eError} = useField<IRegisterSchema['email']>(
        'email', 
        toFieldValidator(emailValidation)
    );

    const isEmailTouched = useIsFieldDirty('email');

    const {value: name, errorMessage: nError} = useField<IRegisterSchema['name']>(
        'name', 
        toFieldValidator(nameValidation)
    );

    const isNameTouched = useIsFieldDirty('name');


    const {value: password, errorMessage: pError} = useField<IRegisterSchema['password']>(
        'password',
        toFieldValidator(passValid)
    )

    const isPasswordTouched = useIsFieldDirty('password');

    const {value: conPassword, errorMessage: cPError} = useField<IRegisterSchema['confirmPassword']>(
        'confirmPassword',
      toFieldValidator(passValid.refine(isConfirmPassword(password), 'Пароль не совпадает'))
    )

    const isConPasswordTouched = useIsFieldDirty('confirmPassword');

    const disabledBtn = computed(() => {
        return Boolean(!isFormTouched.value || isSubmitting.value || !isFormValid.value)
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