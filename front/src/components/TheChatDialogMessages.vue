<template>
    <div class="messages">
      <Transition mode="out-in" enterActiveClass="fadeIn" leaveActiveClass="fadeOut">
        <AEmpty v-if="isEmpty">
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
import { IMessage } from '~/types';

interface IProps {
  items: IMessage[] | undefined
}

const props = defineProps<IProps>();

const isEmpty = computed(() => !props.items?.length)
</script>

<style lang="scss" scoped>
.messages  {
    padding: 0 px($chatPadding);
    overflow-x: hidden;
    overflow-y: overlay;
}
</style>