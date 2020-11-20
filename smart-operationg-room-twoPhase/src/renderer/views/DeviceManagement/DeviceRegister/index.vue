<template>
  <div class="device-register">
    <div class="dr-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="设备名称/型号">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="设备位置">
          <el-input v-model="form.input" />
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select
            v-model="form.input"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
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
            @click="handleAddDevice"
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
          field="sort"
          title="序号"
        />
        <vxe-table-column
          field="sex"
          title="设备名称"
        />
        <vxe-table-column
          field="no"
          title="设备编号/型号"
        />
        <vxe-table-column
          field="age1"
          title="设备位置"
        />
        <vxe-table-column
          field="age2"
          title="设备状态"
        />
        <vxe-table-column
          field="age3"
          title="条码"
        />
        <vxe-table-column
          title="操作"
        >
          <template>
            <el-button
              type="text"
              @click="handleShow"
            >
              查看
            </el-button>
            <span class="option-line">|</span>
            <el-button type="text">
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
      <Pagination />
    </div>
    <AddDevice
      :add-visible="addVisible"
      @handleClose="handleCloseAddDialog"
    />
    <ErCode
      :code-visible="codeVisible"
      v-if="codeVisible"
      @handleClose="handleCloseCode"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/pagination'
import AddDevice from './components/add-device'
import ErCode from './components/er-code'
export default {
  name: 'DeviceRegister',
  data () {
    return {
      form: {
        input: ''
      },
      addVisible: false,
      codeVisible: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tableData: [{sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'}]
    }
  },
  components: {
    Pagination, AddDevice, ErCode
  },
  methods: {
    handleShow () {
      this.codeVisible = true
    },
    handleCloseAddDialog () {
      this.addVisible = false
    },
    handleAddDevice () {
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
