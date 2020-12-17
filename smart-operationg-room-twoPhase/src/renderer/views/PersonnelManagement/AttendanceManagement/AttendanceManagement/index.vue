<template>
  <!-- 业务分组管理 -->
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
                  style="color:#3377FF;font-weight:600"
                  class="el-icon-edit-outline"
                  @click="handleEditGroup(item)"
                />
                <i
                  style="color:#3377FF;font-weight:600"
                  @click="handleDeleteGroup(item)"
                  class="el-icon-delete"
                />
                <i
                  style="color:#3377FF;font-weight:600"
                  class="el-icon-plus"
                  @click="handleAddGroup(item)"
                />
              </span>
            </div>
            <div class="am-group-table">
              <vxe-table
                align="center"
                class="mytable-scrollbar"
                size="mini"
                stripe
                round
                :data="item.detailList"
                auto-resize
                height="300px"
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
                      @change="changeGroupLeader(item,row)"
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
                  <template v-slot="{row}">
                    <span class="sort">
                      <i
                        style="color:#3377FF;font-weight:600;font-size: 14px;"
                        class="el-icon-top"
                        @click="changeRowInfo('1',row,item)"
                      />
                      <i
                        style="color:#74A2FF;font-weight:600;font-size: 14px;"
                        class="el-icon-bottom"
                        @click="changeRowInfo('2',row,item)"
                      />
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
                        style="font-weight:600;font-size: 14px;"
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
                  <el-button
                    type="primary"
                    @click="saveItem(item)"
                  >
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
      @getAddList="getAddList"
      @changeTitle="changeTitle"
      :dialog-change-form="dialogChangeForm"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"
    />
    <userInfoDialog
      :add-item="addItem"
      :nur-list="copyNurList"
      :user-dialog-visible="userDialogVisible"
      @handleClose="handleClose"
      @getAddNurList="getAddNurList"
    />
  </div>
</template>

