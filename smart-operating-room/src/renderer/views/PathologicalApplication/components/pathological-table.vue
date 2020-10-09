<template>
  <div class="table-container">
      <div class="table-content">
          <vxe-table
            highlight-current-row
            ref="xTable"
            height="300"
            class="mytable-scrollbar"
            border="none"
            :data="tableData"
            @current-change="currentChangeEvent">
            <vxe-table-column  type="seq" width="80"></vxe-table-column>
            <vxe-table-column field="name" title="病理号"></vxe-table-column>
            <vxe-table-column field="sex" title="住院号"></vxe-table-column>
            <vxe-table-column field="age" title="病人名称"></vxe-table-column>
            <vxe-table-column field="age" title="病理类别"></vxe-table-column>
            <vxe-table-column field="age" title="手术名称及所见"></vxe-table-column>
            <vxe-table-column field="age" title="申请时间"></vxe-table-column>
            <vxe-table-column field="address" title="送检医师" show-overflow></vxe-table-column>
          </vxe-table>
      </div>
      <div class="button-content">
              <vxe-button  class="btn" size="mini">撤销申请单</vxe-button>
              <vxe-button  class="btn" size="mini">派 单</vxe-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PathologicalTable',
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
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .table-content .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}

/deep/ .vxe-header--row {
    background-color: #fff;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
.btn {
    width: 90px;
    background-color:#E9EDF7
} 
.btnBlue {
    width: 90px;
    background-color:#3377FF;
    color: #fff;
}
.table-container {
    // height: 100%;
    width: 100%;
    .table-content {
        // padding-left: 20px;
    }
    .button-content {
        text-align: right;
        margin-top: 20px;
        background-color: #fff;
        padding: 15px;
    }
}
</style>