<template>
    <AppImage 
        v-if="avatar"
        class="avatar" 
        :url="avatar" 
        :width="width"
        :height="height"
        :alt="(alt as string)" 
        :isRound="Boolean(isRound)"
    />
</template>

<script setup lang="ts">
interface IProps {
    avatar: string | null;
    alt?: string;
    isRound?: boolean;
    width?: number;
    height?: number
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>

</style>