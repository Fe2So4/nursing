<template>
  <!-- 科室人员休假统计 -->
  <div class="nursing-record-search">
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
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="人员">
            <el-input
              style="width:178px"
              clearable
              v-model="form.userName"
            />
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              clearable
              v-model="form.leaveType"
              placeholder="请选择"
            >
              <el-option

                v-for="item in deptList"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select
              clearable
              v-model="form.approvalStatus"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button
              type="primary"
              @click="handleSearchTableList"
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
      <div class="dr-table-bottom">
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
            field="applicationDate"
            title="申请日期"
          />
          <vxe-table-column
            field="leavePersonnelName"
            title="人员"
          />
          <vxe-table-column
            field="leaveType"
            title="假别"
          />
          <vxe-table-column
            field="restStartDate"
            title="开始日期"
          />
          <vxe-table-column
            field="restStartTime"
            title="休假开始时间"
          />
          <vxe-table-column
            field="restEndDate"
            title="结束日期"
          />

          <vxe-table-column
            field="restEndTime"
            title="休假结束时间"
          />
          <vxe-table-column
            field="leaveReason"
            title="请假原因"
          />
          <vxe-table-column
            field="approvalStatusStr"
            title="审批状态"
          />
          <vxe-table-column
            field="approvedBy"
            title="审批人"
          />
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import config from '@/config/url.js'
export default {
  name: 'NursingRecordSearch',
  data () {
    return {
      deptList: [],
      showType: false,
      form: {
        approvalStatus: '',
        endDate: '',
        leaveType: '',
        startDate: '',
        userName: ''
      },
      radio: '',
      addVisible: false,
      codeVisible: false,
      options: [{
        value: '',
        label: '全部'
      }, {
        value: 0,
        label: '待审核'
      }, {
        value: 1,
        label: '通过'
      }, {
        value: 2,
        label: '未通过'
      }, {
        value: 3,
        label: '撤销待审批 '
      }, {
        value: 4,
        label: '撤销通过 '
      }, {
        value: 5,
        label: '撤销未通过 '
      }],
      tableData: []
    }
  },
  mounted () {
    this.getNewTime()
    this.getSelectList('007')
    this.handleSearchTableList()
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
      if (this.IsEmpty(this.form.userName)) {
        this.form.userName = ''
      }
      if (this.IsEmpty(this.form.approvalStatus)) {
        this.form.approvalStatus = ''
      }
      if (this.IsEmpty(this.form.leaveType)) {
        this.form.leaveType = ''
      }
      let url = `${config.api.baseURL}/ocis/departmentReport/download/downloadStatisLeave?startDate=${this.form.startDate}&endDate=${this.form.endDate}&userName=${this.form.userName}&leaveType=${this.form.leaveType}&approvalStatus=${this.form.approvalStatus}`
      this.exportExcel(url)
    },
    exportExcel (params) {
      ipcRenderer.send('download',
        JSON.stringify({
          downloadUrl: params
        }))
    },
    // 点击查询查询数据
    handleSearchTableList () {
      let obj = {
        approvalStatus: this.form.approvalStatus,
        endDate: this.form.startDate,
        leaveType: this.form.leaveType,
        startDate: this.form.startDate,
        userName: this.form.userName
      }
      this.$store.dispatch('ReqstatisLeave', obj).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.tableData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: num
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          if (num === '007') {
            this.deptList = res.data.data
          }
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
  .nursing-record-search{
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-top{
      position: relative;
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
      display: flex;
      flex-direction: column;
      // max-height: calc(100% - 202px);
      margin-top: 10px;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      overflow: hidden;
      .dr-table-top {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: #fff;
        .dr-table-top-item {
          display: flex;
          .item-left {
            width: 100px;
            font-size: 14px;
            color: #333333;
          }
          .item-right {
            display: flex;
            flex-wrap: wrap;
            .item-right-context {
              margin-left: 20px;
              span {
                font-size: 14px;
              }
              .context-title {
                cursor: pointer;
                color: #2474F8;
              }
            }
          }
        }
      }
      .dr-table-bottom {
        flex: 1;
      }
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
