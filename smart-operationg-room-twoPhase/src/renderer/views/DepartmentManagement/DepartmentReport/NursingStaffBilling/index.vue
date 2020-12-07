<template>
  <!-- 护理人员计费统计 -->
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
              v-model="form.endDate"
              style="width:178px"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              clearable
              v-model="form.categoryId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
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
    </div>
    <div
      class="dr-table"
      v-if="showType"
    >
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
            type="seq"
            title="序号"
          />
          <vxe-table-column
            title="姓名"
          >
            <template v-slot="{row}">
              <el-button
                @click="handleClickUserName(row)"
                type="text"
                style="color:#606266"
              >
                {{ row.name }}
              </el-button>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="code"
            title="工号"
          />
          <vxe-table-column
            field="operCount"
            title="手术数量"
          />
          <vxe-table-column
            field="operPrice"
            title="手术收费"
          />
        </vxe-table>
      </div>
    </div>
    <div
      class="dr-table"
      v-else
    >
      <div style="background-color:#fff;padding:10px 10px 0 0px;text-align:right">
        <el-button
          size="mini"
          type="info"
          plain
          @click="dayin"
        >
          打 印
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="showType = true"
        >
          返 回
        </el-button>
      </div>
      <div
        class="dr-table-children"
      >
        <div class="table-container">
          <div
            class="dr-table-top1"
            style="display:flex;
        padding:10;
        justify-content: space-between;
        padding: 10px;
        align-items: center;
        background-color: #fff;"
          >
            <div style="font-weight: bold;">
              药品类
            </div>
          </div>
          <div class="dr-table-bottom">
            <vxe-table
              align="center"
              :data="drugCharges"
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
                field="chargeName"
                title="收费项目"
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
                field="price"
                title="单价"
              />

              <vxe-table-column
                field="count"
                title="数量"
              />
              <vxe-table-column
                field="totalPrice"
                title="金额"
              />
            </vxe-table>
          </div>
          <div style="padding:10px;text-align:right;display:flex;justify-content: flex-end;margin-right:40px;font-weight:700;font-size:14px">
            <span>药品类合计:</span>
            <span>{{ totalDrugPrice }}</span>
          </div>
        </div>
        <div class="table-container">
          <div
            class="dr-table-top1"
            style="display:flex;
        padding:10;
        justify-content: space-between;
        padding: 10px;
        align-items: center;
        background-color: #fff;"
          >
            <div style="font-weight: bold;">
              非药品类
            </div>
          </div>
          <div class="dr-table-bottom">
            <vxe-table
              height="auto"
              align="center"
              :data="nonDrugCharges"
              class="mytable-scrollbar"
              size="mini"
              auto-resize
              stripe
            >
              <vxe-table-column
                type="seq"
                title="序号"
              />
              <vxe-table-column
                field="chargeName"
                title="收费项目"
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
                field="price"
                title="单价"
              />

              <vxe-table-column
                field="count"
                title="数量"
              />
              <vxe-table-column
                field="totalPrice"
                title="金额"
              />
            </vxe-table>
          </div>
        </div>
        <div style="padding:10px;text-align:right;display:flex;justify-content: flex-end;margin-right:40px;font-weight:700;font-size:14px">
          <span>非药品类合计:</span>
          <span>{{ totalNonDrugPrice }}</span>
        </div>
        <div style="padding:10px;text-align:right;display:flex;justify-content: flex-end;margin-right:40px;font-weight:700;font-size:14px">
          <span>药品类 + 非药品类合计:</span>
          <span>{{ totalPrice }}</span>
        </div>
      </div>
      <NursingStaffBillingDayin
        ref="dayinChildren"
        :children-table="childrenTable"
      />
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import config from '@/config/url.js'
import NursingStaffBillingDayin from './components/nursingStaffBilling-dayin'
export default {
  name: 'NursingStaffBilling',
  data () {
    return {
      showType: false,
      form: {
        startDate: '',
        endDate: '',
        categoryId: ''
      },
      childrenTable: {
        drugCharges: [],
        nonDrugCharges: [],
        totalDrugPrice: '',
        totalNonDrugPrice: '',
        totalPrice: ''
      },
      options: [],
      tableData: [],
      drugCharges: [], // 药品
      nonDrugCharges: [], // 非药品
      totalDrugPrice: '', // 药品总
      totalNonDrugPrice: '', // 非药品总
      totalPrice: '' // 总
    }
  },
  components: {
    NursingStaffBillingDayin
  },
  mounted () {
    this.getNewTime()
    this.getClassification()
    this.handleSearchTableList()
  },
  methods: {
    // 打印
    dayin () {
      this.utilsDebounce(() => { this.$refs.dayinChildren.printCurrent() }, 1000)
    },
    // 导出
    exitExcle () {
      if (this.IsEmpty(this.form.startDate)) {
        this.form.startDate = ''
      }

      if (this.IsEmpty(this.form.endDate)) {
        this.form.endDate = ''
      }
      if (this.IsEmpty(this.form.categoryId)) {
        this.form.categoryId = ''
      }
      let url = `${config.api.baseURL}/ocis/departmentReport/download/downloadStatisNurseCharge?startDate=${this.form.startDate}&endDate=${this.form.endDate}&categoryId=${this.form.categoryId}`
      this.exportExcel(url)
    },
    exportExcel (params) {
      ipcRenderer.send('download',
        JSON.stringify({
          downloadUrl: params
        }))
    },
    // 获取分类字典
    getClassification () {
      let obj = {
        type: 'CHARGCATEGORY'
      }
      this.$store.dispatch('ReqgetDictByType', obj).then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data
        } else {

        }
      })
    },
    // 获取当前时间
    getNewTime () {
      this.form.startDate = this.utilsGetNewDate()
      this.form.endDate = this.utilsGetNewDate()
    },
    // 点击查询查询数据
    handleSearchTableList () {
      this.showType = true
      this.loading = true
      let obj = {
        categoryId: this.form.categoryId || '',
        endDate: this.form.endDate,
        startDate: this.form.startDate
      }
      this.$store.dispatch('ReqstatisNurseCharge', obj).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          this.tableData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击查询详情
    handleSearchChargeDetail (row) {
      this.loading = true
      let obj = {
        categoryId: this.form.categoryId || '',
        endDate: this.form.endDate,
        startDate: this.form.startDate,
        code: row.code
      }
      this.$store.dispatch('ReqstatisNurseChargeDetail', obj).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          this.childrenTable = res.data.data
          this.drugCharges = res.data.data.drugCharges
          this.nonDrugCharges = res.data.data.nonDrugCharges.concat(res.data.data.nonDrugCharges).concat(res.data.data.nonDrugCharges).concat(res.data.data.nonDrugCharges).concat(res.data.data.nonDrugCharges)
          this.totalDrugPrice = res.data.data.totalDrugPrice
          this.totalNonDrugPrice = res.data.data.totalNonDrugPrice
          this.totalPrice = res.data.data.totalPrice
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },

    // 点击用户姓名切换
    handleClickUserName (row) {
      this.showType = false
      console.log(row)
      this.handleSearchChargeDetail(row)
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
  /deep/ .el-button.el-button--text {
    span {
      border-bottom: 1px solid #606266;
    }
  }
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
      .dr-table-children {
          height: 100%;
          display: flex;
          flex-direction: column;
        .table-container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      }

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

    }
    .dr-pagination{
      margin-top: 10px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
    }
  }
</style>
