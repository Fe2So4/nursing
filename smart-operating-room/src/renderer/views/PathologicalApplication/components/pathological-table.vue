<template>
  <div class="table-container">
    <div class="table-content">
      <vxe-table
        stripe
        highlight-current-row
        ref="xTable"
        height="250"
        class="mytable-scrollbar"
        border="none"
        :data="tableData"
        @cell-dblclick="dbClickTable"
      >
        <!-- @current-change="currentChangeEvent" -->
        <vxe-table-column
          type="seq"
          title="序号"
          width="80"
        />
        <vxe-table-column
          field="realRoomNo"
          title="房间号"
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
          title="病人姓名"
        />
        <vxe-table-column
          field="hologyType"
          title="病理类别"
          :formatter="changeHologyType"
        />
        <vxe-table-column
          width="350px"
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
        @click="sendOrder"
        v-show="hologyType === '0'"
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
            :loading="btnLoad"
            size="mini"
            class="btn"
            @click="exitPathologicalTimeOut"
          >是(Y)</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="exitdialogVisible = false"
          >否(N)</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="senddialogVisible"
      top="30vh"
      width="520px"
      :before-close="handleClose"
    >
      <div class="dialog-body-span">
        <i class="el-icon-warning icon-gantanghao" />
        <span>是否发起派单？</span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <el-button
            :loading="btnLoad"
            size="mini"
            class="btn"
            @click="sendPathologicalTimeOut"
          >是(Y)</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="senddialogVisible = false"
          >否(N)</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'PathologicalTable',
  data () {
    return {
      btnLoad: false,
      hologyType: '1',
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
      hologyTypeList: [
        {
          label: '术中冰冻',
          value: '0'
        },
        {
          label: '术后病理',
          value: '1'
        }
      ],
      selectData: [],
      exitdialogVisible: false,
      senddialogVisible: false
    }
  },
  mounted () {
    Bus.$on('sub-pathological-hologyType', res => {
      this.hologyType = res
    })
    Bus.$on('user-info-initData', res => {
      this.utilsDebounce(() => {
        this.selectData = []
      }, 300)
    })
    Bus.$on('user-info-getData', res => {
      this.utilsDebounce(() => {
        this.selectData = []
      }, 300)
    })
  },
  methods: {
    changeHologyType ({ cellValue }) {
      let item = this.hologyTypeList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    handleClose () {
      this.exitdialogVisible = false
      this.senddialogVisible = false
      this.btnLoad = false
    },
    // 获取高亮行
    getCurrentEvent () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
    },
    // currentChangeEvent ({ row }) {

    // },
    dbClickTable ({ row }) {
      this.selectData = []
      this.selectData.push(row)
      Bus.$emit('pathological-table', row)
      console.log(row.historyDetails)
      this.$store.commit(
        'SAVE_USERINFOHISTORYDETAILS',
        row.historyDetails || ''
      )
      this.$store.commit('SAVE_SELECTTABLEITEM', this.selectData)
    },
    // 撤销派单
    exitOrder () {
      if (this.selectData.length === 0) {
        this.$alert('请先双击选中一条数据')
        return false
      }
      this.btnLoad = false
      this.exitdialogVisible = true
    },
    exitPathologicalTimeOut () {
      this.btnLoad = true
      this.utilsDebounce(() => {
        this.exitPathological()
      }, 300)
    },
    // 撤销之后
    exitPathological () {
      let obj = {
        pathologyId: this.selectData[0].pathologyId,
        // checkCode: this.selectData[0].checkCode
        checkCode: '9797'
      }
      this.$store.dispatch('ReqdeleteFastPathologic', obj).then(res => {
        this.exitdialogVisible = false
        if (res.data.code === 200) {
          this.openToast('success', res.data.msg)
          Bus.$emit(
            'sub-pathological-success',
            JSON.parse(JSON.stringify(this.$store.state['pathological-table'].userInfo.operSchNo))
          )
        } else {
          this.openToast('error', res.data.msg)
        }
        Bus.$emit('pathological-table-dayinBtn')
      })
    },
    // 点击派单
    sendOrder () {
      if (this.selectData.length === 0) {
        this.$alert('请先双击选中一条数据')
        return false
      }
      // Bus.$emit('pathological-table-dayinBtn')
      this.btnLoad = false
      this.getDayinStatus()
    },
    // 获取打印瓶贴状态
    getDayinStatus () {
      let obj = {
        id: this.selectData[0].pathologyId
        // id: '300000001'
      }
      this.$store.dispatch('ReqgetPrintState', obj).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.printstate !== 1) {
            this.$alert('该病理未打印瓶贴,请先打印瓶贴')
            return false
          } else {
            this.senddialogVisible = true
          }
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    sendPathologicalTimeOut () {
      this.btnLoad = true
      this.utilsDebounce(() => {
        this.sendPathological()
      }, 300)
    },
    // 发起派单
    sendPathological () {
      let obj = {
        orderId: this.selectData[0].pathologyId,
        roomCode: this.selectData[0].realRoomNo,
        realRoomCode: this.selectData[0].realRoomNo
      }

      this.$store.dispatch('ReqsendPathologicOrder', obj).then(res => {
        this.senddialogVisible = false
        if (res.data.code === 200) {
          this.openToast('success', res.data.msg)
          Bus.$emit(
            'sub-pathological-success',
            this.$store.state['pathological-table'].userInfo.operSchNo
          )
          Bus.$emit('pathological-table-dayinBtn')
        } else {
          this.openToast('error', res.data.msg)
        }
        // Bus.$emit('pathological-table-dayinBtn')
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
  },
  // 获取表格数据
  computed: {
    ListeningTableData () {
      return this.$store.state['pathological-table'].pathologicalTable
    }
  },
  watch: {
    ListeningTableData: function (newd) {
      this.tableData = newd
      if (this.IsEmpty(this.tableData)) {
        this.selectData = []
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_handle.scss';
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.btn {
  width: 90px;
  background-color: #e9edf7;
}
.btnBlue {
  width: 90px;
  // background-color: #3377ff;
  // color: #fff;
}
.table-container {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  // height: 100%;
  width: 100%;
  .table-content {
    padding: 5px 0 0 0;
    // background-color: #fff;
    @include background_color('table_bgc');
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    // padding-left: 20px;
  }
  .button-content {
    @include background_color('table_bgc');
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    text-align: right;
    // background-color: #fff;
    padding: 15px 15px 15px 15px;
  }
}
.dialog-body-span {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-gantanghao {
    font-size: 26px;
    width: 40px;
    color: #3377ff;
  }
}
.dialog-footer-div {
  display: flex;
  justify-content: center;
}
/deep/ .vxe-table .vxe-body--row.row--stripe {
  background-color: #f9fafc;
}
/deep/ th {
  color: #333333;
}
/deep/ .vxe-button--content,
.vxe-button--icon,
.vxe-button--loading-icon {
  vertical-align: unset;
}
</style>
