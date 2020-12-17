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
            value-format="YYYY-mm-dd"
            format="YYYY-mm-dd"
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
          <el-button
            type="primary"
            @click="getPatientList"
          >
            查 询
          </el-button>
          <!-- <el-button
            type="info"
            plain
          >
            新 增
          </el-button> -->
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
          highlight-current-row
          highlight-hover-row
          class="mytable-scrollbar"
          height="280px"
          @cell-click="handleSeleceCurrentPatient"
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
            <!-- class="el-icon-success icon-status" -->
            <template v-slot="{ row }">
              <i
                :class="[row.chargeExamineStatus==='1' ? 'el-icon-success icon-status' : 'el-icon-error icon-status-close']"
              />
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
          <el-col :span="8">
            <span class="label">洗手护士</span>
            <span class="value">{{ patientDetail.washNurseName }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">巡回护士</span>
            <span class="value">{{ patientDetail.runNurseName }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
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
        <el-form
          size="mini"
          :inline="true"
        >
          <el-form-item>
            <el-select
              v-model="form.search"
              clearable
              @change="handleChangeCharge"
              placeholder="输入关键字查询新增项目"
            >
              <el-option
                v-for="item in chargeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSubmitCharge"
            >
              添加收费项目
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ba-b-table">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          highlight-current-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          height="300px"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="序号"
            width="60"
          />
          <vxe-table-column
            field="categoryId"
            title="类别"
          />
          <vxe-table-column
            field="category"
            title="类别名称"
          />
          <vxe-table-column
            field="name"
            title="项目名称"
          />
          <vxe-table-column
            field="barCode"
            title="条形码"
            width="80"
          />
          <vxe-table-column
            field="specifications"
            title="规格"
          />
          <vxe-table-column
            field="unit"
            title="单位"
            width="60"
          />
          <vxe-table-column
            field="count"
            title="用量"
          >
            <template v-slot="{row}">
              <el-input-number
                v-model="row.count"
                size="mini"
                controls
                :disabled="row.status===1 ? true : false "
                controls-position="right"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="price"
            title="单价(元)"
            width="80"
          />
          <vxe-table-column
            field="totalPrice"
            title="费用(元)"
            width="80"
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
            width="80"
          >
            <template v-slot="{row}">
              <i
                :class="[row.status===1 ? 'el-icon-success icon-status':'el-icon-error icon-status-close']"
                @click="handleDelete(row)"
              />
              <!-- @click="changeChargeStatus(row.id)" -->
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
            共 {{ tableData.length }} 条计费项目
          </el-form-item>
          <el-form-item>
            计费总计 {{ patientDetail.totalPrice ? patientDetail.totalPrice : 0 }} 元
          </el-form-item>
          <el-form-item>
            <el-checkbox
              v-model="checked"
              :disabled="currentCharge.status===1?true:false"
              @change="handleChangeCheckBox"
            >
              <!-- :checked="currentCharge.checked===1?true:false" -->
              {{ currentCharge.status === 1 ? '已审核' : '标记为已审核' }}
            </el-checkbox>
          </el-form-item>
        </el-form>
        <div class="button">
          <!-- <el-button
            type="primary"
            size="mini"
          >
            退 费
          </el-button> -->
          <el-button
            type="primary"
            size="mini"
            @click="handleSubmitEdit"
            v-show="currentCharge.status === 0"
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
import {getPatientList, getPatientDetail, getChargeItem, changeChargeStatus, deleteChargeItem, saveChargeItem} from '@/api/charge'
// import moment from 'moment'
export default {
  name: 'BillingAudit',
  data () {
    return {
      form: {
        // opeTime: moment(new Date()).format('YYYY-MM-DD'),
        opeTime: '2020-08-06',
        name: '',
        opeHosNo: '',
        opeRoom: '',
        search: ''
      },
      checked: false,
      patientList: [],
      tableData: [],
      patientDetail: {},
      chargeList: [],
      currentCharge: {}
    }
  },
  watch: {
    currentCharge: {
      handler (val) {
        return val
      },
      deep: true
    }
  },
  created () {
    this.getPatientList()
    this.getChargeItem()
  },
  methods: {
    // 选中当前收费
    cellClickEvent ({row}) {
      // console.log(row)
      this.currentCharge = row
      this.checked = row.checked
    },
    handleSubmitEdit () {
      if (this.currentCharge.checked) {
        this.changeChargeStatus(this.currentCharge.id)
      } else {
        request(
          {
            url: saveChargeItem,
            method: 'post',
            data: {
              chargeBasicId: this.currentCharge.chargeBasicId,
              count: this.currentCharge.count,
              cureNo: this.patientDetail.cureNo,
              hospitalNo: this.patientDetail.hospitalNo,
              id: this.currentCharge.id
            }
          }
        ).then(res => {
          if (res.data.code === 200) {
            this.$message({message: '修改成功', type: 'success'})
            this.getPatientInfo({hospitalNo: this.patientDetail.hospitalNo, cureNo: this.patientDetail.cureNo})
          }
        })
      }
    },
    handleSubmitCharge () {
      request(
        {
          url: saveChargeItem,
          method: 'post',
          data: {
            chargeBasicId: this.form.search,
            count: 0,
            cureNo: this.patientDetail.cureNo,
            hospitalNo: this.patientDetail.hospitalNo
          }
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.$message({message: '新增成功', type: 'success'})
          this.getPatientInfo({hospitalNo: this.patientDetail.hospitalNo, cureNo: this.patientDetail.cureNo})
        }
      })
    },
    // 单击表格选中患者
    handleSeleceCurrentPatient ({row}) {
      this.getPatientInfo({hospitalNo: row.hospitalNo, cureNo: row.cureNo})
    },
    changeChargeStatus (id) {
      request({
        method: 'post',
        url: changeChargeStatus,
        data: {
          cureNo: this.patientDetail.cureNo,
          hospitalNo: this.patientDetail.hospitalNo,
          id: id
        }
      }).then(res => {
        if (res.data.code === 200) {
          // this.$message({message: '审核成功', type: 'success'})
          this.getPatientInfo({hospitalNo: this.patientDetail.hospitalNo, cureNo: this.patientDetail.cureNo})
        }
      })
    },
    handleChangeCheckBox (val) {
      this.currentCharge.checked = val
    },
    handleChangeCharge (item) {
      this.chargeList.forEach(_item => {
        if (_item.code === item) {
          console.log(item)
        }
      })
    },
    getChargeItem () {
      request({
        method: 'get',
        url: getChargeItem,
        params: {
          keyword: this.form.search
        }
      }).then(res => {
        this.chargeList = res.data.data
      })
    },
    getPatientList () {
      request({
        method: 'post',
        url: getPatientList,
        data: {
          hospitalNo: this.form.opeHosNo,
          operateDate: this.form.opeTime,
          patientName: this.form.name,
          roomNo: this.form.opeRoom
        }
      }).then(res => {
        this.patientList = res.data.data
      })
    },
    getPatientInfo (obj) {
      request({
        url: getPatientDetail + '/' + obj.hospitalNo + '/' + obj.cureNo,
        method: 'get'
      }).then(res => {
        this.patientDetail = {cureNo: obj.cureNo, ...res.data.data}
        this.tableData = res.data.data.chargeList
        this.tableData.forEach(item => {
          item.num = item.count
          if (item.status === 1) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
      })
    },
    handleDelete (row) {
      if (row.status !== 1) {
        let text = '是否确认删除[' + row.name + ']?'
        this.$confirm(text, '询问', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          iconClass: 'el-icon-question'
        }).then(() => {
          request({
            url: deleteChargeItem + '/' + row.id,
            method: 'get'
          }).then(res => {
            if (res.data.code === 200) {
              this.getPatientInfo({hospitalNo: this.patientDetail.hospitalNo, cureNo: this.patientDetail.cureNo})
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        }).catch(() => {
        })
      }
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
      cursor: pointer;
    }
    .icon-status-close{
      color: #FF5454;
      font-size: 20px;
      cursor: pointer;
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
        .el-form-item{
          margin-bottom: 10px;
          .el-select{
            // width: 100%;
            min-width: 580px;
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
          height: 68px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
