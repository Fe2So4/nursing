<template>
  <div class="device-register">
    <div class="dr-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="设备名称/型号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="设备位置">
          <el-select
            v-model="form.position"
            placeholder="请选择"
          >
            <el-option
              v-for="item in positionValue"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select
            v-model="form.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusValue"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
        <!-- field="sort" -->
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
            <el-button type="text">
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="dr-pagination">
      <Pagination :children-data="paginationData" />
    </div>
    <AddDevice
      :add-visible="addVisible"
      v-if="addVisible"
      :position-list="positionList"
      :title="deviceTitle"
      :status-list="statusList"
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
import { getDeviceRegisterList, getDict } from '@/api/device'
import request from '@/utils/request'
export default {
  name: 'DeviceRegister',
  data () {
    return {
      form: {
        name: '',
        position: '',
        status: ''
      },
      addVisible: false,
      codeVisible: false,
      tableData: [],
      positionList: [],
      statusList: [],
      deviceTitle: '新增设备',
      currentPage: 1,
      totalPages: 0,
      pageSize: 20,
      codeData: null,
      paginationData: {
        total: null,
        pages: null
      }
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
    this.getDeviceList()
  },
  methods: {
    getDeviceList () {
      request({
        url: getDeviceRegisterList,
        data: {
          nameOrModel: this.form.name,
          position: this.form.position,
          status: this.form.status,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        },
        method: 'post'
      }).then(res => {
        this.paginationData.pages = res.data.data.pages
        this.paginationData.total = res.data.data.total
        // this.paginationData.pages = res.data.data.pages
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
      console.log(row)
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
