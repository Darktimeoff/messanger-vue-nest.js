<template>
    <Button 
        class="button" 
        :class="[props.class, {'button--large': props.size === 'large'}]"
        :type="props.type"
        :size="props.size"
        :htmlType="props.htmlType"
        :shape="props.shape"
    >
        <template #icon>
            <slot name="icon" />
        </template>
        <slot />
    </Button>
</template>


<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes.js';

interface IProps {
    class?: string;
    type?:  ButtonProps['type']
    size?: ButtonProps['size']
    htmlType?: ButtonProps['htmlType']
    shape?: ButtonProps['shape']
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>

.button--large {
    height: 56px;
}
</style>