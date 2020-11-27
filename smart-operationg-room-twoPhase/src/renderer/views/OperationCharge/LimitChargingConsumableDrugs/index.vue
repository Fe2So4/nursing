<template>
  <!-- 限制耗材药品计费 -->
  <div class="limit-drugs">
    <div class="ld-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="计费项目">
          <el-input v-model="form.orderItem" />
        </el-form-item>
        <el-form-item
          label="科室"
        >
          <el-input v-model="form.department" />
        </el-form-item>
        <el-form-item label=" ">
          <el-button
            type="primary"
          >
            查 询
          </el-button>
          <el-button
            type="info"
            plain
          >
            添 加
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
      >
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
    <div class="ld-bottom">
      <div class="ld-table">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          size="mini"
          class="mytable-scrollbar"
          height="auto"
          auto-resize
        >
          <vxe-table-column
            field="userCode"
            title="项目编号"
          />
          <vxe-table-column
            field="userName"
            title="项目名称"
          />
          <vxe-table-column
            field="workDepartmentName"
            title="单位"
          />
          <vxe-table-column
            field="energyLevels"
            title="科室名称"
          />
          <vxe-table-column
            field="workTime"
            title="可用数量"
          />
          <vxe-table-column
            field="annualLeave"
            title="已用数量"
          />
          <vxe-table-column
            field="annualLeave1"
            title="录入人"
          />
          <vxe-table-column
            field="annualLeave2"
            title="录入时间"
          />
          <vxe-table-column
            title="操作"
          >
            <template>
              <el-button
                type="text"
              >
                编辑
              </el-button>
              <span class="option-line">|</span>
              <el-button
                type="text"
              >
                更多
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <Pagination />
    </div>
    <ConfigDrug
      :config-visible="configVisible"
      :dialog-title="dialogTitle"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/pagination'
import ConfigDrug from './components/config-drug'
export default {
  name: 'LimitDrugs',
  data () {
    return {
      form: {
        name: '',
        orderItem: '',
        workTime: [],
        workTimeStart: '',
        workTimeEnd: '',
        department: ''
      },
      configVisible: false,
      deptList: [

      ],
      dialogTitle: '手术止血耗材配置',
      tableData: [
        {userCode: '1'}
      ],
      showData: {}
    }
  },
  mounted () {

  },
  methods: {
    handleClose () {
      this.configVisible = false
    }
  },
  components: {Pagination, ConfigDrug},
  created () {

  }
}
</script>

<style lang="scss" scoped>
  .limit-drugs{
    height: 100%;
    display: flex;
    flex-direction: column;
    .ld-top{
      padding: 20px 20px;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      .el-form{
        .el-form-item{
          margin-bottom: unset;
        }
      }
    }
    .ld-bottom{
      margin-top: 10px;
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      .ld-table{
        flex: 1;
        // height: 112px;
        .option-line{
          // vertical-align: middle;
          // font-size: 20px;
          display: inline-block;
        }
        .el-button{
          vertical-align: middle;
          &:nth-last-child(1){
            // color:#FF5454;
          }
        }
      }
      .ld-pagination{
        // padding: 40px 0;
        display: flex;
        justify-content: center;
        // .el-form{
        //   .el-form-item{
        //     margin-bottom:unset;
        //   }
        // }
      }
    }
  }

</style>
<style>

</style>
