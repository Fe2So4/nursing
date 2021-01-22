<template>
  <div class="home">
    <van-nav-bar title="手术室移动工作平台">
      <van-icon
        class-prefix="my-icon"
        name="caidan"
        slot="left"
        size="34"
        @click="onClickLeft"
      />
      <van-icon
        class-prefix="my-icon"
        name="tuichuapp"
        slot="right"
        size="34"
        @click="handleExitApp"
      />
    </van-nav-bar>
    <div class="list">
      <ul>
        <li @keyup.enter="handleJump">
          <div class="li-left">
            <van-image :src="avater" />
          </div>
          <div class="li-right">
            <p>{{ opePeopleInfo.userName }}</p>
            <p>手术室-复旦大学附属华山医院</p>
          </div>
        </li>
      </ul>
    </div>
    <Loading v-if="showLoading" />
    <!-- <Menu :showMenu.sync="showMenu" @handleClose="handleClose"></Menu> -->
    <van-popup
      v-model="showMenu"
      position="left"
      :style="{ width: '46.7%', height: '100%' }"
      closeable
      close-icon-position="top-right"
      close="handleClose"
      click-overlay="handleClose"
    >
      <div class="menu-list">
        <div class="menu-title">
          <div class="mt-left">
            <van-image :src="avater" />
          </div>
          <div class="mt-right">
            <p>{{ opePeopleInfo.userName }}</p>
            <!-- <p>手术室-复...</p> -->
            <!--<p>{{opePeopleInfo.userName}}</p>-->
            <p>手术室-复旦大学附属华山医院</p>
          </div>
        </div>
        <ul>
          <li>
            <van-icon name="setting-o" />
            <span>设置</span>
          </li>
          <li>
            <van-icon name="info-o" />
            <span>关于</span>
          </li>
          <li>
            <van-icon name="question-o" />
            <span>帮助</span>
          </li>
          <li @click="handleExitApp">
            <van-icon class-prefix="my-icon" name="tuichuapp" />
            <span>退出</span>
          </li>
          <li @click="changeTheme">
            <van-icon name="flower-o" />
            <span>换肤</span>
          </li>
        </ul>
      </div>
    </van-popup>
    <van-dialog
      v-model="showPtSelect"
      title="提示"
      show-cancel-button
      @confirm="handleConfirm"
    >
      <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
      <div class="pt-select-title">
        当前患者有{{ patientList.length }}台手术，请选择！
      </div>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            v-for="item in patientList"
            :key="item.operSchNo"
            :title="item.roomNo"
            clickable
          >
            <template #right-icon>
              <van-radio :name="item.operSchNo" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import request from '../../utils/request'
import { getPatientInfo, bindingPatPushScreen } from '@/api/patient-info'
import Loading from '@/components/Loading'
// import {getOpePeople} from '@/api/device-package'
import def from '@/assets/def.png'
import { getTheme, setTheme } from '@/utils/storage'
import $bus from '@/utils/bus'
import Menu from '@/components/Menu'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      cureNo: '',
      avater: def,
      showLoading: false,
      showMenu: false,
      showPtSelect: false,
      patientList: [],
      radio: ''
    }
  },
  computed: {
    ...mapState('Patient', ['opePeopleInfo', 'patientInfo'])
  },
  components: {
    Loading,
    Menu
  },
  methods: {
    ...mapActions('Patient', ['getPatient']),
    onClickLeft () {
      this.showMenu = true
    },
    handleClose () {
      this.showMenu = false
    },
    handleExitApp () {
      // 关闭app
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否退出当前应用?'
        })
        .then(() => {
          // on confirm
          navigator.app.exitApp()
        })
        .catch(() => {
          // on cancel
        })
    },
    onClickRight () {},
    handleConfirm () {
      this.patientList.forEach((item) => {
        if (item.operSchNo === this.radio) {
          if (item.state === '1' || item.state === '2') {
            this.getPatient(item)
            this.handleJump()
            // this.bindingPatPushScreen()
          } else {
            this.$notify({ type: 'warning', message: '当前手术未接单' })
          }
        }
      })
    },
    // 绑定患者
    bindingPatPushScreen () {
      request({
        url: bindingPatPushScreen,
        method: 'post',
        params: {
          cureNo: this.cureNo,
          operSchNo: this.patientInfo.operSchNo
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.handleJump()
        }
      })
    },
    getPatientData () {
      // this.showLoading = true
      request({
        url: getPatientInfo + '/' + this.cureNo,
        method: 'get'
      }).then((res) => {
        if (res) {
          if (res.data.code === 200) {
            if (res.data.data.length > 1) {
              let arr = []
              res.data.data.forEach((item) => {
                if (item.state !== '0') {
                  arr.push(item)
                }
              })
              if (arr.length > 0) {
                this.showPtSelect = true
                this.patientList = res.data.data
              } else {
                this.$notify({ type: 'warning', message: '当前手术未接单' })
              }
            } else {
              // if (res.data.data[0].state === '1' || res.data.data[0].state === '2') {
              this.getPatient(res.data.data[0])
              this.handleJump()
              this.bindingPatPushScreen()
              // } else {
              //   this.$notify({type: 'warning', message: '当前手术未接单'})
              // }
            }
            // setTimeout(() => {
            //   this.showLoading = false
            // }, 2000)
          } else {
            // setTimeout(() => {
            //   this.showLoading = false
            // }, 2000)
          }
        } else {
          // setTimeout(() => {
          //   this.showLoading = false
          // }, 2000)
        }
      })
    },
    // 换主题
    theme (type) {
      this.$store.commit('upDate', { themeType: type })
      window.document.documentElement.setAttribute('data-theme', type)
    },
    setTheme () {
      let theme = getTheme()
      let type = 'light'
      if (theme) {
        type = theme
      }
      window.document.documentElement.setAttribute('data-theme', type)
    },
    changeTheme () {
      let theme = getTheme()
      let type = 'light'
      if (theme) {
        if (theme === 'dark') {
          type = 'light'
        } else {
          type = 'dark'
        }
      } else {
        type = 'dark'
      }
      setTheme(type)
      window.document.documentElement.setAttribute('data-theme', type)
    },
    getPatientDataUpdate () {
      this.showLoading = true
      request({
        url: getPatientInfo + '/' + this.cureNo,
        method: 'get'
      }).then((res) => {
        if (res) {
          if (res.data.code === 200) {
            this.getPatient(res.data.data)
          } else {
          }
        } else {
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
        this.handleScan('19102497')
      }
    }
    this.setTheme()
  },
  mounted () {
    // this.getPatientData()
    document.addEventListener('deviceready', onDeviceReady, false)
    let that = this
    function onDeviceReady () {
      // eslint-disable-next-line no-undef
      cordova.ScanCode.getCode('12', (e) => {
        if (e) {
          if (that.$route.path === '/home') {
            that.handleScan(e)
          } else if (that.$route.path === '/transfer') {
            // alert('/transfer')
            $bus.$emit('handleCode', e)
          } else if (that.$route.path === '/device-special') {
            // alert('/device-special', e)
            $bus.$emit('handleDeviceCode', e)
          } else if (that.$route.path === '/patient-home') {
            $bus.$emit('handleOpeRoomCode', e)
          }
        }
      })
    }
    $bus.$on('handleScan', this.handleScan)
    $bus.$on('getPatientDataUpdate', this.getPatientDataUpdate)
  },
  beforeDetroy () {
    // eslint-disable-next-line no-undef
    this.showLoading = false
    $bus.$off('handleScan')
    $bus.$off('getPatientDataUpdate')
    // 移除 <div> 事件句柄
    document.removeEventListener('deviceready')
  }
}
</script>

