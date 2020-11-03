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
          v-model="formData.hospitalNoOrName"
          placeholder="请输入姓名/住院号"
        />
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button
          class="btnBlue"
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
  methods: {
    searchTable () {
      let obj = {
        startTime: this.formData.startTime || '',
        endTime: this.formData.endTime || '',
        hospitalNoOrName: this.formData.hospitalNoOrName || '',
        pageIndex: 1,
        pageSize: 20
      }
      Bus.$emit('searchNursing-document-table', obj)
    }
  }
}
</script>

<style scoped lang="scss">
.btnBlue {
    background-color:#EAEEF7;
    width: 90px;
    // background-color:#3377FF;
    // color: #fff;
    margin-left: 20px;
}

.header-content {
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    background-color: #fff;
    padding: 20px;
    .header-content-form {
        display: flex;
        align-items: center;
    }
}
.vxe-button.size--mini.type--button:hover {
  background-color: #3377FF;
  color: #FFFFFF;
}
</style>
