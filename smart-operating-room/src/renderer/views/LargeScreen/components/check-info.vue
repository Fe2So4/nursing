<template>
  <div class="check-info">
    <security-check />
    <instruments-inventory />
    <nursing-record />
    <intraoperative-pathology />
  </div>
</template>

<script>
import SecurityCheck from './security-check'
import InstrumentsInventory from './instruments-inventory'
import NursingRecord from './nursing-record-sheet'
import IntraoperativePathology from './intraoperative-pathology'
export default {
  name: 'CheckInfo',
  data () {
    return {

    }
  },
  components: {
    SecurityCheck, InstrumentsInventory, NursingRecord, IntraoperativePathology
  }
}
</script>

<style lang="scss" scoped>
  .check-info{
    display: flex;
    height: 100%;
  }
</style>>
