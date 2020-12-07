<template>
  <!-- 手术名称数量统计 -->
  <div class="roomstatus-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item
            label="年份"
          >
            <el-date-picker

              style="width:178px"
              v-model="form.year"
              type="year"
              format="yyyy"
              value-format="yyyy"
              placeholder="选择日期"
            />
          </el-form-item>

          <el-form-item
            label="手术名称"
          >
            <el-input
              clearable
              v-model="form.operName"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="getTable"
            >
              查 询
            </el-button>
          </el-form-item>
        </el-form>
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
          width="160px"
          field="operName"
          title="手术名称"
        />
        <vxe-table-column
          field="january"
          title="1月"
        />
        <vxe-table-column
          field="february"
          title="2月"
        />
        <vxe-table-column
          field="march"
          title="3月"
        />
        <vxe-table-column
          field="april"
          title="4月"
        />
        <vxe-table-column
          field="may"
          title="5月"
        />
        <vxe-table-column
          field="june"
          title="6月"
        />
        <vxe-table-column
          field="july"
          title="7月"
        />
        <vxe-table-column
          field="august"
          title="8月"
        />
        <vxe-table-column
          field="september"
          title="9月"
        />
        <vxe-table-column
          field="october"
          title="10月"
        />
        <vxe-table-column
          field="november"
          title="11月"
        />
        <vxe-table-column
          field="december"
          title="12月"
        />
        <vxe-table-column
          field="total"
          title="合计"
        />
      </vxe-table>
    </div>
    <div
      class="dr-pagination"
    >
      <Pagination
        ref="pagination"
        :children-data="childrenData"
        :distance="'20'"
        @searchTableList="searchTableList"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/pagination'
export default {

  name: 'SurgeryLevelStatistical',
  data () {
    return {
      form: {
        year: '',
        operName: ''
      },
      childrenData: {},
      currentPage: 1,
      pageSize: 10,
      tableData: []
    }
  },
  components: {
    Pagination
  },
  mounted () {
    this.getNewTime()
    this.getTable()
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.year = String(this.utilsGetYear())
    },
    // 点击查询调用获取数据接口
    getTable () {
      this.$refs.pagination.currentPage = 1
      let params = {
        currentPage: 1,
        pageSize: this.pageSize
      }
      this.searchTableList(params)
    },
    // 查询数据
    searchTableList (params) {
      this.pageSize = params.pageSize
      let obj = {
        operName: this.form.operName || '',
        year: this.form.year || '',
        pageIndex: params.currentPage,
        pageSize: params.pageSize
      }
      this.$store.dispatch('ReqoperNameCountStatis', obj).then(res => {
        if (res.data.code === 200) {
          this.childrenData = res.data.data
          this.tableData = res.data.data.list
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
      padding: 20px 30px 10px 40px;
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
