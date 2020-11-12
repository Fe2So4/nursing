<template>
  <div class="attendance-management">
    <div class="option-top">
      <el-button
        type="primary"
        size="mini"
      >
        添加分组
      </el-button>
    </div>
    <div class="am-scroll-content">
      <el-scrollbar style="height:100%;">
        <div class="am-content">
          <div
            class="am-group"
            v-for="item in 3"
            :key="'group'+item"
          >
            <div class="am-group-title">
              <span>徐汇院区护士组</span>
              <span>
                <i
                  class="el-icon-edit-outline"
                  @click="handleEditGroup"
                />
                <i class="el-icon-delete" />
                <i class="el-icon-plus" />
              </span>
            </div>
            <div class="am-group-table">
              <vxe-table
                align="center"
                size="mini"
                stripe
                round
                :data="tableData"
                auto-resize
                height="300px"
              >
                <vxe-table-column
                  field="name"
                  title="选择"
                  width="60"
                >
                  <template>
                    <el-checkbox />
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  field="name"
                  title="序号"
                  sortable
                />
                <vxe-table-column
                  field="sex"
                  title="工号"
                />
                <vxe-table-column
                  field="age"
                  title="用户姓名"
                />
                <vxe-table-column
                  field="address"
                  title="组长"
                >
                  <template>
                    <el-checkbox />
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  field="address"
                  title="排序"
                  show-overflow
                >
                  <template>
                    <span class="sort">
                      <i class="el-icon-top" />
                      <i class="el-icon-bottom" />
                    </span>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
            <div class="am-group-remark">
              <el-form
                size="mini"
                :inline="true"
              >
                <el-form-item label="备注">
                  <el-input type="textarea" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <GroupDialog
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import GroupDialog from './components/group-dialog'
export default {
  data () {
    return {
      dialogVisible: false,
      tableData: [{name: 'ada', sex: 'ada', age: 45, address: 'ada'}, {name: 'ada', sex: 'ada', age: 45, address: 'ada'}, {name: 'ada', sex: 'ada', age: 45, address: 'ada'}]
    }
  },
  components: {GroupDialog},
  methods: {
    handleEditGroup () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .attendance-management{
    height: 100%;
    display: flex;
    font-size: 14px;
    flex-direction: column;
    .option-top{
      text-align: right;
      padding:10px 20px 10px;
    }
    .am-scroll-content{
      // flex: 1;
      height: calc(100% - 48px);
    }
    .am-content{
      height: 100%;
      display: grid;
      padding: 0 10px 10px;
      box-sizing: border-box;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px 10px;
      .am-group{
        .am-group-title{
          display: flex;
          padding:10px 0;
          justify-content: space-between;
          span{
            &:first-child{
              font-weight: bold;
            }
            &:nth-last-child(1){
              i{
                color: #409eff;
                cursor: pointer;
                &:hover{
                  color: #3377FF;
                }
              }
            }
          }
        }
        .am-group-table{
          .sort{
            color: #409eff;
            cursor: pointer;
            &:hover{
              color: #3377FF;
            }
          }
        }
        .am-group-remark{
          margin-top: 10px;
          .el-form{
            .el-form-item{
              margin-bottom:unset;
              width: 100%;
              margin-right: unset;
              display: flex;
              /deep/ .el-form-item__content{
                flex: 1;
              }
              .el-textarea{
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
</style>
<style>
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
