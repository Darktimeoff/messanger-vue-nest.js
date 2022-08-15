<template>
    <img :src="url" :alt="alt" />
</template>

<script setup lang="ts">
interface IProps {
    url: string;
    alt: string;
}

defineProps<IProps>()
</script>

<style scoped>

</style>