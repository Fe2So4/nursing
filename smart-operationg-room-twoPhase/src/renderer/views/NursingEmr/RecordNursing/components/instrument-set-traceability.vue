<template>
  <div class="nursing-info">
    <div class="option">
      <span>
        <el-input
          size="mini"
          placeholder="供应室发放物品及无菌品库物品扫码确认"
        />
      </span>
      <span>
        <el-button
          type="primary"
          size="mini"
        >
          获取器械包清单
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          通知补包
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          退包登记
        </el-button>

      </span>
    </div>
    <vxe-table
      stripe
      align="center"
      :data="tableData"
      highlight-hover-row
      size="mini"
      class="mytable-scrollbar"
      height="300px"
      auto-resize
    >
      <vxe-table-column
        type="seq"
        title="包次"
      />
      <vxe-table-column
        field="userName"
        title="器械包条码"
      />
      <vxe-table-column
        field="userName"
        title="器械包名称"
      />
      <vxe-table-column
        field="userName"
        title="器械包号"
      />
      <vxe-table-column
        field="workDepartmentName"
        title="接收时间"
      />
    </vxe-table>
    <NoticePackageDialog
      :dialog-visible="dialogVisible"
      v-if="dialogVisible"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import NoticePackageDialog from './notice-package-dialog'
export default {
  name: 'NursingInfo',
  data () {
    return {
      dialogVisible: false,
      tableData: []
    }
  },
  components: {
    NoticePackageDialog
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .nursing-info{
    .option{
      text-align: right;
      padding-right: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      span{
        &:first-child{
          flex: 0.4;
        }
      }
    }
    table{
      width: 100%;
      // height: 100%;
      border-bottom: 1px solid #E8E8E8;
      border-left: 1px solid #E8E8E8;
      tbody{
        // text-align: center;
        tr{
          td{
            border-top: 1px solid #E8E8E8;
            border-right: 1px solid #E8E8E8;
            color: #444444;
            font-size: 14px;
            height: 40px;
            padding:10px 0 10px 20px;
            line-height:26px;
            &.left{
              text-align: left;
              padding-left: 20px;
            }
            &.center{
              text-align: center;
              padding-left: unset;
            }
            .right{
              text-align: right;
              padding-right: 20px;
            }
            .el-checkbox-group{
              display: inline-block;
            }
            .el-icon-success{
              color: #0BBE4A;
            }
            &:nth-last-child(3){
              /deep/ .el-radio__label{
                padding: unset;
              }
            }
            &:nth-last-child(2){
              /deep/ .el-radio__label{
                padding: unset;
              }
            }
            &:nth-last-child(){

            }
          }
      }
      }
        }
  }
</style>
