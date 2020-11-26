<template>
  <div class="device-group">
    <div class="dg-left">
      <el-tree
        :data="treeData"
        node-key="id"
        highlight-current
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleTreeClick"
        ref="tree"
        :current-node-key="defaultActive"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >
          <!-- slot-scope="{ node, data }" -->
          <span :class="!data.isChild?'tree-parent-title':''">{{ node.label }}</span>
          <span
            v-if="!data.isChild"
            class="tree-option"
          >
            <i
              class="el-icon-plus"
              @click.stop="handleAdd(1)"
            />
          </span>
          <span
            v-if="data.isChild"
            class="tree-option"
          >
            <i
              class="el-icon-edit"
              @click="handleAdd(2,data)"
            />
            <i
              class="el-icon-delete"
              @click="handleDeleteGroup(data.id)"
            />
          </span>
        </span>
      </el-tree>
    </div>
    <div class="dg-right">
      <div class="dg-r-top">
        <el-form
          :inline="true"
          size="mini"
        >
          <el-form-item label="">
            <el-input
              v-model="form.deviceNo"
              clearable
              prefix-icon="el-icon-search"
              placeholder="扫描或者手动输入设备序列号"
              @keyup.enter.native="getDeviceByNo"
            />
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="info"
              plain
              @click="handleAddDeviceToGroup"
            >
              新 增
            </el-button>
          </el-form-item>
          <el-form-item
            type="info"
            plain
            label=""
          >
            <el-button>清 空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="dg-r-table">
        <vxe-table
          align="center"
          :data="tableData"
          size="mini"
          height="auto"
          ref="xTable"
          auto-resize
          stripe
        >
          <vxe-table-column
            title="序号"
            type="seq"
          />
          <vxe-table-column
            field="name"
            title="设备名称"
          />
          <vxe-table-column
            field="deviceNo"
            title="设备序列号"
          />
          <vxe-table-column
            field="model"
            title="型号"
          />
          <vxe-table-column
            field="serialNo"
            title="序列号"
          />
          <vxe-table-column
            field="position"
            title="设备位置"
          />
          <vxe-table-column
            field="sort"
            title="排序号"
          >
            <template v-slot="{ row }">
              <el-input-number
                size="mini"
                v-model="row.sort"
                :controls="false"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            title="操作"
          >
            <template>
              <el-button type="text">
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <AddGroup
      v-if="addVisible"
      :add-visible="addVisible"
      :dialog-title="dialogTitle"
      @handleClose="handleAdd"
      :edit-data="editData"
      @getTreeData="getTreeData"
    />
  </div>
</template>

<script>
import AddGroup from './components/add-group'
import {getDict, getDeviceGroupById, deleteDict, addDeviceToGroup, getDeviceInfoByDeviceNo} from '@/api/device'
import request from '@/utils/request'
export default {
  name: 'DeviceGroup',
  data () {
    return {
      form: {
        deviceNo: ''
      },
      defaultActive: '',
      addVisible: false,
      treeData: [{id: '1',
        label: '设备组套维护',
        isChild: false,
        children: []}],
      tableData: [{name: 'd'}],
      dialogTitle: '新增组套',
      editData: {}
    }
  },
  components: {
    AddGroup
  },
  watch: {
    treeData: {
      handler (newVal) {
        return newVal
      },
      immediate: true
    }
  },
  async created () {
    await this.getTreeData()
  },
  mounted () {
    // this.getDeviceGroupData()
  },
  methods: {
    handleDeleteGroup (id) {
      request({
        url: deleteDict + '/' + id,
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({message: '删除成功', type: 'success'})
          this.getTreeData()
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      })
    },
    handleAdd (param = 0, row = {}) {
      this.addVisible = !this.addVisible
      if (param === 1) {
        this.dialogTitle = '新增组套'
      } else if (param === 2) {
        this.dialogTitle = '编辑组套'
        this.editData = row
      }
    },
    getDeviceByNo () {
      request({
        url: getDeviceInfoByDeviceNo + '/' + this.form.deviceNo,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        let record = {
          deviceNo: data.deviceNo,
          dictNameId: data.dictNameId,
          dictPositionId: data.dictPositionId,
          groupId: data.groupId,
          model: data.model,
          name: data.name,
          position: data.position,
          serialNo: data.serialNo,
          sort: data.sort
        }
        this.$refs.xTable.insertAt(record)
      })
    },
    handleAddDeviceToGroup () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      insertRecords.forEach(item => {
        delete item._XID
      })
      console.log(insertRecords)
      let obj = {
        equipmentGroupList: insertRecords,
        groupId: this.defaultActive
      }
      request({
        method: 'post',
        url: addDeviceToGroup,
        data: obj
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({message: '新增成功', type: 'success'})
          this.getDeviceGroupData()
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      })
    },
    handleTreeClick (nodeObj) {
      this.defaultActive = nodeObj.id
      this.getDeviceGroupData()
    },
    getTreeData () {
      request(
        {
          method: 'get',
          url: getDict + '/' + 'GROUP'
        }
      ).then(res => {
        let data = res.data.data
        data.forEach(item => {
          item.isChild = true
          item.label = item.name
        })
        this.treeData[0].children = data
        this.defaultActive = data[0].id
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(data[0].id)
        })
        this.getDeviceGroupData()
      })
    },
    getDeviceGroupData () {
      request(
        {
          method: 'get',
          url: getDeviceGroupById + '/' + this.defaultActive
        }).then(res => {
        this.tableData = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .device-group{
    display: flex;
    height: 100%;
    justify-content: space-between;
    .dg-left{
      width: 14%;
      // padding-top: 10px;
      box-sizing: border-box;
      background: #fff;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      /deep/ .el-tree-node__content{
        display: flex;
        margin-top: 10px !important;
        justify-content: space-between;
      }
      /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
        background: #D6DCE8 !important;
      }
      .custom-tree-node{
        display: flex;
        flex: 1;
        justify-content: space-between;
        font-size: 14px;
        color: #444444;
        .tree-option{
          color: #3377FF;
          padding-right: 20px;
          i{
            cursor: pointer;
          }
        }
        &.tree-parent-title{
          color: #333333 !important;
        }
      }
    }
    .dg-right{
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      .dg-r-top{
        background: #fff;
        padding: 20px 0 0 20px;
        box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
        border-radius: 5px;
        .el-form{
          .el-form-item{
            margin-bottom:20px;
            .el-input{
              min-width: 300px;
            }
          }
        }
      }
      .dg-r-table{
        flex: 1;
        background: #fff;
        margin-top: 10px;
        box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
        border-radius: 5px;
        overflow: hidden;
        .el-button{
          vertical-align: middle;
          &:nth-last-child(1){
            color:#FF5454;
          }
        }
      }
    }
  }
</style>
