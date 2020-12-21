<template>
  <!-- 房间设备使用登记 -->
  <div class="roomstatus-search">
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
            <el-date-picker
              :clearable="false"
              style="width:178px"
              v-model="form.startDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item
            label="结束时间"
          >
            <el-date-picker
              :clearable="false"
              style="width:178px"
              v-model="form.endDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item
            label="房间"
          >
            <el-input
              style="width:178px"
              clearable
              v-model="form.roomNo"
            />
          </el-form-item>
          <el-form-item
            label="设备名称"
          >
            <el-input
              style="width:178px"
              clearable
              v-model="form.deviceName"
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
          <el-form-item>
            <el-button
              @click="exitExcle"
              type="info"
              plain
            >
              导 出
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="dr-table">
      <vxe-table
        :loading="loading"
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
          field="opreDate"
          title="手术日期"
        />
        <vxe-table-column
          field="hospitalNo"
          title="住院号"
        />
        <vxe-table-column
          field="bedNo"
          title="床号"
        />
        <vxe-table-column
          field="patientName"
          title="姓名"
        />
        <vxe-table-column
          field="diagnose"
          title="诊断"
        />
        <vxe-table-column
          field="operationName"
          title="手术名称"
        />
        <vxe-table-column
          field="deviceName"
          title="设备名称"
        />
        <vxe-table-column
          field="deviceStatus"
          title="设备状态"
        />
        <vxe-table-column
          field="deviceNo"
          title="设备编号"
        />
        <vxe-table-column
          field="runNurseName"
          title="巡回护士"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import config from '@/config/url.js'
export default {
  name: 'SurgeryLevelStatistical',
  data () {
    return {
      loading: false,
      form: {
        startDate: '',
        endDate: '',
        deviceName: '',
        roomNo: ''
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
      this.form.startDate = this.utilsGetNewDate()
      this.form.endDate = this.utilsGetNewDate()
    },
    // 导出
    exitExcle () {
      if (this.IsEmpty(this.form.startDate)) {
        this.form.startDate = ''
      }

      if (this.IsEmpty(this.form.endDate)) {
        this.form.endDate = ''
      }
      if (this.IsEmpty(this.form.deviceName)) {
        this.form.deviceName = ''
      }
      if (this.IsEmpty(this.form.roomNo)) {
        this.form.roomNo = ''
      }
      let url = `${config.api.baseURL}/ocis/departmentReport/download/downRoomEquipmentUseRegis?startDate=${this.form.startDate}&endDate=${this.form.endDate}&deviceName=${this.form.deviceName}&roomNo=${this.form.roomNo}`
      this.exportExcel(url)
    },
    exportExcel (params) {
      ipcRenderer.send('download',
        JSON.stringify({
          downloadUrl: params
        }))
    },
    handleSearchTable () {
      this.loading = true
      let obj = {
        deviceName: this.form.deviceName || '',
        roomNo: this.form.roomNo || '',
        endDate: this.form.endDate,
        startDate: this.form.startDate
      }
      this.$store.dispatch('ReqroomEquipmentUseRegis', obj).then(res => {
        this.loading = false
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
