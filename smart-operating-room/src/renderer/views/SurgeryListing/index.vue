<template>
  <div class="surgery-container">
    <div class="surgery-container-header">
      <surgery-header />
    </div>
    <div class="surgery-container-body">
      <surgery-table />
    </div>
  </div>
</template>

<script>
import SurgeryHeader from './components/surgery-header'
import SurgeryTable from './components/surgery-table'
export default {
  name: 'SurgeryListing',
  data () {
    return {

    }
  },
  components: {
    SurgeryHeader,
    SurgeryTable
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.surgery-container {
    width: 100%;
    height: 100%;
    .surgery-container-header {
      height: 85px;
    }
    .surgery-container-body {
      height: calc(100% - 125px);
      margin-top: 20px;
    }
}

</style>
