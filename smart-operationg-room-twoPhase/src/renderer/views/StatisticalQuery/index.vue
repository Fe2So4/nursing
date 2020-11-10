<template>
  <div class="statistical-query">
    <div
      class="statistical-container-header"
    >
      <statistical-header
        :is-show="isShow"
        ref="statisticalHeader"
      />
    </div>
    <div
      class="statistical-container-body"
      v-if="isShow === 0"
    >
      <statistical-table
        :table-list="tableList"
        :loading="loading"
      />
    </div>
    <div
      class="statistical-container-body"
      v-else
    >
      <StatisticalRunningTable
        :running-table-list="runningTableList"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import StatisticalHeader from './components/statistical-header'
import StatisticalTable from './components/statistical-table'
import StatisticalRunningTable from './../StatisticalQueryRunning/components/statistical-running-table'
export default {
  name: 'StatisticalQuery',
  data () {
    return {
      isShow: 0,
      tableList: [],
      runningTableList: [],
      loading: false
    }
  },
  components: {
    StatisticalHeader,
    StatisticalTable,
    StatisticalRunningTable
  },
  methods: {
    getStatisticalTable (params) {
      this.loading = true
      this.$store.dispatch('ReqstatisticalQueryr', params).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          if (res.data.data.length === 0) {
            this.openToast('warning', '暂无更多数据')
          }
          this.tableList = res.data.data
          this.runningTableList = res.data.data
        }
      })
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    }
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
      height: calc(100% - 125px);
      margin-top: 20px;
    }
}
/deep/ .vxe-button.size--mini.type--button:hover {
  background-color: #3377FF;
  color: #FFFFFF;
}
/deep/ .vxe-button--content, .vxe-button--icon, .vxe-button--loading-icon {
  vertical-align: unset;
}
</style>
