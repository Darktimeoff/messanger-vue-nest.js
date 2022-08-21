<template>
    <div class="unreadcount">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.unreadcount {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $dialog-unread-count;
    color: $white;
    font-weight: bold;
    border-radius: 25px;
    min-height: 18px;
    min-width: 18px;
    padding: 1px;
    box-shadow: 0 0 3px $white;
}
</style>