<style lang="scss" scoped>
@import "@/themes/_handle.scss";
.home {
  height: 100%;
  .van-nav-bar {
    height: 100px;
    // background: linear-gradient(90deg, #666666, #303030);
    /deep/ .van-nav-bar__title {
      font-size: 34px;
      line-height: 100px;
    }
    /deep/ .van-nav-bar__content {
      height: 100%;
    }
  }
  .list {
    height: calc(100% - 100px);
    overflow-y: auto;
    ul {
      padding: 20px 15px 0;
      li {
        // background: #ffffff;
        @include background_color("bg_home");
        box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        height: 120px;
        margin-bottom: 20px;
        display: flex;
        .li-left {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          .van-image {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            img {
              border-radius: 50%;
              // width: 100%;
              // height: 100%;
            }
          }
        }
        .li-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          p {
            &:first-child {
              @include font_color("bg_popup_title");
              font-size: 30px;
            }
            &:last-child {
              @include font_color("bg_popup_option");
              margin-top: 20px;
              font-size: 30px;
            }
          }
        }
      }
    }
  }
  .menu-list {
    overflow: hidden;
    .menu-title {
      padding: 100px 0 40px 0;
      display: flex;
      border-bottom: 1px solid #dadada;
      .mt-left {
        height: 80px;
        width: 80px;
        margin: 0 30px;
      }
      .mt-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          &:nth-child(1) {
            @include font_color("bg_popup_title");
            font-size: 34px;
            font-weight: 500;
          }
          &:nth-child(2) {
            font-size: 30px;
            @include font_color("bg_popup_option");
          }
        }
      }
    }
    ul {
      // margin-top: 80px;
      // border-top: 1PX solid #e2e2e2;
      li {
        line-height: 80px;
        border-bottom: 1px solid #e2e2e2;
        // text-indent: 15px;
        cursor: pointer;
        color: #7f7f7f;
        font-size: 30px;
        &.active {
          background-color: #d1d7e2;
        }
        span {
          vertical-align: middle;
        }
        i {
          // display:inline-block;
          vertical-align: middle;
          height: 100%;
          color: #819cbb;
          margin: 0 30px;
        }
        .my-icon {
          height: 30px;
          width: 30px;
          font-size: 28px;
          color: #819cbb;
          // font-weight:600;
        }
      }
    }
  }
  .pt-select-title {
    padding: 10px 16px;
  }
  .van-cell {
    line-height: 94px;
    color: #2e2e2e;
    font-size: 30px;
    &::after {
      border-color: #e2e2e2;
    }
    &.presure {
      height: 104px !important;
    }
    .first-cell {
      flex: unset;
    }
    .left-title {
      flex: unset;
    }
    .van-radio {
      height: 100%;
      justify-content: flex-end;
      /deep/ .van-radio__icon {
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        .van-icon {
          width: 40px;
          height: 40px;
          font-size: unset;
          &:before {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
