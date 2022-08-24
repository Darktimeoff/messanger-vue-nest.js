<template>
    <TheChatDialog />
    <!-- <MessageWrapper 
      :avatar="null"
      date="2022-08-13T13:08:04.600Z"
      :user="{id: '4cc80466d51c25f6d4ec8f9cd26c08ba', fullname:'Yevhenii Korolikhin'}"
      :isMe="false"
      isReaded
      :isHasAttachment="attachments.length > 0"
    >
      <Messsage text="Hello"  :attachments="attachments" />
    </MessageWrapper>
    <MessageWrapper 
      avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
      date="2022-08-13T13:26:00.084Z"
      :user="{fullname:'Ivan Borshov'}"
      :isMe="false"
      isReaded
      :isHasAttachment="attachments.length > 0"
    >
      <Messsage text="Hi" :attachments="attachments" />
    </MessageWrapper>
    <MessageWrapper 
      avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
      :user="{fullname:'Ivan Borshov'}"
      isTyping
    >
      <Messsage :text="null" isTyping />
    </MessageWrapper>
    <MessageWrapper 
      avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
      date="2022-08-13T13:26:00.084Z"
      :user="{fullname:'Ivan Borshov'}"
      :isMe="false"
      isReaded
      :isHasAttachment="attachments.length > 0"
    >
      <Messsage text="" :attachments="attachmentsLarge" />
    </MessageWrapper>

    <MessageWrapper 
      avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
      date="2022-08-13T13:26:00.084Z"
      :user="{fullname:'Ivan Borshov'}"
      :isMe="false"
      isReaded
      :isHasAttachment="false"
      :isAudio="true"
    >
      <Messsage text="" audio="https://s1.muzati.net/files/mp3/markul_-_strely_(feat._tosya_chaikina)_muzati.net_128.mp3" />
    </MessageWrapper> -->
    <!-- <TheDialogs :items="dialogsItem" /> -->
</template>

<route lang="yaml">
name: Test
meta: 
  layout: main
</route>

<script setup lang="ts">
// import type {IDialog} from '~/types';

// const attachments = [
//   {
//     filename: "image.jpeg",
//     url: `https://source.unsplash.com/100x100/?random=1`,
//   }, {
//     filename: "image.jpeg",
//     url: `https://source.unsplash.com/100x100/?random=2`,
//   }, 
//   {
//     filename: "image.jpeg",
//     url: `https://source.unsplash.com/100x100/?random=3`,
//   }]

// const attachmentsLarge = [
//   {
//     filename: "image.jpeg",
//     url: `https://source.unsplash.com/1600x1000/?random=4`,
//   },
// ]

// const dialogsItem: IDialog[] = [
//   { 
//     id: Math.random().toString(),
//     avatar: 'https://avatars.githubusercontent.com/u/60776033?v=4',
//     name: 'Yevhneii Korolikhin',
//     lastMessage: {
//       id: Math.random().toString(),
//       text: 'Мы все ожидали начала но не готовились концу',
//       isReaded: false,
//       created_at:"2021-08-13T13:26:00.084Z",
//       isMe: false,
//       user: {
//         id: Math.random().toString(),
//         fullname: 'Yevhneii Korolikhin',
//         avatar: 'https://avatars.githubusercontent.com/u/60776033?v=4',
//         isOnline: true,
//       },
//     },
//     isDialog: true,
//     unreadMessageCount: 3
//   },
//   { 
//     id: Math.random().toString(),
//     avatar: 'https://avatars.githubusercontent.com/u/1838656?v=4',
//     name: 'Ivan Borchov',
//     lastMessage: {
//       id: Math.random().toString(),
//       text: 'Мы все ожидали начала но не готовились концу',
//       isReaded: true,
//       created_at:"2022-08-13T13:26:00.084Z",
//       isMe: true,
//       user: {
//         id: Math.random().toString(),
//         fullname: 'Ivan Borchov',
//         avatar: 'https://avatars.githubusercontent.com/u/1838656?v=4',
//         isOnline: true,
//       },
//     },
//     isDialog: true,
//     unreadMessageCount: 0
//   }
// ]
</script>

<style lang="scss" scoped>

</style>