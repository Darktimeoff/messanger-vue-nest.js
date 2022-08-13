<template>
    <h1>
      <Message 
        avatar="https://avatars.githubusercontent.com/u/60776033?v=4"
        text="Hello"
        date="2022-08-13T13:08:04.600Z"
        :user="{fullname:'Yevhenii Korolikhin'}"
        isMe
        isReaded
      />
      <Message 
        avatar="https://avatars.githubusercontent.com/u/1838656?v=4"
        text="Hi"
        date="2022-08-13T13:26:00.084Z"
        :user="{fullname:'Ivan Borshov'}"
        :isMe="false"
        isReaded
      />
    </h1>
</template>

<route lang="yaml">
name: Home
path: /im/
</route>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style>