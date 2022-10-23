<template>
    <div class="dialogs">
        <Transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
            <a-spin class="dialogs__loading" v-if="isLoading" :indicator="indicator" />
            <a-empty v-else-if="isEmpty" class="dialogs__empty" :image="Empty.PRESENTED_IMAGE_SIMPLE">
                <template #description>
                    Контакт не найден
                </template>
            </a-empty>
            <div v-else class="dialogs__list">
                <TransitionGroup enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
                    <DialogItem 
                        v-for="c in sortItems" 
                        :key="c._id" 
                        :item="c" 
                        :isActive="c._id === currentDialogId"
                        @click="onSelectDialog(c)"
                    />
                </TransitionGroup>
            </div>
        </Transition>
    </div>
</template>


<script lang="ts" setup>
import { compareAsc } from 'date-fns';
import { IDialog } from '~/types';
import { Empty } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

interface IEmits {
    (event: 'selectDialog', dialog: IDialog): void
}

const emit = defineEmits<IEmits>()

interface IProps {
    items: IDialog[];
    isLoading?: boolean;
    currentDialogId: string | undefined;
}

const props = defineProps<IProps>()

const router = useRouter()

const currentDialogId = useVModel(props, 'currentDialogId');

const sortItems = computed(() => [...props.items].sort((a, b) => {
    return compareAsc(new Date(b.lastMessage.createdAt),new Date(a.lastMessage.createdAt))
}));
const isEmpty = computed(() => !props.items.length);
const indicator = h(LoadingOutlined, { spin: true})

function onSelectDialog(c: IDialog) {
    currentDialogId.value = c._id;
    router.push({
        name: 'Dialog',
        params: {
            id: currentDialogId.value
        }
    });
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

.dialogs__loading:deep([role="img"]) {
    font-size: 34px;
}
</style>