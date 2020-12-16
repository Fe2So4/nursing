<template>
  <!-- 多次手术查询 -->
  <div class="surgery-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item
            label="开始时间"
          >
            <!-- readonly -->
            <el-date-picker
              style="width:178px"
              v-model="form.startTime"
              type="date"
              :clearable="false"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              readonly
              :clearable="false"
              v-model="form.endTime"
              style="width:178px"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSearchTable"
            >
              查 询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="dr-table">
      <vxe-table
        align="center"
        :data="tableData"
        class="mytable-scrollbar"
        size="mini"
        height="auto"
        auto-resize
        stripe
      >
        <vxe-table-column
          width="80px"
          type="seq"
          title="序号"
        />
        <vxe-table-column
          width="200px"
          field="patient_name"
          title="病患姓名"
        />
        <vxe-table-column
          width="200px"
          field="hospital_no"
          title="病患住院号"
        />
        <vxe-table-column
          title="手术申请/护理记录单明细"
        >
          <template v-slot="{row}">
            <el-button
              @click="handleShowDio(row)"
              type="text"
            >
              <div>手术申请:{{ row.operate_date }} {{ row.diagnosis }}</div>
              <div>
                护理记录单:<span style="text-decoration:underline">{{ row.start_time }}-{{ row.specific_time }}, 实际手术:{{ row.operation_name }}</span>
              </div>
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="提示"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <NursingRecordSheet />
    </el-dialog>
  </div>
</template>

<script>
import NursingRecordSheet from '@/views/NursingEmr/RecordNursing/index'
export default {
  name: 'MoreSurgerySearch',
  data () {
    return {
      dialogVisible: false,
      form: {
        startTime: '',
        endTime: '',
        input: ''
      },
      tableData: []
    }
  },
  components: {
    NursingRecordSheet
  },
  mounted () {
    this.getNewTime()
    this.handleSearchTable()
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.startTime = this.utilsGetNewDate()
      this.form.endTime = this.utilsGetNewDate()
    },
    // 查询数据
    handleSearchTable () {
      let obj = {
        startTime: this.form.startTime || '',
        endTime: this.form.endTime || ''
      }
      this.$store.dispatch('ReqgetTimesOperations', obj).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.tableData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击
    handleShowDio (row) {
      console.log(row)
      this.dialogVisible = true
    },
    // 关闭
    handleClose () {
      this.dialogVisible = false
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

<style lang="scss" scoped>
/deep/.el-button.el-button--text {
        color: #606266;
        span {
          border-bottom: 1px solid #606266;
        }
      }
  .surgery-search{
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-top{
      padding: 20px 30px 10px 40px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      .dr-top-left{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .el-form{
          /deep/.el-form-item{
          margin-bottom: 10px;
          .el-select{
            max-width: 178px;
          }
        }
        }

      }
      .dr-top-right{
        display: flex;
        .el-form {
          .el-form-item{
          margin-bottom: 10px;
          .el-select{
            max-width: 178px;
          }
        }
        }
      }
    }
    .dr-table{
      flex: 1;
      // max-height: calc(100% - 202px);
      margin-top: 10px;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      overflow: hidden;
      .option-line{
          // vertical-align: middle;
          // font-size: 20px;
          display: inline-block;
        }
    }
    .dr-pagination{
      margin-top: 10px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
    }
  }
</style>
