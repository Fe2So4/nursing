<template>
  <div class="continuous-query">
    <div class="continuous-header">
      <continuous-header />
    </div>
    <div class="continuous-body">
      <continuous-table />
    </div>
  </div>
</template>

<script>
import ContinuousHeader from './components/continuous-header'
import ContinuousTable from './components/continuous-table'
export default {
  name: 'ContinuousHSurgery',
  data () {
    return {

    }
  },
  components: {
    ContinuousHeader,
    ContinuousTable
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.continuous-query {
    width: 100%;
    height: 100%;
    .continuous-header {
      height: 85px;
    }
    .continuous-body {
      height: calc(100% - 105px);
      margin-top: 20px;
    }
}
</style>
