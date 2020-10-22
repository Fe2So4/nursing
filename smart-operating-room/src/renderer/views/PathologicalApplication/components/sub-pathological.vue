<template>
  <div class="subP-container">
    <vxe-form
      class="container-content"
      title-align="right"
      :data="formData"
      size="mini"
    >
      <div class="subP-container-top">
        <span>类别</span>
        <vxe-form-item
          class="mgl15"
          field="name"
        >
          <template v-slot>
            <vxe-radio
              name="n1"
              class="red radio"
              v-model="formData.hologyType"
              label="0"
              content="术中冰冻"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item
          class="mgl15"
          field="name"
        >
          <template v-slot>
            <vxe-radio
              name="n1"
              class="radio"
              v-model="formData.hologyType"
              label="1"
              content="术后病理"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item
          v-if="formData.hologyType === '1'"
          class="mgl30"
          title="固定液"
          field="fixed"
        >
          <template v-slot>
            <vxe-input
              style="width:150px"
              v-model="formData.fixed"
              clearable
            />
          </template>
        </vxe-form-item>
        <vxe-form-item
          class="mgl30"
          title="送验医师"
          field="name"
        >
          <template v-slot>
            <vxe-input
              readonly
              style="width:150px"
              v-model="loginName"
            />
          </template>
        </vxe-form-item>
        <vxe-form-item class="mgl30">
          <vxe-button
            @click="yanzhen"
            class="btn"
            size="mini"
            status="my-purple"
          >
            验 证
          </vxe-button>
        </vxe-form-item>
      </div>
      <div class="subP-container-body">
        <div class="body-left">
          <vxe-form-item
            title="备注"
            field="remarks"
          >
            <template v-slot>
              <vxe-input
                style="width:280px"
                v-model="formData.remarks"
                clearable
              />
            </template>
          </vxe-form-item>
        </div>
        <div class="body-right">
          <vxe-form-item>
            <vxe-button
              class="btn"
              size="mini"
              status="my-purple"
              @click="addSpecimen"
            >
              新增标本
            </vxe-button>
          </vxe-form-item>
          <vxe-form-item>
            <vxe-button
              class="btn"
              size="mini"
              status="my-purple"
            >
              送检单
            </vxe-button>
          </vxe-form-item>
          <vxe-form-item>
            <vxe-button
              class="btn"
              size="mini"
              status="my-purple"
            >
              打印瓶贴
            </vxe-button>
          </vxe-form-item>
        </div>
      </div>
      <el-scrollbar
        class="scrollbarList"
        style="height:155px"
      >
        <div class="subP-container-list">
          <div
            class="list-item"
            v-for="item in formData.specimenList"
            :key="item.id"
          >
            <div class="list-item-left">
              <vxe-form-item
                title="标本"
                field="sampleName"
              >
                <template v-slot>
                  <vxe-input
                    size="mini"
                    style="width:280px"
                    v-model="item.sampleName"
                    clearable
                  />
                </template>
              </vxe-form-item>
              <vxe-form-item
                style="marginLeft:20px"
                title="部位"
                field="takePartName"
              >
                <template v-slot>
                  <vxe-input
                    size="mini"
                    style="width:280px"
                    v-model="item.takePartName"
                    clearable
                  />
                </template>
              </vxe-form-item>
              <vxe-form-item>
                <template v-slot>
                  <vxe-input
                    size="mini"
                    style="width:60px"
                    v-model="item.number"
                    placeholder="整数类型"
                    type="integer"
                  />
                </template>
              </vxe-form-item>
            </div>
            <div class="list-item-right">
              <vxe-form-item
                class="note"
                size="mini"
                title="备注"
                field="remark"
              >
                <template v-slot>
                  <vxe-input
                    style="width:100%"
                    v-model="item.remark"
                    clearable
                  />
                </template>
              </vxe-form-item>
              <vxe-form-item>
                <vxe-button
                  class="btnRed"
                  size="mini"
                  status="my-purple"
                  @click="deleteSpecimen(item)"
                >
                  删除
                </vxe-button>
              </vxe-form-item>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </vxe-form>
    <div class="btnFormDiv">
      <vxe-form
        class="btnForm"
        title-align="right"
        size="mini"
      >
        <vxe-form-item>
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
            @click="submitApplication"
          >
            提交申请
          </vxe-button>
        </vxe-form-item>
      </vxe-form>
    </div>
    <el-dialog
      title="用户身份验证"
      :visible.sync="dialogVisible"
      width="520px"
      top="30vh"
      :before-close="handleClose"
    >
      <div class="dialog-div">
        <span class="dialog-div-title">手术室用户验证</span>
        <el-form
          class="dialog-div-form"
          ref="form"
          :rules="rules"
          size="mini"
          :model="form"
          label-width="60px"
          hide-required-asterisk
        >
          <el-form-item
            prop="username"
            label="用户名"
          >
            <el-input
              prefix-icon="el-icon-s-custom"
              placeholder="请输入用户名"
              v-model="form.username"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            style="marginTop:20px"
            label="密码"
          >
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="form.password"
              @keydown.native="enter"
              show-password
            />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-btn">
          <el-button
            size="mini"
            status="my-purple"
            class="btn"
            @click="login"
          >验 证</el-button>
          <el-button
            size="mini"
            class="btn mgl30"
            status="my-purple"
            type="primary"
            @click="dialogVisible = false"
          >取 消</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {pathologicalLogin, reqsaveFastPathologic} from '@/api/client-api/pathological-application.js'
