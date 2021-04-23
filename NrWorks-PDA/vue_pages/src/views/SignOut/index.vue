<template>
  <div class="sign-out">
    <van-nav-bar
      title="患者离开手术室前实施核查"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
    >
    </van-nav-bar>
    <PatientCard :radius="true"></PatientCard>
    <div class="list">
      <van-cell-group>
        <van-cell title="患者姓名、住院号、性别、年龄正确：" value="" value-class="first-cell van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[0].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="实际手术方式确认：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[1].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="手术部位、体位、标识正确：" value="" value-class="first-cell van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[2].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="手术用药、输血、冰冻报告的核查正确：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[3].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="病理标本：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[4].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="病理标本号核对正确：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[15].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="手术用物清点正确：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[5].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="皮肤是否完整：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[6].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
                @change="handleChange"
              />
            </div>
          </template>
        </van-cell>
        <van-cell-group v-show="!recordForm[6].value">
          <van-field v-model="recordForm[6].items[0].value" label="部位：" placeholder="请输入部位" />
          <van-field v-model="recordForm[6].items[1].value" label="程度：" placeholder="请输入程度" />
        </van-cell-group>
        <van-field v-model="recordForm[7].value" label="其它：" placeholder="请输入其它" />
      </van-cell-group>
      <van-cell-group style="margin-top:15px;">
        <van-cell title="患者去向：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item
                v-model="recordForm[8].value"
                :options="option"
              />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="各种管路：" value="" value-class="van-cell-center">
        </van-cell>
        <van-cell title="动脉通路：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[9].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="静脉通路：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[10].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="气管插管：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[11].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="伤口引流：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[12].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="胃管：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[13].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="尿管：" value="" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[14].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
                @change="handleChange"
              />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="核查时间" :value="time"></van-cell>
        <van-cell
          title="麻醉医师签名"
          title-class="sign-title"
          @click="handleShowSignature(1)"
          :value="anesBeforeAnesDoc"
          value-class="sign-value"
        ></van-cell>
        <!-- <div v-if="anesBeforeAnesDoc !== ''" style="text-align: center">
          <img :src="anesBeforeAnesDoc" alt="" class="signatureImage" />
        </div> -->
        <van-cell
          title="手术医师签名"
          title-class="sign-title"
          @click="handleShowSignature(2)"
          :value="anesBeforeOperDoc"
          value-class="sign-value"
        ></van-cell>
        <!-- <div v-if="anesBeforeOperDoc !== ''" style="text-align: center">
          <img :src="anesBeforeOperDoc" alt="" class="signatureImage" />
        </div> -->
        <van-cell
          title="手术护士签名"
          title-class="sign-title"
          @click="handleShowSignature(3)"
          :value="anesBeforeNurse"
          value-class="sign-value"
        ></van-cell>
        <!-- <div v-if="anesBeforeNurse !== ''" style="text-align: center">
          <img :src="anesBeforeNurse" alt="" class="signatureImage" />
        </div> -->
      </van-cell-group>
    </div>
    <!-- <transition name="van-slide-up">
    </transition> -->
    <!-- <signature
      :visible="visible"
      v-if="visible"
      @handleClose="handleCloseSignature"
      @handleSubmit="handleSubmitImage"
    /> -->
    <SignLogin
      :signTitle ="signTitle"
      v-if="visible"
      :show="visible"
      @handleClose="handleCloseSignature"
      @handleSubmit="handleSubmitImage"
    ></SignLogin>
  </div>
</template>

