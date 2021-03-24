<template>
  <div class="patient-home">
    <van-nav-bar
      title="手术患者全貌"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    >
    </van-nav-bar>
    <PatiendCard :radius="radius"/>
    <div class="operation-content">
      <div class="operation-info">
        <p>
          <span>
            <span class="label">手术室</span>
            <span class="value">{{ patientInfo.roomNo }}室</span>
          </span>
          <span>
            <span class="label">台次</span>
            <span class="value">第{{ patientInfo.sequenceNo }}台</span>
          </span>
        </p>
        <p>
          <span class="label">诊断</span>
          <span class="value">{{ patientInfo.diagnose }}</span>
        </p>
        <p>
          <span class="label">麻醉方式</span>
          <span class="value">{{ patientInfo.anesMethod }}</span>
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
import { Notify } from 'vant'
import PatiendCard from '@/components/PatientCard.vue'
import { mapState } from 'vuex'
import { joinOperationRoom } from '@/api/patient-info'
import request from '@/utils/request'
import $bus from '@/utils/bus'
import moment from 'moment'
export default {
  data () {
    return {
      checked: true,
      input: '',
      showFullSkin: false,
      visible: false,
      radius: false
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  components: {
    PatiendCard
  },
  mounted () {
    $bus.$on('handleOpeRoomCode', this.handleScanCode)
  },
  created () {
    // document.onkeydown = (e) => {
    //   var key = window.event.keyCode
    //   if (key === 13) {
    //     setTimeout(() => {
    //       // this.handleCode('RoomNum=606')
    //       this.handleScanCode('InductionRoom=6')
    //       // this.handleCode('Worker=22350195')

    //       // this.handleCode('floorNum=6')
    //       // this.handleCode('OpsQRCode=19363038,OpsSchNo=426059')
    //     }, 1000)
    //   }
    // }
  },
  beforeDestory () {
    $bus.$off('handleOpeRoomCode')
  },
  methods: {
    onClickLeft () {
      this.$router.push('/home')
    },

    // 扫码入手术室、出手术室、入诱导、出诱导
    handleScanCode (code) {
      let codeStr = ''
      if (code.indexOf('OpeRoom') !== -1) {
        codeStr = code.replace('OpeRoom=', '')
        request({
          method: 'post',
          url: joinOperationRoom,
          data: {
            cureNo: this.patientInfo.cureNo,
            hospitalNo: this.patientInfo.hospitalNo,
            operSchNo: this.patientInfo.operSchNo,
            operatingRoomTime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
            roomNo: codeStr,
            realRoomNo: this.patientInfo.roomNo
          }
        })
      } else if (code.indexOf('InductionRoom') !== -1) {
        codeStr = code.replace('InductionRoom=', '')
        request({
          method: 'post',
          url: joinOperationRoom,
          data: {
            cureNo: this.patientInfo.cureNo,
            hospitalNo: this.patientInfo.hospitalNo,
            operSchNo: this.patientInfo.operSchNo,
            inductionRoomTime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
            roomNo: codeStr,
            realRoomNo: this.patientInfo.roomNo
          }
        }).then(res => {
          if (res.data.code === 200) {
            Notify({ type: 'success', message: '扫描诱导室二维码成功' })
          }
        })
      }
    },
    onClickRight () {},
    handleJump (param) {
      switch (param) {
        case 1:
          this.$dialog
            .confirm({
              title: '安全核查',
              message: '确定要进行安全核查吗？'
            })
            .then(
              () => {
                this.$router.push('/sign-in')
              }
              // eslint-disable-next-line handle-callback-err
            )
            // eslint-disable-next-line handle-callback-err
            .catch((error) => {})
          break
        case 2:
          this.$dialog
            .confirm({
              title: '安全核查',
              message: '确定要进行安全核查吗？'
            })
            .then(
              () => {
                this.$router.push('/time-out')
              }
              // eslint-disable-next-line handle-callback-err
            )
            // eslint-disable-next-line handle-callback-err
            .catch((error) => {})
          break
        case 3:
          this.$dialog
            .confirm({
              title: '安全核查',
              message: '确定要进行安全核查吗？'
            })
            .then(
              () => {
                this.$router.push('/sign-out')
              }
              // eslint-disable-next-line handle-callback-err
            )
            // eslint-disable-next-line handle-callback-err
            .catch((error) => {})
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
@import "@/themes/_handle.scss";
.patient-home {
  height: 100%;
  .van-nav-bar {
    height: 100px;
    /deep/ .van-nav-bar__title {
      font-size: 34px;
      line-height: 100px;
    }
    /deep/ .van-nav-bar__text {
      font-size: 30px;
    }
    /deep/ .van-icon-arrow-left {
      font-size: 36px;
    }
  }
  .patient-card {
    padding: 15px 20px;
    .content {
      @include background_color("bg_home");
      display: flex;
      height: 194px;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
      border-radius: 10px 10px 0 0;
      box-sizing: border-box;
      overflow: hidden;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 140px;
          height: 80px;
          background: #3478ff;
          box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
          border-radius: 0px 40px 40px 0px;
          line-height: 80px;
          text-align: center;
          font-size: 42px;
          font-weight: bold;
          color: #ffffff;
        }
      }
      .right {
        flex: 1;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 26px;
          color: #7f7f7f;
          &:nth-child(1) {
            font-size: 30px;
            color: #2e2e2e;
          }
          &:nth-child(2) {
            margin: 30px 0;
          }
        }
      }
    }
  }
  .operation-content {
    padding: 0 20px;
    margin-top: -15px;
    .operation-info {
      @include background_color("bg_home");
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 184px;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
      border-radius: 0 0 10px 10px;
      box-sizing: border-box;
      padding-left: 32px;
      p {
        // text-indent: 32px;
        font-size: 30px;
        &:first-child {
          display: flex;
          span {
            flex: 1;
          }
        }
        &:nth-child(2) {
          margin: 20px 0;
        }
        .label {
          @include font_color("bg_popup_option");
          display: inline-block;
          text-align: left;
          width: 140px;
        }
        .value {
          @include font_color("bg_popup_title");
        }
      }
    }
  }
  .list {
    padding: 0 40px;
    h3 {
      @include font_color("bg_popup_option");
      font-size: 30px;
      font-weight: lighter;
      margin-bottom: 20px;
      margin-top: 60px;
      &:nth-child(1) {
        margin-top: 40px;
      }
    }
    .options {
      display: flex;
      @include background_color("bg_popup");
      padding: 15px 0;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      .van-button {
        flex: 1;
        height: 100px;
        line-height: 100px;
        @include background_color("bg_popup");
        // background-color: #D5DDF1;
        font-size: 36px;
        @include font_color("bg_button_title");
        font-weight: bold;
        padding: 0;
        box-shadow: unset;
        border-radius: unset;
        border: unset;
        &:nth-child(2) {
          // margin:0 35px;
          border-right: 1PX solid #d1d1d1;
          border-left: 1PX solid #d1d1d1;
        }
      }
    }
  }
}
</style>
