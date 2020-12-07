<template>
  <div class="drainage-tube">
    <div class="option">
      <el-button
        type="primary"
        size="mini"
      >
        解 锁
      </el-button>
    </div>
    <vxe-table
      stripe
      align="center"
      :data="tableData"
      highlight-hover-row
      @cell-click="cellClickEvent"
      size="mini"
      class="mytable-scrollbar"
      height="300px"
      auto-resize
    >
      <vxe-table-column
        type="seq"
        title="序号"
      />
      <vxe-table-column
        field="userName"
        title="部位1"
      />
      <vxe-table-column
        field="userName"
        title="部位2"
      />
      <vxe-table-column
        field="userName"
        title="状态"
      />
      <vxe-table-column
        field="workDepartmentName"
        title="项目名称"
      />
      <vxe-table-column
        field="specifications"
        title="序号"
      />
      <vxe-table-column
        field="specifications"
        title="操作"
      />
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'DrainageTube',
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .drainage-tube{
    .option{
      text-align: right;
      padding-right: 20px;
      padding-bottom: 20px;
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
