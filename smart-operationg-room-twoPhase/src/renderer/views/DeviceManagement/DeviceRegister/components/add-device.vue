<template>
  <div class="add-device">
    <el-dialog
      title="新增设备"
      :visible.sync="addVisible"
      width="35%"
      :before-close="handleClose"
    >
      <div class="radio-group">
        <el-radio
          v-model="form.radio"
          label="1"
        >
          单件
        </el-radio>
        <el-radio
          v-model="form.radio"
          label="2"
        >
          套件
        </el-radio>
      </div>
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="form"
      >
        <el-form-item label="设备名称">
          <el-input v-model="form.value" />
        </el-form-item>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="form"
      >
        <el-form-item label="设备位置">
          <el-select
            v-model="value"
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
        <el-form-item label="设备状态">
          <el-select
            v-model="value"
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
        <el-form-item
          label="设备编号"
          v-if="form.radio==='1'"
        >
          <el-input disabled />
        </el-form-item>
        <el-form-item
          label="型号"
          v-if="form.radio==='1'"
        >
          <el-input disabled />
        </el-form-item>
      </el-form>
      <div
        v-if="form.radio==='2'"
      >
        <el-form
          size="mini"
          :inline="true"
          label-width="80px"
          :model="form"
          v-for="item in 6"
          :key="item+'form'"
        >
          <el-form-item label="设备名称">
            <el-input v-model="form.value" />
          </el-form-item>
          <el-form-item label="设备编号">
            <el-input disabled />
          </el-form-item>
          <el-form-item label="型号">
            <el-input disabled />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="handleClose"
        >保 存</el-button>
        <el-button
          @click="handleClose"
          size="mini"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddDevice',
  data () {
    return {
      form: {
        value: '',
        radio: '1'
      },
      value: '',
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
      }]
    }
  },
  props: {
    addVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-device{
    overflow: hidden;
    .radio-group{
      margin-bottom: 10px;
      padding-left: 12px;
    }
    .el-form{
      .el-select{
        max-width: 178px;
      }
      .el-form-item{
        margin-bottom: 10px;
      }
    }
  }
</style>
