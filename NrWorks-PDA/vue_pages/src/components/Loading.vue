<template>
  <div class="loading">
    <van-loading type="spinner" />
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
    position: fixed;
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
      height: 40px;
      width: 40px;
      .van-loading__spinner{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
