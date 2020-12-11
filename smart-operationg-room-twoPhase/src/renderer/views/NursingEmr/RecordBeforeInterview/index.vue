<template>
  <div class="record-before-nursing">
    <PatientInfo />
    <div class="rbn-content">
      <div class="rbn-option">
        <el-button
          type="primary"
          size="mini"
          @click="handleUnlock"
        >
          {{ recordForm.disabled ? '解 锁' : '锁 定' }}
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleSubmit"
        >
          保 存
        </el-button>
      </div>
      <div class="rbn-table">
        <table cellspacing="0">
          <tbody>
            <tr>
              <td
                style="width:138px;"
                class="simple-left"
              >
                一、访视自我介绍
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.introduce"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                style="text-align:left;"
                colspan="2"
              >
                二、手术患者评估
              </td>
            </tr>
            <tr>
              <td>1.意识活动</td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.consciousness.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="清醒">
                    清醒
                  </el-radio>
                  <el-radio label="嗜睡">
                    嗜睡
                  </el-radio>
                  <el-radio label="烦躁">
                    烦躁
                  </el-radio>
                  <el-radio label="昏迷">
                    昏迷
                  </el-radio>
                  <el-radio label="其他">
                    其他
                  </el-radio>
                </el-radio-group>
                <span><LineInput
                  :value.sync="recordForm.consciousness.other"
                  :disabled="recordForm.disabled"
                  input-width="300px"
                /></span>
              </td>
            </tr>
            <tr>
              <td>2.四肢活动</td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.limb.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="正常">
                    正常
                  </el-radio>
                  <el-radio label="障碍">
                    障碍
                  </el-radio>
                </el-radio-group>
                <span>
                  （
                  <span>部位：</span>
                  <span><LineInput
                    :value.sync="recordForm.limb.position"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                  <span>性质：</span>
                  <el-radio-group
                    v-model="recordForm.limb.nature"
                    :disabled="recordForm.disabled"
                  >
                    <el-radio label="瘫痪">
                      瘫痪
                    </el-radio>
                    <el-radio label="畸形">
                      畸形
                    </el-radio>
                    <el-radio label="其他">
                      其他
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value.sync="recordForm.limb.other"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                  ）
                </span>
              </td>
            </tr>
            <tr>
              <td>3.皮肤</td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.skin.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="正常">
                    正常
                  </el-radio>
                  <el-radio label="破损">
                    破损
                  </el-radio>
                </el-radio-group>
                <span>
                  （
                  <span>部位：</span>
                  <span><LineInput
                    :value.sync="recordForm.skin.position"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                  ）
                </span>
              </td>
            </tr>
            <tr>
              <td>4.患者过敏史</td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.allergy.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <span>
                  <span><LineInput
                    :value.sync="recordForm.allergy.description"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                </span>
              </td>
            </tr>
            <tr>
              <td>5.患者手术史</td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.operationHistory.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <span>
                  <span><LineInput
                    :values.sync="recordForm.operationHistory.description"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                </span>
              </td>
            </tr>
            <tr>
              <td>6.传染病或感染情况</td>
              <td class="left">
                <span>乙肝两对半：</span>
                <el-radio-group
                  v-model="recordForm.contagion.hepatitisB"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="阴性">
                    阴性
                  </el-radio>
                  <el-radio label="阳性">
                    阳性
                  </el-radio>
                </el-radio-group>
                <span>HIV：</span>
                <el-radio-group
                  v-model="recordForm.contagion.hiv"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="阴性">
                    阴性
                  </el-radio>
                  <el-radio label="阳性">
                    阳性
                  </el-radio>
                </el-radio-group>
                <span>
                  <span>其他</span>
                  <span><LineInput
                    :value.sync="recordForm.contagion.other"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                </span>
              </td>
            </tr>
            <tr>
              <td>7.金属植入物</td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.implants.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <span>
                  （部位：
                  <LineInput
                    :value.sync="recordForm.implants.position"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  />）
                </span>
              </td>
            </tr>
            <tr>
              <td>8.术前心理</td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.psychology"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="平静、稳定">
                    平静、稳定
                  </el-radio>
                  <el-radio label="开朗">
                    开朗
                  </el-radio>
                  <el-radio label="焦虑">
                    焦虑
                  </el-radio>
                  <el-radio label="恐惧">
                    恐惧
                  </el-radio>
                  <el-radio label="悲哀">
                    悲哀
                  </el-radio>
                  <el-radio label="压抑">
                    压抑
                  </el-radio>
                  <el-radio label="孤独">
                    孤独
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span>
                  <span>访视护士：</span>
                  <span><LineInput
                    :value.sync="recordForm.nurseInterview.nurse"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                </span>
                <span>
                  <span>访视日期：</span>
                  <span><LineInput
                    :value.sync="recordForm.nurseInterview.time"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                术前访视确认：我已接受手术室护士的术前宣教，充分了解手术前的注意事项和有关事宜，并愿意配合手术过程。
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span>
                  <span>患者或家属签名：</span>
                  <span><LineInput
                    :value.sync="recordForm.familyEnsure.family"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                </span>
                <span>
                  <span>访视日期：</span>
                  <span><LineInput
                    :value.sync="recordForm.familyEnsure.time"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LineInput from '@/components/LineInput/index'
