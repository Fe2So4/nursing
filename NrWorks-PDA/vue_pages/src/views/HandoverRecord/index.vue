<template>
  <div class="handover-record">
    <van-nav-bar
      title="转运交接单"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
    >
    </van-nav-bar>
    <span class="shouyeBtn" @click="gotoShouye">返回首页</span>
    <PatientCard :radius="true"></PatientCard>
    <div class="list">
      <van-cell-group>
        <van-cell
          v-show="transferType === 1 || transferType === 2"
          title="手术环节交接"
          :label="transferTitle"
          value=""
          title-class="first-cell"
          style="background: #e2e2e2"
        >
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="病房交接"
          value=""
          title-class="first-cell"
          style="background: #e2e2e2"
        >
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="转运起始时间："
          :value="formatTime(recordForm.startTime)"
          @click="hanldeShowTime('startTime')"
        ></van-cell>
        <van-cell
          v-show="transferType === 2"
          title="术后到达病区(监护室)时间："
          title-class="first-cell"
          :value="formatTime(recordForm.startTime)"
          @click="hanldeShowTime('startTime')"
        ></van-cell>
        <van-cell
          title="评估时间："
          v-show="transferType === 1"
          :value="formatTime(recordForm.startTime)"
          @click="hanldeShowTime('startTime')"
        >
        </van-cell>
        <van-cell v-show="transferType === 0" title="住院/转院区：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item
                v-model="recordForm.inpatientWard"
                :options="zyOptions"
              />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0 && recordForm.inpatientWard === '2'"
          title-class="left-title"
          value-class="right-value"
          title="待转院区："
          value=""
        >
          <template #right-icon>
            <van-field
              v-model="recordForm.forwardingWard"
              label=""
              placeholder=""
            />
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="手术/监护室/透析室："
          value=""
        >
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item
                v-model="recordForm.department"
                :options="bfOptions"
              />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="意识：" value="" v-show="transferType !== 2">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item
                v-model="recordForm.consciousness"
                :options="ysOptions"
              />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell
          title="其它："
          value=""
          title-class="left-title"
          value-class="right-value"
          v-show="transferType !== 2 && recordForm.consciousness === '5'"
        >
          <template #right-icon>
            <van-field
              v-model="recordForm.consciousnessOther"
              label=""
              placeholder=""
            />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="疼痛：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item
                v-model="recordForm.ache"
                :options="ttOptions"
              />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="强度："
          value=""
          title-class="left-title"
          value-class="right-value"
        >
          <template #right-icon>
            <van-field v-model="recordForm.strength" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="部位："
          value=""
          title-class="left-title"
          value-class="right-value"
        >
          <template #right-icon>
            <van-field v-model="recordForm.achePart" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell v-show="transferType === 0" title="性质：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item
                v-model="recordForm.nature"
                :options="xzOptions"
              />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="体温："
          value=""
          title-class="left-title"
          value-class="right-value"
        >
          <template #right-icon>
            <van-field v-model="recordForm.temp" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell
          title="脉搏："
          value=""
          title-class="left-title"
          value-class="right-value"
          v-show="transferType !== 2"
        >
          <template #right-icon>
            <van-field v-model="recordForm.pulse" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell
          title="呼吸："
          value=""
          title-class="left-title"
          value-class="right-value"
          v-show="transferType !== 2"
        >
          <template #right-icon>
            <van-field v-model="recordForm.breathe" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell
          title="血压："
          value=""
          title-class="left-title"
          value-class="right-value"
          v-show="transferType !== 2"
        >
          <template #right-icon>
            <van-field v-model="recordForm.bp" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="氧饱和度："
          value=""
          title-class="left-title"
          value-class="right-value"
        >
          <template #right-icon>
            <van-field v-model="recordForm.o2" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell title="皮肤：" value="" v-show="transferType !== 2">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item
                v-model="recordForm.skinName"
                :options="pfOptions"
                @change="handleDrowDownChange"
              />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <div v-show="recordForm.skinName === '2'">
          <van-cell
            title="部位："
            title-class="left-title"
            value-class="right-value"
          >
            <template #right-icon>
              <van-field
                v-model="recordForm.skinPart"
                label=""
                placeholder="请输入部位："
                label-align="right"
                input-align="right"
              />
            </template>
          </van-cell>
          <van-cell
            title="程度："
            title-class="left-title"
            value-class="right-value"
          >
            <template #right-icon>
              <van-field
                v-model="recordForm.skinDegree"
                label=""
                placeholder="请输入程度："
                label-align="right"
                input-align="right"
              />
            </template>
          </van-cell>
          <van-cell
            title="大小："
            title-class="left-title"
            value-class="right-value"
          >
            <template #right-icon>
              <van-field
                v-model="recordForm.skinSize"
                label=""
                placeholder="请输入大小："
                label-align="right"
                input-align="right"
              />
            </template>
          </van-cell>
        </div>
        <van-cell
          title-class="left-title"
          value-class="right-value multipul-select"
          v-show="transferType === 0"
          title="导管："
          value=""
          @click="
            handleShowDialog({
              list: 'dgOptions',
              model: 'catheter',
              title: '导管',
            })
          "
        >
          <template #right-icon>
            <span class="mul-ellipsis">{{
              handleFilterLabel({ list: "dgOptions", value: "catheter" })
            }}</span>
            <!-- <van-icon name="play"/> -->
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0 && recordForm.catheter.length > 0"
          title="留置时间："
          :value="formatTime(recordForm.conduitTime)"
          @click="hanldeShowTime('conduitTime')"
        >
        </van-cell>
        <van-cell
          title-class="left-title"
          value-class="right-value multipul-select"
          v-show="transferType === 1"
          title="留置导管固定畅通："
          value=""
          @click="
            handleShowDialog({
              list: 'lzdgOptions',
              model: 'conduit',
              title: '留置导管固定畅通',
            })
          "
        >
          <template #right-icon>
            <div style="display: flex">
              <span class="mul-ellipsis">{{
                handleFilterLabel({ list: "lzdgOptions", value: "conduit" })
              }}</span>
            </div>
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title-class="left-title"
          value-class="right-value multipul-select"
          title="物品："
          value=""
          @click="
            handleShowDialog({
              list: 'wpOptions',
              model: 'goodsJson',
              title: '物品',
            })
          "
        >
          <template #right-icon>
            <!-- <div style="display:flex;"> -->
            <span class="mul-ellipsis">{{
              handleFilterLabel({ list: "wpOptions", value: "goodsJson" })
            }}</span>
            <!-- </div> -->
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="数量："
          value=""
          title-class="left-title"
          value-class="right-value"
        >
          <template #right-icon>
            <van-field v-model="recordForm.number" label="" placeholder="" />
          </template>
        </van-cell>
        <van-cell
          v-show="transferType === 0"
          title="建议："
          value=""
          title-class="left-title"
          value-class="right-value"
        >
          <template #right-icon>
            <van-field v-model="recordForm.suggest" label="" placeholder="" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell
          v-show="transferType === 2"
          title="接收电子签名"
          title-class="sign-title"
          @click="handleShowSignature"
          :value="recordForm.signatureImage2"
          value-class="sign-value"
        ></van-cell>
        <van-cell
          v-show="transferType === 0 || transferType === 1"
          title="运送电子签名"
          title-class="sign-title"
          @click="handleShowSignature"
          :value="recordForm.signatureImage2"
          value-class="sign-value"
        ></van-cell>
        <!-- <div
          v-if="recordForm.signatureImage2 !== ''"
          style="text-align: center"
        >
          <img
            :src="recordForm.signatureImage2"
            alt=""
            class="signatureImage"
          />
        </div> -->
      </van-cell-group>
      <van-dialog
        width="80%"
        v-model="showDialog"
        :title="dialogTitle"
        show-cancel-button
        :before-close="handleCloseDialog"
        @confirm="handleDialogConfirm"
      >
        <div class="dialog-checkbox">
          <van-checkbox-group v-model="result">
            <van-checkbox
              v-for="item in checkBoxList"
              :key="item.value"
              :name="item.value"
              shape="square"
              >{{ item.text }}</van-checkbox
            >
          </van-checkbox-group>
        </div>
      </van-dialog>
    </div>
    <van-action-sheet v-model="timeVisible">
      <template slot="default">
        <van-datetime-picker
          v-if="timeVisible"
          v-model="currentDate"
          @cancel="handleCancel"
          @confirm="handleConfirm"
          item-height="60"
          type="datetime"
          title="选择完整时间"
        />
      </template>
    </van-action-sheet>
    <!-- <signature
      :visible="visible"
      v-if="visible"
      @handleClose="handleCloseSignature"
      @handleSubmit="handleSubmitImage"
    /> -->
    <!-- <transition name="van-slide-up">
    </transition> -->
    <SignLogin
      :signTitle ="signTitle"
      v-if="false"
      :show="false"
      @handleClose="handleCloseSignature"
      @handleSubmit="handleSubmitImage"
    ></SignLogin>
  </div>
