<template>
    <div class="message__content">
        <div class="message__bubble">
            <p class="message__text">{{text}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface IProps {
    text: string;
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>

.message__content {
    text-align: left;
}
.message__bubble {
    background: $blue;
    box-shadow: 0px 5px 5px rgba(54, 116, 255, 0.196733);
    border-radius: 12px 12px 12px 0;
    padding: 15px;
    margin-bottom: 10px;
    width: fit-content;
}

.message__text {
    color: $white;
    font-size: 14px;
    word-break: break-all;
    line-height: 20px;
}

.message--isme {
    .message__bubble {
        background: $white;
        border: 1px solid $gray1;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.0220444);
        border-radius: 12px 12px 0 12px;
    }

    .message__text {
        color: $black;
    }
}
</style>