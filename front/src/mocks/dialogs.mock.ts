import type {IDialog} from '~/types';

export const dialogsItem: IDialog[] = [
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