<script>
// import Signature from '../Signature/index'
// import Signature from '@/components/Signature'
import SignLogin from '@/components/SignLogin'
import PatientCard from '@/components/PatientCard'
import { submitSignOut, getSignOut } from '@/api/check'
import request from '@/utils/request'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      signTitle: '',
      time: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      checked: true,
      input: '',
      showFullSkin: false,
      value1: '',
      visible: false,
      currentSign: null,
      anesBeforeAnesDoc: '',
      anesBeforeOperDoc: '',
      anesBeforeNurse: '',
      anesBeforeState: '',
      option: [
        { text: 'PACU', value: 0 },
        { text: '病房', value: 1 },
        { text: 'ICU病房', value: 2 },
        { text: '急诊', value: 3 },
        { text: '离院', value: 4 },
        { text: '', value: '' }
      ],
      recordForm: [
        { key: '患者姓名，住院号，性别，年龄正确', value: false, sort: '1' },
        { key: '实际手术方式确认', value: false, sort: '2' },
        { key: '手术部位、体位、标识正确', value: false, sort: '3' },
        { key: '手术用药、输血、冰冻报告的核查正确', value: false, sort: '4' },
        { key: '病理标本', value: false, sort: '5' },
        { key: '手术用物清点正确', value: false, sort: '6' },
        {
          key: '皮肤是否完整',
          value: false,
          sort: '7',
          items: [
            { key: '部位', value: '' },
            { key: '程度', value: '' }
          ]
        },
        { key: '其它', value: '', sort: '15' },
        { key: '患者去向', value: '', sort: '8' },
        { key: '动脉通路', value: false, sort: '9' },
        { key: '静脉通路', value: '', sort: '10' },
        { key: '气管插管', value: false, sort: '11' },
        { key: '伤口引流', value: false, sort: '12' },
        { key: '胃管', value: false, sort: '13' },
        { key: '尿管', value: '', sort: '14' },
        { key: '病理标本号核对正确', value: false, sort: '16' }
      ]
    }
  },
  components: {
    // Signature,
    SignLogin,
    PatientCard
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  methods: {
    onClickLeft () {
      this.saveData().then(
        res => {
          this.$notify({ message: '保存成功', type: 'success' })
          this.$router.go(-1)
        },
        e => {
          this.$notify({ message: e.message, type: 'warning' })
          this.$router.go(-1)
        }
      )
    },
    onClickRight () {
      this.saveData().then(() => {
        this.$notify({ message: '保存成功', type: 'success' })
        return this.$router.push('/patient-home')
      }, e => {
        this.$notify({ message: e.message, type: 'warning' })
      })
    },
    saveData () {
      let arr = JSON.parse(JSON.stringify(this.recordForm))
      arr.forEach((item) => {
        if (item.key === '其它' || item.key === '患者去向') {
        } else {
          if (item.value === true) {
            item.value = '是'
          } else {
            item.value = '否'
          }
        }
      })
      // 根据三个签名决定当前状态
      let state = '1'
      if (this.anesBeforeAnesDoc && this.anesBeforeNurse && this.anesBeforeOperDoc) {
        state = '2'
      }
      return request({
        method: 'post',
        url: submitSignOut,
        data: {
          leaveBeforeAnesDoc: this.anesBeforeAnesDoc,
          leaveBeforeCheckJson: arr,
          leaveBeforeNurse: this.anesBeforeNurse,
          leaveBeforeOperDoc: this.anesBeforeOperDoc,
          leaveBeforeState: state,
          cureNo: this.patientInfo.cureNo,
          operSchNo: this.patientInfo.operSchNo
        }
      }).then(
        (res) => {
          if (res.data.code === 200) {
            return res
          } else {
            return Promise.reject(new Error('保存失败，请稍后尝试'))
          }
        },
        e => {
          return Promise.reject(new Error('网络异常，请稍后尝试'))
        }
      )
    },
    handleChange () {
      this.showFullSkin = !this.showFullSkin
    },
    handleSubmitImage (image) {
      switch (this.currentSign) {
        case 1:
          this.anesBeforeAnesDoc = image
          break
        case 2:
          this.anesBeforeOperDoc = image
          break
        case 3:
          this.anesBeforeNurse = image
      }
    },
    getData () {
      request({
        method: 'get',
        url:
          getSignOut +
          '/' +
          this.patientInfo.hospitalNo +
          '/' +
          this.patientInfo.cureNo + '/' + this.patientInfo.operSchNo
      }).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data
          this.time = data.leaveBeforeChkTime
          if (data.leaveBeforeAnesDoc) {
            this.anesBeforeAnesDoc = data.leaveBeforeAnesDoc
          }
          if (data.leaveBeforeOperDoc) {
            this.anesBeforeOperDoc = data.leaveBeforeOperDoc
          }
          if (data.leaveBeforeNurse) {
            this.anesBeforeNurse = data.leaveBeforeNurse
          }
          if (data.beforeLeaveRoomCheck.length > 0) {
            data.beforeLeaveRoomCheck.forEach((item) => {
              if (item.key === '其它' || item.key === '患者去向') {
              } else {
                if (item.value === '是') {
                  item.value = true
                } else {
                  item.value = false
                }
              }
            })
            this.recordForm = data.beforeLeaveRoomCheck
          }
        }
      })
    },
    handleShowSignature (param) {
      switch (param) {
        case 1:
          this.signTitle = '麻醉医师签名'
          break
        case 2:
          this.signTitle = '手术医师签名'
          break
        case 3:
          this.signTitle = '手术护士签名'
      }
      this.visible = true
      this.currentSign = param
    },
    handleCloseSignature () {
      this.visible = false
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.sign-out {
  height: 100%;
  .van-nav-bar {
    height: 100px;
    background: linear-gradient(90deg, #666666, #303030);
    /deep/ .van-nav-bar__title {
      color: #ffffff;
      font-size: 34px;
      line-height: 100px;
    }
    /deep/ .van-nav-bar__text {
      color: #ffffff;
      font-size: 30px;
    }
    /deep/ .van-icon-arrow-left {
      color: #ffffff;
      font-size: 36px;
    }
  }
  .patient-card {
    padding: 15px 20px;
    .content {
      background: #ffffff;
      display: flex;
      height: 194px;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      box-sizing: border-box;
      overflow: hidden;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          width: 140px;
          height: 80px;
          background: #3478ff;
          box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
          border-radius: 0px 40px 40px 0px;
          line-height: 80px;
          text-align: center;
          font-size: 42px;
          font-weight: bold;
          color: #ffffff;
        }
      }
      .right {
        flex: 1;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 26px;
          color: #7f7f7f;
          &:nth-child(1) {
            font-size: 30px;
            color: #2e2e2e;
          }
          &:nth-child(2) {
            margin: 30px 0;
          }
        }
      }
    }
  }
  .list {
    height: calc(100% - 324px);
    overflow-y: auto;
  }
  .signatureImage {
    height: 300px;
  }
  .van-cell {
    line-height: 94px;
    color: #2e2e2e;
    font-size: 30px;
    &::after {
      border-color: #e2e2e2;
    }
    .first-cell {
      flex: unset;
    }
    .left-title {
      flex: unset;
      white-space: nowrap;
    }
    .right-value {
      .van-field {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .van-dropdown-menu {
      height: 100%;
      /deep/ .van-dropdown-menu__bar {
        height: 100% !important;
        box-shadow: unset;
      }
      /deep/ .van-dropdown-menu__item {
        justify-content: flex-end;
      }
      /deep/ .van-dropdown-menu__title {
        font-size: 30px;
        line-height: unset;
        padding-right: 30px;
        &::after {
          border-color: transparent transparent #808080 #808080;
          border-width: 6px;
          // margin-top: -6px;
          right: 5px;
        }
      }
      /deep/ .van-dropdown-item__option {
        font-size: 30px;
        line-height: 60px;
      }
    }
  }
  .van-cell-group {
    &:last-child {
      margin-top: 15px;
      margin-bottom: 15px;
      .van-cell {
        .van-cell__value {
          color: #7f7f7f;
        }
        .sign-title {
          color: #32db64;
        }
        .sign-value {
          text-align: left;
          color: #000;
        }
      }
    }
  }
}
.switch-wrapper {
  display: flex;
  flex-direction: column;
  .van-switch {
    margin: auto;
  }
}
</style>
