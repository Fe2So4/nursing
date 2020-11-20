<template>
  <div class="device-position">
    <el-dialog
      title="修改设备位置"
      :visible.sync="deviceVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
        :model="form"
      >
        <el-form-item label="设备名称">
          <el-input v-model="form.value" />
        </el-form-item>
        <el-form-item label="序列号">
          <el-input disabled />
        </el-form-item>
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
        <el-form-item label="设备编号">
          <el-input disabled />
        </el-form-item>
        <el-form-item label="型号">
          <el-input disabled />
          <!-- <el-button @click="handleClick">
            test
          </el-button> -->
        </el-form-item>
      </el-form>
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
  name: 'DevicePosition',
  data () {
    return {
      value: '',
      form: {
        value: ''
      },
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
    deviceVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
    // handleClick () {
    //   this.$http({
    //     method: 'post',
    //     headers: {
    //       Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MDU5MjEzMzcsInN1YiI6ImI5MDA3Nzk2LEFDSVMs566h55CG5ZGYLWYyMzI0M2IsIiwiaWF0IjoxNjA1NjYyMTM3NDI1fQ.Wr0zZGZLL7osEkbQNutV5M1aJrS4EeUGwcrDJxPAYNQfElFBQqykYjrze8QPuVo8WxJU90j38hffjB0J490v_g'
    //     },
    //     url: 'http://192.168.1.106:2080/ocis/portfolio/deleteClassTimeInfo',
    //     data: [1]
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  .device-position{
    .el-select{
      width: 178px;
    }
  }
</style>
