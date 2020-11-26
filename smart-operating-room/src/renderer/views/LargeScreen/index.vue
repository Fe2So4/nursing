<template>
  <div class="large-screen">
    <div class="pt-card">
      <patient-card @handleShowStep="handleShowStep" />
    </div>
    <div
      v-if="patientInfo.cureNo"
      class="ls-content"
    >
      <div
        class="pt-step"
        v-show="stepVisible"
      >
        <patient-step />
      </div>
      <div class="pt-info">
        <patient-info
          :connect="connect"
          @handleShowHistory="handleShowHistory"
        />
      </div>
    </div>
    <div
      v-else
      class="ls-empty"
    >
      <empty-notice @handleShowHistory="handleShowHistory" />
    </div>
    <HistoryRecord
      :history-visible="historyVisible"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import PatientCard from './components/patient-card'
import PatientStep from './components/patient-step'
import PatientInfo from './components/patient-info'
import io from 'socket.io-client'
import $bus from '@/utils/busScreen'
import EmptyNotice from './components/empty-notice'
import {mapActions, mapState} from 'vuex'
import HistoryRecord from './components/history-record'
const config = require('@/config/url.js')
const { BrowserWindow } = require('electron').remote
export default {
  name: 'LargeScreen',
  data () {
    return {
      stepVisible: true,
      socket: null,
      connect: false,
      interval: null,
      historyVisible: false,
      historyList: []
    }
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo', 'currentRoom'])
  },
  watch: {
    patientInfo: {
      handler (newValue, old) {
        return newValue
      },
      deep: true
    },
    currentRoom: {
      handler (newVal, old) {
        this.initSocket()
      }
    }
  },
  components: {PatientCard, PatientStep, PatientInfo, EmptyNotice, HistoryRecord},
  methods: {
    ...mapActions('LargeScreen', ['setPatientInfo', 'setCurrentRoom']),
    handleShowStep () {
      this.stepVisible = !this.stepVisible
    },
    handleClose () {
      this.historyVisible = false
    },
    handleShowHistory () {
      this.historyVisible = true
    },
    setCureNo (obj) {
      this.setPatientInfo(obj)
    },
    intervalRefresh () {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        // 有效遗嘱
        $bus.$emit('getMedicalAdvice')
        // 病史摘要
        $bus.$emit('getMedicalHistory')
        // 检查报告
        $bus.$emit('getInspectReport')
        // 检验报告
        $bus.$emit('getTestReport')
        // 术中带药
        $bus.$emit('getMedecial')
        // 抗生素用药
        $bus.$emit('getAntibiotic')
        // 生命体征
        $bus.$emit('getSignData')
      }, 5000)
    },
    initSocket () {
      if (this.socket) {
        this.socket = null
      }
      if (this.currentRoom) {
        this.socket = io(config.default.api.socketURL, {
          query: 'sendName=' + this.currentRoom
        })
        this.socket.on('connect', () => {
          console.log('socket.io connected')
          this.connect = true
        })
        this.socket.on('reconnect_error', e => {
          console.error(e)
        })
        this.socket.on('disconnect', () => {
          console.log('socket.io disconnect')
          this.connect = false
        })
        this.socket.on('push_event', (data) => {
          if (data) {
            let arr = []
            this.setCureNo({cureNo: data.cureNo, hospitalNo: data.hospitalNo})
            $bus.$emit('getPatientInfo')
            $bus.$emit('getStepList')
            $bus.$emit('getRecord2')
            $bus.$emit('getOrdinaryData')
            $bus.$emit('getSpecialData')
            $bus.$emit('getSignInInfo')
            $bus.$emit('getTimeOutInfo')
            $bus.$emit('getSignOutInfo')
            arr.push(data)
            this.socket.emit('text', arr)
          }
        })
        this.socket.on('push_event_screen', (data) => {
          if (data.sendMessage === 'option') {
            $bus.$emit('getStepList')
            $bus.$emit('getRecord2')
            $bus.$emit('getOrdinaryData')
            $bus.$emit('getSpecialData')
            $bus.$emit('getSignInInfo')
            $bus.$emit('getTimeOutInfo')
            $bus.$emit('getSignOutInfo')
          }
        })
      }
    }
  },
  created () {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      win.maximize()
    }
  },
  mounted () {
    this.initSocket()
  },
  beforeDestroy () {
    this.socket = null
    this.interval = null
  }
}
</script>

<style lang="scss" scoped>
  .large-screen{
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    .pt-card{
      height: 110px;
    }
    .ls-content{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .pt-step{
        margin-top:20px;
        height: 125px;
      }
      .pt-info{
        margin-top:20px;
        height: calc(100% - 275px);
        flex:1;
      }
    }
    .ls-empty{
      flex: 1;
      background: #ffffff;
      margin-top: 20px;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      padding: 20px 20px 0;
    }
  }
</style>
