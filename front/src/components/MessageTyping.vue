<template>
    <div class="message__typing">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
</template>

<style lang="scss" scoped>
.message__typing {
    z-index: 10;
}
.dot {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: $message-typing-circle;
    display: inline-block;
    margin: 0 0 0 8px;
    animation-name: typingAnimation;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 1s;

    &:first-child{
        margin: 0;
    } 
    &:nth-of-type(2) {
        animation-duration: 1.2s;
        animation-delay: -0.2s;
    }
    &:nth-of-type(3) {
        animation-duration: 1.4s;
        animation-delay: -0.4s;
    }
}


@keyframes typingAnimation{
  from {
    opacity: 0.4;
    transform: translateY(0)
  }

  50% {
    transform: translateY(15%)
  }

  to {
    opacity: 1;
     transform: translateY(0)
  }
}
</style>