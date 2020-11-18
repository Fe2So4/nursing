<template>
  <div class="attendance-management">
    <div class="option-top">
      <el-button
        @click="handleAddTableItem"
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
            v-for="item in dataList"
            :key="item.orderId"
          >
            <div class="am-group-title">
              <span>{{ item.transactionGroupName }}</span>
              <span>
                <i
                  class="el-icon-edit-outline"
                  @click="handleEditGroup(item)"
                />
                <i
                  @click="handleDeleteGroup(item)"
                  class="el-icon-delete"
                />
                <i
                  class="el-icon-plus"
                  @click="handleAddGroup(item)"
                />
              </span>
            </div>
            <div class="am-group-table">
              <vxe-table
                align="center"
                size="mini"
                stripe
                round
                :data="item.detailList"
                auto-resize
                height="300"
              >
                <vxe-table-column
                  field="orderBy"
                  title="序号"
                />
                <vxe-table-column
                  field="groupMemberCode"
                  title="工号"
                />
                <vxe-table-column
                  field="groupMemberName"
                  title="用户姓名"
                />
                <vxe-table-column
                  field="isGroupLeader"
                  title="组长"
                >
                  <template v-slot="{row}">
                    <el-checkbox
                      :true-label="1"
                      :false-label="0"
                      v-model="row.isGroupLeader"
                    />
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
                <vxe-table-column
                  title="操作"
                  show-overflow
                >
                  <template v-slot="{row}">
                    <span class="sort">
                      <i
                        class="el-icon-delete"
                        @click="itemDelete(item,row)"
                      />
                    </span>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
            <div class="am-group-remark">
              <el-form
                style="display:flex;align-items: center"
                size="mini"
                :inline="true"
              >
                <el-form-item
                  label="备注"
                >
                  <el-input
                    readonly
                    v-model="item.transactionRemark"
                    type="textarea"
                  />
                </el-form-item>
                <el-form-item style="width:unset;margin-left:20px">
                  <el-button type="primary">
                    保存
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <GroupDialog
      @changeTitle="changeTitle"
      :dialog-change-form="dialogChangeForm"
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
      dataList: [],
      tableData: [{name: 'ada', sex: 'ada', age: 45, address: 'ada'}, {name: 'ada', sex: 'ada', age: 45, address: 'ada'}, {name: 'ada', sex: 'ada', age: 45, address: 'ada'}],
      dialogChangeForm: {}
    }
  },
  components: {GroupDialog},
  mounted () {
    this.searchList()
    this.getNuresList()
  },
  methods: {
    // 获取护士列表
    getNuresList () {
      this.$store.dispatch('ReqGetNurList').then(res => {
        console.log(res)
      })
    },
    // 查询数据
    searchList () {
      this.$store.dispatch('ReqGetTransactionGroupShow').then(res => {
        if (res.data.code === 200) {
          this.dataList = res.data.data
          this.orderRelife()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击新增分组
    handleAddTableItem () {
      let obj = {
        detailList: [],
        id: null,
        orderId: this.dataList.length,
        transactionGroupName: '',
        transactionRemark: ''
      }
      this.dataList.push(obj)
      console.log(this.dataList)
    },
    // 点击修改
    handleEditGroup (item) {
      this.dialogChangeForm = JSON.parse(JSON.stringify(item))
      this.dialogVisible = true
    },
    handleDeleteGroup (item) {
      this.$confirm('是否删除当前业务分组', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.dataList.forEach((v, index) => {
              if (item.orderId === v.orderId) {
                this.dataList.splice(index, 1)
                return false
              }
            })
          } else {

          }
        }
      })
    },
    handleAddGroup (item) {
      console.log(item)
      // let obj = {

      // }
      // item.
    },
    orderRelife () {
      this.dataList.forEach((item, index) => {
        item.orderId = index
        item.detailList.forEach((v, i) => {
          v.orderBy = i + 1
        })
      })
    },
    // 回调修改保存
    changeTitle (item) {
      this.dataList.forEach(v => {
        if (v.orderId === item.orderId) {
          v.transactionGroupName = item.transactionGroupName
          v.transactionRemark = item.transactionRemark
        }
      })
      this.dialogVisible = false
    },
    // 单条删除
    itemDelete (item, row) {
      console.log(item, row)
    },
    handleClose () {
      this.dialogVisible = false
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
