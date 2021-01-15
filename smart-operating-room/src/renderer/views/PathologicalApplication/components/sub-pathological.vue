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
              class="radio"
              v-model="formData.hologyType"
              label="1"
              content="术后病理"
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
              class="red radio"
              v-model="formData.hologyType"
              label="0"
              content="术中冰冻"
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
              @input="changeInput($event)"
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
            <vxe-input
              style="width:280px"
              v-model="formData.remarks"
              clearable
              @input="changeInput($event)"
            />
          </vxe-form-item>
        </div>

        <div class="body-right">
          <!-- <vxe-form-item>
            <vxe-button
              class="btn"
              size="mini"
              status="my-purple"
              @click="gotoThree"
            >
              送检单
            </vxe-button>
          </vxe-form-item> -->
          <vxe-form-item v-if="dayinBtn">
            <vxe-button
              @click="dayinPingTie"
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
        style="height:205px"
      >
        <div class="subP-container-list">
          <div
            class="list-item"
            v-for="item in formData.specimenList"
            :key="item.totalId"
          >
            <div class="list-item-left">
              <vxe-form-item
                title="标本名称"
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
                title="采取部位"
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
              <vxe-form-item title="数量">
                <template v-slot>
                  <vxe-input
                    size="mini"
                    style="width:60px"
                    :min="1"
                    v-model="item.sampleNum"
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
                  @click="deleteSpecimen(item)"
                >
                  删 除
                </vxe-button>
              </vxe-form-item>
            </div>
          </div>
          <vxe-button
            v-if="!dayinBtn"
            class="btn"
            size="mini"
            status="my-purple"
            @click="addSpecimen"
          >
            新增标本
          </vxe-button>
        </div>
      </el-scrollbar>
    </vxe-form>
    <div class="btnFormDiv">
      <vxe-form
        class="btnForm"
        title-align="center"
        size="mini"
      >
        <vxe-form-item>
          <el-button
            :loading="btnLoad"
            :disabled="dayinBtn"
            class="btn"
            style="width:120px;height:35px;font-size:16px;font-weight:bold"
            type="primary"
            @click="submitApplication"
          >
            提交申请
          </el-button>
        </vxe-form-item>
      </vxe-form>
    </div>
    <el-dialog
      append-to-body
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
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
            @click="yishilogin"
          >
            验 证
          </vxe-button>
          <vxe-button
            class="btn"
            size="mini mgl30"
            status="my-purple"
            @click="dialogVisible = false"
          >
            取 消
          </vxe-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import { reqsaveFastPathologic } from '@/api/client-api/pathological-application.js'
