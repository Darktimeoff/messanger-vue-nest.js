<template>
    <div class="message__audio">
        <audio ref="audioElm" :src="audio" preload="metadata" />
        <div class="message__audio__progress"></div>
        <div class="message__audio__pause">
            <AppButton 
                class="message__audio__pause__btn"
                type="primary" 
                shape="circle"
                @click="playing = !playing"
            >
                <template #icon>
                    <PauseOutlined class="message__audio__pause__btn__icon" v-if="playing" />
                    <CaretRightOutlined class="message__audio__pause__btn__icon" v-else  />
                </template>
            </AppButton>
        </div>
        <div class="message__audio__wave">
            <AppSvgIcon class="message__audio__wave__svg" width="40" svg="waveform" />
        </div>
        <div class="message__audio__duration">{{audioTimeFormat}}</div>
    </div>
</template>

<script setup lang="ts">
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons-vue';
import { useMediaControls } from '@vueuse/core'
import { useTime } from '~/hooks';

interface IProps {
    audio: string;
}

const props = defineProps<IProps>()

const {convertMediaCurrentTime} = useTime()

const audioElm = ref<HTMLMediaElement>()
const progress = computed(() => (currentTime.value * 100 / duration.value) + '%')
const audioSrc = computed(() => props.audio);

const {playing, currentTime, duration, ended} = useMediaControls(audioElm, {
    src: audioSrc
})

const audioTimeFormat = computed(() => {
    return currentTime.value != 0? convertMediaCurrentTime(currentTime.value) :
    convertMediaCurrentTime(duration.value)
})

watch(ended, () => {
    currentTime.value = 0;
})
</script>

<style lang="scss" scoped>
audio {
    display: none;
}
.message__audio {
    display: grid;
    grid-template: "pause wave duration" / auto 1fr auto;
    gap: 0 30px;
    align-items: center;
}

.message__audio__progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #418fff;
    width: v-bind(progress);
    transition: width $animationDuration ease-in-out;
}
.message__audio__pause {
    grid-area: pause;
}
.message__audio__wave {
    grid-area: wave;
    z-index: 1;
    justify-self: center;
}
.message__audio__duration {
    grid-area: duration;
    justify-self: end;
    color: $white;
    font-weight: 500;
    opacity: $opDis;
    font-size: 12px;
}
.message__audio__pause__btn {
    min-width: auto;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #0f3997;
    border: none;
    fill: $white;
}
.message__audio__wave__svg {
    color: $white;
    width: 100%;
}

.message__audio__pause__btn__icon {
   font-size: 13px;
}
</style>