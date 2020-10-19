<template>
  <div class="transfer-handover">
    <van-nav-bar
      title="手术室接送患者"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="提交"
    >
    </van-nav-bar>
    <div class="patient-card">
      <div class="content">
        <span>魏鑫</span>
        <span>12病区</span>
        <span>运动医学</span>
        <span>91166492</span>
      </div>
    </div>
    <div class="list">
      <van-cell-group>
        <van-cell title="接患者" class="cell-title">
        </van-cell>
        <van-cell title="病房交接" @click="handleJump(0,'病房交接')">
          <template #right-icon>
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
        <van-cell title="进手术室" @click="handleJump(1,'进手术室')">
          <template #right-icon>
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
        <van-cell title="送患者" class="cell-title">
        </van-cell>
        <van-cell title="出手术室" value="[转运交接单]" @click="handleJump(1,'出手术室')">
        </van-cell>
        <van-cell title="进PACU" value="[转运交接单]" @click="handleJump(1,'进PACU')">
        </van-cell>
        <van-cell title="出PACU" value="[转运交接单]" @click="handleJump(1,'出PACU')">
        </van-cell>
        <van-cell title="病房收治" value="[转运交接单]" @click="handleJump(1,'病房收治')">
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransferHandover',
  data () {
    return {
      checked: true,
      input: '',
      showFullSkin: false,
      visible: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

    },
    handleJump (type, title) {
      this.$router.push({path: '/handover-record', query: {type, title}})
    },
    handleChange () {
      this.showFullSkin = !this.showFullSkin
    },
    handleShowSignature () {
      this.visible = true
    },
    handleCloseSignature () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .transfer-handover{
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
    .patient-card{
      padding: 15px 20px;
      .content{
        background: #ffffff;
        height: 90px;
        line-height: 90px;
        background: #FFFFFF;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        color: #2E2E2E;
        font-size: 30px;
        span{
          margin-left: 24px;
        }
      }
      }
    .list{
      height:calc(100% - 220px);
      background: #FFFFFF;
      // overflow-y: auto;
    }
    .van-cell{
      line-height: 90px;
      color: #2E2E2E;
      font-size: 30px;
      padding-top:unset;
      padding-bottom:unset;
      &::after{
        border-color: #E2E2E2;
      }
      .first-cell{
        flex: unset;
      }
      .left-title{
        flex: unset;
      }
      .right-value{
        .van-field{
          padding-top: 0;
          padding-bottom: 0;
        }
      }
      &.cell-title{
        background: #E8E8E8;
        line-height: 80px;
      }
      .van-cell__value{
        span{
          color: #FF4343;
        }
      }
    }
    .van-cell-group{
      background: #FFFFFF;
      // &:last-child{
      //   // margin-top: 15px;
      //   margin-bottom: 15px;
      //   .van-cell{
      //     .van-cell__value{
      //       color: #7F7F7F;
      //     }
      //     .sign-title{
      //       color: #32db64;
      //     }
      //   }
      // }
    }
  }
</style>
