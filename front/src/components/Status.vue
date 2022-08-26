<template>
    <div class="status" :class="{'status--online': online}">
        {{online  ? 'онлайн' : 'офлайн'}}
    </div>
</template>

<script setup lang="ts">
interface IProps {
    online?: boolean;
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.status {
    display: inline-block;
    position: relative;
    color: #bfbfbf;
    &::before {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -11px;
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        margin-right: 5px;
        background: #d3d3d3;
        border-radius: 50%;
    }
}
.status--online {
    &::before {
        background: $green;
    }
}
</style>