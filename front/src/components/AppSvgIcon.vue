<template>
  <i v-if="icon" class="i icon" :class="`i-${icon}`" :style="`${color ? 'color:' + color : ''}`"  :width="widthCalc" :height="heightCalc"></i>
  <img
    v-else
    :src="svgURL"
    class="icon"
    loading="lazy"
    :width="widthCalc"
    :height="heightCalc"
    :alt="`${svg} svg icon`"
  />
</template>

<script lang="ts" setup>
interface IProps {
  icon?: string;
  svg?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
}
const props = defineProps<IProps>();
const svgURL = computed<string>(() => {
  return new URL(`../assets/svg/${props.svg}.svg`, import.meta.url).href;
});
const widthCalc = computed<number>(() => Number(props.width || props.height));
const heightCalc = computed<number>(() => Number(props.height || props.width));
</script>
<style lang="scss" scoped>
.icon {
  color: $iconColor;
}
</style>