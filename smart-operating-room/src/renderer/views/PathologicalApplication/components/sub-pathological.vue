<template>
      <div class="subP-container">
        <vxe-form class="container-content" title-align="right" :data="formData1" size="mini" @reset="resetEvent">
                <div class="subP-container-top">
                    <span>类别</span>
                    <vxe-form-item class="mgl15" field="name">
                        <template v-slot>
                            <vxe-radio name="n1" class="red radio" v-model="value1" label="3" content="术中冰冻" ></vxe-radio>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item class="mgl15" field="name">
                        <template v-slot>
                            <vxe-radio name="n1" class="radio" v-model="value1" label="3" content="术后病理" ></vxe-radio>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item  class="mgl30" title="送验医师" field="name">
                        <template v-slot="scope">
                            <vxe-input style="width:150px" v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item  class="mgl30" >
                        <vxe-button @click="yanzhen" class="btn" size="mini">验 证</vxe-button>
                    </vxe-form-item>
                </div> 
                <div class="subP-container-body">
                    <div class="body-left">
                        <vxe-form-item    title="备注" field="name">
                            <template v-slot="scope">
                                <vxe-input style="width:280px"  v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                            </template>
                        </vxe-form-item>
                    </div>
                    <div class="body-right">
                        <vxe-form-item>
                            <vxe-button  class="btn" size="mini">送检单</vxe-button>
                        </vxe-form-item>
                        <vxe-form-item>
                            <vxe-button  class="btn" size="mini">打印瓶贴</vxe-button>
                        </vxe-form-item>
                    </div>
                </div>
                <el-scrollbar class="scrollbarList" style="height:155px">
                    <div class="subP-container-list">
                        <div class="list-item" v-for="(item,index) in 15" :key="index">
                            <div class="list-item-left">
                                <vxe-form-item    title="标本" field="name">
                                    <template v-slot="scope">
                                        <vxe-input style="width:280px"  v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item  style="marginLeft:20px"  title="部位" field="name">
                                    <template v-slot="scope">
                                        <vxe-input style="width:280px"  v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item>
                                    <template v-slot>
                                        <vxe-input style="width:60px" v-model="value506" placeholder="整数类型" type="integer"></vxe-input>
                                    </template>
                                </vxe-form-item>
                            </div>
                            <div class="list-item-right">
                                <vxe-form-item  class="note"   title="备注" field="name">
                                    <template v-slot="scope">
                                        <vxe-input style="width:100%"  v-model="formData1.name"  clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item>
                                    <vxe-button  class="btnRed" size="mini">删除</vxe-button>
                                </vxe-form-item>
                                <vxe-form-item>
                                    <vxe-button  class="btn" size="mini">新增标本</vxe-button>
                                </vxe-form-item>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
        </vxe-form>
        <div class="btnFormDiv">
            <vxe-form class="btnForm"  title-align="right"  size="mini" >
                <vxe-form-item>
                    <vxe-button  class="btn" size="mini">提交申请</vxe-button>
                </vxe-form-item>
            </vxe-form>
        </div>
        <el-dialog
            title="用户身份验证"
            :visible.sync="dialogVisible"
            width="520px"
            top="30vh"
            :before-close="handleClose">
            <div class="dialog-div">
                <span class="dialog-div-title">手术室用户验证</span>
                <el-form class="dialog-div-form" ref="form" size="mini" :model="form" label-width="60px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item style="marginTop:20px" label="密码">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="dialog-footer-btn">
                    <el-button size="mini" class="btn" @click="dialogVisible = false">验 证</el-button>
                    <el-button size="mini" class="btn mgl30" type="primary" @click="dialogVisible = false">取 消</el-button>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'SubPathological',
  data () {
    return {
      form: {},
      formData1: {},
      value1: '',
      value506: 0,
      dialogVisible: false
    }
  },
  methods: {
    resetEvent () {
      this.$XModal.message({ message: '重置事件', status: 'info' })
    },

    // 点击验证校验身份
    yanzhen () {
      this.dialogVisible = true
    },
    handleClose (done) {
      done()
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.btn {
    border: none;
    color: #303133;
    width: 90px;
    background-color:#E9EDF7
}
.btnRed {
    width: 90px;
    background-color:#FE5353;
    color: #fff;
}
.mgl15 {
    margin-left: 15px;
}
.radio {
    font-weight: normal;
    vertical-align: 0;
}
.mgl30 {
    margin-left: 30px;
}
.red {
    color: #FF3232;
}
.btnFormDiv {
    // margin-top: 20px;  
}
.btnForm {
    text-align: right;
}
.subP-container {
    height: 300px;
    background-color: #fff;
    padding: 20px;
    .container-content {
        .subP-container-body {
            display: flex;
            .body-left {
                flex: 3;
            }
            .body-right {
                text-align: right;
                flex: 2;
            }
        }
        .subP-container-list {
            margin-top: 20px;
            .list-item {
                display: flex;
                .list-item-right {
                    margin-left: 20px;
                    flex: 1;
                    display: flex;
                    .note {
                        width: 100%;
                    }
                }
            }
        }
        .submitApply {
            
        }
    }
}
.dialog-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .dialog-div-title {
        color: #303133;
        font-weight: 600;
        font-size: 24px;
    }
    .dialog-div-form {
        width: 65%;
        margin-top: 30px;
    }
}
.dialog-footer-btn {
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
}
</style>