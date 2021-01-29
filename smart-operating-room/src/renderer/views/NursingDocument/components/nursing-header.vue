<template>
  <div class="header-content">
    <vxe-form
      class="header-content-form"
      :data="formData"
      size="mini"
      title-align="right"
    >
      <vxe-form-item
        title="开始"
        field="startTime"
      >
        <vxe-input
          v-model="formData.startTime"
          placeholder="日期选择"
          type="date"
        />
      </vxe-form-item>
      <vxe-form-item
        title="结束"
        field="endTime"
      >
        <vxe-input
          v-model="formData.endTime"
          placeholder="日期选择"
          type="date"
        />
      </vxe-form-item>
      <vxe-form-item title="姓名/住院号">
        <vxe-input
          @keyup.enter.native="searchTable"
          clearable
          v-model="formData.hospitalNoOrName"
          placeholder="请输入姓名/住院号"
        />
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button
          class="btn"
          size="mini"
          status="my-purple"
          @click="searchTable"
        >
          查 询
        </vxe-button>
      </vxe-form-item>
    </vxe-form>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'NursingHeader',
  data () {
    return {
      formData: {
        startTime: '',
        endTime: ''
      },
      pageIndex: 0,
      pageSize: 20
    }
  },
  mounted () {
    this.formData.startTime = this.utilsGetNewDate()
    this.formData.endTime = this.utilsGetNewDate()
  },
  methods: {
    searchTable () {
      let obj = {
        startTime: this.formData.startTime || '',
        endTime: this.formData.endTime || '',
        hospitalNoOrName: this.formData.hospitalNoOrName || '',
        pageIndex: 1,
        pageSize: 20
      }
      // this.$parent.$refs.getTableData.getTableData(obj)
      Bus.$emit('searchNursing-document-table', obj)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_handle.scss';

.btn {
  background-color: #eaeef7;
  width: 90px;
  margin-left: 20px;
}

.header-content {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  // background-color: #fff;
  @include background('search_header_bgc');
  @include font_color('search_header_font');
  padding: 20px;
  .header-content-form {
    display: flex;
    align-items: center;
  }
}
</style>
