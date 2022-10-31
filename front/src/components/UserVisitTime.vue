<template>
    <div class="uservisit" :class="{'active': isOnline}">
        {{isOnline ? 'В сети' : getDialogTime(last_seen)}}
    </div>
</template>

<script lang="ts" setup>
import { useTime } from '~/hooks';

interface IProps {
    isOnline: boolean;
    last_seen: string;
}

defineProps<IProps>();

const {getDialogTime} = useTime()
</script>

<style lang="scss" scoped>
.uservisit {
    font-size: 14px;
    color: $gray2;
}
.active {
    color: $green;
}
</style>