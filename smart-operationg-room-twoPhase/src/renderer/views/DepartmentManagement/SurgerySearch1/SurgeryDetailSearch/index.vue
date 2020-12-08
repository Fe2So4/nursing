<template>
  <!-- 手术明细查询 -->
  <div class="surgery-search">
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
              :clearable="false"
              style="width:178px"
              v-model="form.startDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              :clearable="false"
              v-model="form.endDate"
              style="width:178px"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="患者ID"
          >
            <el-input
              clearable
              v-model="form.patientId"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="姓名"
          >
            <el-input
              clearable
              v-model="form.patientName"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="麻醉医生"
          >
            <el-input
              clearable
              v-model="form.anesDoc"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="手术医生"
          >
            <el-input
              clearable
              v-model="form.surgeon"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="临床科室"
          >
            <el-input
              clearable
              v-model="form.deptName"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="手术间"
          >
            <el-input
              clearable
              v-model="form.opeRoom"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="手术名称"
          >
            <el-input
              clearable
              v-model="form.opeNameAfter"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="麻醉方法"
          >
            <el-input
              clearable
              v-model="form.anesName"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="护士"
          >
            <el-input
              clearable
              v-model="form.firstOpeNurse"
            />
          </el-form-item>
          <!-- <el-form-item
            v-show="showType"
            label="特殊器械"
          >
            <el-input
              clearable
              v-model="form.input"
            />
          </el-form-item> -->
          <el-form-item
            v-show="showType"
            style="margin-left:30px"
          >
            <el-radio-group v-model="form.isEmergencyDetail">
              <el-radio :label="''">
                全部
              </el-radio>
              <el-radio :label="'急诊'">
                急诊
              </el-radio>
              <el-radio :label="'择期'">
                择期
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <div class="dr-top-right">
        <el-form
          :inline="true"
          size="mini"
        >
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
      <div
        class="top-icon"
        @click="handleChangeIcon"
      >
        <i
          v-show="showType"
          class="el-icon-arrow-up"
        />
        <i
          v-show="!showType"
          class="el-icon-arrow-down"
        />
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
          field="operTime"
          title="手术日期"
        />
        <vxe-table-column
          field="opeRoom"
          title="手术间"
        />
        <vxe-table-column
          field="patientId"
          title="住院号"
        />
        <vxe-table-column
          field="bedId"
          title="床号"
        />
        <vxe-table-column
          field="patientName"
          title="患者姓名"
        />
        <vxe-table-column
          field="patientGender"
          title="性别"
        />
        <vxe-table-column
          field="age"
          title="年龄"
        />
        <vxe-table-column
          field="deptName"
          title="手术科室"
        />
        <vxe-table-column
          width="160px"
          field="opeNameBefore"
          title="拟施手术"
        />
        <vxe-table-column
          width="160px"
          field="operationName"
          title="手术名称"
        />
        <vxe-table-column
          field="anesName"
          title="麻醉方式"
        />
        <vxe-table-column
          field="isEmergencyDetail"
          title="手术类型"
        />
        <vxe-table-column
          field="notchLevel"
          title="手术级别"
        />
        <vxe-table-column
          field="inOperTime"
          title="入室时间"
        />
        <vxe-table-column
          field="anesStartTime"
          title="麻醉开始时间"
        />
        <vxe-table-column
          field="operStartTime"
          title="手术开始时间"
        />
        <vxe-table-column
          field="operEndTime"
          title="手术结束时间"
        />
        <vxe-table-column
          field="anesEndTime"
          title="麻醉结束时间"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import config from '@/config/url.js'
