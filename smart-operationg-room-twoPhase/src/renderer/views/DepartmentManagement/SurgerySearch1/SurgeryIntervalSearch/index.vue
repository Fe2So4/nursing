<template>
  <!-- 手术接台间隔时间 -->
  <div class="nursing-recieive-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item
            label="日期"
          >
            <el-date-picker
              :clearable="false"
              style="width:178px"
              v-model="form.operationDate"
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
            <el-button
              type="info"
              plain
              @click="handleSearchTable"
            >
              导 出
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
          field="operate_date"
          title="手术日期"
        />
        <vxe-table-column
          field="room_no"
          title="手术间"
        />
        <vxe-table-column
          field="sequence_no"
          title="术序"
        />
        <vxe-table-column
          field="hospital_no"
          title="住院号"
        />
        <vxe-table-column
          field="bed_no"
          title="床号"
        />
        <vxe-table-column
          field="patient_name"
          title="患者姓名"
        />
        <vxe-table-column
          field="patient_gender"
          title="性别"
        >
          <template slot-scope="scope">
            {{ scope.row.patient_gender === '1'?'男':'女' }}
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="wardName"
          title="病区"
        />
        <vxe-table-column
          field="operation_name"
          title="手术名称"
        />
        <vxe-table-column
          field="surgeon"
          title="手术医生"
        />
        <vxe-table-column
          field="run_nurse_name"
          title="巡回护士"
        />
        <vxe-table-column
          field="wash_nurse_name"
          title="洗手护士"
        />
        <vxe-table-column
          field="start_time"
          title="接病人时间"
        />
        <vxe-table-column
          field="point_out_room_time"
          title="入手术间时间"
        />
        <vxe-table-column
          field="forwing_time"
          title="接病人时长"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SurgeryIntervalSearch',
  data () {
    return {
      form: {
        operationDate: ''
      },
      radio: '',

      tableData: []
    }
  },
  mounted () {
    this.getNewTime()
    this.handleSearchTable()
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.operationDate = this.utilsGetNewDate()
    },

    handleSearchTable () {
      // this.addVisible = true
      let obj = {
        operationDate: this.form.operationDate
      }
      this.$store.dispatch('ReqgetOperationIntervalTime', obj).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
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

<style lang="scss" scoped>
  .nursing-recieive-search{
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
        .el-button{
          vertical-align: middle;
          &:nth-last-child(1){
            color:#FF5454;
          }
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
