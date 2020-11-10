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
        <vxe-form-item
          title="查询类型"
          field="name"
        >
          <vxe-select
            style="width:96px"
            v-model="formData.employeeType"
            placeholder="类型"
          >
            <vxe-option
              v-for="item in typeList"
              :key="item.id"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
        </vxe-form-item>
        <vxe-form-item field="name">
          <vxe-select
            style="width:96px"
            v-model="formData.name"
            placeholder="默认尺寸"
          >
            <vxe-option
              v-for="num in 15"
              :key="num"
              :value="num"
              :label="`选项${num}`"
            />
          </vxe-select>
        </vxe-form-item>
        <vxe-form-item
          title="开始"
          field="name"
        >
          <vxe-input
            style="width:104px"
            v-model="formData.value404"
            type="time"
          />
        </vxe-form-item>
        <vxe-form-item field="name">
          <vxe-input
            style="width:104px"
            v-model="formData.value404"
            type="time"
          />
        </vxe-form-item>
      </div>
      <div class="form-right">
        <vxe-form-item>
          <vxe-input v-model="formData.name" />
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
          >
            查 询
          </vxe-button>
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
          >
            预 览
          </vxe-button>
        </vxe-form-item>
      </div>
    </vxe-form>
  </div>
</template>

<script>
export default {
  name: 'StatisticalHeader',
  data () {
    return {
      formData: {
        employeeType: 1,
        value404: ''
      },
      typeList: [
        {
          id: 1,
          value: 1,
          label: '主刀医师'
        },
        {
          id: 2,
          value: 2,
          label: '麻醉医师'
        },
        {
          id: 3,
          value: 3,
          label: '洗手护士'
        },
        {
          id: 4,
          value: 4,
          label: '巡回护士'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
    width: 90px;
    // background-color:#fff;
    // color: #fff;
    // margin-left: 20px;
}

.header-content {
    background-color: #fff;
    padding: 20px;
    min-width: 1280px;
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
