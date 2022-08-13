<template>
    <h1>Friends messanger</h1>
    <Message 
      avatar="https://avatars.githubusercontent.com/u/60776033?v=4"
      date="2022-08-13T13:08:04.600Z"
      :user="{fullname:'Yevhenii Korolikhin'}"
      isMe
      isReaded
    >
      <MesssageText text="Hello" />
    </Message>
    <Message 
      avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
      date="2022-08-13T13:26:00.084Z"
      :user="{fullname:'Ivan Borshov'}"
      :isMe="false"
      isReaded
    >
      <MesssageText text="Hi" />
    </Message>
</template>

<route lang="yaml">
name: Home
path: /im/
</route>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style>