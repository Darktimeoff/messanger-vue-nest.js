<template>
    <div class="inlinesvg">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.inlinesvg {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 50%;
    transition: $animationDuration;
    cursor: pointer;
    &:deep(span[role="img"]) {
        opacity: $opDis;
    }
    &:active {
        background: $gray;
    }
    &:hover:deep(span[role="img"]) {
       opacity: 1;
    } 
}
</style>