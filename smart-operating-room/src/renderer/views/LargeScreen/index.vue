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
        <patient-info :connect="connect" />
      </div>
    </div>
    <div
      v-else
      class="ls-empty"
    >
      <empty-notice />
    </div>
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
export default {
  name: 'LargeScreen',
  data () {
    return {
      stepVisible: true,
      socket: null,
      connect: false
    }
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  watch: {
    patientInfo: {
      handler (newValue, old) {
        return newValue
      },
      deep: true
    }
  },
  components: {PatientCard, PatientStep, PatientInfo, EmptyNotice},
  methods: {
    ...mapActions('LargeScreen', ['setPatientInfo', 'currentRoom']),
    handleShowStep () {
      this.stepVisible = !this.stepVisible
    },
    setCureNo (obj) {
      this.setPatientInfo(obj)
    }
  },
  mounted () {
    this.socket = io('http://192.168.1.58:5099', {
      query: 'sendName=' + '602'
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
      console.log(data)
      if (data) {
        let arr = []
        this.setCureNo({cureNo: data.cureNo, hospitalNo: data.hospitalNo})
        $bus.$emit('getPatientInfo')
        arr.push(data)
        this.socket.emit('text', arr)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .large-screen{
    height: 100%;
    width: 100%;
    display: flex;
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