import { reqcheckSendDoctor } from '@/api/login'
export default {
  name: 'SubPathological',
  data () {
    var changeUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    var changePassWord = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    return {
      btnLoad: false,
      dayinBtn: false,
      operSchNo: '',
      userInfo: {}, // 查询的用户信息
      selectItem: {}, // 选中的表格
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: changeUserName, trigger: 'blur' }],
        password: [{ validator: changePassWord, trigger: 'blur' }]
      },
      formData: {
        fixed: '10%福尔马林',
        hologyType: '1',
        specimenList: [
          {
            totalId: '0',
            pathologyId: '',
            id: '',
            sampleName: '',
            remark: '',
            sampleNum: 1,
            takePartName: ''
          }
        ] // 标本列表
      },
      totalId: 0,
      dialogVisible: false,
      loginType: '0', // 验证标志
      loginName: '',
      loginCode: '',
      userInfoGetType: '0'
    }
  },
  mounted () {
    Bus.$on('pathological-table', res => {
      this.dayinBtn = true
      this.utilsDebounce(() => {
        this.selectItem = res
        let obj = {
          pathologyId: res.pathologyId
        }
        this.searchBiaobenData(obj)
      }, 300)
    })
    Bus.$on('pathological-table-dayinBtn', res => {
      setTimeout(() => {
        this.dayinBtn = false
      }, 300)
    })
    Bus.$on('user-info-getData', res => {
      this.initialValue()
      this.userInfoGetType = res
    })
    Bus.$on('user-info-initData', res => {
      this.initialValue()
    })
  },
  methods: {
    changeInput (e) {
      this.$forceUpdate()
    },
    initialValue () {
      this.setTimeCloseBtnLoad()
      this.loginType = '0'
      this.loginName = ''
      this.loginCode = ''
      this.userInfoGetType = ''
      this.formData.remarks = ''
      this.formData.specimenList = [
        {
          totalId: '0',
          pathologyId: '',
          id: '',
          sampleName: '',
          remark: '',
          sampleNum: 1,
          takePartName: ''
        }
      ]
      this.hologyType = '1'
      this.userInfo = {}
      this.selectItem = {}
    },
    // 查询标本数据
    searchBiaobenData (obj) {
      this.$store.dispatch('ReqBiaobenInfo', obj).then(res => {
        if (res.data.code === 200) {
          // this.selectItem = this.$store.state['pathological-table'].selectTableData[0]
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
      if (this.userInfoGetType === '0') {
        this.$alert('请先输入住院号', '提示')
        return false
      }

      this.formData.specimenList.forEach((list, index) => {
        if (list.totalId === item.totalId) {
          this.formData.specimenList.splice(index, 1)
          return false
        }
      })
      console.log(this.formData.specimenList.length)
      if (this.formData.specimenList.length === 0) {
        this.addSpecimen()
      }
    },
    // 点击新增标本
    addSpecimen () {
      if (this.userInfoGetType === '0') {
        this.$alert('请先输入住院号', '提示')
        return false
      }
      this.totalId = new Date().getTime()
      this.formData.specimenList.push({
        totalId: this.totalId,
        pathologyId: this.selectItem.pathologyId || '',
        id: '',
        sampleName: '',
        takePartName: '',
        sampleNum: 1,
        remark: ''
      })
    },
    // 点击验证校验身份
    yanzhen () {
      if (this.userInfoGetType === '0') {
        this.$alert('请先输入住院号', '提示')
        return false
      }
      this.form.username = ''
      this.form.password = ''
      this.dialogVisible = true
    },
    handleClose (done) {
      this.dialogVisible = false
      // done()
    },
    enter (e) {
      if (e.keyCode === 13) {
        this.yishilogin()
      }
    },
    yishilogin () {
      this.$refs.form.validate(valid => {
        console.log(valid)
        if (valid) {
          let obj = {
            loginName: this.form.username,
            password: this.form.password
          }
          reqcheckSendDoctor(obj).then(res => {
            if (res.data.code === 200) {
              this.loginType = '1'
              this.loginName = res.data.data.userName
              this.loginCode = res.data.data.loginName
            } else {
              this.openToast('error', '验证送检医师错误,请重试')
              this.loginType = '0'
            }
            this.dialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    // 节流提交申请
    submitApplication () {
      this.btnLoad = true
      this.timeSubApplication()
    },
    setTimeCloseBtnLoad () {
      setTimeout(() => {
        this.btnLoad = false
      }, 500)
    },

    // 提交申请
    timeSubApplication () {
      this.type = true
      this.userInfo = this.$store.state['pathological-table'].userInfo
      if (this.userInfo.roomNo === '') {
        this.$alert('请先选择房间号', '提示')
        this.setTimeCloseBtnLoad()
        return false
      }
      if (this.loginType !== '1') {
        this.$alert('请先进行送验医师验证', '提示')
        this.setTimeCloseBtnLoad()
        return false
      }
      if (this.userInfoGetType === '0') {
        this.$alert('请先输入住院号', '提示')
        this.setTimeCloseBtnLoad()
        return false
      }

      if (this.selectItem.sendOrderStatus === 1) {
        this.$alert('该病理已派单，无法修改标本信息', '提示')
        this.setTimeCloseBtnLoad()
        return false
      }
      this.formData.specimenList.forEach(item => {
        if (this.IsEmpty(item.sampleName)) {
          this.$alert('标本名不能为空')
          this.setTimeCloseBtnLoad()
          this.type = false
          return false
        }
        if (this.IsEmpty(item.takePartName)) {
          this.$alert('标本部位不能为空')
          this.setTimeCloseBtnLoad()
          this.type = false
          return false
        }
        if (item.sampleNum <= 0) {
          this.$alert('数量错误')
          this.setTimeCloseBtnLoad()
          this.type = false
          return false
        }
      })
      if (!this.type) {
        return false
      }

      let time = this.utilsNewTime()
      let historyDetails =
        this.$store.state['pathological-table'].historyDetails || ''
      let obj = {
        admitNo: this.userInfo.hospitalNo,
        checkCode: this.loginCode,
        checkName: this.loginName,
        id: this.selectItem.id || '',
        pathologyId: this.selectItem.pathologyId || '',
        createTime: time,
        fixed: this.formData.fixed || '',

        beaNo: this.userInfo.beaNo,
        categpry: this.userInfo.categpry,
        clinicalDiagnosis: this.userInfo.clinicalDiagnosis,
        cureNo: this.userInfo.cureNo,
        opsName: this.userInfo.opsName,
        patAge: this.userInfo.patientAge,
        patName: this.userInfo.patientName,
        patSex: this.userInfo.patientGender,
        historyDetails: historyDetails,
        hologyType: this.formData.hologyType,
        pathologySpecimen: this.formData.specimenList,
        recAddress: this.userInfo.recAddress,
        remarks: this.formData.remarks,
        roomNo: this.userInfo.roomNo,
        realRoomNo: this.userInfo.roomNo,
        operSchNo: this.userInfo.operSchNo
      }
      reqsaveFastPathologic(obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', res.data.msg)
          Bus.$emit('sub-pathological-success', this.userInfo.operSchNo)
        } else {
          this.setTimeCloseBtnLoad()
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 打印瓶贴
    dayinPingTie () {
      if (this.IsEmpty(this.selectItem.pathologyId)) {
        this.$alert('请先输入住院号,双击选择标本信息', '提示')
        return false
      }
      console.log(this.selectItem)
      let obj = {
        pathologyId: this.selectItem.pathologyId,
        printState: '1'
      }
      this.$store.dispatch('ReqprintBottleToStick', obj).then(res => {
        if (res.data.code === 200) {
          let url = `${res.data.data.url}?pid=${this.selectItem.pathologyId}&opcode=${res.data.data.userCode}`
          this.$electron.shell.openExternal(url)
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    gotoThree () {
      let url = 'http://128.0.16.55:8009'
      this.$electron.shell.openExternal(url)
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
    // ListeningSelectPathologyId () {
    //   return this.$store.state['pathological-table'].selectPathologyId
    // }
  },
  watch: {
    'formData.hologyType' (newVal) {
      Bus.$emit('sub-pathological-hologyType', newVal)
    }
    // ListeningSelectPathologyId: function (newd) {
    //   if (this.IsEmpty(newd)) {
    //     this.formData.hologyType = '0'
    //     this.formData.specimenList = []
    //     return false
    //   }
    //   let obj = {
    //     pathologyId: newd
    //   }
    //   this.searchBiaobenData(obj)
    // }
  }
}
</script>

<style scoped lang="scss">
.btn {
  border: none;
  color: #303133;
  width: 90px;
  background-color: #e9edf7;
}
.vxe-button.size--mini.type--button:hover {
  background-color: #3377ff;
  color: #ffffff;
}
.btnRed {
  color: #fff;
  width: 90px;
  background-color: #fe5353;
}
.btnRed:hover {
  background-color: #fe5353 !important;
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
  color: #ff3232;
}

.btnForm {
  text-align: center;
}
.subP-container {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  height: 350px;
  background-color: #fff;
  padding: 10px 20px;
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
/deep/.red .vxe-radio--label {
  color: #ff3232 !important;
}

/deep/.el-dialog__header {
  border-bottom: 1px solid #ebebeb;
  padding: 10px 20px 10px;
}
/deep/.el-dialog__title {
  font-size: 16px;
  font-weight: 600;
}
/deep/ .el-dialog__headerbtn {
  top: 15px;
}
/deep/ .vxe-button--content,
.vxe-button--icon,
.vxe-button--loading-icon {
  vertical-align: unset;
}
/deep/ .vxe-button.btnRed.type--button:not(.is--disabled):focus {
  border-color: #ff3232;
  box-shadow: 0 0 0.25em 0 #ff3232;
}
</style>
