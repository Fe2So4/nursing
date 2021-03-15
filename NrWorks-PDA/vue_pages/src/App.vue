<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "@/styles/index.scss";
#app {
  @include background_color("bg_app");
  height: 100%;
  width: 100%;
  font-size: 26px;
}
.shouyeBtn {
  z-index: 6666;
  position: absolute;
  top: 30px;
  left: 70px;
  color: #1989fa;
}
</style>
