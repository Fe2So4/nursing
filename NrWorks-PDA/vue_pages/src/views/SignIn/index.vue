<template>
  <div class="sign-in">
    <van-nav-bar
      title="麻醉前实施核查"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
    >
    </van-nav-bar>
    <PatientCard :radius="true"></PatientCard>
    <div class="list">
      <van-cell-group :border="false">
        <van-cell
          title="患者姓名、住院号、性别、年龄正确："
          value=""
          value-class="first-cell van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[0].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell title="手术方式确认：" value="" value-class="van-cell-center">
          <template #right-icon>
            <van-switch
              v-model="recordForm[1].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell
          title="手术部位与标识正确："
          value=""
          value-class="van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[2].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell
          title="手术知情同意书："
          value=""
          value-class="van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[3].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell
          title="麻醉知情同意书："
          value=""
          value-class="van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[4].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell
          title="麻醉设备安全检查完成："
          value=""
          value-class="van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[5].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell title="皮肤是否完整：" value="" value-class="van-cell-center">
          <template #right-icon>
            <van-switch
              v-model="recordForm[6].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
              @change="handleChange"
            />
          </template>
        </van-cell>
        <div v-show="!recordForm[6].value" class="cell-degree">
          <van-cell
            title="部位："
            title-class="left-title"
            value-class="right-value"
          >
            <template #right-icon>
              <van-field
                v-model="recordForm[6].items[0].value"
                label=""
                placeholder="请输入部位："
                label-align="right"
                input-align="right"
              />
            </template>
          </van-cell>
          <van-cell
            title="程度："
            class="cell-after"
            title-class="left-title"
            value-class="right-value"
          >
            <template #right-icon>
              <van-field
                v-model="recordForm[6].items[1].value"
                label=""
                placeholder="请输入程度："
                label-align="right"
                input-align="right"
              />
            </template>
          </van-cell>
        </div>
        <van-cell
          title="术野皮肤准备正确："
          value=""
          value-class="van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[7].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell
          title="静脉通道建立完成："
          value=""
          value-class="van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[8].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell
          title="患者是否有过敏史："
          value=""
          value-class="van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[9].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell
          title="抗菌药物皮试结果："
          value=""
          value-class="van-cell-center"
        >
          <template #right-icon>
            <van-switch
              v-model="recordForm[10].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell title="术前备血：" value="" value-class="van-cell-center">
          <template #right-icon>
            <van-switch
              v-model="recordForm[11].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell title="影像学资料：" value="" value-class="van-cell-center">
          <template #right-icon>
            <van-switch
              v-model="recordForm[12].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell title="假体：" value="" value-class="van-cell-center">
          <template #right-icon>
            <van-switch
              v-model="recordForm[13].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell title="体内植入物：" value="" value-class="van-cell-center">
          <template #right-icon>
            <van-switch
              v-model="recordForm[14].value"
              active-color="#3478FF"
              inactive-color="#E8E8E8"
            />
          </template>
        </van-cell>
        <van-cell
          title="其它："
          value=""
          title-class="left-title"
          value-class="right-value"
        >
          <template #right-icon>
            <van-field
              v-model="recordForm[15].value"
              label=""
              placeholder="请输入其它："
            />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group :border="false">
        <van-cell title="核查时间" :value="recordForm[16].value"></van-cell>
        <van-cell
          title="麻醉医师签名"
          title-class="sign-title"
          @click="handleShowSignature(1)"
        ></van-cell>
        <div v-if="anesBeforeAnesDoc !== ''" class="signatureImage-content">
          <img :src="anesBeforeAnesDoc" alt="" class="signatureImage" />
        </div>
        <van-cell
          title="手术医师签名"
          title-class="sign-title"
          @click="handleShowSignature(2)"
        ></van-cell>
        <div v-if="anesBeforeOperDoc !== ''" class="signatureImage-content">
          <img :src="anesBeforeOperDoc" alt="" class="signatureImage" />
        </div>
        <van-cell
          title="手术护士签名"
          title-class="sign-title"
          @click="handleShowSignature(3)"
        ></van-cell>
        <div v-if="anesBeforeNurse !== ''" class="signatureImage-content">
          <img :src="anesBeforeNurse" alt="" class="signatureImage" />
        </div>
      </van-cell-group>
    </div>
    <!-- <transition name="van-slide-up"> -->
    <signature
      :visible="visible"
      v-if="visible"
      @handleClose="handleCloseSignature"
      @handleSubmit="handleSubmitImage"
    />
    <!-- </transition> -->
  </div>
