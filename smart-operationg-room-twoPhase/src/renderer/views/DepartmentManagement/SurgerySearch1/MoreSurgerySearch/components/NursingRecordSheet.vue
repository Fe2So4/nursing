<template>
  <div class="nursing-recore-sheet-container">
    <PatientInfoStep />
  </div>
</template>

<script>
import PatientInfoStep from '@/components/PatientInfoStep/patient-info-step'
export default {
  data () {
    return {

    }
  },
  components: {
    PatientInfoStep
  },
  mounted () {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.nursing-recore-sheet-container {
  width:100%;
  height: 100%;
}
</style>
