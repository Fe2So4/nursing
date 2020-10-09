<template>
  <div class="header-content">
    <vxe-form
      class="header-content-form"
      size="mini"
      :data="formData"
      title-align="right"
    >
      <div class="form-left">
        <vxe-form-item
          title="开始"
          field="name"
        >
          <vxe-input
            style="width:154px"
            v-model="formData.name"
            placeholder="日期选择"
            type="date"
          />
        </vxe-form-item>
        <vxe-form-item
          title="结束"
          field="name"
        >
          <vxe-input
            style="width:154px"
            v-model="formData.name"
            placeholder="日期选择"
            type="date"
          />
        </vxe-form-item>
      </div>
      <div class="form-right">
        <vxe-form-item>
          <vxe-input v-model="formData.name" />
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button
            status="my-purple"
            class="btn"
            size="mini"
          >
            查 询
          </vxe-button>
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button
            status="my-purple"
            class="btn"
            size="mini"
          >
            打 印
          </vxe-button>
        </vxe-form-item>
      </div>
    </vxe-form>
  </div>
</template>

<script>
export default {
  name: 'SurgeryHeader',
  data () {
    return {
      formData: {
        value404: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
    width: 90px;
    background-color:#EAEEF7;
    color: #303234;
    // margin-left: 20px;
}

.header-content {
    background-color: #fff;
    padding: 20px;
    min-width: 850px;
    .header-content-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        //
        .form-right {
            flex: 1;
            text-align: right;
        }
    }
}
</style>
