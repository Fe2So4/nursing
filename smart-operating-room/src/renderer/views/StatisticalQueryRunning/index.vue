<template>
  <div class="statistical-query">
    <div class="statistical-container-header">
      <statistical-header />
    </div>
    <div class="statistical-container-body">
      <statistical-table />
    </div>
  </div>
</template>

<script>
import StatisticalHeader from './components/statistical-running-header'
import StatisticalTable from './components/statistical-running-table'
export default {
  name: 'StatisticalQueryRunning',
  data () {
    return {

    }
  },
  components: {
    StatisticalHeader,
    StatisticalTable
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.statistical-query {
    width: 100%;
    min-width: 1400px;
    height: 100%;
    .statistical-container-header {
      height: 85px;
    }
    .statistical-container-body {
      height: calc(100% - 105px);
      margin-top: 20px;
    }
}
</style>
