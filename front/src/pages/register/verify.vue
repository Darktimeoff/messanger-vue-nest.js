<template>
    <AppInfoPage 
        :status="isHash ? status : 'success'"
        :title="isHash ? title : 'Готово!'"
        :description="isHash ? description : 'Ссылка с потверждением отправлена на E-Mail'"
    />
</template>

<script lang="ts" setup>
import { useQuery } from 'vue-query';
import { AuthAPI } from '~/api';


const route = useRoute();

const hash = computed(() => route.query?.hash as string);
const isHash = computedEager(() => Boolean(hash.value));

const {isLoading, isError} = useQuery(
    ['verify', hash], 
    () => AuthAPI.verifyHash(hash.value), {
        enabled: isHash,
        select: (verify) => verify.data,
        retry: 0
    }
);

const status = computed(() => {
    return isLoading.value ? undefined : isError.value ? "error" : 'success';
});

const title = computed(() => {
    return isLoading.value ? 'Верификация' : isError.value ? 'Ошибка!' : "Готово!";
});

const description = computed(() => {
    return isLoading.value ? 
        'Подождите идет процесс верификации' : 
        isError.value ? 
        'Ошибка при потверждение аккаунта' : 
        'Aккаунт успешно потвержден'
})
</script>

<route lang="yaml">
name: RegisterCheck
</route>