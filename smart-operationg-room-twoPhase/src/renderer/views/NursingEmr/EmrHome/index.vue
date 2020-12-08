<template>
  <div class="emr-home">
    <div class="emr-top">
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="手术状态">
          <el-select v-model="form.status">
            <el-option>1</el-option>
            <el-option>2</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="急诊择期">
          <el-select v-model="form.emergency">
            <el-option>1</el-option>
            <el-option>2</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            搜 索
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
        label-width="100px"
      >
        <el-form-item label="手术间">
          <el-input v-model="form.room" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.ptName" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.wristband"
            placeholder="扫描或输入腕带号"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.ptCode"
            placeholder="扫描或输入接病人条码"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.us">
            本人的
          </el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div class="emr-content">
      <div>
        <div class="title">
          <span>术中</span>
          <span>
            <el-button type="text">更多</el-button>
          </span>
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
          <span>
            <el-button type="text">更多</el-button>
          </span>
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
          <span>
            <el-button type="text">更多</el-button>
          </span>
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
export default {
  name: 'EmrHome',
  data () {
    return {
      form: {
        id: '',
        emergency: '',
        endTime: '',
        startTime: '',
        room: '',
        ptName: '',
        wristband: '',
        ptCode: '',
        us: ''
      },
      beforeList: [{status: '1'}, {status: '1'}, {status: '1'}, {status: '1'}, {status: '1'}, {status: '1'}, {status: '1'}],
      inList: [{status: '2'}, {status: '2'}, {status: '2'}, {status: '2'}, {status: '2'}, {status: '2'}],
      afterList: [{status: '3'}, {status: '3'}, {status: '3'}, {status: '3'}, {status: '3'}, {status: '3'}]
    }
  },
  components: {
    PatientCard
  },
  methods: {

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
