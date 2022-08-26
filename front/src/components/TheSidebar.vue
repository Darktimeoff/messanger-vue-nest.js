<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <TeamOutlined class="sidebar__header__icon" />
      <span class="sidebar__header__title">Список диалогов</span>
      <AppInlineIcon>
        <FormOutlined class="sidebar__header__icon" />
      </AppInlineIcon>
    </div>

    <TheSidebarSearch />
    <TheDialogs :items="dialogsItem" />
  </div>
</template>

<script setup lang="ts">
import { TeamOutlined, FormOutlined } from '@ant-design/icons-vue';
import type {IDialog} from '~/types';

const dialogsItem: IDialog[] = [
  { 
    id: Math.random().toString(),
    avatar: null,
    name: 'Yevhneii Korolikhin',
    lastMessage: {
      id: Math.random().toString(),
      text: 'Мы все ожидали начала но не готовились концу',
      isReaded: false,
      created_at:"2021-08-13T13:26:00.084Z",
      isMe: false,
      user: {
        id: Math.random().toString(),
        fullname: 'Yevhneii Korolikhin',
        avatar: 'https://avatars.githubusercontent.com/u/60776033?v=4',
        isOnline: true,
      },
    },
    isDialog: true,
    unreadMessageCount: 3
  },
  { 
    id: Math.random().toString(),
    avatar: 'https://avatars.githubusercontent.com/u/1838656?v=4',
    name: 'Ivan Borchov',
    lastMessage: {
      id: Math.random().toString(),
      text: 'Мы все ожидали начала но не готовились концу',
      isReaded: true,
      created_at:"2022-08-13T13:26:00.084Z",
      isMe: true,
      user: {
        id: Math.random().toString(),
        fullname: 'Ivan Borchov',
        avatar: 'https://avatars.githubusercontent.com/u/1838656?v=4',
        isOnline: true,
      },
    },
    isDialog: true,
    unreadMessageCount: 0
  }
]
</script>

<style lang="scss" scoped>
.sidebar {
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: 100%;
}
.sidebar__header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0 5px;
  border-bottom: 1px solid $divider;
  margin-bottom: px($chatPadding);
  margin-left: px(-20);
  margin-right: px(-20);
  padding: 0 px($chatPadding);
  padding-bottom: px($chatPadding);
}
.sidebar__header__icon{
    font-size: 12px;
}
</style>