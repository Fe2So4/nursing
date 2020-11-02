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
        <patient-info />
      </div>
    </div>
    <div v-else>
      请在pda上绑定患者
    </div>
  </div>
</template>

<script>
import PatientCard from './components/patient-card'
import PatientStep from './components/patient-step'
import PatientInfo from './components/patient-info'
import io from 'socket.io-client'
import {mapActions, mapState} from 'vuex'
import $bus from '@/utils/busScreen'
export default {
  name: 'LargeScreen',
  data () {
    return {
      stepVisible: true,
      socket: null
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
  components: {PatientCard, PatientStep, PatientInfo},
  methods: {
    ...mapActions('LargeScreen', ['setPatientInfo']),
    handleShowStep () {
      this.stepVisible = !this.stepVisible
    },
    print () {
      $bus.$emit('print')
    },
    setCureNo (obj) {
      this.setPatientInfo(obj)
    }
  },
  mounted () {
    this.socket = io('http://192.168.1.106:5099', {
      query: 'sendName=' + '608'
    })
    this.socket.on('connect', () => {
      console.log('socket.io connected')
    })
    this.socket.on('reconnect_error', e => {
      console.error(e)
    })
    this.socket.on('disconnect', () => {
      console.log('socket.io disconnect')
    })
    this.socket.on('push_event', (data) => {
      console.log(data)
      if (data) {
        let arr = []
        this.setCureNo({cureNo: data.cureNo, hospitalNo: data.hospitalNo})
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
  }
</style>