import PatientInfo from '@/components/PatientInfoStep/patient-info-step'
import {saveRecord, getRecord} from '@/api/record'
import {mapState} from 'vuex'
import request from '@/utils/request'
export default {
  name: 'RecordBefore',
  data () {
    return {
      radio: '',
      input: '无',
      checkList: [],
      noticeList: ['明天是你的手术日期，请您在手术前6小时禁食禁水，手术后饮食根据医嘱。',
        '术前请用含有抗菌成分的皂液(沐浴露)沐浴，做好皮肤清洁工作。',
        '进手术室前排小便及大便，将手表、首饰、假牙、发卡等取下，贵重物品交给家人保管，以保证您的财产及手术、麻醉的安全。',
        '手术前较窄，尽量睡在床的中间，不要移动，如有不适请及时告知，我们会及时处理。',
        '手术日请勿化妆，尤其是唇膏及指甲油，以免影响医生观察。',
        '预先请换好清洁的病员服装（衣服请反穿，纽扣系在背后，勿穿内衣裤及袜子）。等待手术室接送员来接您。',
        '由于手术室内温度控制在21~25℃，如太热或者太冷，请及时告知。',
        '手术开始前，巡回护士将与您核对病区、床号、姓名，希望您准确回答。麻醉时，麻醉师会根据手术需要实施麻醉，请您配合。',
        '手术前麻醉及手术部位因消毒时要充分暴露，消毒时会有凉意，请您不必担心，同时我们会给您做好保暖工作。',
        '在麻醉后，我们会根据手术需要放置各种体位。可能有些体位会使您感到不适，请及时提出。我们会在手术允许的情况下，尽量为您调整。手术过程中，如您有不适，可向麻醉师或护士提出，以便我们及时处理。',
        '手术后我们会及时护理您的伤口，固定好引流管，并为您保暖。',
        '手术时间较长的，因骶尾骨、足部等部位受压时间过长，会引起发红。希望您能听从病区护士的劝导，定时翻身或采取其他预防受压措施。'
      ],
      recordForm: {
        introduce: '',
        skin: {
          status: '',
          position: ''
        },
        consciousness: {
          status: '',
          other: ''
        },
        limb: {
          status: '',
          position: '',
          nature: '',
          other: ''
        },
        allergy: {
          status: '',
          description: ''
        },
        operationHistory: {
          status: '',
          description: ''
        },
        contagion: {
          hiv: '',
          other: '',
          hepatitisB: ''
        },
        implants: {
          status: '',
          position: ''
        },
        psychology: '',
        nurseInterview: {
          nurse: '',
          time: ''
        },
        familyEnsure: {
          family: '',
          time: ''
        },
        disabled: false
      }
    }
  },
  components: {
    PatientInfo,
    LineInput
  },
  computed: {
    ...mapState('Base', ['currentPatient'])
  },
  created () {
    this.getRecord()
  },
  methods: {
    handleSubmit () {
      this.saveRecord()
    },
    handleUnlock () {
      this.recordForm.disabled = !this.recordForm.disabled
    },
    getRecord () {
      request({
        url: getRecord + '/' + this.currentPatient.operationId + '/' + 'W9'
      }).then(res => {
        if (res.data.data && res.data.data !== '') {
          this.recordForm = JSON.parse(res.data.data.protectContent)
        }
      })
    },
    saveRecord () {
      this.recordForm.disabled = true
      request({
        url: saveRecord,
        method: 'post',
        data: {
          operationId: this.currentPatient.operationId,
          protectContent: JSON.stringify(this.recordForm),
          protectWritId: 'W9'
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '保存成功'})
          this.getRecord()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .record-before-nursing{
    height: 100%;
    .rbn-content{
      height: calc(100% - 250px);
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      padding:0 20px;
      border-radius: 5px;
      .rbn-option{
        text-align: right;
        padding: 10px 0;
      }
      .rbn-table{
        height: calc(100% - 48px);
        // overflow-y: scroll;
        padding-bottom: 20px;
        table{
          width: 100%;
          // height: 100%;
          border-bottom: 1px solid #E8E8E8;
          border-left: 1px solid #E8E8E8;
          tbody{
            text-align: center;
            tr{
              td{
                border-top: 1px solid #E8E8E8;
                border-right: 1px solid #E8E8E8;
                color: #444444;
                font-size: 14px;
                height: 40px;
                &:first-child{
                  text-align: left;
                  padding-left: 10px;
                }
                &.left{
                  text-align: left;
                  padding-left: 20px;
                }
                &.simple-left{
                  text-align: left;
                }
                .el-checkbox-group{
                  display: inline-block;
                }
                .el-icon-success{
                  color: #0BBE4A;
                }
                &:nth-last-child(3){
                  /deep/ .el-radio__label{
                    padding: unset;
                  }
                }
                &:nth-last-child(2){
                  /deep/ .el-radio__label{
                    padding: unset;
                  }
                }
                &:nth-last-child(){

                }
              }
            }
          }
        }
      }
    }
  }
</style>
