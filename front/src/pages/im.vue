<template>
    <h2>
      <router-link :to="{name: 'Home'}">Home</router-link>
    </h2>
    <Message 
      avatar="https://avatars.githubusercontent.com/u/60776033?v=4"
      date="2022-08-13T13:08:04.600Z"
      :user="{fullname:'Yevhenii Korolikhin'}"
      isMe
      isReaded
      :isHasAttachment="attachments.length > 0"
    >
      <MesssageText text="Hello"  :attachments="attachments" />
    </Message>
    <Message 
      avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
      date="2022-08-13T13:26:00.084Z"
      :user="{fullname:'Ivan Borshov'}"
      :isMe="false"
      isReaded
      :isHasAttachment="attachments.length > 0"
    >
      <MesssageText text="Hi" :attachments="attachments" />
    </Message>
    <Message 
      avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
      :user="{fullname:'Ivan Borshov'}"
      isTyping
    >
      <MesssageText :text="null" isTyping />
    </Message>
    <Message 
      avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
      date="2022-08-13T13:26:00.084Z"
      :user="{fullname:'Ivan Borshov'}"
      :isMe="false"
      isReaded
      :isHasAttachment="attachments.length > 0"
    >
      <MesssageText text="" :attachments="attachmentsLarge" />
    </Message>
</template>

<route lang="yaml">
name: Test
</route>

<script setup lang="ts">
const attachments = [
  {
    filename: "image.jpeg",
    url: `https://source.unsplash.com/100x100/?random=1`,
  }, {
    filename: "image.jpeg",
    url: `https://source.unsplash.com/100x100/?random=2`,
  }, 
  {
    filename: "image.jpeg",
    url: `https://source.unsplash.com/100x100/?random=3`,
  }]

const attachmentsLarge = [
  {
    filename: "image.jpeg",
    url: `https://source.unsplash.com/1600x1000/?random=4`,
  },
]
</script>

<style lang="scss" scoped>

</style>