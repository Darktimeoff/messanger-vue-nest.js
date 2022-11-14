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
            @pressEnter.prevent="onSendClick"
        />
        <div class="inputarea-prefix">
            <AppFileUpload  v-model:fileList="fileList" accept="image/*" :multiple="true" :disabled="disabled">
                <AppInlineIcon>
                    <PaperClipOutlined class="inputarea__icon" />
                </AppInlineIcon>
            </AppFileUpload>
            <transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
                <transition v-if="isEmpty" mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
                    <AppInlineIcon v-if="!isAudio" :disabled="disabled" @click="toggleAudio">
                        <InstagramOutlined class="inputarea__icon" />
                    </AppInlineIcon>
                    <AppInlineIcon v-else :disabled="disabled"  @click="toggleAudio">
                        <AudioOutlined  class="inputarea__icon" />
                    </AppInlineIcon>
                </transition>
                <AppInlineIcon :disabled="disabled" v-else>
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
        <AppFilesUploadPreview 
            class="inputarea-files" 
            v-model:fileList="fileList" 
        />
    </div>
</template>

<script setup lang="ts">
import { SmileOutlined, SendOutlined, InstagramOutlined, AudioOutlined, PaperClipOutlined } from '@ant-design/icons-vue';
//@ts-ignore
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import 'emoji-mart-vue-fast/css/emoji-mart.css';
import {EmojiSelect, IUploadFile} from '~/types'
import { KeyboardEventHandler } from 'ant-design-vue/lib/_util/EventInterface';

interface IEmit {
    (event: 'send', text: string): void
}

interface IProps {
    value: string;
    fileList: IUploadFile[]
    disabled?: boolean;
}

const emit = defineEmits<IEmit>();
const props = defineProps<IProps>();

const emojiIndex = ref<EmojiIndex>()


const fileList = useVModel(props, 'fileList');

const isAudio = ref(true);
const input = useVModel(props, 'value');
const showEmojii = ref(false)

const isEmpty = computed(() => {
    return !input.value.trim() && !fileList.value.length && !props.disabled
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

function onSendClick(e: KeyboardEventHandler) {
    console.log('send emit');
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

.inputarea-files {
    position: absolute;
    bottom: 100%;
}
</style>