<template>
    <div class="messages">
        <MessageWrapper 
            :avatar="null"
            date="2022-08-13T13:08:04.600Z"
            :user="{id: '4cc80466d51c25f6d4ec8f9cd26c08ba', fullname:'Yevhenii Korolikhin'}"
            :isMe="true"
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
        </MessageWrapper>
    </div>
</template>

<script lang="ts" setup>
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
.messages  {
    padding: 0 px($chatPadding);
    overflow-x: hidden;
    overflow-y: overlay;
}
</style>