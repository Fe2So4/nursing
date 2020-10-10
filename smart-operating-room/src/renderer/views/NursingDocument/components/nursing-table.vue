<template>
  <div class="nursing-table">
    <div class="table-conten">
      <vxe-table
        highlight-current-row
        ref="xTable"
        class="mytable-scrollbar"
        height="100%"
        border="none"
        :data="tableData"
        @cell-dblclick="dbSelected"
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="seq"
          width="80"
        />
        <vxe-table-column
          field="name"
          title="住院号"
        />
        <vxe-table-column
          field="sex"
          title="病人姓名"
        />
        <vxe-table-column
          field="age"
          title="单据名称"
        />
        <vxe-table-column
          field="age"
          title="单据类别"
        />
        <vxe-table-column
          field="age"
          title="创建时间"
        />
        <vxe-table-column
          field="address"
          title="创建人"
          show-overflow
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NursingTable',
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

      ]
    }
  },
  methods: {
    // 获取高亮行
    getCurrentEvent () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
    },
    currentChangeEvent ({ row }) {
      console.log('行选中事件')
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
/deep/ .table-conten .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}
.table-conten {
  height: 100%;
}
.nursing-table {
    padding-left: 20px;
    background-color: #fff;
    width: 100%;
    height: 100%;
}
</style>
