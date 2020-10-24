<template>
  <div class="large-screen">
    <div class="pt-card">
      <patient-card @handleShowStep="handleShowStep" />
    </div>
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
</template>

<script>
import PatientCard from './components/patient-card'
import PatientStep from './components/patient-step'
import PatientInfo from './components/patient-info'
import io from 'socket.io-client'
export default {
  name: 'LargeScreen',
  data () {
    return {
      stepVisible: true,
      socket: null
    }
  },
  components: {PatientCard, PatientStep, PatientInfo},
  methods: {
    handleShowStep () {
      this.stepVisible = !this.stepVisible
    }
  },
  mounted () {
    // create (loginUserNum) {
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
        arr.push(data)
        this.socket.emit('text', arr)
      }
    })
  }
  // getInstance () {
  //   return this.instance
  // },
  // close () {
  //   this.instance.close()
  //   this.instance = null
  // }
  // }
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
</style>
