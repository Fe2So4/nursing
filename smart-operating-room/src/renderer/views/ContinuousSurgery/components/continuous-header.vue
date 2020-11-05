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
          field="startDate"
        >
          <vxe-input
            style="width:154px"
            v-model="formData.startDate"
            placeholder="开始时间"
            type="date"
          />
        </vxe-form-item>
        <vxe-form-item
          title="结束"
          field="endDate"
        >
          <vxe-input
            style="width:154px"
            v-model="formData.endDate"
            placeholder="结束时间"
            type="date"
          />
        </vxe-form-item>
      </div>
      <div class="form-right">
        <vxe-form-item>
          <vxe-input
            clearable
            v-model="formData.nameOrNum"
            placeholder="房间号/病人姓名"
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
  name: 'ContinuousHeader',
  props: {
    isShow: {
      type: Number,
      required: true
    }},
  data () {
    return {
      formData: {
        startDate: '',
        endDate: '',
        nameOrNum: ''
      }
    }
  },
  mounted () {
    this.initParams()
    console.log(this.isShow)
  },
  methods: {
    initParams () {
      this.formData.startDate = this.utilsGetNewDate()
      this.formData.endDate = this.utilsGetNewDate()
    },
    search () {
      this.$parent.isShow = 0
      this.$parent.getContinuousTable(this.formData)
    },
    yulan () {
      this.$parent.isShow = 1
    },
    dayin () {
      Bus.$emit('continuous', '1')
    }

  }
}
</script>

<style scoped lang="scss">
.btn {
    width: 90px;
    background-color:#EAEEF7;
    // color: #fff;
    // margin-left: 20px;
}

.header-content {
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
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
