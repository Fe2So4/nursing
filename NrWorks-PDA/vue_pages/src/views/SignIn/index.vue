<template>
  <div class="sign-in">
    <van-nav-bar
      title="麻醉前实施核查"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
    >
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    onClickLeft () {

    },
    onClickRight () {

    }
  }
}
</script>

<style lang="scss" scoped>
  .sign-in{
    height: 100%;
    .van-nav-bar{
      height: 100px;
      background: linear-gradient(90deg, #666666, #303030);
      /deep/ .van-nav-bar__title{
        color:#ffffff;
        font-size: 34px;
        line-height: 100px;
      }
      /deep/ .van-nav-bar__text{
        color: #ffffff;
        font-size: 30px;
      }
      /deep/ .van-icon-arrow-left{
        color: #ffffff;
        font-size: 36px;
      }
    }
  }
</style>
