<template>
    <div class="inputarea">
        <div class="inputarea-prefix">
            <AppInlineIcon>
                <SmileOutlined class="inputarea__icon" />
            </AppInlineIcon>
        </div>
        <a-textarea v-model:value="input" class="inputarea__input" placeholder="Введите текст сообщения"  :bordered="false" auto-size  />
        <div class="inputarea-prefix">
            <AppFileUpload accept="image/*" multiple>
                <AppInlineIcon>
                    <PaperClipOutlined class="inputarea__icon" />
                </AppInlineIcon>
            </AppFileUpload>
            <transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
                <transition v-if="isEmpty" mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
                    <AppInlineIcon v-if="!isAudio" @click="toggleAudio">
                        <InstagramOutlined class="inputarea__icon" />
                    </AppInlineIcon>
                    <AppInlineIcon v-else @click="toggleAudio">
                        <AudioOutlined  class="inputarea__icon" />
                    </AppInlineIcon>
                </transition>
                <AppInlineIcon v-else>
                    <SendOutlined  class="inputarea__icon" />
                </AppInlineIcon>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SmileOutlined, SendOutlined, InstagramOutlined, AudioOutlined, PaperClipOutlined } from '@ant-design/icons-vue';
const isAudio = ref(true);
const input = ref('');

const isEmpty = computed(() => {
    return !input.value.trim()
})

function toggleAudio() {
    isAudio.value = !isAudio.value
}
</script>

<style lang="scss" scoped>
.inputarea {
    margin: 0 px($chatPadding);
    margin-bottom: px($chatPadding);
    padding: px($chatPadding / 2);
    border: 2px solid $divider;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: flex-end;
    padding-top: 0;
    height: fit-content;
    align-self: end;
}
.inputarea-prefix-wrapper, .inputarea-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
}
.inputarea__input {
    padding-top: 12px;
    overflow: hidden;
    padding-bottom: 0;
}
</style>