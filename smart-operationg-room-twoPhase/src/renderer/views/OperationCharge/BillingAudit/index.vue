<template>
  <div class="billing-audit">
    <div class="ba-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="手术日期">
          <el-date-picker
            v-model="form.opeTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="手术间">
          <el-input v-model="form.opeRoom" />
        </el-form-item>
        <el-form-item label="住院号">
          <el-input v-model="form.opeHosNo" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            查 询
          </el-button>
          <el-button
            type="info"
            plain
          >
            新 增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ba-middle">
      <div class="ba-m-left">
        <vxe-table
          stripe
          align="center"
          :data="patientList"
          size="mini"
          class="mytable-scrollbar"
          height="280px"
          auto-resize
        >
          <vxe-table-column
            field="operateDate"
            title="日期"
          />
          <vxe-table-column
            field="roomNo"
            title="手术间"
          />
          <vxe-table-column
            field="hospitalNo"
            title="住院号"
          />
          <vxe-table-column
            field="patientName"
            title="姓名"
          />
          <vxe-table-column
            field="chargeExamineStatus"
            title="状态"
          >
            <template>
              <i
                class="el-icon-success icon-status"
              />
              <!-- el-icon-circle-close -->
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="ba-m-right">
        <el-row>
          <el-col :span="8">
            <span class="label">姓名</span>
            <span class="value">{{ patientDetail.patientName }} (转入病房)</span>
          </el-col>
          <el-col :span="4">
            <span class="label">性别</span>
            <span class="value">{{ patientDetail.patientGender }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">年龄</span>
            <span class="value">{{ patientDetail.patientAge }}</span>
          </el-col>
          <el-col :span="5">
            <span class="label">患者来源</span>
            <span class="value">{{ patientDetail.patientSource }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">手术间</span>
            <span class="value">{{ patientDetail.roomNo }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">科室</span>
            <span class="value">{{ patientDetail.deptName }}</span>
          </el-col>
          <el-col :span="4">
            <span class="value">68555</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">住院/门诊号</span>
            <span class="value">{{ patientDetail.hospitalNo }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">日期</span>
            <span class="value">{{ patientDetail.operateDate }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">付费方式</span>
            <span class="value">{{ patientDetail.settlementMethod }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">已行</span>
            <span class="value">{{ patientDetail.operationName }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="label">洗手护士</span>
            <span class="value">{{ patientDetail.washNurseName }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">巡回护士</span>
            <span class="value">{{ patientDetail.runNurseName }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="label">术者</span>
            <span class="value">{{ patientDetail.surgeon }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">麻醉医生</span>
            <span class="value">{{ patientDetail.anesDoc }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="label">术后诊断</span>
            <span class="value">{{ patientDetail.diagnose }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="ba-bottom">
      <div class="ba-b-search">
        <el-form size="mini">
          <el-form-item>
            <el-select
              v-model="form.search"
              placeholder="输入关键字查询新增项目"
            >
              <el-option>1</el-option>
              <el-option>2</el-option>
              <el-option>3</el-option>
              <el-option>4</el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="ba-b-table">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          height="300px"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="序号"
          />
          <vxe-table-column
            field="userName"
            title="类别"
          />
          <vxe-table-column
            field="workDepartmentName"
            title="类别名称"
          />
          <vxe-table-column
            field="name"
            title="项目名称"
          />
          <vxe-table-column
            field="barCode"
            title="条形码"
          />
          <vxe-table-column
            field="specifications"
            title="规格"
          />
          <vxe-table-column
            field="unit"
            title="单位"
          />
          <vxe-table-column
            field="count"
            title="用量"
          />
          <vxe-table-column
            field="price"
            title="单价(元)"
          />
          <vxe-table-column
            field="totalPrice"
            title="费用(元)"
          />
          <vxe-table-column
            field="enteredBy"
            title="录入者"
          />
          <vxe-table-column
            field="entryTime"
            title="录入时间"
          />
          <vxe-table-column
            title="操作"
          >
            <template>
              <i
                class="el-icon-success icon-status"
                @click="handleDelete"
              />
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="ba-b-option">
        <el-form :inline="true">
          <el-form-item>
            <el-checkbox>已修改</el-checkbox>
          </el-form-item>
          <el-form-item>
            共7条计费项目
          </el-form-item>
          <el-form-item>
            计费总计 4296.59元
          </el-form-item>
          <el-form-item>
            <el-checkbox>标记为已审核</el-checkbox>
          </el-form-item>
        </el-form>
        <div class="button">
          <el-button
            type="primary"
            size="mini"
          >
            提 交
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import {getPatientList, getPatientDetail} from '@/api/charge'
export default {
  name: 'BillingAudit',
  data () {
    return {
      form: {
        opeTime: '',
        name: '',
        opeHosNo: '',
        opeRoom: '',
        search: ''
      },
      patientList: [],
      tableData: [{time: '2012'}],
      patientDetail: {}
    }
  },
  created () {
    this.getPatientList()
  },
  methods: {
    // 单击表格选中患者
    cellClickEvent () {

    },
    getPatientList () {
      request({
        method: 'post',
        url: getPatientList,
        data: {
          hospitalNo: this.form.opeHosNo,
          operateDate: this.form.opeTime,
          patientName: this.form.patientName,
          roomNo: this.opeRoom
        }
      }).then(res => {
        this.patientList = res.data.data
      })
    },
    getPatientInfo (obj) {
      request({
        url: getPatientDetail + '/' + this.obj.hospitalNo + '/' + this.obj.cureNo,
        method: 'get'
      }).then(res => {
        this.patientDetail = res.data.data
        this.tableData = res.data.data.chargeList
      })
    },
    handleDelete () {
      this.$confirm('是否确认删除[自粘性外科敷料(美敷)9*10cm]?', '询问', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        iconClass: 'el-icon-question'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .billing-audit{
    display: flex;
    flex-direction: column;
    .icon-status{
      color: #0CD1AA;
      font-size: 20px;
    }
    .ba-top{
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      padding: 20px;
      .el-form-item{
        margin-bottom:unset;
      }
    }
    .ba-middle{
      display: flex;
      margin: 10px 0;
      .ba-m-left{
        width: 600px;
        background: #FFFFFF;
      }
      .ba-m-right{
        flex: 1;
        background: #FFFFFF;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .el-row{
          flex: 1;
          .el-col{
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 14px;
            span{
              display: inline-block;
              &.label{
                width: 100px;
                text-align: right;
                color: #808080;
              }
              &.value{
                color: #333333;
                padding-left: 10px;
              }
            }
          }
          &:nth-child(2){
            background: #F9FAFC;
          }
          &:nth-child(4){
            background: #F9FAFC;
          }
          &:nth-child(6){
            background: #F9FAFC;
          }
        }
      }
    }
    .ba-bottom{
      flex: 1;
      background: #ffffff;
      .ba-b-search{
        padding-top: 20px;
        padding-left: 20px;
        max-width: 580px;
        .el-form-item{
          margin-bottom: 10px;
          .el-select{
            width: 100%;
          }
        }
      }
      .ba-b-option{
        .el-form{
          background: #F7F7F7;
          display: flex;
          justify-content: space-around;
        }
        .el-form-item{
          margin-bottom: unset;
          /deep/ .el-form-item__content{
            line-height: 36px;
          }
        }
        .button{
          text-align: center;
          padding: 20px 0;
        }
      }
    }
  }
</style>
