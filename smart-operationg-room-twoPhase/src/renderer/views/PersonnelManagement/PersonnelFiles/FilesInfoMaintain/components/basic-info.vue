<template>
  <div class="basic-info">
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="姓名">
        <el-input />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="技术职称"
        label-width="100px"
      >
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="人员类别"
        label-width="100px"
      >
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="民族">
        <el-input />
      </el-form-item>
      <el-form-item label="出生年月">
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="参加工作时间"
        label-width="100px"
      >
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="职务"
        label-width="100px"
      >
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="原学历">
        <el-input />
      </el-form-item>
      <el-form-item label="现学历">
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="能级水平"
        label-width="100px"
      >
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否带教组长"
        label-width="100px"
      >
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="籍贯">
        <el-input />
      </el-form-item>
      <el-form-item label="手机">
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="宅电"
        label-width="100px"
      >
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否在科"
        label-width="100px"
      >
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="身份证">
        <el-input style="width:466px" />
      </el-form-item>
      <el-form-item
        label-width="100px"
        label="家庭详细地址"
      >
        <el-select
          v-model="form.department"
          style="width:500px;"
        >
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="获奖情况">
        <el-input
          type="textarea"
          style="width:1080px"
        />
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="论文发表">
        <el-input
          type="textarea"
          style="width:1080px"
        />
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="课题申报">
        <el-input
          type="textarea"
          style="width:1080px"
        />
      </el-form-item>
    </el-form>
    <div class="option">
      <span>
        <el-button
          type="info"
          size="mini"
          plain
        >选择文件</el-button>
      </span>
      <span><el-button
        type="info"
        size="mini"
        plain
      >保 存</el-button><el-button
        type="info"
        size="mini"
        plain
      >返 回</el-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  data () {
    return {
      form: {
        department: ''
      },
      deptList: [
        {
          label: '部门1',
          value: '1'
        }, {
          label: '部门2',
          value: '2'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .basic-info{
    .el-form{
      .el-form-item{
        margin-bottom:unset;
        padding:8px 0;
      }
      &:nth-child(1){
        background: #F9FAFC;
      }
      &:nth-child(3){
        background: #F9FAFC;
      }
      &:nth-child(5){
        background: #F9FAFC;
      }
    }
    .option{
      display: flex;
      margin-top: 30px;
      justify-content: space-between;
      span{
        &:first-child{
          margin-left: 26px;
        }
        &:last-child{
          margin-right: 280px;
        }
      }
    }
  }
</style>
