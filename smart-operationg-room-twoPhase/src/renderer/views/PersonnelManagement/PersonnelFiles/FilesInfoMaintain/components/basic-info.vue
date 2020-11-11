<template>
  <div class="basic-info">
    <el-form
      :inline="true"
      size="mini"
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
      <el-form-item label="技术职称">
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="人员类别">
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
      <el-form-item label="参加工作时间">
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职务">
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
      <el-form-item label="能级水平">
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否带教组长">
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
      <el-form-item label="宅电">
        <el-select v-model="form.department">
          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否在科">
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
    >
      <el-form-item label="身份证">
        <el-input />
      </el-form-item>
      <el-form-item label="家庭详细地址">
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
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  data () {
    return {
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

  }
</style>
