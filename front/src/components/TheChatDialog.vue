<template>
    <div class="chat__dialog">
        <div class="chat__dialog-header">
            <div class="chat__dialog-header-center">
                <div class="chat__dialog-header-username">
                    Yevhenii Korolikhin
                </div>
                <div class="chat__dialog-header-status">
                    <div class="status status--online">онлайн</div>
                </div>
            </div>
            <div class="chat__dialog-header-end">
                <EllipsisOutlined />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EllipsisOutlined } from '@ant-design/icons-vue';


</script>

<style lang="scss" scoped>
.chat__dialog {
    padding-top: 10px;
}
.chat__dialog-header {
    width: 100%;
    display: grid;
    grid-template-areas:
        ". center end"
    ;
    align-items: center;
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
</style>