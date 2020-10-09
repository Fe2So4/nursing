<template>
    <div class="user-info-container">
        <div class="container-title">
            病人信息
        </div>
        <vxe-form class="container-content" title-align="right" title-width="80" :data="formData1" size="mini" @reset="resetEvent">
            <div class="content-left">
                <div class="left-top">
                    <vxe-form-item   title="姓名" field="name">
                        <template v-slot="scope">
                            <vxe-input style="width:150px" v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item span="1" title="性别" title-width="40" field="sex" width="56">
                        <template v-slot>
                            <vxe-select style="width:50px" v-model="formData1.sex"  clearable>
                                <vxe-option value="1" label="女"></vxe-option>
                                <vxe-option value="2" label="男"></vxe-option>
                            </vxe-select>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item span="1" title="年龄" title-width="40" field="name">
                        <template v-slot="scope">
                            <vxe-input style="width:50px" v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item span="3" title="床位号" title-width="60" field="name">
                        <template v-slot="scope">
                            <vxe-input style="width:120px" v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item span="3" title="病理检查号" field="name">
                        <template v-slot="scope">
                            <vxe-input style="width:150px" v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                        </template>
                    </vxe-form-item>
                </div>
                <div class="left-bottom">
                    <vxe-form-item  title="住院号" field="name">
                        <template v-slot="scope">
                            <vxe-input style="width:150px" v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item span="1" title="科别" title-width="40" field="sex" width="56">
                        <template v-slot>
                            <vxe-select style="width:155px" v-model="formData1.sex"  clearable>
                                <vxe-option value="1" label="女"></vxe-option>
                                <vxe-option value="2" label="男"></vxe-option>
                            </vxe-select>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item span="3" title="房间号" title-width="60" field="name">
                        <template v-slot="scope">
                            <vxe-input style="width:120px" v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                        </template>
                    </vxe-form-item>
                </div>
            </div>
            <div class="content-right">
                <vxe-form-item style="width:100%" align="center" span="24">
                    <vxe-textarea :autosize="{ minRows: 3, maxRows: 3 }" outline="none" resize="none" v-model="value1" placeholder="病史摘要及临床检查所见(包括主要化验结果，特殊治疗)"></vxe-textarea>
                </vxe-form-item>
                <vxe-form-item align="center" span="24">
                    <template v-slot>
                        <vxe-button style="width:90px;backgroundColor:#E9EDF7" type="reset">文本清空</vxe-button>
                    </template>
                </vxe-form-item>
            </div>
        </vxe-form>
    </div>
</template>

<script>
export default {
  name: 'UserName',
  data () {
    return {
      formData1: {

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

<style scoped lang="scss">
    .user-info-container {
        padding: 20px;
        width: 100%;
        // height: 132px;
        background-color: #fff;
        .container-title {
            color: #444;
            font-size: 14px;
        }
        .container-content {
            display: flex;
            .content-left {
                flex: 3;
                min-width: 900px;
            }
            .content-right {
                flex: 2;
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
            }
        }
    }
</style>