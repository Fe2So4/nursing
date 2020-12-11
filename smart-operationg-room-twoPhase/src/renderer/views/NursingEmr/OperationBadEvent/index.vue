<template>
  <div class="record-before">
    <PatientInfo />
    <div class="rb-content">
      <div class="rb-option">
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
      <div class="rb-table">
        <table cellspacing="0">
          <tbody>
            <tr>
              <td
                style="width:150px;"
                class="center"
              >
                上报日期
              </td>
              <td colspan="3">
                {{ recordForm.reportTime }}
              </td>
              <td>上报科室</td>
              <td>{{ recordForm.reportDept }}</td>
              <td>上报人</td>
              <td>{{ recordForm.reportPerson }}</td>
            </tr>
            <tr>
              <td class="center">
                事件类型（请在<el-checkbox />中用√选择，可多选）
              </td>
              <td colspan="7">
                <div>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="1"
                    >
                      1类，不良治疗：包括给药错误、输血错误、医疗感染爆发、手术身份部位识别错误、体内遗留手术器械、输液输血反应；重复给药；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :label="2"
                      :disabled="recordForm.disabled"
                    >
                      2类，意外事件：包括跌倒、坠床、走失、烫伤、烧伤、自残、自杀、火灾、失窃、咬破体温表、约束不良；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="3"
                    >
                      3类，医患沟通事件：包括医患争吵、身体攻击、打架、暴力行为等；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="4"
                    >
                      4类，饮食、皮肤护理不良事件：包括误吸/窒息、咽入异物、院内压疮、医源性皮肤损伤；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="5"
                    >
                      5类，不良辅助诊查、病人转运事件；含身份识别错误、标本丢失、检查或运送中或后病情突变或出现意外；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="6"
                    >
                      6类，管道护理不良事件；含管道滑脱、病人自拔；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="7"
                    >
                      7类，职业暴露：含针刺伤、割伤；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="8"
                    >
                      8类，公共设施事件：包括医院建筑损毁、病房设施故障、蓄意破坏、有害物质泄露；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="9"
                    >
                      9类，医疗设备器械事件：包括医疗材料故障、仪器故障、器械不符合无菌要求；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="10"
                    >
                      10类，供应室不良事件：包括消毒物品未达要求、热源试验阳性、操作中发现器械包器械物品不符。
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox
                      v-model="recordForm.eventType"
                      :disabled="recordForm.disabled"
                      :label="11"
                    >
                      其他，医护信息传递错误
                    </el-checkbox>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="center">
                发生地点
              </td>
              <td colspan="7">
                <el-checkbox-group
                  v-model="recordForm.place"
                  :disabled="recordForm.disabled"
                >
                  <el-checkbox label="bf">
                    病房
                  </el-checkbox>
                  <el-checkbox label="zls">
                    治疗室
                  </el-checkbox>
                  <el-checkbox label="hys">
                    换药室
                  </el-checkbox>
                  <el-checkbox label="czs">
                    处置室
                  </el-checkbox>
                  <el-checkbox label="zl">
                    走廊
                  </el-checkbox>
                  <el-checkbox label="cs">
                    厕所
                  </el-checkbox>
                  <el-checkbox label="bqw">
                    病区外
                  </el-checkbox>
                  <el-checkbox label="qt">
                    其他：<span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.placeOther"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-checkbox>
                </el-checkbox-group>
              </td>
            </tr>
            <tr>
              <td class="center">
                事件经过
              </td>
              <td colspan="7">
                <div>
                  <p>
                    <span>发生时间：</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.eventCourse.time"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </p>
                  <p>
                    <span>地点：</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.eventCourse.place"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </p>
                  <p>
                    <span>事件：</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.eventCourse.event"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="center">
                紧急处理与患者情况
              </td>
              <td colspan="7">
                <div>
                  <p>
                    <el-checkbox-group
                      v-model="recordForm.emergency.checkList"
                      :disabled="recordForm.disabled"
                    >
                      <el-checkbox label="ljtz">
                        立即通知
                      </el-checkbox>
                      <el-checkbox label="qthlry">
                        其他护理人员
                      </el-checkbox>
                      <el-checkbox label="bfhsz">
                        病房护士长/责任组长
                      </el-checkbox>
                      <el-checkbox label="zbhsz">
                        值班护士长
                      </el-checkbox>
                      <el-checkbox label="hlb">
                        护理部
                      </el-checkbox>
                      <el-checkbox label="ys">
                        医生
                      </el-checkbox>
                      <el-checkbox label="js">
                        家属
                      </el-checkbox>
                      <el-checkbox label="qtry">
                        其他人员
                      </el-checkbox>
                    </el-checkbox-group>
                  </p>
                  <p>
                    <el-checkbox-group
                      v-model="recordForm.emergency.checkList"
                      :disabled="recordForm.disabled"
                    >
                      <el-checkbox label="mqgcsmtz">
                        密切观察生命体征
                      </el-checkbox>
                    </el-checkbox-group>
                  </p>
                  <p>
                    <el-checkbox-group
                      v-model="recordForm.emergency.checkList"
                      :disabled="recordForm.disabled"
                    >
                      <el-checkbox label="ylhlcs">
                        医疗或护理措施
                      </el-checkbox>
                    </el-checkbox-group>
                  </p>
                  <p>
                    <LineInput
                      input-width="600px"
                      :value.sync="recordForm.emergency.patientStatus"
                      :disabled="recordForm.disabled"
                    />
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="center">
                三级审核反馈及签名
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.audit.auditSign"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                护士长签名
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.audit.nurse"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                科护士长签名
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.audit.dNurse"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                护理部签名
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.audit.department"
                  :disabled="recordForm.disabled"
                />
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
      value: '',
      checkList: [],
      recordForm: {
        disabled: false,
        reportTime: '',
        reportPerson: '',
        reportDept: '',
        eventType: [],
        place: [],
        placeOther: '',
        eventCourse: {
          time: '',
          place: '',
          event: ''
        },
        emergency: {
          checkList: [],
          patientStatus: ''
        },
        audit: {
          auditSign: '',
          nurse: '',
          dNurse: '',
          department: ''
        }
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
        url: getRecord + '/' + this.currentPatient.operationId + '/' + 'W4'
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
          protectWritId: 'W4'
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
  .record-before{
    height: 100%;
    .rb-content{
      height: calc(100% - 250px);
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      .rb-option{
        text-align: right;
        padding: 10px 20px;
      }
      .rb-table{
        height: calc(100% - 48px);
        padding:0 20px;
        overflow-y: scroll;
        padding-bottom: 20px;
        table{
          width: 100%;
          // height: 100%;
          border-bottom: 1px solid #E8E8E8;
          border-left: 1px solid #E8E8E8;
          tbody{
            // text-align: center;
            tr{
              td{
                border-top: 1px solid #E8E8E8;
                border-right: 1px solid #E8E8E8;
                color: #444444;
                font-size: 14px;
                height: 40px;
                padding:10px 0 10px 20px;
                line-height:26px;
                &.left{
                  text-align: left;
                  padding-left: 20px;
                }
                &.center{
                  text-align: center;
                  padding-left: unset;
                }
                .right{
                  text-align: right;
                  padding-right: 20px;
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
