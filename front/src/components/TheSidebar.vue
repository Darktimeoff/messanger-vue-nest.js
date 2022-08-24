<template>
    <div class="sidebar">
        <div class="sidebar__header">
            <TeamOutlined class="sidebar__header__icon" />
            <span class="sidebar__header__title">Список диалогов</span>
            <FormOutlined class="sidebar__header__icon" />
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
.sidebar__header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0 5px;
}
.sidebar__header__icon{
    font-size: 12px;
}
</style>