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
              :key="m.id"
              :avatar="m.user.avatar"
              :date="m.created_at"
              :user="m.user"
              :isMe="m.isMe"
              :isReaded="m.isRead"
            >
              <Messsage :text="m.text" />
            </MessageWrapper>
          </TransitionGroup>
        </div>
      </Transition>
    </div>
</template>

<script lang="ts" setup>
import { LoadingOutlined } from '@ant-design/icons-vue';
import { IMessage } from '~/types';

interface IProps {
  items: IMessage[] | undefined,
  isLoading?: boolean
}

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