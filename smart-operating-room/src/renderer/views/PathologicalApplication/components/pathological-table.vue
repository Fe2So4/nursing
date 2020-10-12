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
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="seq"
          width="80"
        />
        <vxe-table-column
          field="name"
          title="病理号"
        />
        <vxe-table-column
          field="sex"
          title="住院号"
        />
        <vxe-table-column
          field="age"
          title="病人名称"
        />
        <vxe-table-column
          field="age"
          title="病理类别"
        />
        <vxe-table-column
          field="age"
          title="手术名称及所见"
        />
        <vxe-table-column
          field="age"
          title="申请时间"
        />
        <vxe-table-column
          field="address"
          title="送检医师"
          show-overflow
        />
      </vxe-table>
    </div>
    <div class="button-content">
      <vxe-button
        @click="exitOrder"
        class="btn"
        size="mini"
        status="my-purple"
      >
        撤销申请单
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
      >
        派 单
      </vxe-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="exitdialogVisible"
      top="30vh"
      width="520px"
      :before-close="handleClose"
    >
      <div class="dialog-body-span">
        <i class="el-icon-warning icon-gantanghao" />
        <span>是否发起撤销？</span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <el-button
            size="mini"
            class="btn"
            @click="exitdialogVisible = false"
          >是(Y)</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="exitdialogVisible = false"
          >否(N)</el-button>
        </div>
      </span>
    </el-dialog>
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
      ],
      selectData: [],
      exitdialogVisible: false
    }
  },
  methods: {
    handleClose () {

    },
    // 获取高亮行
    getCurrentEvent () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
    },
    currentChangeEvent ({ row }) {
      this.selectData = []
      this.selectData.push(row)
    },
    // 撤销派单
    exitOrder () {
      this.exitdialogVisible = true
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
        background-color: #fff;
        padding: 35px 15px 15px 15px;
    }
}
.dialog-body-span {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-gantanghao {
    font-size: 26px;
    width: 40px;
    color: #3377FF;
  }
}
.dialog-footer-div {
  display: flex;
  justify-content: center;
}
</style>
