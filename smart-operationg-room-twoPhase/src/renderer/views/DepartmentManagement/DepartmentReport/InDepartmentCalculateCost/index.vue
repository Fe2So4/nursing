<template>
  <!-- 按科室统计手术费用 -->
  <div class="nursing-record-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item label="月份">
            <el-date-picker
              format="yyyy-MM"
              value-format="yyyy-MM"
              v-model="form.moonTime"
              type="month"
              placeholder="选择月"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSearchTableList"
            >
              查 询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="dr-table">
      <div class="dr-table-bottom">
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
            field="index"
            title="序号"
          />
          <vxe-table-column
            width="120px"
            field="deptName"
            title="科室"
          />
          <vxe-table-column
            field="westernMedicineFee"
            title="西药费"
          />
          <vxe-table-column
            field="chinesePatnetMedicineFee"
            title="中成药费"
          />
          <vxe-table-column
            field="herbalMedicineFee"
            title="草药费"
          />

          <vxe-table-column
            field="medicalExpenses"
            title="诊疗费"
          />
          <vxe-table-column
            field="laboratoryFee"
            title="化验费"
          />
          <vxe-table-column
            field="photographFee"
            title="摄片费"
          />
          <vxe-table-column
            field="costOfSurgery"
            title="手术费"
          />
          <vxe-table-column
            field="bloodTransfusionFee"
            title="输血费"
          />
          <vxe-table-column
            field="inspectionFee"
            title="检查费"
          />

          <vxe-table-column
            field="treatmentFee"
            title="治疗费"
          />

          <vxe-table-column
            field="oxygenFee"
            title="氧气费"
          />
          <vxe-table-column
            field="bedCharge"
            title="床位费"
          />
          <vxe-table-column
            field="rageiotherapy"
            title="放射治疗"
          />
          <vxe-table-column
            field="nursingExpenses"
            title="护理费"
          />
          <vxe-table-column
            field="other"
            title="其它"
          />
          <vxe-table-column
            field="mealExpenses"
            title="膳食费"
          />
          <vxe-table-column
            field="stmoaBag"
            title="造口袋"
          />
          <vxe-table-column
            field="perspectiveFee"
            title="透视费"
          />
          <vxe-table-column
            field="totalPrice"
            title="合计"
          />
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NursingRecordSearch',
  data () {
    return {
      loading: false,
      form: {
        moonTime: ''
      },
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
      this.form.moonTime = this.utilsGetMoon()
    },

    // 点击查询查询数据
    handleSearchTableList () {
      this.loading = true
      let obj = {
        date: this.form.moonTime
      }
      this.$store.dispatch('ReqstatisOperChargeByDept', obj).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          this.tableData = res.data.data
          if (this.tableData.length > 0) {
            let westernMedicineFee = 0
            let chinesePatnetMedicineFee = 0
            let herbalMedicineFee = 0
            let medicalExpenses = 0
            let laboratoryFee = 0
            let photographFee = 0
            let costOfSurgery = 0
            let bloodTransfusionFee = 0
            let inspectionFee = 0
            let treatmentFee = 0
            let oxygenFee = 0
            let bedCharge = 0
            let rageiotherapy = 0
            let nursingExpenses = 0
            let other = 0
            let mealExpenses = 0
            let stmoaBag = 0
            let totalPrice = 0
            let perspectiveFee = 0
            this.tableData.forEach((item, index) => {
              item.order = index + 1
              westernMedicineFee += item.westernMedicineFee
              chinesePatnetMedicineFee += item.chinesePatnetMedicineFee
              herbalMedicineFee += item.herbalMedicineFee
              medicalExpenses += item.medicalExpenses
              laboratoryFee += item.laboratoryFee
              photographFee += item.photographFee
              costOfSurgery += item.costOfSurgery
              bloodTransfusionFee += item.bloodTransfusionFee
              inspectionFee += item.inspectionFee
              treatmentFee += item.treatmentFee
              oxygenFee += item.oxygenFee
              bedCharge += item.bedCharge
              rageiotherapy += item.rageiotherapy
              nursingExpenses += item.nursingExpenses
              other += item.other
              mealExpenses += item.mealExpenses
              stmoaBag += item.stmoaBag
              perspectiveFee += item.perspectiveFee
              totalPrice += item.totalPrice
            })
            let obj = {
              index: '合计',
              westernMedicineFee,
              chinesePatnetMedicineFee,
              herbalMedicineFee,
              medicalExpenses,
              laboratoryFee,
              photographFee,
              costOfSurgery,
              bloodTransfusionFee,
              inspectionFee,
              treatmentFee,
              oxygenFee,
              bedCharge,
              rageiotherapy,
              nursingExpenses,
              other,
              mealExpenses,
              stmoaBag,
              totalPrice,
              perspectiveFee
            }
            this.tableData.push(obj)
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
