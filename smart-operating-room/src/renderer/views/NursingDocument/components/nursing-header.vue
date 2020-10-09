<template>
    <div class="header-content">
        <vxe-form class="header-content-form" :data="formData" size="mini" title-align="right" >
            <vxe-form-item title="开始" field="name">
                <vxe-input v-model="formData.name" placeholder="日期选择" type="date"></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="结束" field="name">
                <vxe-input v-model="formData.name" placeholder="日期选择" type="date"></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="单据类型" field="name">
                <vxe-select v-model="formData.name" placeholder="默认尺寸">
                    <vxe-option v-for="num in 15" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                </vxe-select>    
            </vxe-form-item>
            <vxe-form-item title="姓名/住院号">
                <vxe-input v-model="formData.name" placeholder="默认尺寸"></vxe-input>
            </vxe-form-item>
            <vxe-form-item>
                <vxe-button  class="btnBlue" size="mini">查 询</vxe-button>
            </vxe-form-item>
        </vxe-form>
    </div>
</template>

<script>
export default {
  name: 'NursingHeader',
  data () {
    return {
      formData: {}
    }
  }
}
</script>

<style scoped lang="scss">
.btnBlue {
    width: 90px;
    // background-color:#3377FF;
    // color: #fff;
    margin-left: 20px;
}

.header-content {
    background-color: #fff;
    padding: 20px;
    .header-content-form {
        display: flex;
        align-items: center;
    }
}
</style>