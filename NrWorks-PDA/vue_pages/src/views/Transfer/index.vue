<template>
  <div class="transfer">
   <van-nav-bar
      :title="$route.query.title"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    >
      <!-- right-text="运送" -->
    </van-nav-bar>
    <div class="step">
      <div class="step-content">
        <div>
          <div class="title">患者身份核查</div>
          <van-steps direction="vertical" :active="active" active-color="2E2E2E">
            <van-step v-for="(item,index) in stepList" :key="'item'+index">
              <h3>请扫描[{{item.label}}]</h3>
              <h3></h3>
              <p></p>
            </van-step>
          </van-steps>
        </div>
        <div v-if="$route.query.title==='进手术室' || $route.query.title==='出手术室'">
          <div class="title">手术间房间核查</div>
          <van-steps direction="vertical" :active="1" active-color="2E2E2E">
            <van-step>
              <h3>请扫描[手术房间]</h3>
              <p>2016-07-10 09:30</p>
            </van-step>
          </van-steps>
        </div>
        <div class="options" v-if="stepList[stepList.length - 1].value">
          <p class="option">扫完码之后请点击转运交接单按钮</p>
          <p class="option">
            <van-button round @click="jumpTransferRecord">转运交接单</van-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import {getHandoverCodeStatus, saveHandoverCodeStatus} from '@/api/handover-record'
