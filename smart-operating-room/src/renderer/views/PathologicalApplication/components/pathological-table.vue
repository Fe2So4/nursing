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
          field="pathologyId"
          title="病理号"
        />
        <vxe-table-column
          field="hospitalNo"
          title="住院号"
        />
        <vxe-table-column
          field="patientName"
          title="病人名称"
        />
        <vxe-table-column
          field="hologyType"
          title="病理类别"
        />
        <vxe-table-column
          field="opsName"
          title="手术名称及所见"
        />
        <vxe-table-column
          field="createTime"
          title="申请时间"
        />
        <vxe-table-column
          field="checkName"
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
        // {
        //   pathologyId: '', // 病理号
        //   hospitalNo: '', // 住院号
        //   patientName: '', // 病人名称
        //   hologyType: '', // 病理类别
        //   opsName: '', // 手术名称及所见
        //   createTime: '', // 申请时间
        //   checkName: '', // 送检医师工号
        //   fixed: ''// 固定液
        // }
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
      this.$store.commit('SAVE_SELECTTABLEITEM', this.selectData)
    },
    // 撤销派单
    exitOrder () {
      this.exitdialogVisible = true
    }
  },
  // 获取表格数据
  computed: {
    ListeningTableData () {
      return this.$store.state['pathological-table'].userInfo
    }
  },
  watch: {
    ListeningTableData: function (newd) {
      this.tableData = newd.pathologys
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
