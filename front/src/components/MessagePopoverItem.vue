<template>
    <div class="popoveritem">
        <div class="popoveritem__icon">
            <slot name="icon" />
        </div>
        <div class="popoveritem__text">
            <slot />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.popoveritem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0 10px;
    font-size: 16px;
    transition: $animationDuration;;
    padding: 10px 16px;
    &:active {
        background: $gray;
    }
}
</style>