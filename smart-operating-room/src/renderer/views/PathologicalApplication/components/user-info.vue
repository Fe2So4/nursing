<template>
  <div class="user-info-container">
    <div class="container-title">
      病人信息
    </div>
    <vxe-form
      class="container-content"
      title-align="right"
      title-width="80"
      :data="formData1"
      size="mini"
    >
      <div class="content-left">
        <div class="left-top">
          <vxe-form-item
            title="住院号"
            field="hospitalNo"
          >
            <template v-slot>
              <vxe-input
                @keyup.enter.native="searchUserInfo"
                style="width:150px"
                placeholder="输入住院号带出信息"
                v-model="formData1.hospitalNo"
                clearable
              />
            </template>
          </vxe-form-item>
          <vxe-form-item
            span="1"
            title="性别"
            title-width="40"
            field="patientGender"
            width="56"
          >
            <template v-slot>
              <vxe-select
                disabled
                style="width:50px"
                v-model="formData1.patientGender"
              >
                <vxe-option
                  value="1"
                  label="男"
                />
                <vxe-option
                  value="2"
                  label="女"
                />
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item
            span="1"
            title="年龄"
            title-width="40"
            field="patientAge"
          >
            <template v-slot>
              <vxe-input
                readonly
                style="width:50px"
                v-model="formData1.patientAge"
              />
            </template>
          </vxe-form-item>

          <vxe-form-item
            title-width="60"
            title="姓名"
            field="patientName"
          >
            <template v-slot>
              <vxe-input
                style="width:120px"
                v-model="formData1.patientName"
                readonly
              />
            </template>
          </vxe-form-item>

          <vxe-form-item
            span="3"
            title="病理检验号"
            field="pathologyId"
          >
            <template v-slot>
              <vxe-input
                placeholder="双击病理后获得"
                readonly
                style="width:150px"
                v-model="formData1.pathologyId"
              />
            </template>
          </vxe-form-item>
        </div>
        <div class="left-bottom">
          <vxe-form-item
            span="3"
            title="房间号"
            title-width="80"
            field="roomNo"
          >
            <template v-slot>
              <!-- <vxe-input
                readonly
                style="width:150px"
                v-model="formData1.roomNo"
              /> -->
              <el-select
                style="width:150px"
                size="mini"
                clearable
                filterable
                allow-create
                default-first-option
                v-model="formData1.roomNo"
                placeholder="选择房间"
              >
                <el-option
                  v-for="item in roomList"
                  :key="item.roomNo"
                  :value="item.roomNo"
                  :label="item.roomNo"
                />
              </el-select>
            </template>
          </vxe-form-item>
          <vxe-form-item
            span="1"
            title="科别"
            title-width="40"
            field="categpry"
            width="56"
          >
            <template v-slot>
              <vxe-select
                disabled
                style="width:155px"
                v-model="formData1.categpry"
              >
                <vxe-option
                  value="1"
                  label="女"
                />
                <vxe-option
                  value="2"
                  label="男"
                />
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item
            span="3"
            title="床位号"
            title-width="60"
            field="beaNo"
          >
            <template v-slot>
              <vxe-input
                readonly
                style="width:120px"
                v-model="formData1.beaNo"
              />
            </template>
          </vxe-form-item>
        </div>
      </div>
      <div class="content-right">
        <vxe-form-item
          style="width:100%"
          align="center"
          span="24"
        >
          <vxe-textarea
            :autosize="{ minRows: 3, maxRows: 3 }"
            outline="none"
            resize="none"
            v-model="formData1.historyDetails"
            placeholder="病史摘要及临床检查所见(包括主要化验结果，特殊治疗)"
          />
        </vxe-form-item>
        <vxe-form-item
          align="center"
          span="24"
        >
          <template v-slot>
            <vxe-button
              class="btn"
              size="mini"
              status="my-purple"
              @click="resetEvent"
            >
              文本清空
            </vxe-button>
          </template>
        </vxe-form-item>
      </div>
    </vxe-form>
    <!-- <el-dialog
      title="请选择手术房间"
      :close-on-click-modal="false"
      :visible.sync="selectRoom"
      top="30vh"
      width="320px"
      :before-close="handleClose"
    >
      <div class="dialog-body-span">
        <span>手术房间:</span>
        <el-select
          size="mini"
          clearable
          filterable
          allow-create
          default-first-option
          style="width:120px"
          v-model="selectRoomNo"
          placeholder="选择房间"
        >
          <el-option
            v-for="item in roomList"
            :key="item.roomNo"
            :value="item.roomNo"
            :label="item.roomNo"
          />
        </el-select>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
            @click="selectRoomNoVal"
          >
            确定
          </vxe-button>

          <vxe-button
            class="btn"
            size="mini"
            @click="selectRoom = false"
          >
            取消
          </vxe-button>
        </div>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import Bus from '@/utils/bus.js'
