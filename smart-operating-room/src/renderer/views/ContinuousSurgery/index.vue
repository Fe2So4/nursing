<template>
  <div class="continuous-query">
    <div class="continuous-header">
      <continuous-header :is-show="isShow" />
    </div>
    <div
      class="continuous-body"
      v-if="isShow === 0"
    >
      <continuous-table
        :table-list="tableList"
        :loading="loading"
      />
    </div>
    <div
      class="continuous-body"
      v-else
    >
      <SurgeryTable :surgery-table-list="surgeryTableList" />
    </div>
  </div>
</template>

<script>
import ContinuousHeader from './components/continuous-header'
import ContinuousTable from './components/continuous-table'
import SurgeryTable from './../SurgeryListing/components/surgery-table'
export default {
  name: 'ContinuousHSurgery',
  data () {
    return {
      isShow: 0,
      tableList: [],
      surgeryTableList: [],
      loading: false
    }
  },
  mounted () {
    console.log(this.isShow)
  },
  components: {
    ContinuousHeader,
    ContinuousTable,
    SurgeryTable
  },
  methods: {
    getContinuousTable (params) {
      this.loading = true
      this.$store.dispatch('ReqcontinuousOperation', params).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          if (res.data.data.length === 0) {
            this.openToast('warning', '暂无更多数据')
          }
          this.tableList = res.data.data
          this.surgeryTableList = res.data.data
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
.continuous-query {
    width: 100%;
    height: 100%;
    .continuous-header {
      height: 85px;
    }
    .continuous-body {
      height: calc(100% - 125px);
      margin-top: 20px;
    }
}
/deep/ .vxe-button.size--mini.type--button:hover {
  background-color: #3377FF;
  color: #FFFFFF;
}
</style>
