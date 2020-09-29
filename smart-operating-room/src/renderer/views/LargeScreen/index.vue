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
export default {
  name: 'LargeScreen',
  data () {
    return {
      stepVisible: true
    }
  },
  components: {PatientCard, PatientStep, PatientInfo},
  methods: {
    handleShowStep () {
      this.stepVisible = !this.stepVisible
    }
  },
  mounted () {

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