export default {
  name: 'UserName',
  data () {
    return {
      roomList: [],
      selectRoomNo: '',
      realType: false,
      selectRoom: false,
      formData1: {
        cureNo: '',
        recAddress: '',
        hospitalNo: '', // 住院号
        patientName: '', // 患者名称,
        patientGender: '', // 性别
        patientAge: '', // 年龄
        beaNo: '', // 床位号
        categpry: '', // 科别
        roomNo: '', // 房间号
        historyDetails: '', // 历史摘要及临床检查所见
        opsName: '', // 手术名称及手术所见
        clinicalDiagnosis: '', // 临床诊断
        pathologyId: '',
        pathologys: [] // table列表:
      },
      copyFormData: {}
    }
  },
  mounted () {
    Bus.$on('sub-pathological-success', res => {
      this.utilsDebounce(() => {
        console.log(res)
        this.searchPathologyByOperSchNo(res)
      }, 1000)
    })
  },
  methods: {
    handleClose () {
      this.selectRoom = false
    },

    // 根据住院号获取数据
    searchUserInfo () {
      Bus.$emit('pathological-table-dayinBtn')
      Bus.$emit('user-info-initData', '1')
      if (!this.IsEmpty(this.formData1.hospitalNo)) {
        let obj = {
          hospitalNo: this.formData1.hospitalNo
        }
        this.$store.dispatch('ReqUserInfo', obj).then(res => {
          this.$store.commit('CLEAR_SELECTTABLEITEM')
          this.$store.commit('SAVE_SELECTTABLEITEM', [])
          if (res.status === 200) {
            if (this.IsEmpty(res.data.data)) {
              this.openToast('warning', '暂无更多数据')
              this.formData1 = {
                recAddress: '',
                cureNo: '',
                hospitalNo: '', // 住院号
                patientName: '', // 患者名称,
                patientGender: '', // 性别
                patientAge: '', // 年龄
                beaNo: '', // 床位号
                categpry: '', // 科别
                roomNo: '', // 房间号
                historyDetails: '', // 历史摘要及临床检查所见
                opsName: '', // 手术名称及手术所见
                clinicalDiagnosis: '', // 临床诊断
                pathologyId: '',
                pathologys: [] // table列表:
              }
              this.$store.commit('SAVE_USERINFOHISTORYDETAILS', '')
            } else {
              Bus.$emit('user-info-getData', '1')
              this.roomList = res.data.data
              let userInfoData = this.roomList[0]

              if (this.roomList.length > 1) {
                this.realType = false
                this.roomList.forEach(item => {
                  if (!this.IsEmpty(item.realRoomNo)) {
                    this.formData1.roomNo = item.realRoomNo
                    this.getUserInfoShow(item)
                    this.realType = true
                  }
                })
                if (this.realType !== true) {
                  this.formData1.roomNo = ''
                  this.getUserInfoShow(userInfoData)
                  this.$alert('此患者存在多条订单,请先选择房间号')
                }
              } else {
                if (!this.IsEmpty(userInfoData.realRoomNo)) {
                  this.formData1.roomNo = userInfoData.realRoomNo
                } else {
                  this.formData1.roomNo = userInfoData.roomNo
                }
                this.getUserInfoShow(userInfoData)
              }
            }
          } else {
            this.openToast('error', this.res.statusText)
          }
        })
      } else {
        this.openToast('warning', '请输入正确的住院号')
      }
    },
    // 渲染显示用户信息
    getUserInfoShow (userInfoData) {
      this.formData1.patientName = userInfoData.patientName
      this.formData1.patientGender = userInfoData.patientGender
      this.formData1.patientAge = userInfoData.patientAge
      this.formData1.beaNo = userInfoData.beaNo
      this.formData1.categpry = userInfoData.categpry
      this.formData1.historyDetails = userInfoData.historyDetails
      this.formData1.opsName = userInfoData.opsName
      this.formData1.clinicalDiagnosis = userInfoData.clinicalDiagnosis
      this.formData1.cureNo = userInfoData.cureNo
      this.formData1.recAddress = userInfoData.recAddress
      this.formData1.operSchNo = userInfoData.operSchNo
      this.$store.commit('SAVE_USERINFO', userInfoData || {})
      this.copyFormData = JSON.parse(JSON.stringify(this.formData1))
    },
    // // 选择房间号
    // selectRoomNoVal () {
    //   console.log(this.selectRoomNo)
    //   this.handleClose()
    //   this.roomList.forEach(item => {
    //     if (item.roomNo === this.selectRoomNo) {
    //       Bus.$emit('user-info-getData', '1')
    //       let userInfoData = item
    //       this.formData1.patientName = userInfoData.patientName
    //       this.formData1.patientGender = userInfoData.patientGender
    //       this.formData1.patientAge = userInfoData.patientAge
    //       this.formData1.beaNo = userInfoData.beaNo
    //       this.formData1.categpry = userInfoData.categpry
    //       this.formData1.historyDetails = userInfoData.historyDetails
    //       this.$store.commit(
    //         'SAVE_USERINFOHISTORYDETAILS',
    //         userInfoData.historyDetails || ''
    //       )

    //       this.$store.commit('SAVE_USERINFO', userInfoData || {})
    //       this.formData1.roomNo = userInfoData.roomNo
    //       this.formData1.opsName = userInfoData.opsName
    //       this.formData1.clinicalDiagnosis = userInfoData.clinicalDiagnosis
    //       // this.formData1.pathologys = userInfoData.pathologys
    //       this.searchPathologyByOperSchNo(userInfoData.operSchNo)
    //     }
    //     return false
    //   })
    // },
    // 根据手术申请号获取病理列表
    searchPathologyByOperSchNo (operSchNo) {
      this.$store.commit('CLEAR_SELECTTABLEITEM')
      this.$store.commit('SAVE_SELECTTABLEITEM', [])

      let obj = {
        operSchNo: operSchNo
      }
      this.$store.dispatch('ReqgetPathologyByOperSchNo', obj).then(res => {
        if (res.data.code === 200) {
          Bus.$emit('user-info-initData')
          this.$store.commit('SAVE_PATHOLOGICAL_TABLELIST', res.data.data)
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    resetEvent () {
      this.formData1.historyDetails = ''
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
    ListeningPathologyId () {
      return this.$store.state['pathological-table'].selectTableData
    },
    ListeningHistoryDetails () {
      return this.formData1.historyDetails
    },
    ListeningStoreHistoryDetails () {
      console.log(this.$store.state['pathological-table'].historyDetails)
      return this.$store.state['pathological-table'].historyDetails
    },
    ListeningHospitalNo () {
      return this.formData1.hospitalNo
    }
  },
  watch: {
    ListeningPathologyId: function (newd) {
      if (newd.length > 0) {
        this.formData1.pathologyId = newd[0].pathologyId
      } else {
        this.formData1.pathologyId = ''
      }
    },
    ListeningHistoryDetails: function (newd) {
      this.$store.commit('SAVE_USERINFOHISTORYDETAILS', newd)
    },
    ListeningStoreHistoryDetails: function (newd) {
      this.formData1.historyDetails = newd
    },
    ListeningHospitalNo: function (newd) {
      if (newd === '') {
        Bus.$emit('user-info-getData', '0')
        this.$store.commit('CLEAR_USERINFO')
        this.$store.commit('SAVE_PATHOLOGICAL_TABLELIST', [])
        this.formData1 = {
          hospitalNo: '', // 住院号
          patientName: '', // 患者名称,
          patientGender: '', // 性别
          patientAge: '', // 年龄
          beaNo: '', // 床位号
          categpry: '', // 科别
          roomNo: '', // 房间号
          historyDetails: '', // 历史摘要及临床检查所见
          operSchNo: '',
          opsName: '', // 手术名称及手术所见
          clinicalDiagnosis: '', // 临床诊断
          pathologyId: '',
          pathologys: [], // table列表:
          recAddress: ''
        }
      }
    },
    'formData1.roomNo' (newVal) {
      Bus.$emit('pathological-table-dayinBtn')
      Bus.$emit('user-info-initData', '1')
      this.copyFormData.roomNo = newVal
      let obj = JSON.parse(JSON.stringify(this.copyFormData))
      this.$store.commit('CLEAR_USERINFO')
      // this.$store.commit('SAVE_USERINFO', this.copyFormData || {})
      this.$store.commit('SAVE_USERINFO', obj)
      this.searchPathologyByOperSchNo(this.formData1.operSchNo)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_handle.scss';
.dialog-body-span {
  text-align: center;
}
.dialog-footer-div {
  text-align: center;
}
.user-info-container {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  // height: 132px;
  // background-color: #fff;
  @include background('search_header_bgc');
  @include font_color('search_header_font');
  .container-title {
    // color: #444;
    @include font_color('search_header_font');
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
.btn {
  border: none;
  color: #303133;
  width: 90px;
  background-color: #e9edf7;
}
/deep/ .vxe-button--content,
.vxe-button--icon,
.vxe-button--loading-icon {
  vertical-align: unset;
}
</style>
