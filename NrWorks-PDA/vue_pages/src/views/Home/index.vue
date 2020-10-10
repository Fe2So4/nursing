<template>
  <div class="home">
    <van-nav-bar
      title="手术室移动工作平台"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="wap-nav" slot="left" size="34" color="#ffffff"/>
      <van-icon name="setting-o" slot="right" size="34" color="#ffffff"/>
    </van-nav-bar>
    <div class="list">
      <ul>
        <li>
          <div class="li-left">
            <van-image width="80" height="80" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div class="li-right">
            <p>成蕙祯</p>
            <p>手术室-复旦大学附属华山医院</p>
          </div>
        </li>
        <li v-for="item in 20" :key="item">
          <div class="li-left">
            <van-image width="80" height="80" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div class="li-right">
            <p>成蕙祯</p>
            <p>手术室-复旦大学附属华山医院</p>
          </div>
        </li>
      </ul>
    </div>
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
  .home{
    height: 100%;
    .van-nav-bar{
      height: 100px;
      background: linear-gradient(90deg, #666666, #303030);
      /deep/ .van-nav-bar__title{
        color:#ffffff;
        font-size: 34px;
        line-height: 100px;
      }
    }
    .list{
      height: calc(100% - 100px);
      overflow-y: auto;
      ul{
        padding:20px 15px 0;
        li{
          background: #FFFFFF;
          box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          height: 120px;
          margin-bottom:20px;
          display: flex;
          .li-left{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            .van-image{
              width: 80px;
              height: 80px;
              border-radius: 50%;
              overflow: hidden;
              img{
                border-radius: 50%;
                // width: 100%;
                // height: 100%;
              }
            }
          }
          .li-right{
            display: flex;
            flex-direction: column;
            justify-content: center;
            p{
              &:first-child{
                color:#2E2E2E;
                font-size: 30px;
              }
              &:last-child{
                color:#7F7F7F;
                margin-top: 20px;
                font-size: 26px;
              }
            }
          }
        }
      }
    }
  }
</style>
