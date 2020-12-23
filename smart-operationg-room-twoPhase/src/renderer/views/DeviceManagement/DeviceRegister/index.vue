<template>
  <div class="device-register">
    <div class="dr-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="设备名称/型号">
          <el-input
            v-model="form.name"
            clearable
          />
        </el-form-item>
        <el-form-item label="设备位置">
          <el-select
            v-model="form.position"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in positionValue"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select
            v-model="form.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in statusValue"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="getDeviceList"
          >
            搜 索
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item>
          <el-button
            type="info"
            plain
            @click="handleAddDevice(1)"
          >
            新 增
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="info"
            plain
          >
            导 出
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dr-table">
      <vxe-table
        align="center"
        :data="tableData"
        size="mini"
        height="auto"
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
          field="deviceNoAndModel"
          title="设备编号/型号"
        />
        <vxe-table-column
          field="position"
          title="设备位置"
        />
        <vxe-table-column
          field="status"
          title="设备状态"
        />
        <vxe-table-column
          field="barCode"
          title="条码"
        />
        <vxe-table-column
          title="操作"
        >
          <template v-slot="{row}">
            <el-button
              type="text"
              @click="handleShow(row)"
            >
              查看
            </el-button>
            <span class="option-line">|</span>
            <el-button
              type="text"
              @click="handleAddDevice(2,row)"
            >
              编辑
            </el-button>
            <span class="option-line">|</span>
            <el-button
              type="text"
              @click="handleDeleteDevice(row.id)"
            >
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="dr-pagination">
      <Pagination
        ref="pag"
        :children-data="paginationData"
        @searchTableList="getDeviceList"
      />
    </div>
    <AddDevice
      :add-visible="addVisible"
      v-if="addVisible"
      :position-list="positionList"
      :title="deviceTitle"
      :edit-data="editData"
      :status-list="statusList"
      @getDeviceList="getDeviceList"
      @handleClose="handleCloseAddDialog"
    />
    <ErCode
      :code-visible="codeVisible"
      :code-data="codeData"
      v-if="codeVisible"
      @handleClose="handleCloseCode"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/pagination'
import AddDevice from './components/add-device'
import ErCode from './components/er-code'
import { getDeviceRegisterList, getDict, deleteDeviceByNo } from '@/api/device'
import request from '@/utils/request'
export default {
  name: 'DeviceRegister',
  data () {
    return {
      form: {
        name: '',
        position: '全部',
        status: '全部'
      },
      addVisible: false,
      codeVisible: false,
      tableData: [],
      positionList: [],
      statusList: [],
      deviceTitle: '新增设备',
      codeData: null,
      paginationData: {
        total: 0,
        pages: 0
      },
      editData: {}
    }
  },
  components: {
    Pagination, AddDevice, ErCode
  },
  computed: {
    statusValue () {
      let arr = JSON.parse(JSON.stringify(this.statusList))
      arr.unshift({id: '', name: '全部'})
      return arr
    },
    positionValue () {
      let arr = JSON.parse(JSON.stringify(this.positionList))
      arr.unshift({id: '', name: '全部'})
      return arr
    }
  },
  created () {
    this.getDeviceStatus()
    this.getDevicePosition()
  },
  mounted () {
    this.getDeviceList()
  },
  methods: {
    // 删除设备
    handleDeleteDevice (id) {
      request({
        method: 'get',
        url: deleteDeviceByNo + '/' + id
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '删除成功'})
          this.getDeviceList()
        } else {
          this.$message({type: 'error', message: '删除失败'})
        }
      })
    },
    getDeviceList () {
      let position = ''
      let status = ''
      if (this.form.position !== '全部') {
        position = this.form.position
      }
      if (this.form.status !== '全部') {
        status = this.form.status
      }
      request({
        url: getDeviceRegisterList,
        data: {
          nameOrModel: this.form.name,
          position: position,
          status: status,
          pageIndex: this.$refs.pag.currentPage,
          pageSize: this.$refs.pag.pageSize
        },
        method: 'post'
      }).then(res => {
        this.paginationData.pages = res.data.data.pages
        this.paginationData.total = res.data.data.total
        this.tableData = res.data.data.list
      })
    },
    getDeviceStatus () {
      request(
        {
          method: 'get',
          url: getDict + '/' + 'STATUS'
        }).then(res => {
        this.statusList = res.data.data
        // this.statusList.unshift({id: '', name: '全部'})
      })
    },
    getDevicePosition () {
      request(
        {
          method: 'get',
          url: getDict + '/' + 'POSITION'
        }).then(res => {
        this.positionList = res.data.data
        // this.positionList.unshift({id: '', name: '全部'})
      })
    },
    handleShow (row) {
      this.codeData = row
      this.codeVisible = true
    },
    handleCloseAddDialog () {
      this.addVisible = false
    },
    handleAddDevice (type, row = {}) {
      if (type === 1) {
        // 新增
        this.deviceTitle = '新增设备'
        this.editData = {}
      } else {
        // 编辑
        this.deviceTitle = '修改设备'
        this.editData = row
      }
      this.addVisible = true
    },
    handleCloseCode () {
      this.codeVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .device-register{
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-top{
      padding: 20px 30px 0 40px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      .el-form{
        .el-form-item{
          margin-bottom: 20px;
          .el-select{
            max-width: 178px;
          }
        }
      }
    }
    .dr-table{
      flex: 1;
      max-height: calc(100% - 202px);
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
