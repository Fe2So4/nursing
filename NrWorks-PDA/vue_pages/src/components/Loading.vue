<template>
  <div class="loading">
    <van-loading type="spinner" color="#1989fa"/>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .loading{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: rgba(255,255,255,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    .van-loading{
      z-index: 999999;
    }
  }
</style>
