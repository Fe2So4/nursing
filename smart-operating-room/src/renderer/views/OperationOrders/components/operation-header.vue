<template>
  <div
    class="header-container"
    style="width:100%"
  >
    <div class="container-left">
      <span class="mgl20 left-title">开始</span>
      <vxe-form
        class="mgl10 form"
        :data="formData1"
        size="mini"
        @reset="resetEvent"
      >
        <vxe-form-item field="startDate">
          <template v-slot>
            <vxe-input
              placeholder="请选择日期"
              v-model="formData1.startDate"
              type="date"
              clearable
            />
          </template>
        </vxe-form-item>
        <vxe-form-item field="nickname">
          <template v-slot>
            <vxe-input
              v-model="formData1.nickname"
              placeholder="病人姓名/手术名称/住院号"
              clearable
            />
          </template>
        </vxe-form-item>
      </vxe-form>
      <div class="bottonContainer">
        <vxe-button
          status="my-purple"
          size="mini"
          class="btn"
          content="查询"
          @click="searchCardList"
        />
        <vxe-button
          status="my-purple"
          size="mini"
          class="btn"
          content="同步"
        />
        <vxe-button
          status="my-purple"
          size="mini"
          v-if="formData2.isSend === '1'"
          class="btn"
          content="退单"
          @click="changeItem(1)"
        />
        <vxe-button
          status="my-purple"
          size="mini"
          v-else
          class="btn"
          content="修改"
          @click="changeItem(2)"
        />
      </div>
    </div>

    <div class="container-right">
      <vxe-form
        class="mgl10 form"
        :data="formData2"
        @reset="resetEvent"
      >
        <vxe-form-item field="startDate">
          <template v-slot>
            <vxe-radio
              name="n1"
              v-model="formData2.isSend"
              label="1"
              content="未派单"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item field="nickname">
          <template v-slot>
            <vxe-radio
              name="n1"
              v-model="formData2.isSend"
              label="2"
              content="已派单"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item title="楼层">
          <vxe-select
            style="width:120px"
            v-model="formData2.selectFloor"
            placeholder="默认尺寸"
          >
            <vxe-option
              v-for="num in floorList"
              :key="num"
              :value="num"
              :label="`选项${num}`"
            />
          </vxe-select>
        </vxe-form-item>
      </vxe-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpeartionHeader',
  data () {
    return {
      formData1: {
        startDate: '',
        nickname: ''
      },
      formData2: {
        selectFloor: '',
        isSend: '1'
      },
      floorList: [

      ]
    }
  },
  mounted () {
    this.formData1.startDate = this.utilsGetNewDate()
    console.log(this.formData1.startDate)
    this.getFloorList()
  },
  methods: {
    // 获取楼层列表
    getFloorList () {
      this.$store.dispatch('ReqgetFloor').then(res => {
        console.log(res)
      })
    },
    resetEvent () {
      this.$XModal.message({ message: '重置事件', status: 'info' })
    },
    changeItem (type) {
      this.$emit('changeItem', type)
    },
    searchCardList () {
      let data = {
        startTime: this.formData1.startDate,
        nickname: this.formData1.nickname,
        isSend: this.formData2.isSend,
        selectFloor: this.formData2.selectFloor
      }
      console.log(data)
    }
  },
  watch: {
    'formData2.isSend' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('changeRadio')
      }
    }
  }
}
</script>

<style lang="scss"  scoped>
.el-scrollbar__wrap{
  overflow-y: hidden;
}
.btn {
  width: 90px;
  // height: 30px;
  color: #303133;
  background-color: #E9EDF7;
}
.mgl5 {
    margin-left: 5px;
}
.mgl10 {
    margin-left: 10px;
}
.mgl20 {
    margin-left: 20px;
}
.header-container {
    width: 100%;
    // padding-bottom: 20px;
    background-color: #fff;
    height: 70px;
    display: flex;
    // flex-flow: wrap;
    justify-content: space-between;
    .container-left {
        // flex: 1;
        min-width: 680px;
        display: flex;
        align-items: center;
        .left-title {
            font-size: 14px;
        }
        .form {
            display: flex;
        }
    }
    .container-right {
        // flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .form {
            display: flex;
        }
    }
}
</style>