export default {
  name: 'SubPathological',
  data () {
    return {
      userInfo: {}, // 查询的用户信息
      selectItem: {}, // 选中的表格
      form: {},
      rules: {
        username: [
          { required: true, message: '请正确填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请正确填写密码', trigger: 'blur' }
        ]
      },
      formData: {
        hologyType: '0',
        specimenList: [

        ] // 标本列表
      },
      totalId: 0,
      dialogVisible: false,
      loginType: '0', // 验证标志
      loginName: ''
    }
  },
  methods: {
    // 查询标本数据
    searchBiaobenData (obj) {
      console.log(obj)
      this.$store.dispatch('ReqBiaobenInfo', obj).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.userInfo = this.$store.state['pathological-table'].userInfo
          this.selectItem = this.$store.state['pathological-table'].selectTableData[0]
          this.formData.fixed = this.selectItem.fixed
          this.formData.hologyType = this.selectItem.hologyType
          this.formData.remarks = this.selectItem.remarks
          this.formData.specimenList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击删除标本
    deleteSpecimen (item) {
      console.log(item.id)
      this.formData.specimenList.forEach((list, index) => {
        if (list.id === item.id) {
          this.formData.specimenList.splice(index, 1)
          return false
        }
      })
    },
    // 点击新增标本
    addSpecimen () {
      console.log(this.$store.state['pathological-table'].selectPathologyId)
      this.totalId = this.formData.specimenList.length + 1
      this.formData.specimenList.push({
        id: this.totalId,
        specimen: '',
        parts: '',
        num: 0,
        note: ''
      })
    },
    // 点击验证校验身份
    yanzhen () {
      this.dialogVisible = true
    },
    handleClose (done) {
      // done()
    },
    enter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let obj = {
            loginName: this.form.username,
            loginPwd: this.form.password
          }
          pathologicalLogin(obj).then(res => {
            if (res.data.code === 200) {
              console.log(res)
              this.loginType = '1'
              this.loginName = '王德发'
            } else {
              this.$message({ type: 'error', message: res.data.message })
            }
            this.dialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    // 提交申请
    submitApplication () {
      if (this.loginType !== '1') {
        this.$alert('请先进行送验医师验证', '提示')
        return false
      }
      if (this.IsEmpty(this.userInfo.patientName)) {
        this.$alert('请先输入住院号获取病理信息', '提示')
        return false
      }
      if (this.IsEmpty(this.selectItem.hospitalNo)) {
        this.$alert('请先选择病理数据', '提示')
        return false
      }
      let obj = {
        admitNo: this.selectItem.hospitalNo,
        checkCode: this.selectItem.checkCode,
        checkName: this.selectItem.checkName,
        checkOut: this.selectItem,
        beaNo: this.userInfo.beaNo,
        categpry: this.userInfo.categpry

      }
      reqsaveFastPathologic(obj).then(res => {
        console.log(res)
      })
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

  computed: {
    // 获取病理号
    ListeningSelectPathologyId () {
      return this.$store.state['pathological-table'].selectPathologyId
    }
  },
  watch: {
    ListeningSelectPathologyId: function (newd) {
      if (this.IsEmpty(newd)) {
        this.formData.hologyType = '0'
        this.formData.specimenList = []
        return false
      }
      let obj = {
        pathologyId: newd
      }
      this.searchBiaobenData(obj)
    }
  }
}
</script>

<style scoped lang="scss">

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
