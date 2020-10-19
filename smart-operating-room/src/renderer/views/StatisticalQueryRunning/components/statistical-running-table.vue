<template>
  <div class="statistical-table">
    <div class="table-conten">
      <vxe-table
        highlight-current-row
        ref="xTable"
        class="mytable-scrollbar"
        height="100%"
        border="none"
        :data="tableData"
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="seq"
          width="50"
        />
        <vxe-table-column
          field="name"
          title="住院号"
        />
        <vxe-table-column
          field="sex"
          title="患者姓名"
        />
        <vxe-table-column
          field="age"
          title="手术时间"
        />
        <vxe-table-column
          field="age"
          title="麻醉医师"
        />
        <vxe-table-column
          field="age"
          title="病区 科室"
        />
        <vxe-table-column
          field="age"
          title="洗手护士"
        />
        <vxe-table-column
          field="age"
          title="主刀医师"
        />
        <vxe-table-column
          field="age"
          title="巡回护士"
        />
        <vxe-table-column
          field="age"
          title="进手术室时间"
        />
        <vxe-table-column
          field="age"
          title="出手术室前时间"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticalTable',
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }

      ],
      pageItem: {},
      busy: true,
      currentRow: {}
    }
  },
  methods: {
    load () {
      console.log(132)
      this.getTableData(this.pageItem)
    },
    // 获取数据
    getTableData (res) {
      this.$store.dispatch('ReqNursingDocumentTable', res).then(result => {
        console.log(result)
        this.tableData.push(...result.data.data.list)
        this.pageItem.pageIndex++
        this.busy = false
      })
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },

    dbSelected ({row}) {
      this.$router.push({
        path: '/home/nursing-document-list/security-check',
        query: {
          row
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.statistical-table {
    height: 100%;
    padding-left: 20px;
    background-color: #fff;
    width: 100%;
    .table-conten {
      height: 100%;
    }
}
/deep/ .table-conten .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}
/deep/ .el-table__header-wrapper {
    position: fixed;
    z-index: 1;
}
/deep/ .el-table__body-wrapper {
  margin-top: 50px;
}
</style>
