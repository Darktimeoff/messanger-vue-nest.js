<template>
    <div class="messages" ref="messagesElm" v-bind="containerProps">
      <Transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
        <a-spin v-if="isLoading" class="messages__loading" :indicator="indicator" tip="Загрузка сообщений..." />

        <AEmpty v-else-if="isEmpty">
          <template #description>
            Нету сообщений
          </template>
        </AEmpty>
        <div v-else v-bind="wrapperProps" class="messages__list">
            <MessageWrapper 
              v-for="m in list"
              :key="m.index"
              :data-index="m.index"
              :id="m.data._id"
              :avatar="(getMessageAuthorInfo(m.data.author as any) as IUser)?.avatar || null"
              :date="m.data.createdAt"
              :user="(getMessageAuthorInfo(m.data.author as any) as IUser)"
              :isMe="isMe(m.data.author as any)"
              :isHasAttachment="m.data.attachments?.length > 0"
              :isAudio="Boolean(m.data.audio)"
              :isReaded="m.data.isRead"
              :isDeleted="m.data.isDeleted"
              :isEdited="Boolean(m.data.textEdited)"
              :deletedAt="m.data.deletedAt"
              :updatedAt="m.data.updatedAt"
            >
              <MessagePopover 
                trigger="click"
                placement="top"
                @delete="emit('delete', m.data)"
                @edit="emit('edit', m.data)"
                @copy="emit('edit', m.data)"
              >
                <Messsage 
                  :attachments="m.data.attachments"
                  :text="getMessageText(m.data)" 
                  :audio="m.data.audio"
                  :isDeleted="m.data.isDeleted"
                />
              </MessagePopover>
            </MessageWrapper>
        </div>
      </Transition>
    </div>
</template>

<script lang="ts" setup>
import { LoadingOutlined } from '@ant-design/icons-vue';
import { useDialogs } from '~/hooks';
import { IMessage, IUser } from '~/types';

interface IProps {
  items: IMessage[] | undefined,
  isLoading?: boolean;
  indexView?: number;
}
interface IEmit {
  (event: 'delete', message: IMessage): void;
  (event: 'edit', message: IMessage): void;
  (event: 'copy', message: IMessage): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmit>()

const {isMe, getMessageAuthorInfo, getMessageText} = useDialogs();
const messagesList = ref<IMessage[]>([])
const {list, wrapperProps, containerProps, scrollTo} = useVirtualList(messagesList, {itemHeight: 80});
const indexView = useVModel(props, 'indexView');

const messagesElm = ref<HTMLDivElement>()
const isEmpty = computed(() => !props.items?.length || messagesList.value.every(m => typeof m !== 'object'));

const indicator = h(LoadingOutlined, { spin: true});

watch(() => props.items, (v) => {
  if(v) messagesList.value  = v;
});

watch(indexView, scrollToIndexView);

onMounted(() => {
  if(props.items) messagesList.value = props.items;
  if(props.items) setTimeout(scrollToIndexView, 500)
})

function scrollToIndexView() {
  console.log('scrollToIndexView', indexView.value)
  if(typeof indexView.value === 'number') scrollTo(indexView.value);
}
</script>

<style lang="scss" scoped>
.messages  {
    padding: 0 px($chatPadding);
    overflow-x: hidden;
    overflow-y: overlay;
}

.messages__loading {
  display: block;
  &:deep([role="img"]) {
    font-size: 34px;
  }
}
</style>