</template>

<script>
// import Signature from '@/components/Signature'
import SignLogin from '@/components/SignLogin'
import moment from 'moment'
import PatientCard from '@/components/PatientCard'
import {
  getRecord,
  submitRoom,
  submitInOpeRoom,
  submitInPacu,
  submitOutOpeRoom,
  submitOutPacu,
  submitPatRoom
} from '@/api/handover-record'
import request from '@/utils/request'
import { mapState } from 'vuex'
import {getLoginUserInfo} from '@/api/login'
export default {
  data () {
    return {
      signTitle: '',
      checked: true,
      visible: false,
      input: '',
      currentTime: null,
      showFullSkin: false,
      currentDate: new Date(),
      timeVisible: false,
      value1: '',
      transferType: 0,
      transferTitle: '',
      showDialog: false,
      result: [],
      checkBoxList: null,
      dialogTitle: '',
      recordForm: {
        startTime: new Date(), // 转运起始时间
        suggest: '', // 建议
        department: '', // 手术/监护室/透析室
        inpatientWard: '', // 住院/转病区
        // 导管
        catheter: [],
        conduitTime: new Date(), // 留置时间
        // 物品
        goodsJson: [],
        number: '', // 备注数量
        time: '', // 出手术室时间，入手术室时间
        // 皮肤
        skinName: '', // 破损/完整
        skinPart: '', // 部位
        skinDegree: '', // 程度
        skinSize: '', // 大小
        pulse: '', // 脉搏
        breathe: '', // 呼吸
        temp: '',
        bp: '', // 血压
        o2: '', // 氧饱和度
        consciousness: '', // 意识
        consciousnessOther: '', // 意识其它
        ache: '', // 疼痛
        strength: '', // 强度
        achePart: '', // 疼痛部位
        conduit: [], // 留置导管固定畅通
        nature: '', // 性质
        signatureImage2: '' // 签名
      },
      zyOptions: [
        { text: '住院', value: '1' },
        { text: '转病区', value: '2' },
        { text: '', value: '' }
      ], // 住院/转病区
      bfOptions: [
        { text: '手术', value: '1' },
        { text: '监护室', value: '2' },
        { text: '透析室', value: '3' },
        { text: '', value: '' }
      ], // 手术室/监护室/透析室
      ysOptions: [
        { text: '清楚', value: '1' },
        { text: '烦躁', value: '2' },
        { text: '嗜睡', value: '3' },
        { text: '昏迷', value: '4' },
        { text: '其它', value: '5' },
        { text: '', value: '' }
      ], // 意识
      ttOptions: [
        { text: 'NRS', value: '1' },
        { text: 'FLACC', value: '2' },
        { text: 'CCPOT', value: 'WONG-BAKER' },
        { text: '', value: '' }
      ], // 疼痛
      xzOptions: [
        { text: '刀割样痛', value: '1' },
        { text: '绞痛', value: '2' },
        { text: '灼烧样痛', value: '3' },
        { text: '刺痛', value: '4' },
        { text: '压痛', value: '5' },
        { text: '胀痛', value: '6' },
        { text: '钝痛', value: '7' },
        { text: '', value: '' }
      ],
      pfOptions: [
        { text: '完整', value: '1' },
        { text: '破损', value: '2' },
        { text: '', value: '' }
      ],
      dgOptions: [
        { text: '氧气', value: 'o2' },
        { text: '浅静脉留置', value: 'qjm' },
        { text: '深静脉留置', value: 'sjm' },
        { text: 'PICC', value: 'picc' },
        { text: '动脉留置', value: 'dml' },
        { text: '胃肠减压', value: 'cwj' },
        { text: '鼻饲', value: 'bc' },
        { text: '留置导尿', value: 'lzd' },
        { text: '气质导管', value: 'qgd' },
        { text: '负压球', value: 'fyq' },
        { text: '胸腔引流', value: 'xqy' },
        { text: 'T管', value: 'tg' },
        { text: '其他', value: 'qita' },
        { text: '无', value: 'wu' }
      ],
      lzdgOptions: [
        { text: '静脉', value: 'jm' },
        { text: '动脉', value: 'dm' },
        { text: '胃管', value: 'wg' },
        { text: '导尿', value: 'dn' },
        { text: '气管导管', value: 'qgdg' },
        { text: '负压球', value: 'fyq' },
        { text: '胸腔引流', value: 'xqyl' },
        { text: 'PICC', value: 'picc' },
        { text: '其他', value: 'qita' },
        { text: '无', value: 'wu' }
      ],
      wpOptions: [
        { text: '输液', value: '1' },
        { text: 'X片', value: '2' },
        { text: 'CT片', value: '3' },
        { text: '磁共振片', value: '4' },
        { text: '其它', value: '5' }
      ]
    }
  },
  components: {
    // Signature,
    SignLogin,
    PatientCard
  },
  computed: {
    ...mapState('Patient', ['patientInfo', 'opePeopleInfo']),
    time () {
      return moment(this.currentDate).format('YYYY-MM-DD HH:mm')
    }
  },
  watch: {},
  methods: {
    getUserName () {
      return request({
        method: 'get',
        url: getLoginUserInfo
      }).then(
        (res) => {
          if (res.data.code === 200) {
            if (res.data.data.userName) {
              this.recordForm.signatureImage2 = res.data.data.userName
            }
          } else {
            return Promise.reject(new Error(res.data.msg))
          }
        },
        e => {
          return Promise.reject(new Error('网络异常，请稍后尝试'))
        }
      )
    },
    gotoShouye () {
      this.$router.push('/patient-home')
    },
    formatTime (time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    },
    handleFilterLabel (obj) {
      let str = ''
      var reg = /,$/gi
      if (this.recordForm[obj.value] !== '') {
        this[obj.list].forEach((item) => {
          this.recordForm[obj.value].forEach((_item) => {
            if (item.value === _item) {
              str = str + item.text + ','
            }
          })
        })
        return str.replace(reg, '')
      } else {
        return ''
      }
    },
    onClickLeft () {
      this.handleSubmit().then(
        () => {
          this.$router.push('/transfer-handover')
        }
      ).catch(
        e => {
          this.$notify({ type: 'warning', message: e.message })
          this.$router.push('/transfer-handover')
        }
      )
    },
    getData () {
      request({
        method: 'get',
        url:
          getRecord +
          '/' +
          this.patientInfo.hospitalNo +
          '/' +
          this.patientInfo.cureNo +
          '/' +
          this.patientInfo.operSchNo
      }).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data
          switch (this.transferTitle) {
            case '病房交接':
              if (data.goodsJson.length) {
                this.recordForm.goodsJson = data.goodsJson[0].goods
                this.recordForm.number = data.goodsJson[0].number
              }
              this.recordForm.inpatientWard = data.inpatientWard
              if (data.startTime !== '') {
                this.recordForm.startTime = data.startTime
              }
              this.recordForm.signatureImage2 = data.carrier
              if (!this.recordForm.signatureImage2) {
                this.juageImage()
              }
              this.recordForm.suggest = data.suggest
              this.recordForm.department = data.department
              this.recordForm.forwardingWard = data.forwardingWard // 转运去向病区
              this.recordForm.conduitTime = data.catheterJson[0].conduitTime
              this.recordForm.catheter = data.catheterJson[0].catheter // 导管
              this.recordForm.ache = data.appraiseJson[0].ache.acheName
              this.recordForm.strength = data.appraiseJson[0].ache.acheStrength
              this.recordForm.achePart = data.appraiseJson[0].ache.achePart
              this.recordForm.nature = data.appraiseJson[0].nature
              this.recordForm.pulse = data.appraiseJson[0].vitalSigns.pulse
              this.recordForm.breathe = data.appraiseJson[0].vitalSigns.breathe
              this.recordForm.bp = data.appraiseJson[0].vitalSigns.bp
              this.recordForm.temp = data.appraiseJson[0].vitalSigns.temp
              this.recordForm.o2 = data.appraiseJson[0].vitalSigns.o2
              this.recordForm.skinName = data.appraiseJson[0].skin.skinName
              this.recordForm.skinPart = data.appraiseJson[0].skin.skinPart
              this.recordForm.skinDegree = data.appraiseJson[0].skin.skinDegree
              this.recordForm.skinSize = data.appraiseJson[0].skin.skinSize
              this.recordForm.consciousness =
                data.appraiseJson[0].consciousness.consciousnessName // 意识
              this.recordForm.consciousnessOther =
                data.appraiseJson[0].consciousness.consciousnessOther

              break
            case '进手术室':
              if (data.pointInRoomtime !== '') {
                this.recordForm.startTime = data.pointInRoomtime // 进手术间时间
              }
              if (data.pointInRoom.length > 0) {
                this.recordForm.signatureImage2 =
                data.pointInRoom[0].signatureImage2

                this.recordForm.pulse = data.pointInRoom[0].pulse
                this.recordForm.breathe = data.pointInRoom[0].breathe
                this.recordForm.bp = data.pointInRoom[0].bp
                this.recordForm.consciousness = data.pointInRoom[0].consciousness
                this.recordForm.conduit = data.pointInRoom[0].conduit
                this.recordForm.skinName = data.pointInRoom[0].skinName
                this.recordForm.skinPart = data.pointInRoom[0].skinPart
                this.recordForm.skinDegree = data.pointInRoom[0].skinDegree
                this.recordForm.skinSize = data.pointInRoom[0].skinSize
              }
              if (!this.recordForm.signatureImage2) {
                this.juageImage()
              }
              break
            case '出手术室':
              if (data.pointOutRoom.length > 0) {
                this.recordForm.signatureImage2 =
                data.pointOutRoom[0].signatureImage2

                this.recordForm.pulse = data.pointOutRoom[0].pulse
                this.recordForm.breathe = data.pointOutRoom[0].breathe
                this.recordForm.bp = data.pointOutRoom[0].bp
                this.recordForm.consciousness =
                data.pointOutRoom[0].consciousness
                this.recordForm.conduit = data.pointOutRoom[0].conduit
                this.recordForm.skinName = data.pointOutRoom[0].skinName
                this.recordForm.skinPart = data.pointOutRoom[0].skinPart
                this.recordForm.skinDegree = data.pointOutRoom[0].skinDegree
                this.recordForm.skinSize = data.pointOutRoom[0].skinSize
                if (data.pointOutRoom[0].appraiseTime !== '') {
                  this.recordForm.startTime = data.pointOutRoom[0].appraiseTime
                }
              }

              if (!this.recordForm.signatureImage2) {
                this.juageImage()
              }
              break
            case '进PACU':
              if (data.pointPacu.length > 0) {
                this.recordForm.signatureImage2 =
                data.pointPacu[0].signatureImage2

                this.recordForm.pulse = data.pointPacu[0].pulse
                this.recordForm.breathe = data.pointPacu[0].breathe
                this.recordForm.bp = data.pointPacu[0].bp
                this.recordForm.consciousness = data.pointPacu[0].consciousness
                this.recordForm.conduit = data.pointPacu[0].conduit
                this.recordForm.skinName = data.pointPacu[0].skinName
                this.recordForm.skinPart = data.pointPacu[0].skinPart
                this.recordForm.skinDegree = data.pointPacu[0].skinDegree
                this.recordForm.skinSize = data.pointPacu[0].skinSize
                if (data.pointPacu[0].appraiseTime !== '') {
                  this.recordForm.startTime = data.pointPacu[0].appraiseTime
                }
              }

              if (!this.recordForm.signatureImage2) {
                this.juageImage()
              }
              break
            case '出PACU':

              if (data.outPacu.length > 0) {
                this.recordForm.signatureImage2 = data.outPacu[0].signatureImage2
                this.recordForm.pulse = data.outPacu[0].pulse
                this.recordForm.consciousness = data.outPacu[0].consciousness
                this.recordForm.conduit = data.outPacu[0].conduit
                this.recordForm.breathe = data.outPacu[0].breathe
                this.recordForm.bp = data.outPacu[0].bp
                this.recordForm.skinName = data.outPacu[0].skinName
                this.recordForm.skinPart = data.outPacu[0].skinPart
                this.recordForm.skinDegree = data.outPacu[0].skinDegree
                this.recordForm.skinSize = data.outPacu[0].skinSize
                if (data.outPacu[0].appraiseTime !== '') {
                  this.recordForm.startTime = data.outPacu[0].appraiseTime
                }
              }

              if (!this.recordForm.signatureImage2) {
                this.juageImage()
              }
              break
            case '病房收治':
              if (data.arrivalTime !== '') {
                this.recordForm.startTime = data.arrivalTime
              }
              this.recordForm.signatureImage2 = data.recipient
              if (!this.recordForm.signatureImage2) {
                this.juageImage()
              }
          }
        }
      })
    },
    juageImage () {
      if (!this.recordForm.signatureImage2) {
        this.getUserName()
      }
    },
    handleSubmitImage (image) {
      this.recordForm.signatureImage2 = image
    },
    handleDrowDownChange (value) {
      if (value === '2') {
        // this.showFullSkin = true
      } else {
        // this.showFullSkin = false
        this.recordForm.skinSize = ''
        this.recordForm.skinPart = ''
        this.recordForm.skinDegree = ''
      }
    },
    onClickRight () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认提交'
        })
        .then(() => this.handleSubmit())
        .catch(() => {
          // on cancel
        })
    },
    handleCloseDialog (action, done) {
      done()
    },
    handleDialogConfirm () {
      switch (this.dialogTitle) {
        case '导管':
          this.recordForm.catheter = this.result
          break
        case '留置导管固定畅通':
          this.recordForm.conduit = this.result
          break
        case '物品':
          this.recordForm.goodsJson = this.result
      }
    },
    hanldeShowTime (param) {
      this.currentDate = moment(this.recordForm[param]).toDate()
      console.log(this.recordForm[param], this.currentDate)
      this.currentTime = param
      this.timeVisible = true
    },
    handleSubmit () {
      let obj = {
        cureNo: this.patientInfo.cureNo,
        hospitalNo: this.patientInfo.hospitalNo,
        operSchNo: this.patientInfo.operSchNo
      }
      let submitUrl = ''
      switch (this.transferTitle) {
        case '病房交接':
          submitUrl = submitRoom
          obj.goodsJson = [
            {
              goods: this.recordForm.goodsJson,
              number: this.recordForm.number
            }
          ]
          obj.inpatientWard = this.recordForm.inpatientWard
          obj.startTime = moment(this.recordForm.startTime).format('YYYY-MM-DD HH:mm')
          obj.patForwardingRoomState =
            this.recordForm.signatureImage2 !== '' ? '2' : '1'
          obj.carrier = this.recordForm.signatureImage2
          obj.suggest = this.recordForm.suggest
          obj.department = this.recordForm.department
          obj.forwardingWard = this.recordForm.forwardingWard // 转运去向病区
          obj.catheterJson = [
            {
              conduitTime: moment(this.recordForm.conduitTime).format('YYYY-MM-DD HH:mm'),
              catheter: this.recordForm.catheter
            }
          ] // 导管
          obj.appraiseJson = [
            {
              consciousness: {
                consciousnessName: this.recordForm.consciousness,
                consciousnessOther: this.recordForm.consciousnessOther
              },
              ache: {
                acheName: this.recordForm.ache, // 疼痛
                acheStrength: this.recordForm.strength, // 强度
                achePart: this.recordForm.achePart // 疼痛部位
              },
              nature: this.recordForm.nature,
              vitalSigns: {
                pulse: this.recordForm.pulse,
                breathe: this.recordForm.breathe,
                bp: this.recordForm.bp,
                temp: this.recordForm.temp,
                o2: this.recordForm.o2 // 氧饱和度
              },
              skin: {
                skinName: this.recordForm.skinName,
                skinPart: this.recordForm.skinPart,
                skinDegree: this.recordForm.skinDegree,
                skinSize: this.recordForm.skinSize
              }
            }
          ] // 评估
          break
        case '进手术室':
          submitUrl = submitInOpeRoom
          obj.pointInRoomTime = moment(new Date()).format('YYYY-MM-DD HH:mm') // 进手术间时间
          obj.pointInRoom = [
            {
              pulse: this.recordForm.pulse,
              bp: this.recordForm.bp,
              breathe: this.recordForm.breathe,
              consciousness: this.recordForm.consciousness,
              conduit: this.recordForm.conduit,
              skinName: this.recordForm.skinName,
              skinPart: this.recordForm.skinPart,
              skinDegree: this.recordForm.skinDegree,
              skinSize: this.recordForm.skinSize,
              signatureImage2: this.recordForm.signatureImage2,
              appraiseTime: moment(this.recordForm.startTime).format('YYYY-MM-DD HH:mm')
            }
          ]
          obj.pointInRoomState =
            this.recordForm.signatureImage2 !== '' ? '2' : '1'
          break
        case '出手术室':
          obj.pointOutRoom = [
            {
              pulse: this.recordForm.pulse,
              breathe: this.recordForm.breathe,
              bp: this.recordForm.bp,
              consciousness: this.recordForm.consciousness,
              conduit: this.recordForm.conduit,
              skinName: this.recordForm.skinName,
              skinPart: this.recordForm.skinPart,
              skinDegree: this.recordForm.skinDegree,
              skinSize: this.recordForm.skinSize,
              signatureImage2: this.recordForm.signatureImage2,
              appraiseTime: moment(this.recordForm.startTime).format('YYYY-MM-DD HH:mm')
            }
          ]
          obj.pointOutRoomState =
            this.recordForm.signatureImage2 !== '' ? '2' : '1'
          obj.pointOutRoomTime = moment(new Date()).format('YYYY-MM-DD HH:mm')
          submitUrl = submitOutOpeRoom
          break
        case '进PACU':
          obj.pointPacu = [
            {
              pulse: this.recordForm.pulse,
              breathe: this.recordForm.breathe,
              bp: this.recordForm.bp,
              consciousness: this.recordForm.consciousness,
              conduit: this.recordForm.conduit,
              skinName: this.recordForm.skinName,
              skinPart: this.recordForm.skinPart,
              skinDegree: this.recordForm.skinDegree,
              skinSize: this.recordForm.skinSize,
              signatureImage2: this.recordForm.signatureImage2,
              appraiseTime: moment(this.recordForm.startTime).format('YYYY-MM-DD HH:mm')
            }
          ]
          obj.pointPacuState =
            this.recordForm.signatureImage2 !== '' ? '2' : '1'
          obj.pointPacuTime = moment(new Date()).format('YYYY-MM-DD HH:mm')
          submitUrl = submitInPacu
          break
        case '出PACU':
          obj.outPacu = [
            {
              pulse: this.recordForm.pulse,
              breathe: this.recordForm.breathe,
              bp: this.recordForm.bp,
              consciousness: this.recordForm.consciousness,
              conduit: this.recordForm.conduit,
              skinName: this.recordForm.skinName,
              skinPart: this.recordForm.skinPart,
              skinDegree: this.recordForm.skinDegree,
              skinSize: this.recordForm.skinSize,
              signatureImage2: this.recordForm.signatureImage2,
              appraiseTime: moment(this.recordForm.startTime).format('YYYY-MM-DD HH:mm')
            }
          ]
          obj.outPacuState = this.recordForm.signatureImage2 !== '' ? '2' : '1'
          obj.outPacuTime = moment(new Date()).format('YYYY-MM-DD HH:mm')
          submitUrl = submitOutPacu
          break
        case '病房收治':
          submitUrl = submitPatRoom
          obj.arrivalTime = moment(this.recordForm.startTime).format('YYYY-MM-DD HH:mm')
          obj.patRoomState = this.recordForm.signatureImage2 !== '' ? '2' : '1'
          obj.recipient = this.recordForm.signatureImage2
      }
      return request({
        method: 'post',
        url: submitUrl,
        data: obj
      }).then((res) => {
        if (res.data.code === 200) {
          this.$notify({ type: 'success', message: res.data.msg })
        } else {
          return Promise.reject(new Error('保存失败，请稍后尝试'))
        }
      },
      e => {
        return Promise.reject(new Error('网络错误，请稍后尝试'))
      })
    },
    handleCancel () {
      this.timeVisible = false
    },
    // handleTimeChange (picker) {
    //   console.log(picker)
    //   // this.currentDate = moment(value).format('YYYY-MM-DD HH:mm')
    // },
    handleConfirm (value) {
      this.currentDate = value
      this.recordForm[this.currentTime] = moment(value).format(
        'YYYY-MM-DD HH:mm'
      )
      this.timeVisible = false
    },
    handleShowSignature () {
      // this.signTitle = '运送电子签名'
      // this.visible = true
      this.$dialog.confirm({
        title: '签名',
        message: '确定要签名吗？'
      }).then(() => {
        this.getUserName()
      })
    },
    handleCloseSignature () {
      this.visible = false
    },
    handleChange () {
      this.showFullSkin = !this.showFullSkin
    },
    handleShowDialog (obj) {
      this.dialogTitle = obj.title
      this.result = this.recordForm[obj.model]
      this.checkBoxList = this[obj.list]
      this.showDialog = true
    }
  },
  created () {
    this.transferType = parseInt(this.$route.query.type)
    this.transferTitle = this.$route.query.title
    this.getData()
    // this.getUserName()
  }
}
</script>

