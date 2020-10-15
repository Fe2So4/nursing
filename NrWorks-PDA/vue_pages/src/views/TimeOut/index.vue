<template>
  <div class="time-out">
    <van-nav-bar
      title="手术开始前核查"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
    >
    </van-nav-bar>
    <div class="patient-card">
      <div class="content">
          <div class="left">
            <span>808</span>
          </div>
          <div class="right">
            <p>魏鑫 12床 91166492</p>
            <p>主刀 陈疾仵 麻醉 王海莲</p>
            <p>巡回 —— 洗手 余琼</p>
          </div>
      </div>
    </div>
    <div class="list">
      <van-cell-group>
        <van-cell title="患者姓名、住院号、性别、年龄正确：" value="内容" value-class="first-cell">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="手术方式确认" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="手术部位、标识、体位正确：" value="内容" title-class="first-cell">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="是否需要相关影像资料：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="其它：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="请输入其它：" />
          </template>
        </van-cell>
        <van-cell style="background:#E8E8E8;">
          <template #title>
            手术、麻醉风险预警
            <van-icon name="warn-o"></van-icon>
          </template>
        </van-cell>
        <van-cell title="手术医师陈述："></van-cell>
        <van-cell title="预计手术时间：">
           <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="预计失血量：">
           <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="手术关注点：">
           <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="其它：" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="input" label="" placeholder="请输入其它：" />
          </template>
        </van-cell>
        <van-cell title="麻醉医师陈述：">
           <!-- <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template> -->
        </van-cell>
        <van-cell title="麻醉关注点：">
           <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="其它：" title-class="left-title" value-class="right-value">
           <template #right-icon>
            <van-field v-model="input" label="" placeholder="请输入其它：" />
          </template>
        </van-cell>
        <van-cell title="手术护士陈述：">
        </van-cell>
        <van-cell title="物品灭菌合格：">
           <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="仪器设备、植入物：">
           <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="术前术中特殊用药情况：">
           <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="其它：" title-class="left-title" value-class="right-value">
           <template #right-icon>
            <van-field v-model="input" label="" placeholder="请输入其它：" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="核查时间" value="2020-10-12 09:48"></van-cell>
        <van-cell title="麻醉医师签名" title-class="sign-title" @click="handleShowSignature"></van-cell>
        <van-cell title="手术医师签名" title-class="sign-title" @click="handleShowSignature"></van-cell>
        <van-cell title="手术护士签名" title-class="sign-title" @click="handleShowSignature"></van-cell>
      </van-cell-group>
    </div>
    <transition name="van-slide-up">
      <signature :visible="visible" v-if="visible" @handleClose="handleCloseSignature"/>
    </transition>
  </div>
</template>

<script>
import Signature from '../Signature/index'
export default {
  data () {
    return {
      checked: true,
      input: '',
      visible: false
    }
  },
  components: {
    Signature
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

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
  .time-out{
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
        display: flex;
        height: 194px;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .left{
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            width: 140px;
            height: 80px;
            background: #3478FF;
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
            border-radius: 0px 40px 40px 0px;
            line-height: 80px;
            text-align: center;
            font-size: 42px;
            font-weight: bold;
            color: #ffffff;
          }
        }
        .right{
          flex: 1;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p{
            font-size: 26px;
            color: #7F7F7F;
            &:nth-child(1){
              font-size: 30px;
              color: #2E2E2E;
            }
            &:nth-child(2){
              margin:30px 0;
            }
          }
        }
      }
    }
    .list{
      height:calc(100% - 324px);
      overflow-y: auto;
    }
    .van-cell{
      line-height: 94px;
      color: #2E2E2E;
      font-size: 30px;
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
      .van-dropdown-menu{
        height: 100%;
        .van-dropdown-menu__bar{
          height: 100%;
          box-shadow: unset;
        }
        /deep/ .van-dropdown-menu__item{
          justify-content: flex-end;
        }
        /deep/ .van-dropdown-menu__title{
          font-size: 30px;
          line-height: unset;
          padding-right: 30px;
          &::after{
            border-color: transparent transparent  #808080 #808080;
            border-width: 6px;
            // margin-top: -6px;
            right: 5px;
          }
        }
        /deep/ .van-dropdown-item__option{
          font-size: 30px;
          line-height: 60px;
        }
      }
      .van-icon{
        vertical-align: middle;
        color: #FF4B4B;
      }
    }
    .van-cell-group{
      &:last-child{
        margin-top: 15px;
        margin-bottom: 15px;
        .van-cell{
          .van-cell__value{
            color: #7F7F7F;
          }
          .sign-title{
            color: #32db64;
          }
        }
      }
    }
  }
</style>
