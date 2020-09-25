<template>
  <div class="large-screen">
    <div class="pt-card">
      <patient-card />
    </div>
    <div class="pt-step">
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
  name:'LargeScreen',
  data(){
    return {

    }
  },
  components:{PatientCard,PatientStep,PatientInfo},
  methods:{

  },
  mounted(){
  
  }
}
</script>

<style lang="scss" scoped>
  .large-screen{
    height: 100%;
    width: 100%;
    .pt-card{

    }
    .pt-step{
      margin:20px 0;
    }
    .pt-info{
      height: calc(100% - 275px);
    }
  }
</style>