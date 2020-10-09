<template>
    <div class="header-container" style="width:100%">
        <div class="container-left">
            <span class="mgl20 left-title">开始</span>
            <vxe-form class="mgl10 form" :data="formData1" size="mini" @reset="resetEvent">
                <vxe-form-item field="startDate">
                    <template v-slot>
                        <vxe-input v-model="formData1.startDate" type="date" clearable></vxe-input>
                    </template>
                </vxe-form-item>
                <vxe-form-item  field="nickname">
                    <template v-slot>
                        <vxe-input v-model="formData1.nickname" placeholder="病人姓名/手术名称/住院号" clearable ></vxe-input>
                    </template>
                </vxe-form-item>
            </vxe-form>
            <div class="bottonContainer">
                <vxe-button size="mini" class="btn" content="查询"></vxe-button>
                <vxe-button size="mini" class="btn" content="同步"></vxe-button>
                <vxe-button size="mini" v-if="value1 === '1'" class="btn" content="退单"></vxe-button>
                <vxe-button size="mini" v-else class="btn" content="修改"></vxe-button>
            </div> 
        </div>

        <div class="container-right" >
            <vxe-form class="mgl10 form" :data="formData1"  @reset="resetEvent">
                <vxe-form-item field="startDate">
                    <template v-slot>
                        <vxe-radio name="n1" v-model="value1" label="1" content="未派单" ></vxe-radio>
                    </template>
                </vxe-form-item>
                <vxe-form-item  field="nickname" >
                    <template v-slot>
                        <vxe-radio name="n1" v-model="value1" label="2" content="已派单" ></vxe-radio>
                    </template>
                </vxe-form-item>
                <vxe-form-item title="楼层"  >
                    <vxe-select v-model="value1" placeholder="默认尺寸">
                        <vxe-option v-for="num in 15" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
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
      value1: ''
    }
  },
  methods: {
    resetEvent () {
      this.$XModal.message({ message: '重置事件', status: 'info' })
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