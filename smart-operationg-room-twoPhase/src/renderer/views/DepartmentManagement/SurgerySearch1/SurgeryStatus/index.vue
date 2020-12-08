<template>
  <!-- 手术状态查询 -->
  <div class="surgery-status-search">
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
          <el-form-item
            v-show="showType"
            label="病区"
          >
            <el-select
              clearable
              v-model="form.inpatientWard"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="手术状态"
          >
            <el-select
              clearable
              v-model="form.operationStateName"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in operationStates"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="住院号"
          >
            <el-input
              clearable
              v-model="form.patientId"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="病床号"
          >
            <el-input
              clearable
              v-model="form.bedId"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="病人姓名"
          >
            <el-input
              clearable
              v-model="form.patientName"
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
            label="所属科室"
          >
            <el-input
              clearable
              v-model="form.deptName"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="主刀医师"
          >
            <el-input
              clearable
              v-model="form.surgeon"
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
          type="seq"
          title="序号"
        />
        <vxe-table-column
          field="operTime"
          title="手术日期"
        />
        <vxe-table-column
          field="opeRoom"
          title="手术间"
        />
        <vxe-table-column
          field="sequence"
          title="术序"
        />
        <vxe-table-column
          field="patientId"
          title="住院号"
        />

        <vxe-table-column
          field="bedId"
          title="病床号"
        />
        <vxe-table-column
          field="patientName"
          title="病人姓名"
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
          width="160px"
          field="operationName"
          title="手术名称"
        />
        <vxe-table-column
          field="age3"
          title="送冰冻"
        />

        <vxe-table-column
          field="age3"
          title="特殊器械"
        />

        <vxe-table-column
          field="deptName"
          title="所属科室"
        />
        <vxe-table-column
          field="surgeon"
          title="主刀医师"
        />
        <vxe-table-column
          width="160px"
          field="diagnoseBefore"
          title="术前诊断"
        />
        <vxe-table-column
          field="anesName"
          title="麻醉方式"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SurgeryStatus',
  data () {
    return {
      loading: false,
      showType: false,
      form: {
        startDate: '',
        endDate: '',
        inpatientWard: '',
        operationStateName: '',
        patientId: '',
        bedId: '',
        patientName: '',
        opeNameAfter: '',
        deptName: '',
        surgeon: '',
        firstOpeNurse: ''
      },
      radio: '',
      addVisible: false,
      codeVisible: false,
      operationStates: [{
        value: '术前',
        label: '术前'
      }, {
        value: '术中',
        label: '术中'
      }, {
        value: '术后',
        label: '术后'
      }],
      options: [{
        value: '6',
        label: '6病区'
      }, {
        value: '7',
        label: '7病区'
      }, {
        value: '8',
        label: '8病区'
      }],
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
    // 点击图标切换显示
    handleChangeIcon () {
      this.showType = !this.showType
    },
    handleSearchTable () {
      this.loading = true
      let obj = {
        startDate: this.form.startDate || '',
        endDate: this.form.endDate || '',
        inpatientWard: this.form.inpatientWard || '',
        operationStateName: this.form.operationStateName || '',
        patientId: this.form.patientId || '',
        bedId: this.form.bedId || '',
        patientName: this.form.patientName || '',
        opeNameAfter: this.form.opeNameAfter || '',
        deptName: this.form.deptName || '',
        surgeon: this.form.surgeon || '',
        firstOpeNurse: this.form.firstOpeNurse || ''
      }
      this.$store.dispatch('ReqgetoperationInfoState', obj).then(res => {
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
  .surgery-status-search{
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
          .el-input{
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
</style>