</template>

<script>
import Signature from '@/components/Signature'
import PatientCard from '@/components/PatientCard'
import { submitSignIn, getSignIn } from '@/api/check'
import request from '@/utils/request'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      checked: true,
      currentSign: null,
      showFullSkin: true,
      visible: false,
      // time: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      anesBeforeAnesDoc: '',
      anesBeforeOperDoc: '',
      anesBeforeNurse: '',
      anesBeforeState: '',
      recordForm: [
        { key: '患者姓名，性别，年龄正确', value: false, sort: '1' },
        { key: '手术方式确认', value: false, sort: '2' },
        { key: '手术部位与标识正确', value: false, sort: '3' },
        { key: '手术知情同意书', value: false, sort: '4' },
        { key: '麻醉知情同意书', value: false, sort: '5' },
        { key: '麻醉设备安全检查完成', value: false, sort: '6' },
        {
          key: '皮肤是否完整',
          value: false,
          sort: '7',
          items: [
            { key: '部位', value: '' },
            { key: '程度', value: '' }
          ]
        },
        { key: '术野皮肤准备正确', value: false, sort: '8' },
        { key: '静脉通道建立完成', value: false, sort: '9' },
        { key: '患者是否有过敏史', value: false, sort: '10' },
        { key: '抗菌药物皮试结果', value: false, sort: '11' },
        { key: '术前备血', value: false, sort: '12' },
        { key: '影像学资料', value: false, sort: '13' },
        { key: '假体', value: false, sort: '14' },
        { key: '体内植入物', value: false, sort: '15' },
        { key: '其它', value: '', sort: '16' },
        {
          key: '核查时间',
          value: moment(new Date()).format('YYYY-MM-DD HH:mm'),
          sort: '17'
        }
      ]
    }
  },
  components: {
    Signature,
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
        return this.$router.push('/patient-home')
      }, e => {
        this.$notify({ message: e.message, type: 'warning' })
      })
    },
    saveData () {
      let arr = JSON.parse(JSON.stringify(this.recordForm))
      let state = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].key === '其它') {
        } else {
          if (
            !arr[i].value ||
            this.anesBeforeAnesDoc === '' ||
            this.anesBeforeOperDoc === '' ||
            this.anesBeforeNurse === ''
          ) {
            state = '1'
            break
          } else {
            state = '2'
          }
        }
      }
      arr.forEach((item) => {
        if (item.key === '其它' || item.key === '核查时间') {
        } else {
          if (item.value === true) {
            item.value = '是'
          } else {
            item.value = '否'
          }
        }
      })
      return request({
        method: 'post',
        url: submitSignIn,
        data: {
          anesBeforeAnesDoc: this.anesBeforeAnesDoc,
          anesBeforeCheckJson: arr,
          anesBeforeNurse: this.anesBeforeNurse,
          anesBeforeOperDoc: this.anesBeforeOperDoc,
          anesBeforeState: state,
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
    handleShowSignature (param) {
      this.currentSign = param
      this.visible = true
    },
    getData () {
      request({
        method: 'get',
        url:
          getSignIn +
          '/' +
          this.patientInfo.hospitalNo +
          '/' +
          this.patientInfo.cureNo + '/' + this.patientInfo.operSchNo
      }).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data
          if (data.anesBeforeAnesDoc) {
            this.anesBeforeAnesDoc = data.anesBeforeAnesDoc
          }
          if (data.anesBeforeAnesDoc) {
            this.anesBeforeOperDoc = data.anesBeforeOperDoc
          }
          if (data.anesBeforeNurse) {
            this.anesBeforeNurse = data.anesBeforeNurse
          }
          this.time = data.anesBeforeChkTime
          if (data.anesBeforeCheck.length > 0) {
            data.anesBeforeCheck.forEach((item) => {
              if (item.key === '其它' || item.key === '核查时间') {
              } else {
                if (item.value === '是') {
                  item.value = true
                } else {
                  item.value = false
                }
              }
            })
            this.recordForm = data.anesBeforeCheck
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
.sign-in {
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
  .cell-degree{
    .van-cell{
      &:nth-last-child(1):after{
        border-bottom: 1PX solid #E2E2E2 !important;
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 0.5rem;
        bottom: 0;
        left: 0.5rem;
        transform: unset
      }
    }
  }
  .van-cell {
    line-height: 94px;
    color: #2e2e2e;
    font-size: 30px;
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
  }
  .signatureImage {
    height: 300px;
    margin: 0 auto;
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
      }
    }
  }
}
</style>
