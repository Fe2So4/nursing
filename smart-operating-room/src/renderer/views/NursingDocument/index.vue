<template>
  <div class="nursing-container">
    <div class="nursing-container-header">
      <nursing-header />
    </div>
    <div class="nursing-container-body">
      <nursing-table />
    </div>
  </div>
</template>

<script>
import NursingHeader from './components/nursing-header'
import NursingTable from './components/nursing-table'
export default {
  name: 'NursingDocument',
  data () {
    return {

    }
  },
  components: {
    NursingHeader,
    NursingTable
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.nursing-container {
    height: 100%;
    width: 100%;
    .nursing-container-header {
      height: 85px;
    }
    .nursing-container-body {
        margin-top: 20px;
        height: calc(100% - 105px);
    }
}
</style>
