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
            v-model="formData.startDate"
            placeholder="开始日期"
            type="date"
          />
        </vxe-form-item>
        <vxe-form-item
          title="结束"
          field="name"
        >
          <vxe-input
            style="width:154px"
            v-model="formData.endDate"
            placeholder="结束日期"
            type="date"
          />
        </vxe-form-item>
        <vxe-form-item
          title="查询类型"
          field="employeeType"
        >
          <vxe-select
            style="width:96px"
            v-model="formData.employeeType"
            placeholder=""
          >
            <vxe-option
              v-for="item in typeList"
              :key="item.id"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
        </vxe-form-item>
        <!-- <vxe-form-item field="timeType">
          <vxe-select
            style="width:96px"
            v-model="formData.timeType"
            placeholder=""
          >
            <vxe-option
              v-for="item in timeTypeList"
              :key="item.id"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
        </vxe-form-item> -->
        <vxe-form-item
          title="开始"
          field="startTime"
        >
          <vxe-input
            placeholder="开始时间"
            style="width:104px"
            v-model="formData.startTime"
            type="time"
          />
        </vxe-form-item>
        <vxe-form-item field="endTime">
          <vxe-input
            placeholder="结束时间"
            style="width:104px"
            v-model="formData.endTime"
            type="time"
          />
        </vxe-form-item>
      </div>
      <div class="form-right">
        <vxe-form-item>
          <vxe-input
            @keyup.enter.native="search"
            clearable
            placeholder="姓名"
            v-model="formData.name"
          />
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
            @click="search"
          >
            查 询
          </vxe-button>
        </vxe-form-item>
        <vxe-form-item v-if="isShow === 0">
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
            @click="yulan"
          >
            预 览
          </vxe-button>
        </vxe-form-item>
        <vxe-form-item v-else>
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
            @click="dayin"
          >
            打 印
          </vxe-button>
        </vxe-form-item>
      </div>
    </vxe-form>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'StatisticalHeader',
  props: {
    isShow: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      formData: {
        employeeType: 1,
        timeType: 0,
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        name: ''
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
      ],
      timeTypeList: [
        {
          id: 1,
          value: 0,
          label: '全部'
        },
        {
          id: 2,
          value: 1,
          label: '安全核查时间'
        },
        {
          id: 3,
          value: 2,
          label: '进出手术室时间'
        }
      ],
      queryParams: {}
    }
  },
  mounted () {
    this.initQueryParams()
    this.search()
  },
  methods: {
    // 初始化参数
    initQueryParams () {
      this.formData.startDate = this.utilsGetNewDate()
      this.formData.endDate = this.utilsGetNewDate()
      this.formData.startTime = '00:00:00'
      this.formData.endTime = '23:59:59'
    },
    search () {
      this.$parent.isShow = 0
      this.$parent.getStatisticalTable(this.formData)
    },
    // 预览
    yulan () {
      this.$parent.isShow = 1
    },
    // 打印
    dayin () {
      Bus.$emit('statistical', '1')
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
    width: 90px;
    background-color:#EAEEF7;
    // background-color:#fff;
    // color: #fff;
    // margin-left: 20px;
}

.header-content {
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
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