export default {
  name: 'SurgeryDetailSearch',
  data () {
    return {
      loading: false,
      showType: false,
      form: {
        startDate: '',
        endDate: '',
        patientId: '',
        patientName: '',
        anesDoc: '',
        surgeon: '',
        deptName: '',
        opeRoom: '',
        opeNameAfter: '',
        anesName: '',
        firstOpeNurse: '',

        isEmergencyDetail: ''
      },

      tableData: []
    }
  },

  mounted () {
    // 获取当前时间
    this.getNewTime()
    this.handleSearchTable()
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.startDate = this.utilsGetNewDate()
      this.form.endDate = this.utilsGetNewDate()
    },
    // 点击图标切换显示
    handleChangeIcon () {
      this.showType = !this.showType
    },
    // 查询
    handleSearchTable () {
      this.loading = true
      // this.addVisible = true
      let obj = {
        startDate: this.form.startDate || '',
        endDate: this.form.endDate || '',
        patientId: this.form.patientId || '',
        patientName: this.form.patientName || '',
        anesDoc: this.form.anesDoc || '',
        surgeon: this.form.surgeon || '',
        deptName: this.form.deptName || '',
        opeRoom: this.form.opeRoom || '',
        opeNameAfter: this.form.opeNameAfter || '',
        anesName: this.form.anesName || '',
        firstOpeNurse: this.form.firstOpeNurse || '',

        isEmergencyDetail: this.form.isEmergencyDetail || ''
      }
      this.$store.dispatch('ReqgetoperationInfoDetal', obj).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          this.tableData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 导出
    handleExit () {
      let obj = {
        startDate: this.form.startDate || '',
        endDate: this.form.endDate || '',
        patientId: this.form.patientId || '',
        patientName: this.form.patientName || '',
        anesDoc: this.form.anesDoc || '',
        surgeon: this.form.surgeon || '',
        deptName: this.form.deptName || '',
        opeRoom: this.form.opeRoom || '',
        opeNameAfter: this.form.opeNameAfter || '',
        anesName: this.form.anesName || '',
        firstOpeNurse: this.form.firstOpeNurse || '',

        isEmergencyDetail: this.form.isEmergencyDetail || ''
      }
      this.$store.dispatch('reqdownloadOperationInfoDetal', obj).then(res => {
        this.loading = false
        if (res.data.code === 200) {

        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 导出
    exitExcle () {
      if (this.IsEmpty(this.form.startDate)) {
        this.form.startDate = ''
      }

      if (this.IsEmpty(this.form.endDate)) {
        this.form.endDate = ''
      }
      if (this.IsEmpty(this.form.patientId)) {
        this.form.patientId = ''
      }
      if (this.IsEmpty(this.form.patientName)) {
        this.form.patientName = ''
      }
      if (this.IsEmpty(this.form.anesDoc)) {
        this.form.anesDoc = ''
      }
      if (this.IsEmpty(this.form.surgeon)) {
        this.form.surgeon = ''
      }
      if (this.IsEmpty(this.form.deptName)) {
        this.form.deptName = ''
      }
      if (this.IsEmpty(this.form.opeRoom)) {
        this.form.opeRoom = ''
      }
      if (this.IsEmpty(this.form.opeNameAfter)) {
        this.form.opeNameAfter = ''
      }
      if (this.IsEmpty(this.form.anesName)) {
        this.form.anesName = ''
      }
      if (this.IsEmpty(this.form.firstOpeNurse)) {
        this.form.firstOpeNurse = ''
      }
      if (this.IsEmpty(this.form.isEmergencyDetail)) {
        this.form.isEmergencyDetail = ''
      }

      let url = `${config.api.baseURL}/ocis/departmentReport/download/downloadOperationInfoDetal?startDate=${this.form.startDate}&endDate=${this.form.endDate}&patientId=${this.form.patientId}&patientName=${this.form.patientName}&anesDoc=${this.form.anesDoc}&surgeon=${this.form.surgeon}&deptName=${this.form.deptName}&opeRoom=${this.form.opeRoom}&opeNameAfter=${this.form.opeNameAfter}&anesName=${this.form.anesName}&firstOpeNurse=${this.form.firstOpeNurse}&isEmergencyDetail=${this.form.isEmergencyDetail}`
      // let url = 'http://192.168.1.80:2080/ocis/departmentReport/download/downloadOperationInfoDetal?startDate=2017-11-16&endDate=2020-12-07&patientId=&patientName=&anesDoc=&surgeon=&deptName=&opeRoom=&opeNameAfter=&anesName=&firstOpeNurse=&isEmergencyDetail='
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
  .surgery-search{
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-top{
      position: relative;
      padding: 20px 30px 0px 40px;
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
          margin-bottom: 15px;
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
        bottom: 15px;
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
/deep/.dr-top-left .el-form-item__content .el-input--mini{
  width: 178px;
}
</style>
