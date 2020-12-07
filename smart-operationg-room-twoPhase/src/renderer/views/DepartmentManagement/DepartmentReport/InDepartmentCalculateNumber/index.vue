<template>
  <!-- 按科室统计手术数量 -->
  <div class="nursing-record-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item label="年月">
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
            field="deptName"
            title="科室"
          />
          <vxe-table-column
            field="deptCode"
            title="科室代码"
          />
          <vxe-table-column
            field="operCount"
            title="手术数量"
          />
          <vxe-table-column
            field="duration"
            title="总时长"
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
      this.$store.dispatch('ReqstatisOperCountByDept', obj).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          if (this.tableData.length > 0) {
            this.tableData.forEach((item, index) => {
              item.index = index + 1
            })
            let obj = {
              index: '合计',
              operCount: res.data.data.totalCount,
              duration: res.data.data.totalDuration
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
