<template>
  <div class="patient-home">
    <van-nav-bar
      title="手术患者全貌"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    >
      <!-- right-text="大屏同步" -->
    </van-nav-bar>
    <PatiendCard/>
    <div class="operation-content">
      <div class="operation-info">
          <p>
            <span>
              <span class="label">手术室</span>
              <span class="value">{{patientInfo.roomNo}}室</span>
            </span>
            <span>
              <span class="label">台次</span>
              <span class="value">第{{patientInfo.sequenceNo}}台</span>
            </span>
          </p>
          <p>
            <span class="label">诊断</span>
            <span class="value">{{patientInfo.diagnose}}</span>
          </p>
          <p>
            <span class="label">麻醉方式</span>
            <span class="value">{{patientInfo.anesMethod}}</span>
          </p>
        </div>
    </div>
    <div class="list">
      <h3>安全核查</h3>
      <div class="options">
        <van-button @click="handleJump(1)">SIGN IN</van-button>
        <van-button @click="handleJump(2)">TIME OUT</van-button>
        <van-button @click="handleJump(3)">SIGN OUT</van-button>
      </div>
      <h3>护理记录单</h3>
      <div class="options">
        <van-button @click="handleJump(4)">转运交接</van-button>
        <van-button @click="handleJump(5)">记录单二</van-button>
        <van-button @click="handleJump(6)">记录单三</van-button>
      </div>
    </div>
    <!-- <transition name="van-slide-up">
      <signature :visible="visible" v-if="visible" @handleClose="handleCloseSignature"/>
    </transition> -->
  </div>
</template>

<script>
import PatiendCard from '@/components/PatientCard.vue'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      checked: true,
      input: '',
      showFullSkin: false,
      visible: false
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  components: {
    PatiendCard
  },
  methods: {
    onClickLeft () {
      this.$router.push('/home')
    },
    onClickRight () {

    },
    handleJump (param) {
      switch (param) {
        case 1:
          this.$dialog.confirm({
            title: '安全核查',
            message: '确定要进行安全核查吗？'
          }).then(() => {
            this.$router.push('/sign-in')
          }
          )
          break
        case 2:
          this.$dialog.confirm({
            title: '安全核查',
            message: '确定要进行安全核查吗？'
          }).then(() => {
            this.$router.push('/time-out')
          }
          )
          break
        case 3:
          this.$dialog.confirm({
            title: '安全核查',
            message: '确定要进行安全核查吗？'
          }).then(() => {
            this.$router.push('/sign-out')
          }
          )
          break
        case 4:
          this.$router.push('/transfer-handover')
          break
        case 5:
          this.$router.push('/record2')
          break
        case 6:
          this.$router.push('/record3')
      }
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
  .patient-home{
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
        border-radius: 10px 10px 0 0;
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
    .operation-content{
      padding: 0 20px;
      margin-top: -15px;
      .operation-info{
        background: #ffffff;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 184px;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
        border-radius: 0 0 10px 10px;
        box-sizing: border-box;
        padding-left: 32px;
        p{
          // text-indent: 32px;
          font-size: 30px;
          &:first-child{
            display: flex;
            span{
              flex: 1;
            }
          }
          &:nth-child(2){
            margin:20px 0;
          }
          .label{
            color: #7F7F7F;
            display: inline-block;
            text-align: left;
            // text-indent: unset !important;
            width: 140px;
          }
          .value{
            color: #2E2E2E;
          }
        }
      }
    }
    .list{
      padding: 0 40px;
      h3{
        color: #7F7F7F;
        font-size: 30px;
        font-weight: lighter;
        margin-bottom: 20px;
        margin-top: 60px;
        &:nth-child(1){
          margin-top: 40px;
        }
      }
      .options{
        display: flex;
        .van-button{
          flex: 1;
          height: 100px;
          line-height: 100px;
          background-color: #D5DDF1;
          font-size: 36px;
          color: #303234;
          padding: 0;
          box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          &:nth-child(2){
            margin:0 35px;
          }
        }
      }
    }
  }
</style>
