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
        <van-cell title="手术部位与标识正确：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="手术知情同意书：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="麻醉知情同意书：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="麻醉设备安全检查完成：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="皮肤是否完整：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/>
          </template>
        </van-cell>
        <van-cell-group v-show="showFullSkin">
          <van-cell title="部位：" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="input" label="" placeholder="请输入部位：" label-align="right" input-align="right"/>
            </template>
          </van-cell>
          <van-cell title="程度：" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="input" label="" placeholder="请输入程度：" label-align="right" input-align="right"/>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell title="术野皮肤准备正确：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="静脉通道建立完成：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="患者是否有过敏史：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="抗菌药物皮试结果：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="术前备血：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="影像学资料：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="假体：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="体内植入物：" value="内容">
          <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template>
        </van-cell>
        <van-cell title="其它：" value="内容" title-class="left-title" value-class="right-value">
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
      showFullSkin: false,
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
