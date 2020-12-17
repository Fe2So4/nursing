<template>
  <div class="emr-home">
    <div class="emr-top">
      <el-form
        :inline="true"
        size="mini"
        label-width="80px"
      >
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            style="width:154px"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            style="width:154px"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="手术状态">
          <el-select
            v-model="form.status"
            style="width:154px"
          >
            <el-option
              value="术前"
              label="术前"
            />
            <el-option
              value="术中"
              label="术中"
            />
            <el-option
              value="术后"
              label="术后"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="急诊择期">
          <el-select
            v-model="form.emergency"
            style="width:154px"
          >
            <el-option
              label="急诊"
              value="急诊"
            />
            <el-option
              label="择期"
              value="择期"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="ID">
          <el-input
            v-model="form.id"
            style="width:154px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="getPatientList"
          >
            搜 索
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="80px"
      >
        <el-form-item label="手术间">
          <el-input
            v-model="form.room"
            style="width:154px"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="form.ptName"
            style="width:154px"
          />
        </el-form-item>
        <el-form-item label=" ">
          <el-input
            style="width:154px"
            v-model="form.wristband"
            placeholder="扫描或输入腕带号"
          />
        </el-form-item>
        <el-form-item label=" ">
          <el-input
            style="width:154px"
            v-model="form.ptCode"
            placeholder="扫描或输入接病人条码"
          />
        </el-form-item>
        <el-form-item label=" ">
          <el-checkbox
            v-model="form.us"
            true-label="1"
            false-label="0"
          >
            本人的
          </el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div class="emr-content">
      <div>
        <div class="title">
          <span>术中</span>
          <!-- <span>
            <el-button type="text">更多</el-button>
          </span> -->
        </div>
        <div class="content clearfix">
          <PatientCard
            v-for="(item,index) in inList"
            :key="index"
            :patient-info="item"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <span>术前</span>
          <!-- <span>
            <el-button type="text">更多</el-button>
          </span> -->
        </div>
        <div class="content clearfix">
          <PatientCard
            v-for="(item,index) in beforeList"
            :key="index"
            :patient-info="item"
          />
        </div>
      </div>
      <div>
        <div class="title">
          <span>术后</span>
          <!-- <span>
            <el-button type="text">更多</el-button>
          </span> -->
        </div>
        <div class="content clearfix">
          <PatientCard
            v-for="(item,index) in afterList"
            :key="index"
            :patient-info="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientCard from './components/patient-card'
import { getPatientList } from '@/api/electronic-medical-record'
import request from '@/utils/request'
export default {
  name: 'EmrHome',
  data () {
    return {
      form: {
        id: '',
        emergency: '',
        endTime: '2020-08-06',
        startTime: '2020-08-06',
        room: '',
        status: '',
        ptName: '',
        wristband: '',
        ptCode: '',
        us: ''
      },
      beforeList: [],
      inList: [],
      afterList: []
    }
  },
  components: {
    PatientCard
  },
  created () {
    this.getPatientList()
  },
  methods: {
    getPatientList () {
      request({
        url: getPatientList,
        method: 'post',
        data: {
          endTime: this.form.endTime,
          hospitalNo: this.form.id,
          isEmergency: this.form.emergency,
          isPersonal: this.form.us,
          operTimeState: this.form.status,
          patientName: this.form.ptName,
          roomNo: this.form.roomNo,
          startTime: this.form.startTime
        }
      }).then(res => {
        let data = res.data.data
        this.beforeList = data[0].beforeOperList
        this.inList = data[1].inOperList
        this.afterList = data[2].afterOperList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .emr-home{
    display: flex;
    height: 100%;
    flex-direction: column;
    .emr-top{
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      padding: 20px 0 0 20px;
      .el-form{
        display: flex;
        .el-form-item{
          // flex: 1;
          display: flex;
          .el-form-item__label{
            min-width: 100px;
          }
          .el-form-item__content{
            flex: 1;
          }
        }
      }
    }
    .emr-content{
      flex: 1;
      height: calc(100% - 124px);
      overflow-y: auto;
      padding: 0 20px 20px 20px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      margin-top: 10px;
      .title{
        display: flex;
        line-height: 40px;
        justify-content: space-between;
      }
      .content{
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 252px);
        grid-row-gap: 20px;
      }
    }
  }
</style>
