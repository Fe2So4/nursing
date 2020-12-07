<template>
  <!-- 手术间利用率统计 -->
  <div class="roomstatus-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item
            label="开始日期"
          >
            <el-date-picker
              style="width:178px"
              v-model="form.startDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item
            label="结束日期"
          >
            <el-date-picker
              style="width:178px"
              v-model="form.endDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item style="margin-left:10px">
            <span style="font-weight:700;color:#606266">每周按</span>
            <el-input-number
              :controls="false"
              v-model="form.denominator"
              style="width:64px;"
            />
            <span style="font-weight:700;color:#606266">小时计算使用率</span>
          </el-form-item>

          <el-form-item style="margin-left:10px">
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
      <div class="dr-table-left">
        <Bar />
      </div>
      <div class="dr-table-right">
        <Bar2 />
      </div>
    </div>
  </div>
</template>

<script>
import Bar from './components/bar'
import Bar2 from './components/bar2'
export default {
  name: 'InteroperativeUtilization',
  data () {
    return {

      form: {
        startDate: '',
        endDate: '',
        denominator: 50
      },
      tableData: []
    }
  },
  components: {
    Bar, Bar2
  },
  mounted () {
    this.getNewTime()
    this.handleSearchTable()
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.startDate = this.utilsGetNewDate()
      this.form.endDate = this.utilsGetNewDate()
    },
    // 查询数据
    handleSearchTable () {
      let obj = {
        startDate: this.form.startDate || '',
        endDate: this.form.endDate || '',
        denominator: this.form.denominator
      }
      this.$store.dispatch('ReqoperRoomUseStatis', obj).then(res => {
        console.log(res)
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
      display: flex;
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
      .dr-table-left {
        flex: 1;
        padding: 20px;
      }
      .dr-table-right {
        flex: 1;
        padding: 20px;
      }
    }
  }
</style>
