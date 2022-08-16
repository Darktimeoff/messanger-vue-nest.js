<template>
    <img class="img" :src="url" :alt="alt" :class="{'round': isRound}" />
</template>

<script setup lang="ts">
interface IProps {
    url: string;
    alt: string;
    isRound?: boolean;
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.img.round {
    border-radius: 50%;
}
</style>