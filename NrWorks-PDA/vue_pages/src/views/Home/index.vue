<template>
  <div class="home">
    <van-nav-bar
      title="手术室移动工作平台"
    >
      <!-- @click-left="onClickLeft"
      @click-right="onClickRight" -->
      <van-icon name="wap-nav" slot="left" size="34" color="#ffffff" @click="onClickLeft"/>
      <van-icon name="exchange" slot="right" size="34" color="#ffffff" @click="handleExitApp"/>
    </van-nav-bar>
    <div class="list">
      <ul>
        <li @keyup.enter.native="handleJump">
          <div class="li-left">
            <van-image :src="avater" />
          </div>
          <div class="li-right">
            <p>{{opePeopleInfo.userName}}</p>
            <p>手术室-复旦大学附属华山医院</p>
          </div>
        </li>
      </ul>
    </div>
    <Loading v-if="showLoading"/>
    <Menu v-if="showMenu" :showMenu="showMenu" @handleClose="handleClose"></Menu>
  </div>
</template>

<script>
import request from '../../utils/request'
import {getPatientInfo, bindingPatPushScreen} from '@/api/patient-info'
import Loading from '@/components/Loading'
// import {getOpePeople} from '@/api/device-package'
import def from '@/assets/def.png'
import $bus from '@/utils/bus'
import Menu from '@/components/Menu'
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      cureNo: '',
      avater: def,
      showLoading: false,
      showMenu: false
    }
  },
  computed: {
    ...mapState('Patient', ['opePeopleInfo'])
  },
  components: {
    Loading, Menu
  },
  methods: {
    ...mapActions('Patient', ['getPatient']),
    onClickLeft () {
      // this.$router.go(-1)
      this.showMenu = true
    },
    handleClose () {
      this.showMenu = false
    },
    handleExitApp () {
      // 关闭app
      // var that = this
      navigator.app.exitApp()
    },
    onClickRight () {

    },
    // 绑定患者
    bindingPatPushScreen () {
      request({
        url: bindingPatPushScreen,
        method: 'post',
        params: {
          cureNo: this.cureNo
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.handleJump()
        }
      })
    },
    getPatientData () {
      this.showLoading = true
      request({
        url: getPatientInfo + '/' + this.cureNo,
        method: 'get'
      }).then(res => {
        if (res) {
          if (res.data.code === 200) {
            this.getPatient(res.data.data)
            setTimeout(() => {
              this.bindingPatPushScreen()
              this.showLoading = false
            }, 2000)
          } else {
            setTimeout(() => {
              this.showLoading = false
            }, 2000)
          }
        } else {
          setTimeout(() => {
            this.showLoading = false
          }, 2000)
        }
      })
    },
    handleJump () {
      if (this.cureNo) {
        this.$router.push('/patient-home')
      }
    },
    handleScan (code) {
      // 患者腕带条码
      if (parseInt(code)) {
        this.cureNo = code
        this.getPatientData()
        // this.subjectOfPatientWristband.next(code)
      }
      // 手术通知单二维码
      if (code.indexOf('OpsQRCode') !== -1) {
        // var jsonStr
        if (code.indexOf('OpsSchNo') !== -1) {
          var codelist = code.split(',')
          var OpsRQCode = codelist[0].replace('OpsQRCode=', '')
          var OpsSchNo = codelist[1].replace('OpsSchNo=', '')
          this.cureNo = OpsRQCode
          this.operateNo = OpsSchNo
          // jsonStr = JSON.stringify({ cureno: OpsRQCode, operateno: OpsSchNo })
        } else {
          this.cureNo = code.replace('OpsQRCode=', '')
          // jsonStr = JSON.stringify({ cureno: code.replace('OpsQRCode=', '') })
        }
        this.getPatientData()
        // this.subjectOfPatientNoticeForm.next(jsonStr)
      }
    }
  },
  created () {
    document.onkeydown = (e) => {
      var key = window.event.keyCode
      if (key === 13) {
        this.handleScan('1010')
      }
    }
  },
  mounted () {
    // this.getPatientData()
    document.addEventListener('deviceready', onDeviceReady, false)
    let that = this
    function onDeviceReady () {
      // eslint-disable-next-line no-undef
      cordova.ScanCode.getCode('12', e => {
        if (e) {
          if (that.$route.path === '/home') {
            that.handleScan(e)
          } else if (that.$route.path === '/transfer') {
            // alert('/transfer')
            $bus.$emit('handleCode', e)
          } else if (that.$route.path === '/device-special') {
            // alert('/device-special', e)
            $bus.$emit('handleDeviceCode', e)
          }
        }
      })
    }
    $bus.$on('handleScan', this.handleScan)
  },
  beforeDetroy () {
    // eslint-disable-next-line no-undef
    this.showLoading = false
    $bus.$off('handleScan')
    // 移除 <div> 事件句柄
    document.removeEventListener('deviceready')
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
