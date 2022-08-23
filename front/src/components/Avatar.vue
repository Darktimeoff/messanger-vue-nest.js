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
    <div v-else class="avatar avatar--empty">
        {{username?.slice(0, 1).toUpperCase()}}
    </div>
</template>

<script setup lang="ts">
import { generateGradientFromStr } from '~/helpers';

interface IProps {
    avatar: string | null;
    hash?: string  | null;
    username?: string | null;
    alt?: string;
    isRound?: boolean;
    width?: number;
    height?: number
}

const props = defineProps<IProps>()

const avatartGradient = computed(() => {
    if(!props.avatar && props.hash) {
        const {color, lightenColor} = generateGradientFromStr(props.hash);
    
        return `linear-gradient(135deg, #${color} 0%, #${lightenColor} 96.52%)`
    }
});
</script>

<style lang="scss" scoped>
.avatar--empty {
    display: flex;
    align-items: center;
    justify-content: center;
    background: v-bind(avatartGradient);
    color: $white;
    font-weight: bold;
}
</style>