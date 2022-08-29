<template>
    <div class="dialogs">
        <Transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
            <a-empty class="dialogs__empty" v-if="isEmpty" :image="Empty.PRESENTED_IMAGE_SIMPLE">
                <template #description>
                    Контакт не найден
                </template>
            </a-empty>
            <div v-else class="dialogs__list">
                <TransitionGroup enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
                    <DialogItem v-for="c in sortItems" :key="c.id" :item="c" @click="onSelectDialog(c)"/>
                </TransitionGroup>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { compareAsc } from 'date-fns';
import { IDialog } from '~/types';
import { Empty } from 'ant-design-vue';

interface IEmits {
    (event: 'selectDialog', dialog: IDialog): void
}

const emit = defineEmits<IEmits>()

interface IProps {
    items: IDialog[]
}

const props = defineProps<IProps>()

const sortItems = computed(() => [...props.items].sort((a, b) => {
    return compareAsc(new Date(b.lastMessage.created_at),new Date(a.lastMessage.created_at))
}));
const isEmpty = computed(() => !props.items.length);

function onSelectDialog(c: IDialog) {
    emit('selectDialog', c);
}
</script>

<style lang="scss" scoped>
.dialogs {
    display: flex;
    flex-direction: column;
    padding: px($chatPadding) 0;
    margin-left: px(-$chatPadding);
    margin-right: px(-$chatPadding);
    overflow-y: overlay;
}
.dialogs__empty {
    margin: px($chatPadding) 0;
}
</style>