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
          @click="synchronous"
        />
        <vxe-button
          status="my-purple"
          size="mini"

          class="btn"
          content="退单"
          @click="changeItem(1)"
        />
        <vxe-button
          status="my-purple"
          size="mini"
          v-if="formData2.isSend === '1'"
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
      >
        <vxe-form-item field="startDate">
          <template v-slot>
            <vxe-radio
              name="n1"
              v-model="formData2.isSend"
              label="0"
              content="未派单"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item field="nickname">
          <template v-slot>
            <vxe-radio
              name="n1"
              v-model="formData2.isSend"
              label="1"
              content="已派单"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item title="楼层">
          <vxe-select
            clearable
            style="width:120px"
            v-model="formData2.selectFloor"
            placeholder="选择楼层"
          >
            <vxe-option
              v-for="item in floorList"
              :key="item.id"
              :value="item.floorNo"
              :label="item.floorName"
            />
          </vxe-select>
        </vxe-form-item>
      </vxe-form>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
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
        isSend: '0'
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
        if (res.data.code === 200) {
          this.$store.commit('SAVE_FLOOR', res.data.data)
          this.floorList = res.data.data
        }
      })
    },
    // 点击同步按钮
    synchronous () {
      let data = {
        date: this.formData1.startDate || this.utilsGetNewDate(),
        condition: this.formData1.nickname,
        isOrder: this.formData2.isSend,
        floorNo: this.formData2.selectFloor || ''
      }
      Bus.$emit('operation-header-synchronous', data)
    },
    changeItem (type) {
      this.$emit('changeItem', type)
    },
    searchCardList () {
      let data = {
        date: this.formData1.startDate || this.utilsGetNewDate(),
        condition: this.formData1.nickname,
        isOrder: this.formData2.isSend,
        floorNo: this.formData2.selectFloor || ''
      }
      Bus.$emit('operation-header-searchCard', data)
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    }
  },
  watch: {
    'formData2.isSend' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('changeRadio', newVal)
        this.$store.commit('CHANGE_ISSHEND', newVal)
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
.el-scrollbar__wrap {
  margin-bottom: 0px !important;
}
</style>
