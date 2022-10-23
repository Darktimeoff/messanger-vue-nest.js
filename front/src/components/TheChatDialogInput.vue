<template>
    <div class="inputarea">
        <div class="inputarea-prefix">
            <AppInlineIcon @click="showEmojii = !showEmojii">
                <SmileOutlined class="inputarea__icon" />
            </AppInlineIcon>
        </div>
        <a-textarea 
            v-model:value="input" 
            class="inputarea__input" 
            placeholder="Введите текст сообщения"  
            :bordered="false" 
            auto-size 
            @focusin="showEmojii = false"
            @pressEnter="onSendClick"
        />
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
                    <SendOutlined  class="inputarea__icon" @click="onSendClick" />
                </AppInlineIcon>
            </transition>
        </div>
        <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
            <Picker
                v-if="showEmojii && emojiIndex"
                :style="{ position: 'absolute', bottom: '120%', left: '0px', zIndex: '1000' }"
                :data="emojiIndex"
                set="google"
                autoFocus
                @select="onSelectEmojii"
            />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { SmileOutlined, SendOutlined, InstagramOutlined, AudioOutlined, PaperClipOutlined } from '@ant-design/icons-vue';
//@ts-ignore
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import 'emoji-mart-vue-fast/css/emoji-mart.css';
import {EmojiSelect} from '~/types'

interface IEmit {
    (event: 'send', text: string): void
}

const emit = defineEmits<IEmit>()

const emojiIndex = ref<EmojiIndex>()

const isAudio = ref(true);
const input = ref('');
const showEmojii = ref(false)

const isEmpty = computed(() => {
    return !input.value.trim()
})

loadEmojiData();

function toggleAudio() {
    isAudio.value = !isAudio.value
}

function onSelectEmojii(event: EmojiSelect) {
    input.value += event.native;
}


async function loadEmojiData() {
    const data = (await import('emoji-mart-vue-fast/data/google.json')).default;
    emojiIndex.value = new EmojiIndex(data);
}

function onSendClick() {
    emit('send', input.value);
    clear()
}
function clear() {
    input.value = '';
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
    position: relative;
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