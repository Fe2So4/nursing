<template>
  <div class="security-check">
    <div class="title">
      安全核查
      <i />
      <span class="security-voice">
        <span
          class="el-icon-microphone"
          @click="handleSpeak"
        />
        <span
          class="el-icon-turn-off-microphone"
          @click="handleStopSpeak"
        />
      </span>
    </div>
    <div class="nav">
      <el-tabs
        v-model="activeName"
        @tab-click="handleChange"
      >
        <el-tab-pane
          v-for="item in navList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <component
            :is="item.component"
            :state="state"
            :list="list"
            :state-list="item.component === 'CheckOverview' ? stateList : {}"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import CheckDetail from './check-detail'
import {
  getSignInInfo,
  getTimeOutInfo,
  getSignOutInfo
} from '@/api/large-screen'
import CheckOverview from './check-overview'
import { startSpeak, cancelSpeak } from '@/utils/voiceSpeak'
import { mapState } from 'vuex'
import request from '@/utils/request2'
import $bus from '@/utils/busScreen'
export default {
  name: 'SecurityCheck',
  data () {
    return {
      // itemStatus:1,
      activeName: 'first',
      stateList: { signIn: '0', timeOut: '0', signOut: '0' },
      list: [],
      navList: [
        { label: '概览', name: 'first', component: 'CheckOverview' },
        { label: 'Sign In', name: 'second', component: 'CheckDetail' },
        { label: 'Time Out', name: 'third', component: 'CheckDetail' },
        { label: 'Sign Out', name: 'fourth', component: 'CheckDetail' }
      ],
      state: '',
      signInList: [
        { text: '患者姓名、住院号、性别、年龄正确：', value: '1', sort: '1' },
        { text: '手术方式确认：', value: '0', sort: '2' },
        { text: '手术部位与标识正确：', value: '0', sort: '3' },
        { text: '手术知情同意书：', value: '', sort: '4' },
        { text: '麻醉知情同意书：', value: '', sort: '5' },
        { text: '麻醉设备安全检查完成：', value: '', sort: '6' },
        { text: '皮肤是否完整：', value: '', sort: '7' },
        { text: '术野皮肤准备正确：', value: '', sort: '8' },
        { text: '静脉通道建立完成：', value: '', sort: '9' },
        { text: '患者是否有过敏史：', value: '', sort: '10' },
        { text: '抗菌药物皮试结果：', value: '', sort: '11' },
        { text: '术前备血：', value: '', sort: '12' },
        { text: '影像学资料：', value: '', sort: '13' },
        { text: '假体：', value: '', sort: '14' },
        { text: '体内植入物：', value: '', sort: '15' }
      ],
      timeOutList: [
        { text: '患者姓名、住院号、性别、年龄正确：', value: '1', sort: '1' },
        { text: '手术方式确认：', value: '0', sort: '2' },
        { text: '手术部位、标识、体位正确：', value: '0', sort: '3' },
        { text: '是否需要相关影像资料：', value: '', sort: '4' },
        { text: '预计手术时间：', value: '', sort: '5' },
        { text: '预计失血量：', value: '', sort: '6' },
        { text: '手术关注点：', value: '', sort: '7' },
        { text: '麻醉关注点：', value: '', sort: '8' },
        { text: '物品灭菌合格：', value: '', sort: '9' },
        { text: '仪器设备、植入物：', value: '', sort: '10' },
        { text: '术前术中特殊用药情况：', value: '', sort: '11' }
      ],
      signOutList: [
        { text: '患者姓名、住院号、性别、年龄正确：', value: '1', sort: '1' },
        { text: '实际手术方式确认：', value: '0', sort: '2' },
        { text: '手术部位、体位、标识正确：', value: '0', sort: '3' },
        { text: '手术用药、输血、冰冻报告的核查正确：', value: '0', sort: '4' },
        { text: '病理标本：', value: '', sort: '5' },
        // {text: '病理标本号核对正确：', value: '',sort:'6'},
        { text: '手术用物清点正确：', value: '', sort: '6' },
        { text: '皮肤是否完整：', value: '', sort: '7' },
        { text: '患者去向：', value: '', sort: '8' },
        { text: '各种管路：', value: '', sort: '9' },
        { text: '静脉管路：', value: '', sort: '10' },
        { text: '气管插管：', value: '', sort: '11' },
        { text: '伤口引流：', value: '', sort: '12' },
        { text: '胃管：', value: '', sort: '13' },
        { text: '尿管：', value: '', sort: '14' }
      ],
      voiceIcon: 'el-icon-microphone',
      voice: window.speechSynthesis
    }
  },
  watch: {
    voice: {
      handler (newVal) {
        console.log(newVal)
        return newVal
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  // watch: {
  //   isSpeak: {
  //     handler (newVal) {
  //       return newVal
  //     },
  //     immediate: true
  //   }
  // },
  components: {
    CheckDetail,
    CheckOverview
  },
  props: {},
  methods: {
    print () {
      console.log(window.speechSynthesis.speaking)
    },
    getSignInInfo () {
      request({
        url:
          getSignInInfo +
          `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`,
        method: 'get'
      }).then((res) => {
        let data = res.data.data.anesBeforeCheck
        this.state = res.data.data.anesBeforeCheckState
        this.stateList.signIn = res.data.data.anesBeforeCheckState
        this.signInList.forEach((_item) => {
          data.forEach((item) => {
            if (_item.sort === item.sort) {
              _item.value = item.value
            }
          })
        })
      })
    },
    getTimeOutInfo () {
      request({
        url:
          getTimeOutInfo +
          `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`,
        method: 'get'
      }).then((res) => {
        let data = res.data.data.opeeBeforeCheck
        this.state = res.data.data.operBeforeCheckState
        this.stateList.timeOut = res.data.data.operBeforeCheckState
        this.timeOutList.forEach((_item) => {
          data.forEach((item) => {
            if (_item.sort === item.sort) {
              _item.value = item.value
            }
          })
        })
      })
    },
    getSignOutInfo () {
      request({
        url:
          getSignOutInfo +
          `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`,
        method: 'get'
      }).then((res) => {
        let data = res.data.data.beforeLeaveRoomCheck
        this.state = res.data.data.operLeaveBeforeCheckState
        this.stateList.signOut = res.data.data.operLeaveBeforeCheckState
        this.signOutList.forEach((_item) => {
          data.forEach((item) => {
            if (_item.sort === item.sort) {
              _item.value = item.value
            }
          })
        })
      })
    },
    handleChange (tab) {
      switch (tab.name) {
        case 'first':
          this.getSignInInfo()
          this.getTimeOutInfo()
          this.getSignOutInfo()
          break
        case 'second':
          this.getSignInInfo()
          this.list = this.signInList
          break
        case 'third':
          this.getTimeOutInfo()
          this.list = this.timeOutList
          break
        case 'fourth':
          this.getSignOutInfo()
          this.list = this.signOutList
      }
    },
    handleSpeak () {
      switch (this.activeName) {
        case 'first':
          this.handleSpeakSummary()
          break
        case 'second':
          this.handleSpeakSignIn()
          break
        case 'third':
          this.handleSpeakTimeOut()
          break
        case 'fourth':
          this.handleSpeakSignOut()
          break
      }
      console.log(window.speechSynthesis.speaking)
    },
    handleStopSpeak () {
      cancelSpeak()
    },
    handleSpeakSummary () {
      // if (this.voiceSwitch) {
      let text = `安全核查：概览`
      if (this.stateList.signIn === '2') {
        text += `Sign In 麻醉实施前核查 完成`
      } else {
        text += `Sign In 麻醉实施前核查 未完成`
      }
      if (this.stateList.timeOut === '2') {
        text += `Time out 手术开始前核查 完成`
      } else {
        text += `Time out 手术开始前核查 未完成`
      }
      if (this.stateList.signOut === '2') {
        text += `Sign Out 离开手术前核查 完成`
      } else {
        text += `Sign Out 离开手术前核查 未完成`
      }
      startSpeak(text)
      // } else {
      //   startSpeak('请先打开语音播报按钮')
      // }
    },
    handleSpeakSignIn () {
      // if (this.voiceSwitch) {
      let text = `安全核查：Sign In 麻醉实施前核查`
      if (this.state !== '0') {
        text += this.voiceTextFormat('signIn')
      } else {
        text += '无'
      }
      startSpeak(text)
      // } else {
      //   startSpeak('请先打开语音播报按钮')
      // }
    },
    handleSpeakTimeOut () {
      // if (this.voiceSwitch) {
      let text = `安全核查：Time out 手术开始前核查`
      if (this.state !== '0') {
        text += this.voiceTextFormat('timeOut')
      } else {
        text += '无'
      }
      startSpeak(text)
      // } else {
      //   startSpeak('请先打开语音播报按钮')
      // }
    },
    handleSpeakSignOut () {
      // if (this.voiceSwitch) {
      let text = `安全核查：Sign Out 离开手术前核查`
      if (this.state !== '0') {
        text += this.voiceTextFormat('signOut')
      } else {
        text += '无'
      }
      startSpeak(text)
      // } else {
      //   startSpeak('请先打开语音播报按钮')
      // }
    },
    voiceTextFormat (param) {
      switch (param) {
        case 'signIn':
          // return
          return this.signInList
            .map((f) => `${f.text} ${f.value === '是' ? '已完成' : '未完成'}`)
            .join('\r\n')
        // break
        case 'timeOut':
          return this.timeOutList
            .map((f) => `${f.text} ${f.value === '是' ? '已完成' : '未完成'}`)
            .join('\r\n')
        // break
        case 'signOut':
          return this.signOutList
            .map((f) => `${f.text} ${f.value === '是' ? '已完成' : '未完成'}`)
            .join('\r\n')
      }
    }
  },
  created () {
    // this.voice = window.speechSynthesis
  },
  mounted () {
    this.getSignInInfo()
    this.getTimeOutInfo()
    this.getSignOutInfo()
    $bus.$on('getSignInInfo', this.getSignInInfo)
    $bus.$on('getTimeOutInfo', this.getTimeOutInfo)
    $bus.$on('getSignOutInfo', this.getSignOutInfo)
  },
  beforeDestroy () {
    $bus.$off('getSignInInfo')
    $bus.$off('getTimeOutInfo')
    $bus.$off('getSignOutInfo')
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/themes';
.security-check {
  // box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
  @include theme-property('box-shadow',box_color_shadow_info);
  @include theme-property('background-color',background_color_secondary);
  border-radius: 10px;
  height: 100%;
  flex: 0.25;
  padding: 0 10px;
  margin-right: 20px;
  &:last-child {
    margin-right: unset;
  }
  .title {
    position: relative;
    text-indent: 33px;
    line-height: 58px;
    @include theme-property('color',font_color_title);
    border-bottom: 1px solid;
    @include theme-property('border-bottom-color',border_color_info);
    font-size: 20px;
    i {
      position: absolute;
      width: 4px;
      left: 20px;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 18px;
      @include theme-property('background-color',font_color_primary);
      border-radius: 2px;
    }
    .security-voice {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      line-height: 58px;
      > span {
        text-indent: unset !important;
        &::before {
          cursor: pointer;
        }
      }
    }
  }
  .nav {
    height: calc(100% - 58px);
    .el-tabs {
      height: 100%;
    }
  }
  .data-empty {
    text-align: center;
    height: calc(100% - 58px);
    @include theme-property('color',font_color_secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      // margin-top: 100px;
      transform: translateX(10px);
    }
  }
  // /deep/ .el-tabs__active-bar {
  //   left: 16px;
  //   background-color: #3377ff;
  // }
  /deep/ .el-tabs__nav {
    text-indent: 12px;
  }
  /deep/ .el-tabs__nav-wrap::after{
    background-color: unset;
  }
  // /deep/ .el-tabs__item.is-active {
  //   color: #3377ff;
  // }
  /deep/ .el-tabs__content {
    height: calc(100% - 55px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  /deep/ .el-tab-pane {
    height: 100%;
  }
  /deep/ .el-tabs__item {
    padding: 0 10px;
  }
}
</style>