import {mapState} from 'vuex'
export default {
  name: 'Transfer',
  data () {
    return {
      active: -1,
      code: '',
      stepList: [],
      outPacuScan: [{label: '患者腕带', value: false, active: 0}], // 出pacu
      outWardScan: [{label: '患者腕带', value: false, active: 0}], // 病房交接
      pointInRoomScan: [{label: '患者腕带', value: false, active: 0}, {label: '手术通知单', value: false, active: 1}, {label: '手术房间', value: false, active: 2}], // 进手术室
      pointOutRoomScan: [{label: '患者腕带', value: false, active: 0}, {label: '工勤人员二维码', value: false, active: 1}, {label: '手术房间', value: false, active: 2}], // 出手术室
      pointPacuScan: [{label: '患者腕带', value: false, active: 0}], // 进pacu
      pointWardScan: [{label: '患者腕带', value: false, active: 0}, {label: '工勤人员二维码', value: false, active: 1}] // 回病房---病房收治
    }
  },
  watch: {
    stepList: {
      handler (newVal, old) {
        let active = -1
        this.stepList.forEach(item => {
          if (item.value) {
            active = item.active
          }
        })
        this.active = active
      },
      imediate: true
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

    },
    saveCodeStatus () {
      let mark = null
      switch (this.$route.query.title) {
        case '病房交接':
          mark = 1
          this.stepList[0].value = true
          break
        case '进手术室':
          mark = 2
          if (this.active === -1) {
            this.stepList[0].value = true
          } else if (this.active === 0) {
            this.stepList[1].value = true
          } else {
            this.stepList[2].value = true
          }
          break
        case '出手术室':
          mark = 3
          if (this.active === -1) {
            this.stepList[0].value = true
          } else if (this.active === 0) {
            this.stepList[1].value = true
          } else {
            this.stepList[2].value = true
          }
          break
        case '进PACU':
          mark = 4
          this.stepList[0].value = true
          break
        case '出PACU':
          mark = 5
          this.stepList[0].value = true
          break
        case '病房收治':
          mark = 6
          if (this.active === -1) {
            this.stepList[0].value = true
          } else {
            this.stepList[1].value = true
          }
      }
      request({
        url: saveHandoverCodeStatus,
        method: 'post',
        data: {
          cureNo: this.patientInfo.cureNo,
          hospitalNo: this.patientInfo.hospitalNo,
          mark: mark,
          status: this.code,
          statusList: this.stepList
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.getCodeStatus()
        }
      })
    },
    getCodeStatus () {
      request({
        url: getHandoverCodeStatus + '/' + this.patientInfo.hospitalNo + '/' + this.patientInfo.cureNo,
        method: 'get'
      }).then(res => {
        console.log(res.data.data)
        switch (this.$route.query.title) {
          case '病房交接':
            if (res.data.data.outWardScan.length > 0) {
              this.stepList = res.data.data.outWardScan
            }
            break
          case '进手术室':
            if (res.data.data.pointInRoomScan.length > 0) {
              this.stepList = res.data.data.pointInRoomScan
            }
            break
          case '出手术室':
            if (res.data.data.pointOutRoomScan.length > 0) {
              this.stepList = res.data.data.pointOutRoomScan
            }
            break
          case '进PACU':
            if (res.data.data.pointPacuScan.length > 0) {
              this.stepList = res.data.data.pointPacuScan
            }
            break
          case '出PACU':
            if (res.data.data.outPacuScan.length > 0) {
              this.stepList = res.data.data.outPacuScan
            }
            break
          case '病房收治':
            if (res.data.data.pointWardScan.length) {
              this.stepList = res.data.data.pointWardScan
            }
        }
      })
    },
    handleCode (code) {
      // 患者腕带条码
      if (parseInt(code)) {
        this.code = code
        this.saveCodeStatus()
        // this.subjectOfPatientWristband.next(code)
      }
      // 房间二维码
      if (code.indexOf('RoomNum') !== -1) {
        this.code = code.replace('RoomNum=', '')
        this.saveCodeStatus()
      }
      // 手术通知单二维码
      if (code.indexOf('OpsQRCode') !== -1) {
        // var jsonStr
        if (code.indexOf('OpsSchNo') !== -1) {
          var codelist = code.split(',')
          var OpsRQCode = codelist[0].replace('OpsQRCode=', '')
          // var OpsSchNo = codelist[1].replace('OpsSchNo=', '')
          this.code = OpsRQCode
          // this.operateNo = OpsSchNo
          // jsonStr = JSON.stringify({ cureno: OpsRQCode, operateno: OpsSchNo })
        } else {
          this.code = code.replace('OpsQRCode=', '')
          // jsonStr = JSON.stringify({ cureno: code.replace('OpsQRCode=', '') })
        }
        this.saveCodeStatus()
        // this.subjectOfPatientNoticeForm.next(jsonStr)
      }
      // 工勤的二维码
      if (code.indexOf('Worker') !== -1) {
        this.code = code.replace('Worker=', '')
        this.saveCodeStatus()
      }
      // 器械包条码
      if (code.indexOf('P-') !== -1) {
        // this.subjectOfQiXiePackage.next(code.replace('P-', ''))
      }
    },
    currentStep () {
      switch (this.$route.query.title) {
        case '病房交接':
          this.stepList = this.outWardScan
          break
        case '进手术室':
          this.stepList = this.pointInRoomScan
          break
        case '出手术室':
          this.stepList = this.pointOutRoomScan
          break
        case '进PACU':
          this.stepList = this.pointPacuScan
          break
        case '出PACU':
          this.stepList = this.outPacuScan
          break
        case '病房收治':
          this.stepList = this.pointWardScan
          break
      }
    },
    jumpTransferRecord () {
      this.$router.push({path: '/handover-record', query: {type: this.$route.query.type, title: this.$route.query.title}})
    }
  },
  created () {
    document.onkeydown = (e) => {
      var key = window.event.keyCode
      if (key === 13) {
        setTimeout(() => {
          this.saveCodeStatus()
        }, 1000)
      }
    }
    this.currentStep()
    // this.getCodeStatus()
  },
  mounted () {
    document.addEventListener('deviceready', onDeviceReady, false)
    let that = this
    function onDeviceReady () {
      // eslint-disable-next-line no-undef
      cordova.ScanCode.getCode('12', e => {
        if (e) {
          that.handleCode(e)
        }
      })
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
