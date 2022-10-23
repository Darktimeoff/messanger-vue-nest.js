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
            >
              <Messsage :text="m.data.text" :audio="m.data.audio" />
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
  isLoading?: boolean
}

const {isMe, getMessageAuthorInfo} = useDialogs();
const messagesList = ref<IMessage[]>([])
const {list, wrapperProps, containerProps} = useVirtualList(messagesList, {itemHeight: 60})

const props = defineProps<IProps>();

const messagesElm = ref<HTMLDivElement>()
const isEmpty = computed(() => !props.items?.length);

const indicator = h(LoadingOutlined, { spin: true});

watch(() => props.items, (v) => {
  if(v) messagesList.value  = v;
});

onMounted(() => {
  if(props.items) messagesList.value = props.items
})
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