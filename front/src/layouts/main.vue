<template>
    <a-layout class="container chat">
        <a-layout-sider class="chat__sidebar-wrapper">
            <TheSidebar />
        </a-layout-sider>
        <a-layout class="chat__content">
           <router-view />
        </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.chat {
    height: 100%;
    background: $white;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.04204);
}
.chat__sidebar-wrapper {
    background: none;
    width: 300px;
    padding: 10px;
}
.chat__content {
    background: $white;
}
</style>