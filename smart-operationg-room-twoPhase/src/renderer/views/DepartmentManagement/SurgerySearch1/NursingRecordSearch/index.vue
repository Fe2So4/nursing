<template>
  <!-- 护理记录单查询 -->
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
              v-model="form.operationDateStart"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              :clearable="false"
              v-model="form.operationDateEnd"
              style="width:178px"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="住院号"
          >
            <el-input
              clearable
              v-model="form.hospitalNo"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="病床号"
          >
            <el-input
              clearable
              v-model="form.bedNo"
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
              v-model="form.operationName"
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
            label="洗手护士"
          >
            <el-input
              clearable
              v-model="form.washNurseName1"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="巡回护士"
          >
            <el-input
              clearable
              v-model="form.runNurseName1"
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
      <div class="dr-table-top">
        <!-- <div class="top-list">
          <span class="top-list-title">腔镜直线型切割吻合器及钉匣(吻合器F12S)</span>
          <span class="top-list-number">(20)</span>
          <span class="top-list-icon"> <i class="el-icon-close" /> </span>
        </div> -->
        <div
          :key="index"
          v-for="(item,index) in options"
          class="dr-table-top-item"
        >
          <div class="item-left">
            {{ item.name }}:
          </div>
          <div class="item-right">
            <div
              class="item-right-context"
              :key="i"
              v-for="(v,i) in item.dataList"
            >
              <span>
                <span class="context-title">{{ v.typeName }}</span>
                <span style="color:#aaa">({{ v.count }})</span>
              </span>
            </div>
          </div>
        </div>
      </div>
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
            field="operateDate"
            title="手术日期"
          />
          <vxe-table-column
            field="no"
            title="日间手术"
          />
          <vxe-table-column
            field="roomNo"
            title="房间"
          />
          <vxe-table-column
            field="sequenceNo"
            title="术序"
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
            field="patientGender"
            title="性别"
          />
          <vxe-table-column
            field="patientAge"
            title="年龄"
          />
          <vxe-table-column
            field="hospitalNo"
            title="住院号"
          />
          <vxe-table-column
            field="deptName"
            title="所属科室"
          />

          <vxe-table-column
            width="160px"
            field="operationName"
            title="手术名称"
          />

          <vxe-table-column
            field="surgeon"
            title="主刀医生"
          />
          <vxe-table-column
            field="washNurseName1"
            title="洗手护士"
          />
          <vxe-table-column
            field="runNurseName1"
            title="巡回护士"
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
      showType: false,
      form: {
        operationDateStart: '',
        operationDateEnd: '',
        bedNo: '',
        deptName: '',
        hospitalNo: '',
        operationName: '',
        patientName: '',
        runNurseName1: '',
        surgeon: '',
        washNurseName1: ''
      },
      radio: '',
      addVisible: false,
      codeVisible: false,
      options: [{name: '所属科室', dataList: []}, {name: '主刀医生', dataList: []}, {name: '麻醉方式', dataList: []}, {name: '手术房间', dataList: []}],
      surgeonList: [],
      tableData: []
    }
  },
  mounted () {
    this.getNewTime()
    this.handleSearchTableList()
  },
  methods: {

    // 获取当前时间
    getNewTime () {
      this.form.operationDateStart = this.utilsGetNewDate()
      this.form.operationDateEnd = this.utilsGetNewDate()
    },
    // 点击图标切换显示
    handleChangeIcon () {
      this.showType = !this.showType
    },
    // 点击查询查询数据
    handleSearchTableList () {
      let obj = {
        operationDateStart: this.form.operationDateStart || '',
        operationDateEnd: this.form.operationDateEnd || '',
        bedNo: this.form.bedNo || '',
        deptName: this.form.deptName || '',
        hospitalNo: this.form.hospitalNo || '',
        operationName: this.form.operationName || '',
        patientName: this.form.patientName || '',
        runNurseName1: this.form.runNurseName1 || '',
        surgeon: this.form.surgeon || '',
        washNurseName1: this.form.washNurseName1 || ''
      }
      this.$store.dispatch('ReqgetNursingRecordSheet', obj).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.tableData = res.data.data.dataList
          this.options.forEach(item => {
            if (item.name === '所属科室') {
              item.dataList = res.data.data.deptList
              item.dataList.forEach(v => {
                v.typeName = v.deptName
              })
            }
            if (item.name === '主刀医生') {
              item.dataList = res.data.data.surgeonList
              item.dataList.forEach(v => {
                v.typeName = v.surgeonName
              })
            }
            if (item.name === '手术房间') {
              item.dataList = res.data.data.roomList
              item.dataList.forEach(v => {
                v.typeName = v.roomName
              })
            }
            if (item.name === '麻醉方式') {
              item.dataList = res.data.data.operationNameList
              item.dataList.forEach(v => {
                v.typeName = v.operationName
              })
            }
          })
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 导出
    exitExcle () {
      if (this.IsEmpty(this.form.operationDateStart)) {
        this.form.operationDateStart = ''
      }

      if (this.IsEmpty(this.form.operationDateEnd)) {
        this.form.operationDateEnd = ''
      }
      if (this.IsEmpty(this.form.bedNo)) {
        this.form.bedNo = ''
      }
      if (this.IsEmpty(this.form.deptName)) {
        this.form.deptName = ''
      }
      if (this.IsEmpty(this.form.hospitalNo)) {
        this.form.hospitalNo = ''
      }
      if (this.IsEmpty(this.form.operationName)) {
        this.form.operationName = ''
      }
      if (this.IsEmpty(this.form.patientName)) {
        this.form.patientName = ''
      }
      if (this.IsEmpty(this.form.runNurseName1)) {
        this.form.runNurseName1 = ''
      }
      if (this.IsEmpty(this.form.surgeon)) {
        this.form.surgeon = ''
      }
      if (this.IsEmpty(this.form.washNurseName1)) {
        this.form.washNurseName1 = ''
      }
      let url = `${config.api.baseURL}/ocis/departmentReport/download/downloadNursingRecordSheet?operationDateStart=${this.form.operationDateStart}&operationDateEnd=${this.form.operationDateEnd}&bedNo=${this.form.bedNo}&deptName=${this.form.deptName}&hospitalNo=${this.form.hospitalNo}&operationName=${this.form.operationName}&patientName=${this.form.patientName}&runNurseName1=${this.form.runNurseName1}&surgeon=${this.form.surgeon}&washNurseName1=${this.form.washNurseName1}`
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
          .el-input.el-input--mini.el-input--suffix {
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
          .el-input.el-input--mini.el-input--suffix {
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
        .top-list {
          margin-right: 10px;
          align-items: center;
          font-size: 14px;
          display: flex;
          .top-list-title{
            cursor: pointer;
            color: #2474F8;
          }
          .top-list-number {
            color: #888;
          }
          .top-list-icon {
            cursor: pointer;
            margin-left: 5px;
            color: #888;
            font-size: 12px;
            &:hover {
              color: #2474F8;
            }
          }
        }
        .dr-table-top-item {
          display: flex;
          .item-left {
            width: 60px;
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
