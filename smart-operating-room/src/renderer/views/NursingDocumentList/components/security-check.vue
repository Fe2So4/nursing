<template>
  <div
    class="content-wenben-container"
    id="security-check"
  >
    <div
      class="wenben-content"
    >
      <div class="wenben-content-title">
        <span>复旦大学附属华山医院</span>
      </div>
      <div class="wenben-content-info">
        <div class="info-content-title">
          手术安全检查表
        </div>
        <!-- <div class="info-content-form">
          <el-form
            size="mini"
            ref="form"
            :model="formData"
            label-width="90px"
          >
            <el-row>
              <el-col :span="7">
                <el-form-item label="科 别：">
                  <el-input
                    disabled
                    v-model="formData.deptName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="患者姓名:">
                  <el-input
                    disabled
                    v-model="formData.patientName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性 别：">
                  <el-input
                    disabled
                    v-model="formData.gender"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="住院号：">
                  <el-input
                    disabled
                    v-model="formData.hospitalNo"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="麻醉方式:">
                  <el-input
                    disabled
                    v-model="formData.operationMethodName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年 龄：">
                  <el-input
                    disabled
                    v-model="formData.patientAge"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="手术日期：">
                  <el-input
                    disabled
                    v-model="formData.operationDate"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="主 刀:">
                  <el-input
                    disabled
                    v-model="formData.operatorName"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="手术方式：">
                  <el-input
                    disabled
                    v-model="formData.operationName"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div> -->
        <div class="wenben-content-userinfo">
          <div class="row">
            <div class="col">
              <span class="row-lable">科 别:</span>
              <div class="row-text">
                {{ formData.deptName }}
              </div>
            </div>
            <div class="col">
              <span class="row-lable">患者姓名:</span>
              <div class="row-text">
                {{ formData.patientName }}
              </div>
            </div>
            <div class="col">
              <span class="row-lable">性 别:</span>
              <div class="row-text">
                {{ formData.gender }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <span class="row-lable">住院号:</span>
              <div class="row-text">
                {{ formData.hospitalNo }}
              </div>
            </div>
            <div class="col">
              <span class="row-lable">麻醉方式:</span>
              <div class="row-text">
                {{ formData.operationMethodName }}
              </div>
            </div>
            <div class="col">
              <span class="row-lable">年 龄:</span>
              <div class="row-text">
                {{ formData.patientAge }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-50">
              <span
                class="row-lable"
                style="width:115px"
              >手术日期:</span>
              <div class="row-text">
                {{ formData.operationDate }}
              </div>
            </div>
            <div class="col-50">
              <span class="row-lable">主 刀:</span>
              <div class="row-text">
                {{ formData.operatorName }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-70">
              <span
                class="row-lable"
                style="width:105px"
              >手术方式:</span>
              <div class="row-text">
                {{ formData.operationName }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wenben-content-context">
        <div class="before-anesthesia">
          <div class="title">
            麻醉实施前
          </div>
          <div class="info-isTrue">
            <div class="info-one">
              <span class="info-left padl5">患者姓名,性别,年龄正确：</span>
              <span class="info-right-one">
                <InfoList
                  :myselect="anesBeforeCheck.isSelect0"
                  title=""
                />
                <!-- <span>是</span>
                <IsSelect :myselect="anesBeforeCheck.isSelect0" />
                <span>否</span>
                <IsSelect :myselect="!anesBeforeCheck.isSelect0" /> -->
              </span>
            </div>
            <InfoList
              :myselect="anesBeforeCheck.isSelect1"
              title="手术方式确认："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect2"
              title="手术部位与标识正确："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect3"
              title="手术知情同意书："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect4"
              title="麻醉知情同意书："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect5"
              title="麻醉设备安全检查完成："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect6"
              title="皮肤是否完整："
            />
            <div class="info-pifu">
              <div class="pifu-buwei">
                <span>部位</span>
                <div class="text">
                  {{ anesBeforeCheck.pifu_buwei }}
                </div>
              </div>
              <div class="pifu-chengdu">
                <span>程度</span>
                <div class="text">
                  {{ anesBeforeCheck.pifu_chengdu }}
                </div>
              </div>
            </div>
            <InfoList
              :myselect="anesBeforeCheck.isSelect7"
              title="术野皮肤准备正确："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect8"
              title="静脉通道建立完成:"
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect9"
              title="患者是否有过敏史："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect10"
              title="抗菌药物皮试结果："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect11"
              title="术前备血："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect12"
              title="影像学资料："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect13"
              title="假体："
            />
            <InfoList
              :myselect="anesBeforeCheck.isSelect14"
              title="体内植入物："
            />
          </div>
          <div class="qita">
            <span>其他：</span>
            <div class="text">
              {{ anesBeforeCheck.qita }}
            </div>
          </div>
          <div class="qianming">
            <div class="qianming-list">
              <span>麻醉医师签名：</span>
              <div class="text imgbox">
                <img
                  :src="anesBeforeCheck.anesBeforeAnesDoc"
                  alt=""
                >
              </div>
            </div>
            <div class="qianming-list">
              <span>手术医师签名：</span>
              <div class="text imgbox">
                <img
                  :src="anesBeforeCheck.anesBeforeOperDoc"
                  alt=""
                >
              </div>
            </div>
            <div class="qianming-list">
              <span>手术护士签名：</span>
              <div class="text imgbox">
                <img
                  :src="anesBeforeCheck.anesBeforeNurse"
                  alt=""
                >
              </div>
            </div>
            <div class="mgt5">
              <span>麻醉前核对时间：</span>
              <div>{{ anesBeforeCheck.anesBeforeChkTime }}</div>
            </div>
          </div>
        </div>
        <div class="before-surgery">
          <div class="title">
            手术开始前
          </div>
          <div class="info-isTrue">
            <div class="info-one">
              <span class="info-left padl5">患者姓名,性别,年龄正确：</span>
              <span class="info-right-one">
                <InfoList
                  :myselect="opeeBeforeCheck.isSelect0"
                  title=""
                />
                <!-- <span>是</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect0" />
                <span>否</span>
                <IsSelect :myselect="!opeeBeforeCheck.isSelect0" />
              </span> -->
              </span>
            </div>
            <InfoList
              :myselect="opeeBeforeCheck.isSelect1"
              title="手术方式确认："
            />
            <InfoList
              :myselect="opeeBeforeCheck.isSelect2"
              title="手术部位与标识正确："
            />
            <div class="info-one">
              <span class="info-left padl3">手术,麻醉风险预警：</span>
              <span class="info-right-one" />
            </div>
            <div class="info-one">
              <span class="info-left padl3">手术医师陈述：</span>
              <span class="info-right-one">
                <span class="info-left padl3">预计手术时间</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect3_1" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">预计失血量</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect3_2" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">手术关注点</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect3_3" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">其它</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect3_4" />
              </span>
            </div>
            <div class="info-one">
              <span class="info-left padl3">麻醉医师陈述：</span>
              <span class="info-right-one">
                <span class="info-left padl3">麻醉关注点</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect4_1" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">其它</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect4_2" />
              </span>
            </div>
            <div class="info-one padb10">
              <span class="info-left padl3">手术护士陈述：</span>
              <span class="info-right-one">
                <span class="info-left padl3">物品灭菌合格</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect5_1" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">仪器设备、植入物</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect5_2" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">术前术中特殊用药情况</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect5_3" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">其他</span>
                <IsSelect :myselect="opeeBeforeCheck.isSelect5_4" />
              </span>
            </div>
            <InfoList
              :myselect="opeeBeforeCheck.isSelect6"
              title="是否需要相关影像资料："
            />
          </div>
          <div class="qita">
            <span>其他：</span>
            <div class="text">
              {{ opeeBeforeCheck.qita }}
            </div>
          </div>
          <div class="qianming">
            <div class="qianming-list">
              <span>麻醉医师签名：</span>
              <div class="text imgbox">
                <img
                  :src="opeeBeforeCheck.beforeOperAnesDoctorTwo"
                  alt=""
                >
              </div>
            </div>
            <div class="qianming-list">
              <span>手术医师签名：</span>
              <div class="text imgbox">
                <img
                  :src="opeeBeforeCheck.beforeOperDocTwo"
                  alt=""
                >
              </div>
            </div>
            <div class="qianming-list">
              <span>手术护士签名：</span>
              <div class="text imgbox">
                <img
                  :src="opeeBeforeCheck.beforeOperNurse"
                  alt=""
                >
              </div>
            </div>
            <div class="mgt5">
              <span>手术开始前时间：</span>
              <div>
                {{ opeeBeforeCheck.beforeOperChkTime }}
              </div>
            </div>
          </div>
        </div>
        <div class="before-leaveroom">
          <div class="title">
            患者离开手术室前
          </div>
          <div class="info-isTrue">
            <div class="info-one">
              <span class="info-left padl5">患者姓名,性别,年龄正确：</span>
              <span class="info-right-one">
                <InfoList
                  :myselect="beforeLeaveRoomCheck.isSelect0"
                  title=""
                />
                <!-- <span>是</span>
                <IsSelect :myselect="beforeLeaveRoomCheck.isSelect0" />
                <span>否</span>
                <IsSelect :myselect="!beforeLeaveRoomCheck.isSelect0" />
              </span> -->
              </span>
            </div>
            <InfoList
              :myselect="beforeLeaveRoomCheck.isSelect1"
              title="实际手术方式确认："
            />
            <div class="info-one">
              <span class="info-left padl5">手术用药,输血,冰冻报告的检查正确：</span>
              <span class="info-right-one">
                <InfoList
                  :myselect="beforeLeaveRoomCheck.isSelect2"
                  title=""
                />
                <!-- <span>是</span>
                <IsSelect :myselect="beforeLeaveRoomCheck.isSelect2" />
                <span>否</span>
                <IsSelect :myselect="!beforeLeaveRoomCheck.isSelect2" /> -->
              </span>
            </div>
            <InfoList
              :myselect="beforeLeaveRoomCheck.isSelect3"
              title="病理标本："
            />
            <InfoList
              :myselect="beforeLeaveRoomCheck.isSelect4"
              title="病理标本号核对正确："
            />
            <InfoList
              :myselect="beforeLeaveRoomCheck.isSelect5"
              title="手术用物清点正确："
            />
            <InfoList
              :myselect="beforeLeaveRoomCheck.isSelect6"
              title="皮肤是否完整："
            />
            <div class="info-pifu">
              <div class="pifu-buwei">
                <span>部位</span>
                <div class="text">
                  {{ beforeLeaveRoomCheck.pifu_buwei }}
                </div>
              </div>
              <div class="pifu-chengdu">
                <span>程度</span>
                <div class="text">
                  {{ beforeLeaveRoomCheck.pifu_chengdu }}
                </div>
              </div>
            </div>
            <div class="info-one padb10">
              <span class="info-left padl3 ziti">各种管路：</span>
              <span class="info-right-one">
                <span class="info-left padl3">静脉通路</span>
                <IsSelect :myselect="beforeLeaveRoomCheck.isSelect7_1" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">动脉通路</span>
                <IsSelect :myselect="beforeLeaveRoomCheck.isSelect7_2" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">气管插管</span>
                <IsSelect :myselect="beforeLeaveRoomCheck.isSelect7_3" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">伤口引流</span>
                <IsSelect :myselect="beforeLeaveRoomCheck.isSelect7_4" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">胃管</span>
                <IsSelect :myselect="beforeLeaveRoomCheck.isSelect7_5" />
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">尿管</span>
                <IsSelect :myselect="beforeLeaveRoomCheck.isSelect7_6" />
              </span>
              <span class="info-right-one guanluqita">
                <div class="info-left padl3">其他：</div>
                <span class="zidingyi" />
                <div>
                  <img
                    src="./../../../assets/isFalse.png"
                    alt=""
                  >
                </div>
              </span>
            </div>
            <div class="info-one padb10">
              <span
                style="width:100%"
                class="info-left padl3 ziti"
              >患者去向：</span>
              <div class="info-content">
                <div class="padb10">
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">PACU</span>
                    <IsSelect :myselect="beforeLeaveRoomCheck.isSelect8_1" />
                  </span>
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">病房</span>
                    <IsSelect :myselect="beforeLeaveRoomCheck.isSelect8_2" />
                  </span>
                </div>
                <div>
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">ICU病房</span>
                    <IsSelect :myselect="beforeLeaveRoomCheck.isSelect8_3" />
                  </span>
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">急诊</span>
                    <IsSelect :myselect="beforeLeaveRoomCheck.isSelect8_4" />
                  </span>
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">离院</span>
                    <IsSelect :myselect="beforeLeaveRoomCheck.isSelect8_5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="qita">
            <span>其他：</span>
            <div class="text">
              {{ beforeLeaveRoomCheck.qita }}
            </div>
          </div>
          <div class="qianming">
            <div class="qianming-list">
              <span>麻醉医师签名：</span>
              <div class="text imgbox">
                <img
                  :src="beforeLeaveRoomCheck.leaveBeforeAnesDoc"
                  alt=""
                >
              </div>
            </div>
            <div class="qianming-list">
              <span>手术医师签名：</span>
              <div class="text imgbox">
                <img
                  :src="beforeLeaveRoomCheck.leaveBeforeOperDoc"
                  alt=""
                >
              </div>
            </div>
            <div class="qianming-list">
              <span>手术护士签名：</span>
              <div class="text imgbox">
                <img
                  :src="beforeLeaveRoomCheck.leaveBeforeOperNurse"
                  alt=""
                >
              </div>
            </div>
            <div class="mgt5">
              <span>离开手术室前时间：</span>
              <div>{{ beforeLeaveRoomCheck.leaveBeforeChkTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {reqSecurityCheck} from '@/api/NursingDocumentApi/security-check.js'
import {ipcRenderer} from 'electron'
import Bus from '@/utils/bus.js'
import InfoList from './components/info-list'
import IsSelect from './components/isSelect'
export default {
  name: 'SecurityCheck',
  data () {
    return {
      htmlTitle: '安全核查记录单',
      formData: {
        deptName: '',
        patientName: '',
        gender: '',
        hospitalNo: '',
        operationMethodName: ''
      },
      anesBeforeCheckTable: [],
      anesBeforeCheck: {
        isSelect0: '3',
        isSelect1: '3',
        isSelect2: '3',
        isSelect3: '3',
        isSelect4: '3',
        isSelect5: '3',
        isSelect6: '3',
        pifu_buwei: '',
        pifu_chengdu: '',
        isSelect7: '3',
        isSelect8: '3',
        isSelect9: '3',
        isSelect10: '3',
        isSelect11: '3',
        isSelect12: '3',
        isSelect13: '3',
        isSelect14: '3',
        qita: '',
        anesBeforeAnesDoc: '', // 麻醉实施前 麻醉医师签名
        anesBeforeNurse: '', // 麻醉实施前 手术护士签名
        anesBeforeOperDoc: '', // 麻醉实施前 手术医师签名
        anesBeforeChkTime: '' // 麻醉实施前 时间
      },
      opeeBeforeCheckTable: [], // 手术开始前
      opeeBeforeCheck: {
        beforeOperAnesDoctorTwo: '',
        beforeOperDocTwo: '',
        beforeOperChkTime: '',
        beforeOperNurse: '',
        isSelect0: '3',
        isSelect1: '3',
        isSelect2: '3',
        isSelect3_1: false,
        isSelect3_2: false,
        isSelect3_3: false,
        isSelect3_4: false,
        isSelect4_1: false,
        isSelect4_2: false,
        isSelect5_1: false,
        isSelect5_2: false,
        isSelect5_3: false,
        isSelect5_4: false,
        isSelect6: '3',
        qita: ''
      },
      beforeLeaveRoomCheckTable: [], // 患者离开后
      beforeLeaveRoomCheck: {
        leaveBeforeAnesDoc: '',
        leaveBeforeOperDoc: '',
        leaveBeforeOperNurse: '',
        leaveBeforeChkTime: '',
        isSelect0: '3',
        isSelect1: '3',
        isSelect2: '3',
        isSelect3: '3',
        isSelect4: '3',
        isSelect5: '3',
        isSelect6: '3',
        pifu_buwei: '',
        pifu_chengdu: '',
        isSelect7_1: false,
        isSelect7_2: false,
        isSelect7_3: false,
        isSelect7_4: false,
        isSelect7_5: false,
        isSelect7_6: false,
        qita: ''
      }
    }
  },
  mounted () {
    this.searchData()
    Bus.$on('clickShuaXinSecurity', res => {
      if (res === '1') {
        this.searchData()
      } else if (res === '2') {
        this.dayin()
      } else if (res === '3') {
        this.utilsDebounce(() => { this.getPdf('security-check') }, 1000)
      }
    })
  },
  methods: {
    dayin () {
      this.utilsDebounce(() => { this.printCurrent() }, 1000)
    },
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('security-check').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      ipcRenderer.send('printChannel', printHtml, 'security-check.css', options)
    },
    // 查询数据
    searchData () {
      let obj = {
        cureNo: this.$store.state['nursing-document-list'].cureNo,
        hospitalNo: this.$store.state['nursing-document-list'].hospitalNo
      }
      this.$store.dispatch('reqSecurityCheckTable', obj).then(res => {
        if (res.status === 200 && res.data.code === 200) {
          if (res.data.msg === '暂无承载数据') {
            this.openToast('warning', '暂无数据')
            return false
          }
          let wenshuData = res.data.data
          console.log(wenshuData)
          // 顶部form表单
          this.formData.deptName = wenshuData.deptName
          this.formData.patientName = wenshuData.patientName
          this.formData.gender = wenshuData.gender
          this.formData.hospitalNo = wenshuData.hospitalNo
          this.formData.operationMethodName = wenshuData.operationMethodName
          this.formData.patientAge = wenshuData.patientAge
          this.formData.operationDate = wenshuData.operationDate
          this.formData.operatorName = wenshuData.operatorName
          this.formData.operationName = wenshuData.operationName

          // 麻醉实施前json
          this.anesBeforeCheck.anesBeforeAnesDoc = wenshuData.anesBeforeAnesDoc
          this.anesBeforeCheck.anesBeforeNurse = wenshuData.anesBeforeNurse
          this.anesBeforeCheck.anesBeforeOperDoc = wenshuData.anesBeforeOperDoc
          this.anesBeforeCheck.anesBeforeChkTime = wenshuData.anesBeforeChkTime
          this.anesBeforeCheckTable = wenshuData.anesBeforeCheck
          if (!this.IsEmpty(wenshuData.anesBeforeCheck)) {
            this.anesBeforeCheck.isSelect0 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[0].value)
            this.anesBeforeCheck.isSelect1 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[1].value)
            this.anesBeforeCheck.isSelect2 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[2].value)
            this.anesBeforeCheck.isSelect3 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[3].value)
            this.anesBeforeCheck.isSelect4 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[4].value)
            this.anesBeforeCheck.isSelect5 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[5].value)
            this.anesBeforeCheck.isSelect6 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[6].value)
            this.anesBeforeCheck.pifu_buwei = this.anesBeforeCheckTable[6].items[0].value
            this.anesBeforeCheck.pifu_chengdu = this.anesBeforeCheckTable[6].items[1].value
            this.anesBeforeCheck.isSelect7 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[7].value)
            this.anesBeforeCheck.isSelect8 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[8].value)
            this.anesBeforeCheck.isSelect9 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[9].value)
            this.anesBeforeCheck.isSelect10 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[10].value)
            this.anesBeforeCheck.isSelect11 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[11].value)
            this.anesBeforeCheck.isSelect12 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[12].value)
            this.anesBeforeCheck.isSelect13 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[13].value)
            this.anesBeforeCheck.isSelect14 = this.changeIsTrueOrFalse(this.anesBeforeCheckTable[14].value)
            this.anesBeforeCheck.qita = this.anesBeforeCheckTable[15].value
          }

          // 手术开始前检查
          this.opeeBeforeCheck.beforeOperAnesDoctorTwo = wenshuData.beforeOperAnesDoctorTwo
          this.opeeBeforeCheck.beforeOperDocTwo = wenshuData.beforeOperDocTwo
          this.opeeBeforeCheck.beforeOperNurse = wenshuData.beforeOperNurse
          this.opeeBeforeCheck.beforeOperChkTime = wenshuData.beforeOperChkTime
          this.opeeBeforeCheckTable = wenshuData.opeeBeforeCheck
          if (!this.IsEmpty(wenshuData.opeeBeforeCheck)) {
            this.opeeBeforeCheck.isSelect0 = this.changeIsTrueOrFalse(this.opeeBeforeCheckTable[0].value)
            this.opeeBeforeCheck.isSelect1 = this.changeIsTrueOrFalse(this.opeeBeforeCheckTable[1].value)
            this.opeeBeforeCheck.isSelect2 = this.changeIsTrueOrFalse(this.opeeBeforeCheckTable[2].value)

            if (this.opeeBeforeCheckTable[3].value.includes('|')) {
              let select3Arr = this.opeeBeforeCheckTable[3].value.split('|')
              select3Arr.forEach(item => {
                if (item === '预计手术时间') {
                  this.opeeBeforeCheck.isSelect3_1 = true
                } else if (item === '预计失血量') {
                  this.opeeBeforeCheck.isSelect3_2 = true
                } else if (item === '手术关注点') {
                  this.opeeBeforeCheck.isSelect3_3 = true
                } else if (item === '其它') {
                  this.opeeBeforeCheck.isSelect3_4 = true
                }
              })
            } else if (!this.IsEmpty(this.opeeBeforeCheckTable[3].value)) {
              let str = this.opeeBeforeCheckTable[3].value
              if (str === '预计手术时间') {
                this.opeeBeforeCheck.isSelect3_1 = true
              } else if (str === '预计失血量') {
                this.opeeBeforeCheck.isSelect3_2 = true
              } else if (str === '手术关注点') {
                this.opeeBeforeCheck.isSelect3_3 = true
              } else if (str === '其它') {
                this.opeeBeforeCheck.isSelect3_4 = true
              }
            }
            if (this.opeeBeforeCheckTable[4].value.includes('|')) {
              let select4Arr = this.opeeBeforeCheckTable[4].value.split('|')
              select4Arr.forEach(item => {
                if (item === '麻醉关注点') {
                  this.opeeBeforeCheck.isSelect4_1 = true
                } else if (item === '其它') {
                  this.opeeBeforeCheck.isSelect4_2 = true
                }
              })
            } else if (!this.IsEmpty(this.opeeBeforeCheckTable[4].value)) {
              let str = this.opeeBeforeCheckTable[4].value
              if (str === '麻醉关注点') {
                this.opeeBeforeCheck.isSelect4_1 = true
              } else if (str === '其它') {
                this.opeeBeforeCheck.isSelect4_2 = true
              }
            }
            if (this.opeeBeforeCheckTable[5].value.includes('|')) {
              let select5Arr = this.opeeBeforeCheckTable[5].value.split('|')
              select5Arr.forEach(item => {
                if (item === '物品灭菌合格') {
                  this.opeeBeforeCheck.isSelect5_1 = true
                } else if (item === '仪器设备、植入物') {
                  this.opeeBeforeCheck.isSelect5_2 = true
                } else if (item === '术前术中特殊用药情况') {
                  this.opeeBeforeCheck.isSelect5_3 = true
                } else if (item === '其它') {
                  this.opeeBeforeCheck.isSelect5_4 = true
                }
              })
            } else if (!this.IsEmpty(this.opeeBeforeCheckTable[5].value)) {
              let str = this.opeeBeforeCheckTable[5].value
              if (str === '物品灭菌合格') {
                this.opeeBeforeCheck.isSelect5_1 = true
              } else if (str === '仪器设备、植入物') {
                this.opeeBeforeCheck.isSelect5_2 = true
              } else if (str === '术前术中特殊用药情况') {
                this.opeeBeforeCheck.isSelect5_3 = true
              } else if (str === '其它') {
                this.opeeBeforeCheck.isSelect5_4 = true
              }
            }
            this.opeeBeforeCheck.isSelect6 = this.changeIsTrueOrFalse(this.opeeBeforeCheckTable[6].value)
            this.opeeBeforeCheck.qita = this.opeeBeforeCheckTable[7].value
          }

          // 患者离开前
          this.beforeLeaveRoomCheck.leaveBeforeAnesDoc = wenshuData.leaveBeforeAnesDoc
          this.beforeLeaveRoomCheck.leaveBeforeOperDoc = wenshuData.leaveBeforeOperDoc
          this.beforeLeaveRoomCheck.leaveBeforeOperNurse = wenshuData.leaveBeforeOperNurse
          this.beforeLeaveRoomCheck.leaveBeforeChkTime = wenshuData.leaveBeforeChkTime
          this.beforeLeaveRoomCheckTable = wenshuData.beforeLeaveRoomCheck
          if (!this.IsEmpty(wenshuData.beforeLeaveRoomCheck)) {
            this.beforeLeaveRoomCheck.isSelect0 = this.changeIsTrueOrFalse(this.beforeLeaveRoomCheckTable[0].value)
            this.beforeLeaveRoomCheck.isSelect1 = this.changeIsTrueOrFalse(this.beforeLeaveRoomCheckTable[1].value)
            this.beforeLeaveRoomCheck.isSelect2 = this.changeIsTrueOrFalse(this.beforeLeaveRoomCheckTable[2].value)
            this.beforeLeaveRoomCheck.isSelect3 = this.changeIsTrueOrFalse(this.beforeLeaveRoomCheckTable[3].value)
            this.beforeLeaveRoomCheck.isSelect4 = this.changeIsTrueOrFalse(this.beforeLeaveRoomCheckTable[4].value)
            this.beforeLeaveRoomCheck.isSelect5 = this.changeIsTrueOrFalse(this.beforeLeaveRoomCheckTable[5].value)
            this.beforeLeaveRoomCheck.isSelect6 = this.changeIsTrueOrFalse(this.beforeLeaveRoomCheckTable[6].value)

            if (this.beforeLeaveRoomCheckTable[7].value.includes('|')) {
              let select7Arr = this.beforeLeaveRoomCheckTable[7].value.split('|')
              select7Arr.forEach(item => {
                if (item === '静脉通路') {
                  this.beforeLeaveRoomCheck.isSelect7_1 = true
                } else if (item === '动脉通路') {
                  this.beforeLeaveRoomCheck.isSelect7_2 = true
                } else if (item === '气管插管') {
                  this.beforeLeaveRoomCheck.isSelect7_3 = true
                } else if (item === '伤口引流') {
                  this.beforeLeaveRoomCheck.isSelect7_4 = true
                } else if (item === '胃管') {
                  this.beforeLeaveRoomCheck.isSelect7_5 = true
                } else if (item === '尿管') {
                  this.beforeLeaveRoomCheck.isSelect7_6 = true
                }
              })
            } else if (!this.IsEmpty(this.beforeLeaveRoomCheckTable[7].value)) {
              let str = this.beforeLeaveRoomCheckTable[7].value
              if (str === '静脉通路') {
                this.beforeLeaveRoomCheck.isSelect7_1 = true
              } else if (str === '动脉通路') {
                this.beforeLeaveRoomCheck.isSelect7_2 = true
              } else if (str === '气管插管') {
                this.beforeLeaveRoomCheck.isSelect7_3 = true
              } else if (str === '伤口引流') {
                this.beforeLeaveRoomCheck.isSelect7_4 = true
              } else if (str === '胃管') {
                this.beforeLeaveRoomCheck.isSelect7_5 = true
              } else if (str === '尿管') {
                this.beforeLeaveRoomCheck.isSelect7_6 = true
              }
            }
            if (this.beforeLeaveRoomCheckTable[8].value.includes('|')) {
              let select8Arr = this.beforeLeaveRoomCheckTable[8].value.split('|')
              select8Arr.forEach(item => {
                if (item === '恢复室') {
                  this.beforeLeaveRoomCheck.isSelect8_1 = true
                } else if (item === '病房') {
                  this.beforeLeaveRoomCheck.isSelect8_2 = true
                } else if (item === 'ICU病房') {
                  this.beforeLeaveRoomCheck.isSelect8_3 = true
                } else if (item === '急诊') {
                  this.beforeLeaveRoomCheck.isSelect8_4 = true
                } else if (item === '离院') {
                  this.beforeLeaveRoomCheck.isSelect8_5 = true
                }
              })
            } else if (!this.IsEmpty(this.beforeLeaveRoomCheckTable[8].value)) {
              let str = this.beforeLeaveRoomCheckTable[8].value
              if (str === '恢复室') {
                this.beforeLeaveRoomCheck.isSelect8_1 = true
              } else if (str === '病房') {
                this.beforeLeaveRoomCheck.isSelect8_2 = true
              } else if (str === 'ICU病房') {
                this.beforeLeaveRoomCheck.isSelect8_3 = true
              } else if (str === '急诊') {
                this.beforeLeaveRoomCheck.isSelect8_4 = true
              } else if (str === '离院') {
                this.beforeLeaveRoomCheck.isSelect8_5 = true
              }
            }
            this.beforeLeaveRoomCheck.pifu_buwei = this.beforeLeaveRoomCheckTable[6].items[0].value
            this.beforeLeaveRoomCheck.pifu_chengdu = this.beforeLeaveRoomCheckTable[6].items[1].value
            this.beforeLeaveRoomCheck.qita = this.beforeLeaveRoomCheckTable[9].value
          }
        }
      })
    },
    // 对汉字是否进行转换
    changeIsTrueOrFalse (str) {
      if (str === '是' || str === '有') {
        return '1'
      } else if (str === '否' || str === '无') {
        return '2'
      } else {
        return '3'
      }
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
  components: {
    InfoList,
    IsSelect
  }
}
</script>

