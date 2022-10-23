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
              :avatar="m.author.avatar"
              :date="m.createdAt"
              :user="m.author"
              :isMe="isMe(m.author._id)"
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
import { IMessage1 } from '~/types';

interface IProps {
  items: IMessage1[] | undefined,
  isLoading?: boolean
}

const {isMe} = useDialogs()

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