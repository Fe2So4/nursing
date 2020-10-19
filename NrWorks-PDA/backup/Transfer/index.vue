<template>
  <div class="transfer">
   <van-nav-bar
      title="进手术室"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    >
      <!-- right-text="运送" -->
    </van-nav-bar>
    <div class="step">
      <div class="step-content">
        <div class="title">患者身份核查</div>
        <van-steps direction="vertical" :active="1" active-color="2E2E2E">
          <van-step>
            <h3>请扫描[患者腕带]</h3>
            <!-- <p>2016-07-12 12:40</p> -->
          </van-step>
          <van-step>
            <h3>请扫描[手术通知单]</h3>
            <p>通知单 8楼、808、17884557</p>
          </van-step>
          <van-step>
            <h3>请扫描[手术房间]</h3>
            <p>2016-07-10 09:30</p>
          </van-step>
        </van-steps>
        <div class="title">手术间房间核查</div>
        <van-steps direction="vertical" :active="1" active-color="2E2E2E">
          <van-step>
            <h3>请扫描[患者腕带]</h3>
            <!-- <p>2016-07-12 12:40</p> -->
          </van-step>
          <van-step>
            <h3>请扫描[手术房间]</h3>
            <p>2016-07-10 09:30</p>
          </van-step>
        </van-steps>
        <div class="options">
          <p class="option">扫完码之后请点击转运交接单按钮</p>
          <p class="option">
            <van-button round>转运交接单</van-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transfer',
  data () {
    return {

    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

    }
  }
}
</script>

<style lang="scss" scoped>
.transfer{
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
  .step{
    padding: 20px 15px;
    box-sizing: border-box;
    height: calc(100% - 100px);
    // background: #ffffff;
    .step-content{
      height: 100%;
      background: #ffffff;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      .options{
        position: absolute;
        bottom: 60px;
        left: 0;
        right: 0;
      }
      p{
        .van-button{
          line-height: 60px;
          height: 60px;
          background: #3377FF;
          width: 480px;
          font-size: 30px;
          color: #ffffff;
        }
        &.option{
          text-align: center;
          color: #7F7F7F;
          font-size: 26px;
          &:last-child{
            margin-top: 20px;
          }
        }
      }
      .title{
        color: #7e7e7e;
        font-size: 26px;
        text-indent: 10px;
        line-height: 2em;
      }
      .van-steps{
        .van-steps__items{
          .van-step{
            line-height: 40px;
            position: relative;
            /deep/ .van-step__title{
              text-indent: 10px;
              h3{
                font-size: 30px;
              }
              p{
                font-size: 26px;
              }
            }
          }
        }
        /deep/ .van-step__circle-container{
          width: 20px;
          top: 30px;
          // height: 20px;
          i{
            height: 20px;
            width: 20px;
            &::before{
              width: 100%;
              height: 100%;
            }
            &.van-icon{
              font-size: 20px;
            }
          }
        }
        /deep/ .van-step__line{
          top: 20px;
          background-color: #c9c9c9;
        }
        /deep/ .van-step__circle{
          background: #3377FF;
        }
        /deep/ .van-step__title--active{
          color: #2E2E2E;
        }
        /deep/ .van-step--finish .van-step__line{
          background-color: #3377FF;
        }
        /deep/ .van-step__icon--active, .van-step__title--active{
          color: #3377FF;
        }
      }
    }
  }
}
</style>
