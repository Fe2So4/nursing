<template>
  <div class="patient-operation-info">
    <PatientStep />
    <div class="poi-content">
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="患者">
          <el-input v-model="form.patientName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.patientGender" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.patientAge" />
        </el-form-item>
        <el-form-item label="住院/门诊号">
          <el-input v-model="form.hospitalNo" />
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="form.deptName" />
        </el-form-item>
        <el-form-item label="床号">
          <el-input v-model="form.bedNo" />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="手术日期">
          <el-input v-model="form.operateDate" />
        </el-form-item>
        <el-form-item label="手术间">
          <el-input v-model="form.roomNo" />
        </el-form-item>
        <el-form-item label="台次">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="急诊与择期">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="隔离">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="放射">
          <el-input v-model="form.input" />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="感染">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="手术等级">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="切口等级">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="ASA等级">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="手术体位">
          <el-input v-model="form.bodyPosition" />
        </el-form-item>
        <el-form-item label="抢救">
          <el-input v-model="form.input" />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="术前诊断">
          <el-input v-model="form.diagnose" />
        </el-form-item>
        <el-form-item label="术后诊断">
          <el-input v-model="form.input" />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="实施手术">
          <el-input v-model="form.input" />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="入手术间">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="麻醉开始">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="手术开始">
          <el-input v-model="form.input" />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="出手术间">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="麻醉结束">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="手术结束">
          <el-input v-model="form.input" />
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="洗手护士">
              <el-input v-model="form.washNurseName1" />
            </el-form-item>
            <el-form-item label="第二洗手">
              <el-input v-model="form.washNurseName2" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="巡回护士">
              <el-input v-model="form.runNurseName1" />
            </el-form-item>
            <el-form-item label="第二巡回">
              <el-input v-model="form.runNurseName2" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="主麻医生">
              <el-input v-model="form.surgeon" />
            </el-form-item>
            <el-form-item label="麻助一">
              <el-input v-model="form.input" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="麻醉方法">
              <el-input v-model="form.input" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手术医生">
              <el-input v-model="form.input" />
            </el-form-item>
            <el-form-item label="手术一助">
              <el-input v-model="form.input" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="PACU医生">
              <el-input v-model="form.input" />
            </el-form-item>
            <el-form-item label="PACU护士1">
              <el-input v-model="form.input" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Steward评分">
              <el-input v-model="form.input" />
            </el-form-item>
            <el-form-item />
          </el-col>
        </el-row>
      </el-form>
      <div class="option">
        <el-button
          type="primary"
          size="mini"
        >
          手术回退
        </el-button>
        <el-button
          size="mini"
        >
          保 存
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PatientStep from '@/components/PatientInfoStep/patient-step'
import {getPatientInfo} from '@/api/charge'
import request from '@/utils/request'
import moment from 'moment'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      labelWidth1: '60px',
      labelWidth2: '80px',
      labelWidth3: '100px',
      form: {
        input: ''
      }
    }
  },
  computed: {
    ...mapState('Base', ['currentPatient'])
  },
  components: {
    PatientStep
  },
  created () {
    this.getPatientInfo()
  },
  methods: {
    getPatientInfo () {
      request({
        url: getPatientInfo + '/' + this.currentPatient.cureNo,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        data.operateDate = moment(data.operateDate).format('YYYY-MM-DD HH:mm')
        this.form = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .patient-operation-info{
    height: 100%;
    .poi-content{
      height: calc(100% - 120px);
      min-width: 100px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      padding: 20px 60px 0 0;
      .el-form{
        display: flex;
        .el-row{
          width: 100%;
          .el-col{
            display: flex;
          }
        }
        .el-form-item{
          flex: 1;
          margin-bottom: 20px;
          display: flex;
          /deep/ .el-form-item__content{
            flex: 1;
            .el-input{
              width: 100%;
            }
          }
          /deep/ .el-form-item__label{
            color:#888888
          }
        }
      }
      .option{
        text-align: center;
      }
    }
  }
</style>