<style lang="scss" scoped>
.handover-record {
  height: 100%;
  position: relative;
  .van-nav-bar {
    height: 100px;
    background: linear-gradient(90deg, #666666, #303030);
    /deep/ .van-nav-bar__title {
      font-size: 34px;
      line-height: 100px;
    }
    /deep/ .van-nav-bar__text {
      font-size: 30px;
    }
    /deep/ .van-icon-arrow-left {
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
    margin: 0 auto;
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
        height: 100%;
        box-shadow: unset;
      }
      /deep/ .van-dropdown-menu__item {
        justify-content: flex-end;
      }
      // /deep/ .van-dropdown-menu__title{
      //   font-size: 30px;
      //   line-height: unset;
      //   padding-right: 30px;
      //   &::after{
      //     border-color: transparent transparent  #808080 #808080;
      //     border-width: 6px;
      //     // margin-top: -6px;
      //     right: 5px;
      //   }
      // }
      /deep/ .van-dropdown-item__option {
        font-size: 30px;
        line-height: 60px;
      }
    }
    /deep/ .van-icon-play {
      transform: rotate(90deg);
      font-size: 20px;
      vertical-align: middle;
    }
    .van-cell__label {
      font-size: 26px;
      line-height: 30px;
    }
  }
  .van-cell-group {
    // &:last-child{
    // margin-top: 15px;
    // margin-bottom: 15px;
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
    // }
    &:last-child {
      margin-top: 15px;
    }
  }
  .van-dialog {
    font-size: 30px;
    top: 50%;
    .dialog-checkbox {
      overflow-y: auto;
      max-height: 60vh;
    }
    /deep/ .van-dialog__header {
      line-height: 80px;
      text-align: left;
      text-indent: 20px;
      border-bottom: 1px solid #e2e2e2;
    }
    .van-checkbox {
      padding-left: 40px;
      border-bottom: 1px solid #e2e2e2;
      box-sizing: border-box;
      /deep/ .van-checkbox__icon {
        line-height: 80px;
        // height: 60px;
        // width: 30px;
        height: 80px;
        vertical-align: middle;
        display: flex;
        align-items: center;
        .van-icon {
          line-height: 30px;
          width: 30px;
          height: 30px;
        }
      }
      /deep/ .van-checkbox__label {
        line-height: unset;
        margin-left: 20px;
        display: inline-block;
        height: 100%;
      }
    }
    /deep/ .van-dialog__footer {
      /deep/ .van-button {
        line-height: 80px;
        height: 80px;
        font-size: 26px;
      }
    }
  }
}
</style>
