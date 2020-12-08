<template>
  <div class="family-call">
    <div class="option">
      <el-form
        size="mini"
        :inline="true"
      >
        <el-form-item label="日期：">
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="楼栋：">
          <el-select v-model="form.floor">
            <el-option
              v-for="item in floorList"
              :key="item.floorNo"
              :value="item.floorNo"
              :label="item.floorName"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.input"
            style="min-width:462px;"
            placeholder="请输入患者姓名或住院号或床号或手术名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="getPatientList"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fc-content">
      <div class="fc-content-left">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          highlight-current-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          height="100%"
          auto-resize
        >
          <vxe-table-column
            field="patientName"
            title="病人姓名"
          />
          <vxe-table-column
            field="hospitalNo"
            title="住院号"
          />
          <vxe-table-column
            field="bedNo"
            title="病床号"
          />
          <vxe-table-column
            field="operationName"
            title="手术名称"
          />
        </vxe-table>
      </div>
      <div class="fc-content-right">
        <div class="top">
          <div class="basic-info">
            <div class="title">
              基本信息
            </div>
            <el-form
              size="mini"
              label-width="90px"
            >
              <el-form-item label="病人姓名：">
                {{ currentPatient.patientName ? currentPatient.patientName : '-' }}
              </el-form-item>
              <el-form-item label="年龄：">
                {{ currentPatient.patientAge ? currentPatient.patientAge : '-' }}
              </el-form-item>
              <el-form-item label="住院号：">
                {{ currentPatient.hospitalNo ? currentPatient.hospitalNo : '-' }}
              </el-form-item>
              <el-form-item label="病床号：">
                {{ currentPatient.bedNo ? currentPatient.bedNo : '-' }}
              </el-form-item>
              <el-form-item label="手术名称：">
                {{ currentPatient.operationName ? currentPatient.operationName : '-' }}
              </el-form-item>
              <el-form-item label="术前诊断：">
                {{ currentPatient.diagnose ? currentPatient.diagnose : '-' }}
              </el-form-item>
              <el-form-item label="主刀医生：">
                {{ currentPatient.surgeon ? currentPatient.surgeon : '-' }}
              </el-form-item>
            </el-form>
          </div>
          <div class="notice-info">
            <div class="title">
              信息通知
            </div>
            <div class="text-area">
              <el-input
                type="textarea"
                size="mini"
                v-model="form.noticeArea"
                rows="5"
              />
            </div>
            <div class="select-info">
              <el-select
                v-model="form.template"
                size="mini"
                clearable
                @change="handleChange"
                placeholder="请选择常用句式"
              >
                <el-option
                  :value="item.typeName"
                  :label="item.typeName"
                  v-for="item in templateList"
                  :key="item.id"
                />
              </el-select>
            </div>
            <div class="notice-option">
              <span>
                <i class="el-icon-setting" />
              </span>
              <span style="margin-left:10px;">
                <span>重复：</span>
                <span>
                  <el-input-number
                    v-model="form.num"
                    :min="1"
                    :controls="false"
                    size="mini"
                  />
                </span>
                <span>
                  遍
                </span>
                <span style="margin-left:20px;">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleSubmit"
                  >提 交</el-button>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">
            今日消息记录
          </div>
          <ul>
            <li
              v-for="(item,index) in todayList"
              :key="index"
            >
              {{ item.createTime }}{{ item.relationNoticeContent }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
// import {getPatientList, getTodayCallList, getCallTemplate, saveRelationNotice} from '@/api/family-call'
import {getPatientList, getFloor, getTodayCallList, getCallTemplate, saveRelationNotice} from '@/api/family-call'
import moment from 'moment'
export default {
  name: 'FamilyCall',
  data () {
    return {
      form: {
        select: '',
        time: moment(new Date()).format('YYYY-MM-DD'),
        input: '',
        floor: '',
        num: 1,
        noticeArea: '',
        template: ''
      },
      tableData: [],
      floorList: [],
      currentPatient: {},
      todayList: [],
      templateList: []
    }
  },
  created () {
    this.getPatientList()
    this.getFloorList()
    this.getTodayCallList()
  },
  methods: {
    handleChange (val) {
      this.form.noticeArea = val
    },
    cellClickEvent ({row}) {
      console.log(row)
      this.currentPatient = row
      this.getCallTemplate()
    },
    handleSubmit () {
      request({
        url: saveRelationNotice,
        method: 'post',
        data: {
          createTime: moment(new Date()).format('YYYY-MM-DD HH-mm-ss'),
          operationId: this.currentPatient.operSchNo,
          relationNoticeContent: this.form.noticeArea,
          repeatNum: this.form.num
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({message: '提交成功', type: 'success'})
          this.getTodayCallList()
        }
      })
    },
    getCallTemplate () {
      request({
        url: getCallTemplate + '/' + this.currentPatient.floor + '/' + this.currentPatient.roomNo,
        method: 'get'
      }).then(res => {
        this.templateList = res.data.data
      })
    },
    getTodayCallList () {
      request({
        url: getTodayCallList,
        method: 'get'
      }).then(res => {
        this.todayList = res.data.data
      })
    },
    getFloorList () {
      request({
        url: getFloor,
        method: 'get'
      }).then(res => {
        this.floorList = res.data.data
      })
    },
    getPatientList () {
      request({
        url: getPatientList,
        method: 'post',
        data: {
          // bedNo: '',
          // cureNo: '',
          // diagnose: '',
          floor: this.form.floor,
          // hospitalNo: '',
          // operSchNo: '',
          operateDate: '2020-08-06',
          // operationName: '',
          // patientAge: '',
          // patientGender: '',
          // patientName: '',
          search: this.form.input
          // roomNo: '',
          // surgeon: ''
        }
      }
      ).then(res => {
        this.tableData = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.family-call{
  height: 100%;
  .option{
    padding-top: 18px;
    padding-left: 20px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    overflow: hidden;
  }
  .fc-content{
    margin-top: 10px;
    height: calc(100% - 75px);
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    display: flex;
    .fc-content-left{
      background: #FFFFFF;
      height: 100%;
      flex: 0.3;
      margin-right: 10px;
    }
    .fc-content-right{
      // background: #FFFFFF;
      overflow: hidden;
      height: 100%;
      flex: 1;
      .top{
        display: flex;
        .title{
          color: #409eff;
          border-bottom: 1px solid #e2e2e2;
          line-height: 30px;
        }
        .basic-info{
          width: 400px;
          margin-right: 10px;
          background: #FFFFFF;
          padding: 0 20px;
          .el-form{
            margin-top: 10px;
            .el-form-item{
              margin-bottom:10px;
            }
          }
        }
        .notice-info{
          background: #FFFFFF;
          flex: 1;
          padding: 0 20px;
          .title{
            margin-bottom:10px;
          }
          .text-area{

          }
          .select-info{
            margin:10px 0;
            .el-select{
              width: 100%;
            }
          }
        }
      }
      .bottom{
        background: #FFFFFF;
        margin-top: 10px;
        height: calc(100% - 317px);
        flex: 1;
        // padding:0 20px;
        .title{
          line-height: 30px;
          text-indent: 20px;
          background:#C5D3F1;
        }
        ul{
          padding:10px 20px;
          overflow-y: auto;
          height: calc(100% - 30px);
          li{

          }
        }
      }
    }
  }
}
</style>
