<template>
    <div class="chat__dialog">
        <div class="chat__dialog-header">
            <div class="chat__dialog-header-center">
                <div class="chat__dialog-header-username">
                    Yevhenii Korolikhin
                </div>
                <Status class="chat__dialog-header-status" />
            </div>
            <div class="chat__dialog-header-end">
                <AppInlineIcon>
                    <EllipsisOutlined class="chat__dialog-header-icon" />
                </AppInlineIcon>
            </div>
        </div>
        <TheChatDialogMessages class="chat__dialogs-messages" />
        <TheChatDialogInput class="chat__dialogs-input" />
    </div>
</template>

<script setup lang="ts">
import { EllipsisOutlined } from '@ant-design/icons-vue';
</script>

<style lang="scss" scoped>
.chat__dialog {
    height: 100%;
}
.chat__dialog-header {
    width: 100%;
    display: grid;
    grid-area: header;
    grid-template-areas:
        ". center end"
    ;
    align-items: center;
    border-bottom: 1px solid $divider;
    padding: px($chatPadding - 8);
    height: px($chatDialogHeaderH);
}
.chat__dialog-header-center {
    grid-area: center;
    justify-self: center;
    text-align: center;
}
.chat__dialog-header-end {
    grid-area: end;
    justify-self: end;
}
.chat__dialog-header-icon {
    font-size: 22px;
}
.chat__dialog-header-username {
    line-height: normal;
    font-weight: 500;
}
.chat__dialogs-messages {
    grid-area: message;
}
.chat__dialogs-input {
    grid-area: input;
}

.chat__dialog {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: "header"
    "message"
    "input"
    ;
}
</style>