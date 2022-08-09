<template>
    <section class="auth">
        <div class="auth__content">
            <div class="auth__top">
                <h2>{{$route.meta.title}}</h2>
                <p>{{$route.meta.description}}</p>
            </div>
            <AppBlock class="auth__block">
                <router-view />
            </AppBlock>
        </div>
  </section>
</template>

<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.auth__block {
    min-height: 320px;
    width: 430px;
}
.auth__top {
  text-align: center;
  margin-bottom: px(50);
  h2 {
    font-size: px(28);
    color: $black;
    margin-bottom: px(5);
  }
  p {
    font-size: px(18);
    color: $black;
    line-height: px(21);
    letter-spacing: px(0.1);
    opacity: $opDis;
  }
}
</style>