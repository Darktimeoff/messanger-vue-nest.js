<template>
    <div class="infopage">
        <AppBlock>
            <a-result :status="status" :title="title" :sub-title="description">
                <template #extra>
                    <slot name="extra" />
                </template>
            </a-result>
        </AppBlock>
    </div>
</template>

<script lang="ts" setup>
import { ResultProps } from 'ant-design-vue';

interface IProps {
    title?: ResultProps['title'];
    description?: ResultProps['subTitle'];
    status?: ResultProps['status']
}

defineProps<IProps>()
</script>

<style lang="scss" scoped>
.infopage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}
</style>