<template>
  <!-- 每日房间结束时间查询 -->
  <div class="daily-endtime-search">
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
              style="width:178px"
              :clearable="false"
              v-model="form.date"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSearchData"
            >
              查 询
            </el-button>
            <el-button
              type="info"
              plain
              @click="exitExcle"
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
          type="seq"
          title="序号"
        />
        <vxe-table-column
          field="opeRoom"
          title="手术房间"
        />
        <vxe-table-column
          field="startTime"
          title="日期"
        />
        <vxe-table-column
          field="outOperTime"
          title="最后结束时间"
        />
        <vxe-table-column
          field="surgeon"
          title="主刀医生"
        />
        <vxe-table-column
          field="deptOperName"
          title="科室"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import config from '@/config/url.js'
export default {
  name: 'DailyEndTimeSearch',
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
    this.handleSearchData()
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.date = this.utilsGetNewDate()
    },
    // 查数据
    handleSearchData () {
      let obj = {
        date: this.form.date || ''
      }
      this.$store.dispatch('ReqgetEveryDayRoomEndTime', obj).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 导出
    exitExcle () {
      if (this.IsEmpty(this.form.date)) {
        this.form.date = ''
      }

      let url = `${config.api.baseURL}/ocis/departmentReport/download/downloadEveryDayRoomEndTime?date=${this.form.date}`
      this.exportExcel(url)
    },
    exportExcel (params) {
      ipcRenderer.send('download',
        JSON.stringify({
          downloadUrl: params
        }))
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
  .daily-endtime-search{
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-top{
      padding: 20px 30px 0 40px;
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
