<template>
  <div class="billing-audit">
    <div class="ba-top">
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item label="手术日期">
          <el-date-picker
            v-model="form.opeTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="手术间">
          <el-input v-model="form.opeRoom" />
        </el-form-item>
        <el-form-item label="住院号">
          <el-input v-model="form.opeHosNo" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            查 询
          </el-button>
          <el-button
            type="info"
            plain
          >
            新 增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ba-middle">
      <div class="ba-m-left">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          size="mini"
          class="mytable-scrollbar"
          height="320px"
          auto-resize
        >
          <vxe-table-column
            field="time"
            title="日期"
          />
          <vxe-table-column
            field="userName"
            title="手术间"
          />
          <vxe-table-column
            field="workDepartmentName"
            title="住院号"
          />
          <vxe-table-column
            field="energyLevels"
            title="姓名"
          />
          <vxe-table-column
            field="energyLevels"
            title="状态"
          >
            <template>
              <i class="el-icon-circle-check" />
              <!-- el-icon-circle-close -->
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="ba-m-right">
        <el-row>
          <el-col>
            <span class="label">姓名</span>
            <span class="value">林本德 (转入病房)</span>
          </el-col>
          <el-col>
            <span class="label">性别</span>
            <span class="value">男</span>
          </el-col>
          <el-col>
            <span class="label">年龄</span>
            <span class="value">68岁</span>
          </el-col>
          <el-col>
            <span class="label">患者来源</span>
            <span class="value">外地</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="label">手术间</span>
            <span class="value">林本德 (转入病房)</span>
          </el-col>
          <el-col>
            <span class="label">科室</span>
            <span class="value">为外壳</span>
          </el-col>
          <el-col>
            <!-- <span class="label"></span> -->
            <span class="value">68555</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="label">住院/门诊号</span>
            <span class="value">212</span>
          </el-col>
          <el-col>
            <span class="label">日期</span>
            <span class="value">2020-09-28</span>
          </el-col>
          <el-col>
            <span class="label">付费方式</span>
            <span class="value">自费</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="label">已行</span>
            <span class="value">腹腔镜探查术+胸腔镜下胃游离术</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="label">洗手护士</span>
            <span class="value">陈佳佳</span>
          </el-col>
          <el-col>
            <span class="label">巡回护士</span>
            <span class="value">孙新琪</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="label">术者</span>
            <span class="value">刘晓文</span>
          </el-col>
          <el-col>
            <span class="label">麻醉医生</span>
            <span class="value">黄思铭</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="label">术后诊断</span>
            <span class="value">胃体癌</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="ba-bottom">
      <div class="ba-b-table">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          size="mini"
          class="mytable-scrollbar"
          height="320px"
          auto-resize
        >
          <vxe-table-column
            field="time"
            title="序号"
          />
          <vxe-table-column
            field="userName"
            title="类别"
          />
          <vxe-table-column
            field="workDepartmentName"
            title="类别名称"
          />
          <vxe-table-column
            field="energyLevels"
            title="项目名称"
          />
          <vxe-table-column
            field="energyLevels"
            title="条形码"
          />
          <vxe-table-column
            field="energyLevels"
            title="规格"
          />
          <vxe-table-column
            field="energyLevels"
            title="单位"
          />
          <vxe-table-column
            field="energyLevels"
            title="用量"
          />
          <vxe-table-column
            field="energyLevels"
            title="单价(元)"
          />
          <vxe-table-column
            field="energyLevels"
            title="费用(元)"
          />
          <vxe-table-column
            field="energyLevels"
            title="录入者"
          />
          <vxe-table-column
            field="energyLevels"
            title="录入时间"
          />
          <vxe-table-column
            field="energyLevels"
            title="操作"
          >
            <template>
              <i class="el-icon-circle-check" />
              <!-- el-icon-circle-close -->
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BillingAudit',
  data () {
    return {
      form: {
        opeTime: '',
        name: '',
        opeHosNo: '',
        opeRoom: ''
      },
      tableData: [{time: '2012'}]
    }
  }
}
</script>

<style lang="scss" scoped>
  .billing-audit{
    .ba-top{
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      padding: 20px;
      .el-form-item{
        margin-bottom:unset;
      }
    }
    .ba-middle{
      display: flex;
      margin: 10px 0;
      .ba-m-left{
        width: 600px;
        background: #FFFFFF;
      }
      .ba-m-right{
        flex: 1;
        background: #FFFFFF;
        margin-left: 10px;
      }
    }
    .ba-bottom{
      background: #ffffff;;
    }
  }
</style>
