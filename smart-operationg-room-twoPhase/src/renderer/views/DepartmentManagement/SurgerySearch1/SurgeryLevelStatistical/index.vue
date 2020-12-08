<template>
  <!-- 手术分级统计 -->
  <div class="roomstatus-search">
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
              v-model="form.date"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
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
          field="deptName"
          title="科室"
        />
        <vxe-table-column
          field="operLevelOneCount"
          title="手术级别一级"
        />
        <vxe-table-column
          field="operLevelTwoCount"
          title="手术级别二级"
        />
        <vxe-table-column
          field="operLevelThreeCount"
          title="手术级别三级"
        />
        <vxe-table-column
          field="operLevelFourCount"
          title="手术级别四级"
        />
        <vxe-table-column
          field="emergencyTreatmentCount"
          title="手术类型急诊"
        />
        <vxe-table-column
          field="electiveSurgeryCount"
          title="手术类型择期"
        />
        <vxe-table-column
          field="rescueCount"
          title="抢救"
        />
        <vxe-table-column
          field="totalCount"
          title="合计"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SurgeryLevelStatistical',
  data () {
    return {

      form: {
        date: ''
      },

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
      this.form.date = this.utilsGetMoon()
    },
    // 查询数据
    handleSearchTable () {
      let obj = {
        date: this.form.date || ''
      }
      this.$store.dispatch('ReqoperLevelStatis', obj).then(res => {
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
  .roomstatus-search{
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-top{
      position: relative;
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
        margin-right: 40px;
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
      .top-icon {
        cursor: pointer;
        font-weight: bold;
        color: #4E91FF;
        border:2px solid #4E91FF;
        text-align: center;
        line-height: 20px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        right: 30px;
        bottom: 10px;
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