<style scoped lang="scss">
@import './../../../styles/wenshu.scss';
.content-wenben-container {
  width: 824px;
  height: 920px;
  min-width: 824px;
  min-height: 920px;
  background-color: #fff;
  padding: 10px 60px 0 60px;
  .wenben-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    .wenben-content-title {
      text-align: center;
      border-bottom: 1px solid #000;
      font-weight: 600;
    }
    .wenben-content-info {
      display: flex;
      flex-direction: column;
      .info-content-title {
        text-align: center;
        letter-spacing: 14px;
        font-weight: 600;
        text-indent: 14px;
        font-size: 16px;
      }
      .info-content-form {
        padding-left: 15px;
      }
    }
    .wenben-content-context {
      margin-top: 5px;
      border: 1px solid #000;
      display: flex;
      .before-anesthesia {
        border-right: 1px solid #000;
        flex: 1;
        .info-isTrue {
          height: 480px;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          .info-one {
            display: flex;
            flex-wrap: wrap;
          }
          .info-list {
            display: flex;
            justify-content: space-between;
            .info-left {
              flex: 1;
              padding-left: 3px;
            }
            .info-right {
              padding: 1px;
            }
          }
          .info-pifu {
            margin-top: 20px;
            padding-left: 3px;
            display: flex;
            .pifu-buwei {
              display: flex;
              flex: 1;
              .text {
                height: 100%;
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
            .pifu-chengdu {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
          }
        }
      }
      .before-surgery {
        border-right: 1px solid #000;
        flex: 1;
        .info-isTrue {
          height: 480px;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          .info-one {
            display: flex;
            flex-wrap: wrap;
          }
          .info-list {
            display: flex;
            justify-content: space-between;
            .info-left {
              flex: 1;
              padding-left: 3px;
            }
            .info-right {
              padding: 1px;
            }
          }
          .info-pifu {
            margin-top: 20px;
            padding-left: 3px;
            display: flex;
            .pifu-buwei {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
            .pifu-chengdu {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
          }
        }
      }
      .before-leaveroom {
        flex: 1;
        .info-isTrue {
          height: 480px;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          .info-one {
            display: flex;
            flex-wrap: wrap;
          }
          .info-list {
            display: flex;
            justify-content: space-between;
            .info-left {
              flex: 1;
              padding-left: 3px;
            }
            .info-right {
              padding: 1px;
            }
          }
          .info-pifu {
            margin-top: 20px;
            padding-left: 3px;
            display: flex;
            .pifu-buwei {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
            .pifu-chengdu {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}
.info-right-one {
  width: 100%;
  text-align: right;
  padding: 1px;
}
.padl5 {
  padding-left: 5px;
}
.padl3 {
  padding-left: 3px;
}
.padb10 {
  padding-bottom: 10px;
}
.title {
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid #000;
}
.mgl10 {
  margin-left: 10px;
}
.qita {
  margin-bottom: 10px;
  display: flex;
  font-size: 12px;
  .text {
    padding-left: 5px;
    border-bottom: 1px solid #000;
    flex: 1;
  }
}
.imgbox {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.mgt5 {
  margin-top: 5px;
}
.qianming {
  border-top: 1px solid #000;
  padding-bottom: 20px;
  padding-top: 10px;
  font-size: 12px;
  div {
    display: flex;
    align-items: center;
    .text {
      padding-left: 5px;
      border-bottom: 1px solid #000;
      flex: 1;
    }
  }
  .qianming-list {
    padding: 0 5px;
    height: 50px;
  }
}
.guanluqita {
  display: flex;
  justify-content: flex-end;
}
.zidingyi {
  width: 120px;
  border-bottom: 1px solid #000;
  text-align: left;
  padding: 0 5px;
}
.ziti {
  font-size: 16px;
  font-weight: 600;
}

.row {
  width: 100%;
  display: flex;
  height: 28px;
  padding-left: 10px;
}
.col {
  display: flex;
  font-size: 14px;
  width: 30%;
}
.col-50 {
  display: flex;
  font-size: 14px;
  width: 50%;
}
.col-70 {
  display: flex;
  font-size: 14px;
  width: 70%;
}
.row-lable {
  width: 150px;
  line-height: 28px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.row-text {
  line-height: 28px;
  width: 100%;
  padding: 0 10px;
  height: 25px;
  text-align: center;
  border-bottom: 1px solid;
}
</style>
