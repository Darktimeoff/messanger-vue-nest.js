<template>
    <div class="messages">
      <Transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
        <a-spin v-if="isLoading" class="messages__loading" :indicator="indicator" tip="Загрузка сообщений..." />

        <AEmpty v-else-if="isEmpty">
          <template #description>
            Нету сообщений
          </template>
        </AEmpty>
        <div v-else class="messages__list">
          <TransitionGroup  enterActiveClass="messageAppear">
            <MessageWrapper 
              v-for="m in items"
              :key="m._id"
              :avatar="(getMessageAuthorInfo(m.author as any) as IUser).avatar || null"
              :date="m.createdAt"
              :user="(getMessageAuthorInfo(m.author as any) as IUser)"
              :isMe="isMe(m.author as any)"
              :isHasAttachment="m.attachments.length > 0"
              :isAudio="Boolean(m.audio)"
              :isReaded="m.isRead"
            >
              <Messsage :text="m.text" :audio="m.audio" />
            </MessageWrapper>
          </TransitionGroup>
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

const {isMe, getMessageAuthorInfo} = useDialogs()

const props = defineProps<IProps>();

const isEmpty = computed(() => !props.items?.length);

const indicator = h(LoadingOutlined, { spin: true})
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