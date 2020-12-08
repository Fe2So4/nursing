<template>
  <!-- 术后手术信息登记查询 -->
  <div class="roomstatus-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item
            label="日期"
          >
            <el-date-picker
              style="width:178px"
              v-model="form.startDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="楼"
          >
            <el-select
              v-model="form.floorNo"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in floorList"
                :key="item.floorNo"
                :label="item.floorName"
                :value="item.floorNo"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="住院号"
          >
            <el-input v-model="form.patientId" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="床号"
          >
            <el-input v-model="form.bedId" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="姓名"
          >
            <el-input v-model="form.patientName" />
          </el-form-item>
          <el-form-item
            label="手术名称"
            v-show="showType"
          >
            <el-input v-model="form.opeNameAfter" />
          </el-form-item>
          <el-form-item
            label="手术医生"
            v-show="showType"
          >
            <el-input v-model="form.surgeon" />
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
          field="patientId"
          title="住院号"
        />
        <vxe-table-column
          field="bedId"
          title="病床号"
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
          field="diagnoseBefore"
          title="术前诊断"
        />
        <vxe-table-column
          field="operationName"
          title="手术名称"
        />
        <vxe-table-column
          field="diagnoseAfter"
          title="术后诊断"
        />
        <vxe-table-column
          field="deptName"
          title="科室"
        />
        <vxe-table-column
          field="surgeon"
          title="主刀医生"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EndSurgeryInfoSearch',
  data () {
    return {
      showType: false,
      form: {
        startDate: '',
        floorNo: '',
        patientId: '',
        bedId: '',
        patientName: '',
        opeNameAfter: '',
        surgeon: ''
      },

      tableData: [],
      floorList: []
    }
  },
  mounted () {
    this.getNewTime()
    this.getFloorList()
    this.handleSearchTable()
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.startDate = this.utilsGetNewDate()
    },
    // 获取楼层列表
    getFloorList () {
      this.$store.dispatch('ReqgetFloor').then(res => {
        if (res.data.code === 200) {
          this.floorList = JSON.parse(JSON.stringify(res.data.data))
          this.floorList.unshift({floorNo: '', floorName: '全部'})
        }
      })
    },
    // 点击图标切换显示
    handleChangeIcon () {
      this.showType = !this.showType
    },
    // 查询数据
    handleSearchTable () {
      let obj = {
        startDate: this.form.startDate || '',
        endDate: this.form.startDate || '',
        floorNo: this.form.floorNo || '',
        patientId: this.form.patientId || '',
        bedId: this.form.bedId || '',
        patientName: this.form.patientName || '',
        opeNameAfter: this.form.opeNameAfter || '',
        surgeon: this.form.surgeon || ''
      }
      this.$store.dispatch('ReqgetAfteroperationInfo', obj).then(res => {
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
  .roomstatus-search{
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
          margin-bottom: 10px;
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
        bottom: 10px;
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
