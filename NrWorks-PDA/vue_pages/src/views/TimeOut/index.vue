<template>
  <div class="time-out">
    <van-nav-bar
      title="手术开始前核查"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
    >
    </van-nav-bar>
    <PatientCard :radius="true"></PatientCard>
    <div class="list">
      <van-cell-group>
        <van-cell
          title="患者姓名、住院号、性别、年龄正确："
          value=""
          value-class="first-cell van-cell-center"
        >
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
        <van-cell title="手术方式确认" value="" value-class="van-cell-center">
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
        <van-cell
          title="手术部位、标识、体位正确："
          value-class="van-cell-center"
        >
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
        <van-cell
          title="是否需要相关影像资料："
          value=""
          value-class="van-cell-center"
        >
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
        <van-field v-model="recordForm[4].value" label="其它：" placeholder="请输入其它" />
        <van-cell style="background: #e8e8e8">
          <template #title>
            手术、麻醉风险预警
            <van-icon name="warn-o"></van-icon>
          </template>
        </van-cell>
        <van-cell title="手术医师陈述："></van-cell>
        <van-cell title="预计手术时间：" value-class="van-cell-center">
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
        <van-cell title="预计失血量：" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[6].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-cell title="手术关注点：" value-class="van-cell-center">
          <template #right-icon>
            <div class="switch-wrapper">
              <van-switch
                v-model="recordForm[7].value"
                active-color="#3478FF"
                inactive-color="#E8E8E8"
              />
            </div>
          </template>
        </van-cell>
        <van-field v-model="recordForm[8].value" label="其它：" placeholder="请输入其它" />
        <van-cell title="麻醉医师陈述：">
          <!-- <template #right-icon>
            <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8"/>
          </template> -->
        </van-cell>
        <van-cell title="麻醉关注点：" value-class="van-cell-center">
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
        <van-field v-model="recordForm[10].value" label="其它：" placeholder="请输入其它" />
        <van-cell title="手术护士陈述："> </van-cell>
        <van-cell title="物品灭菌合格：" value-class="van-cell-center">
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
        <van-cell title="仪器设备、植入物：" value-class="van-cell-center">
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
        <van-cell title="术前术中特殊用药情况：" value-class="van-cell-center">
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
        <van-field v-model="recordForm[14].value" label="其它：" placeholder="请输入其它" />
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
import SignLogin from '@/components/SignLogin'
// import Signature from '@/components/Signature'
import PatientCard from '@/components/PatientCard'
import { submitTimeout, getTimeout } from '@/api/check'
import request from '@/utils/request'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      signTitle: '',
      checked: true,
      input: '',
      time: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      currentSign: null,
      visible: false,
      anesBeforeAnesDoc: '',
      anesBeforeOperDoc: '',
      anesBeforeNurse: '',
      anesBeforeState: '',
      recordForm: [
        { key: '患者姓名，住院号，性别，年龄正确', value: false, sort: '1' },
        { key: '手术方式确认', value: false, sort: '2' },
        { key: '手术部位、体位、标识正确', value: false, sort: '3' },
        { key: '是否需要相关影像资料', value: false, sort: '4' },
        { key: '其它', value: '', sort: '12' },
        { key: '预计手术时间', value: false, sort: '5' },
        { key: '预计失血量', value: false, sort: '6' },
        { key: '手术关注点', value: false, sort: '7' },
        { key: '其它', value: '', sort: '13' },
        { key: '麻醉关注点', value: false, sort: '8' },
        { key: '其它', value: '', sort: '14' },
        { key: '物品灭菌合格', value: false, sort: '9' },
        { key: '仪器设备、植入物', value: false, sort: '10' },
        { key: '术前术中特殊用药情况', value: false, sort: '11' },
        { key: '其它', value: '', sort: '15' }
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
    onClickRight () {
      this.saveData().then(() => {
        this.$notify({ message: '保存成功', type: 'success' })
        this.$router.push('/patient-home')
      }, e => {
        this.$notify({ message: e.message, type: 'warning' })
        this.$router.push('/patient-home')
      })
    },
    saveData () {
      let arr = JSON.parse(JSON.stringify(this.recordForm))
      arr.forEach((item) => {
        if (item.key === '其它') {
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
      if (
        this.anesBeforeAnesDoc &&
        this.anesBeforeOperDoc &&
        this.anesBeforeNurse
      ) {
        state = '2'
      }
      return request({
        method: 'post',
        url: submitTimeout,
        data: {
          operBeforeAnesDoc: this.anesBeforeAnesDoc,
          operBeforeCheckJson: arr,
          operBeforeNurse: this.anesBeforeNurse,
          operBeforeOperDoc: this.anesBeforeOperDoc,
          operBeforeState: state,
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
    getData () {
      request({
        method: 'get',
        url:
          getTimeout +
          '/' +
          this.patientInfo.hospitalNo +
          '/' +
          this.patientInfo.cureNo +
          '/' +
          this.patientInfo.operSchNo
      }).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data
          if (data.beforeOperAnesDoctorTwo) {
            this.anesBeforeAnesDoc = data.beforeOperAnesDoctorTwo
          }
          this.time = data.beforeOperChkTime
          if (data.beforeOperDocTwo) {
            this.anesBeforeOperDoc = data.beforeOperDocTwo
          }
          if (data.beforeOperNurse) {
            this.anesBeforeNurse = data.beforeOperNurse
          }
          if (data.opeeBeforeCheck.length > 0) {
            data.opeeBeforeCheck.forEach((item) => {
              if (item.key !== '其它') {
                if (item.value === '是') {
                  item.value = true
                } else {
                  item.value = false
                }
              }
            })
            this.recordForm = data.opeeBeforeCheck
          }
        }
      })
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
.time-out {
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
  .signatureImage {
    height: 300px;
  }
  .list {
    height: calc(100% - 324px);
    overflow-y: auto;
    .van-cell__value {
      flex: unset;
    }
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
      .van-dropdown-menu__bar {
        height: 100%;
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
    .van-icon {
      vertical-align: middle;
      color: #ff4b4b;
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