<script>
import GroupDialog from './components/group-dialog'
import userInfoDialog from './components/userInfo-dialog'
export default {
  data () {
    return {
      nurList: [],
      copyNurList: [],
      dialogVisible: false,
      userDialogVisible: false,
      dataList: [],
      addItem: {},
      tableData: [{name: 'ada', sex: 'ada', age: 45, address: 'ada'}, {name: 'ada', sex: 'ada', age: 45, address: 'ada'}, {name: 'ada', sex: 'ada', age: 45, address: 'ada'}],
      dialogChangeForm: {}
    }
  },
  components: {GroupDialog, userInfoDialog},
  mounted () {
    this.searchList()
    this.getNuresList()
  },
  methods: {
    // 获取护士列表
    getNuresList () {
      this.$store.dispatch('ReqGetNurList').then(res => {
        if (res.data.code === 200) {
          this.nurList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
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
      this.dialogChangeForm = {}
      this.dialogChangeForm.clickType = '1'
      this.dialogVisible = true
    },
    // 调用新增分组列表
    getAddList (item) {
      let obj = {
        transactionGroupName: item.transactionGroupName,
        transactionRemark: item.transactionRemark
      }
      this.$store.dispatch('ReqAddTransactionGroup', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '添加成功')
          this.searchList()
          this.handleClose()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击修改
    handleEditGroup (item) {
      this.dialogChangeForm = JSON.parse(JSON.stringify(item))
      this.dialogChangeForm.clickType = '2'
      this.dialogVisible = true
    },
    handleDeleteGroup (item) {
      this.$confirm('是否删除当前业务分组', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let obj = {
              id: item.id
            }
            this.$store.dispatch('ReqDeleteTransactionGroup', obj).then(res => {
              if (res.data.code === 200) {
                this.openToast('success', '删除成功')
                this.searchList()
              } else {
                this.openToast('error', res.data.code)
              }
            })
          } else {

          }
        }
      })
    },
    handleAddGroup (item) {
      this.copyNurList = JSON.parse(JSON.stringify(this.nurList))
      this.addItem = item
      this.userDialogVisible = true
      // let obj = {

      // }
      // item.
    },
    orderRelife () {
      this.dataList.forEach((item, index) => {
        item.orderId = index
        item.detailList.forEach((v, i) => {
          v.index = i
          v.orderBy = i + 1
        })
      })
    },
    // 回调修改保存
    changeTitle (item) {
      let obj = {
        id: item.id,
        transactionGroupName: item.transactionGroupName,
        transactionRemark: item.transactionRemark
      }
      this.$store.dispatch('ReqUpdateTransactionGroupDetails', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '修改分组名称详情信息成功')
          this.searchList()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
      this.dialogVisible = false
    },
    // 单条新增
    getAddNurList (item) {
      let arr = []
      let obj = {
        groupMemberCode: item.groupMemberCode,
        groupMemberName: item.groupMemberName,
        isGroupLeader: item.isGroupLeader,
        transactionBelongCode: item.transactionBelongCode,
        id: null
      }
      this.dataList.forEach(v => {
        if (v.id === item.addItem.id) {
          obj.groupSortNo = v.detailList.length + 1
          return false
        }
      })
      arr.push(obj)
      this.$store.dispatch('ReqUpdateTransactionGroup', arr).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '添加成功')
        } else {
          this.openToast('error', res.data.msg)
        }
        this.handleClose()
        this.searchList()
      })
    },
    // 单条删除
    itemDelete (item, row) {
      let idList = []
      idList.push(row.id)
      let obj = {
        idList
      }
      this.$store.dispatch('ReqDeleteTransactionGroupDetails', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '删除成功')
        } else {
          this.openToast('error', res.data.msg)
        }
        this.searchList()
      })
    },
    // 判断点击
    changeRowInfo (type, row, item) {
      // 点击向上

      if (type === '1') {
        this.upGo(row.index, item)
      } else { // 点击向下
        this.downGo(row.index, item)
      }
    },
    upGo (index, item) {
      if (index !== 0) {
        item.detailList[index] = item.detailList.splice(index - 1, 1, item.detailList[index])[0]
      } else {
        item.detailList.push(item.detailList.shift())
      }
      this.dataList.forEach(v => {
        if (v.id === item.id) {
          v.detailList = item.detailList
          return false
        }
      })
      this.orderRelife()
    },
    downGo (index, item) {
      if (index !== item.detailList.length - 1) {
        item.detailList[index] = item.detailList.splice(index + 1, 1, item.detailList[index])[0]
      } else {
        item.detailList.unshift(item.detailList.splice(index, 1)[0])
      }
      this.dataList.forEach(v => {
        if (v.id === item.id) {
          v.detailList = item.detailList
          return false
        }
      })
      this.orderRelife()
    },
    // 修改组长
    changeGroupLeader (item, row) {
      this.dataList.forEach(v => {
        if (v.id === item.id) {
          v.detailList.forEach(k => {
            k.isGroupLeader = 0
          })
        }
      })
      this.dataList.forEach(v => {
        if (v.id === item.id) {
          v.detailList.forEach(k => {
            if (k.id === row.id) {
              k.isGroupLeader = 1
              return false
            }
          })
        }
      })
      // item.detailList.forEach(v => {
      //   v.isGroupLeader = 0
      // })
      // row.isGroupLeader = 1
    },
    // 点击保存护士分组
    saveItem (item) {
      let arr = []
      item.detailList.forEach(v => {
        let obj = {}
        obj.groupMemberCode = v.groupMemberCode
        obj.groupMemberName = v.groupMemberName
        obj.groupSortNo = v.orderBy
        obj.id = v.id || null
        obj.isGroupLeader = v.isGroupLeader
        obj.transactionBelongCode = v.transactionBelongCode
        arr.push(obj)
      })

      this.$store.dispatch('ReqUpdateTransactionGroup', arr).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '保存成功')
          this.searchList()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    handleClose () {
      this.userDialogVisible = false
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
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
