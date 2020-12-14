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
          解 锁
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleSubmit"
        >
          保 存
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          同 步
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          提 交
        </el-button>
      </div>
      <div class="rb-table">
        <table cellspacing="0">
          <tbody>
            <tr>
              <td colspan="5">
                术前风险因素评估
              </td>
            </tr>
            <tr>
              <td
                style="width:600px;"
              >
                评分数
              </td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td
                style="width:100px;"
              >
                总分
              </td>
            </tr>
            <tr>
              <td class="left">
                活动度
              </td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.before.activity"
                  :disabled="recordForm.disabled"
                >
                  无受限或轻微受限，可自主活动
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.before.activity"
                  :disabled="recordForm.disabled"
                >
                  非常受限需协助移动有功能性限制
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.before.activity"
                  :disabled="recordForm.disabled"
                >
                  完全受限，需完全依靠他人
                </el-radio>
              </td>
              <td>{{ recordForm.before.activity }}</td>
            </tr>
            <tr>
              <td class="left">
                空腹时间
              </td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.before.emptyTime"
                  :disabled="recordForm.disabled"
                >
                  ≤12h
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.before.emptyTime"
                  :disabled="recordForm.disabled"
                >
                  12h
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.before.emptyTime"
                  :disabled="recordForm.disabled"
                >
                  ≥24h
                </el-radio>
              </td>
              <td>{{ recordForm.before.emptyTime }}</td>
            </tr>
            <tr>
              <td class="left">
                身体质量指数(BMI)
              </td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.before.bmi"
                  :disabled="recordForm.disabled"
                >
                  &lt;30kg/m^2
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.before.bmi"
                  :disabled="recordForm.disabled"
                >
                  30kg/m2-35kg/m2
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.before.bmi"
                  :disabled="recordForm.disabled"
                >
                  &gt;35kg/m2
                </el-radio>
              </td>
              <td>{{ recordForm.before.bmi }}</td>
            </tr>
            <tr>
              <td class="left">
                发生30-180天内的体重降低
              </td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.before.weight"
                  :disabled="recordForm.disabled"
                >
                  ≤7.4%，无改变或不知道
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.before.weight"
                  :disabled="recordForm.disabled"
                >
                  7.5%-9.9%
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.before.weight"
                  :disabled="recordForm.disabled"
                >
                  ≥10%
                </el-radio>
              </td>
              <td>{{ recordForm.before.weight }}</td>
            </tr>
            <tr>
              <td class="left">
                年龄
              </td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.before.age"
                  :disabled="recordForm.disabled"
                >
                  ≤39岁
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.before.age"
                  :disabled="recordForm.disabled"
                >
                  40-59岁
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.before.age"
                  :disabled="recordForm.disabled"
                >
                  ≥60岁
                </el-radio>
              </td>
              <td>{{ recordForm.before.age }}</td>
            </tr>
            <tr>
              <td
                class="left"
                rowspan="7"
              />
              <td
                colspan="3"
                class="left"
              >
                每项不利因素评1分，最低0分，最高6分
              </td>
              <td>
                <!-- <el-checkbox v-model="checkList" /> -->
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                吸烟（30天内）
              </td>
              <td>
                <el-checkbox
                  v-model="recordForm.before.badList"
                  :disabled="recordForm.disabled"
                  :label="1"
                />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                高血压前期或高血压（血压&gt;120/80）
              </td>
              <td>
                <el-checkbox
                  v-model="recordForm.before.badList"
                  :disabled="recordForm.disabled"
                  :label="2"
                />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                血管/肾脏/心血管/周期血管疾病
              </td>
              <td>
                <el-checkbox
                  v-model="recordForm.before.badList"
                  :disabled="recordForm.disabled"
                  :label="3"
                />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                哮喘/肺部/呼吸系统疾病
              </td>
              <td>
                <el-checkbox
                  v-model="recordForm.before.badList"
                  :disabled="recordForm.disabled"
                  :label="4"
                />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                有过压力性损伤病史/目前有压压力性损失
              </td>
              <td>
                <el-checkbox
                  v-model="recordForm.before.badList"
                  :disabled="recordForm.disabled"
                  :label="5"
                />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                糖尿病/胰岛素型糖尿病
              </td>
              <td>
                <el-checkbox
                  v-model="recordForm.before.badList"
                  :disabled="recordForm.disabled"
                  :label="6"
                />
              </td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="right"
              >
                术前部分门罗评分统计：
              </td>
              <td>{{ beforeGrade }}</td>
            </tr>
            <tr>
              <td>5-6=低风险</td>
              <td>7-14=中度风险</td>
              <td>≥15=高风险</td>
              <td>风险程度</td>
              <td>{{ beforeRiskGrade }}</td>
            </tr>
            <tr>
              <td class="left">
                术前风险评估人签字：
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.before.assessSign"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <span>日期：</span>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.before.date1"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <span>时间：</span>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.before.time1"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td>接收者签字：</td>
              <td>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.before.successor"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <span>日期：</span>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.before.date2"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <span>时间：</span>
                <LineInput
                  input-width="150px"
                  :value.sync="recordForm.before.time2"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td colspan="5">
                术中风险因素评分
              </td>
            </tr>
            <tr>
              <td>评分数</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>总分</td>
            </tr>
            <tr>
              <td class="left">
                身体状态/麻醉评分（由临床医生/麻醉医生/病史室提供）
              </td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.intraoperative.healthy"
                  :disabled="recordForm.disabled"
                >
                  健康或轻度系统疾病，无功能性限制
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.intraoperative.healthy"
                  :disabled="recordForm.disabled"
                >
                  中、重度的系统疾病，有功能性限制
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.intraoperative.healthy"
                  :disabled="recordForm.disabled"
                >
                  中、重度的系统疾病，严重功能受限，甚至威胁生命，或麻醉评分&gt;3分
                </el-radio>
              </td>
              <td>{{ recordForm.intraoperative.healthy }}</td>
            </tr>
            <tr>
              <td class="left">
                麻醉类型
              </td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.intraoperative.anaesType"
                  :disabled="recordForm.disabled"
                >
                  监护局麻/局麻
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.intraoperative.anaesType"
                  :disabled="recordForm.disabled"
                >
                  神经阻滞
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.intraoperative.anaesType"
                  :disabled="recordForm.disabled"
                >
                  全麻
                </el-radio>
              </td>
              <td>{{ recordForm.intraoperative.anaesType }}</td>
            </tr>
            <tr>
              <td>体温（根据体温监测提供）</td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.intraoperative.temp"
                  :disabled="recordForm.disabled"
                >
                  36.1*-37.8*体温保持横温
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.intraoperative.temp"
                  :disabled="recordForm.disabled"
                >
                  &lt;36.1*或者&gt;37.8*(体温变化±2*之间)
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.intraoperative.temp"
                  :disabled="recordForm.disabled"
                >
                  &lt;36.1*或者&gt;37.8*(体温变化±2*)
                </el-radio>
              </td>
              <td>{{ recordForm.intraoperative.temp }}</td>
            </tr>
            <tr>
              <td>低血压（根据血压监测提供收缩压）</td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.intraoperative.presure"
                  :disabled="recordForm.disabled"
                >
                  没有或≤10%的血压变化
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.intraoperative.presure"
                  :disabled="recordForm.disabled"
                >
                  11%&lt;血压变化&lt;20%
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.intraoperative.presure"
                  :disabled="recordForm.disabled"
                >
                  血压变化21%-50%/持续性
                </el-radio>
              </td>
              <td>{{ recordForm.intraoperative.presure }}</td>
            </tr>
            <tr>
              <td>潮湿程度（病人皮肤下）</td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.intraoperative.wet"
                  :disabled="recordForm.disabled"
                >
                  保持干燥
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.intraoperative.wet"
                  :disabled="recordForm.disabled"
                >
                  有一些潮湿
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.intraoperative.wet"
                  :disabled="recordForm.disabled"
                >
                  汇聚潮湿
                </el-radio>
              </td>
              <td>{{ recordForm.intraoperative.wet }}</td>
            </tr>
            <tr>
              <td>体位协助物/加温毯/体位改变</td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.intraoperative.position"
                  :disabled="recordForm.disabled"
                >
                  未使用体位协助物/患者体表覆盖加温毯
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.intraoperative.position"
                  :disabled="recordForm.disabled"
                >
                  使用体位协助物/加温毯垫于患者身下
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.intraoperative.position"
                  :disabled="recordForm.disabled"
                >
                  剪切力/加压力/改变体位
                </el-radio>
              </td>
              <td>{{ recordForm.intraoperative.position }}</td>
            </tr>
            <tr>
              <td>体位（根据手术）</td>
              <td class="left">
                <el-radio
                  :label="1"
                  v-model="recordForm.intraoperative.posture"
                  :disabled="recordForm.disabled"
                >
                  膀胱结石位
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="2"
                  v-model="recordForm.intraoperative.posture"
                  :disabled="recordForm.disabled"
                >
                  侧卧位
                </el-radio>
              </td>
              <td class="left">
                <el-radio
                  :label="3"
                  v-model="recordForm.intraoperative.posture"
                  :disabled="recordForm.disabled"
                >
                  平卧位/俯卧位
                </el-radio>
              </td>
              <td>{{ recordForm.intraoperative.posture }}</td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="right"
              >
                术中部分门罗评分总计：
              </td>
              <td>{{ intraoperativeGrade }}</td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="right"
              >
                术前部分门罗评分总计：
              </td>
              <td>{{ beforeGrade }}</td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="right"
              >
                目前（术前部分+术中部分）门罗评分总计：
              </td>
              <td>{{ beforeGrade + intraoperativeGrade }}</td>
            </tr>
            <tr>
              <td>
                13=低风险
              </td>
              <td>14-24=中度风险</td>
              <td>
                ≥25=高风险
              </td>
              <td class="right">
                风险程度：
              </td>
              <td>
                {{ allRiskGrade }}
              </td>
            </tr>
            <tr>
              <td class="left">
                手术风险评估人签字：
              </td>
              <td>
                <LineInput
                  :value.sync="recordForm.intraoperative.assessSign"
                  input-width="150px"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <span>日期：</span>
                <LineInput
                  :value.sync="recordForm.intraoperative.date1"
                  input-width="150px"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <span>时间：</span>
                <LineInput
                  :value.sync="recordForm.intraoperative.time1"
                  input-width="150px"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td class="left">
                接收者签字：
              </td>
              <td>
                <LineInput
                  :value.sync="recordForm.intraoperative.successor"
                  input-width="150px"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <span>日期：</span>
                <LineInput
                  :value.sync="recordForm.intraoperative.date2"
                  input-width="150px"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <span>时间：</span>
                <LineInput
                  :value.sync="recordForm.intraoperative.time2"
                  input-width="150px"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
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
      recordForm: {
        disabled: false,
        before: {
          activity: '',
          emptyTime: '',
          bmi: '',
          weight: '',
          age: '',
          badList: [],
          assessSign: '',
          date1: '',
          time1: '',
          successor: '',
          date2: '',
          time2: ''
        },
        intraoperative: {
          healthy: '',
          anaesType: '',
          temp: '',
          presure: '',
          wet: '',
          position: '',
          posture: '',
          assessSign: '',
          successor: '',
          time1: '',
          date1: '',
          time2: '',
          date2: ''
        }
      }
    }
  },
  components: {
    PatientInfo,
    LineInput
  },
  computed: {
    ...mapState('Base', ['currentPatient']),
    beforeGrade () {
      let grade = 0
      grade = parseInt(this.recordForm.before.activity) +
      parseInt(this.recordForm.before.emptyTime) +
      parseInt(this.recordForm.before.bmi) +
      parseInt(this.recordForm.before.weight) +
      parseInt(this.recordForm.before.age) +
      this.recordForm.before.badList.length
      return grade
    },
    intraoperativeGrade () {
      return 3
    },
    beforeRiskGrade () {
      if (this.beforeGrade <= 6) {
        return '低风险'
      } else if (this.beforeGrade <= 14) {
        return '中度风险'
      } else {
        return '高风险'
      }
    },
    allRiskGrade () {
      let grade = parseInt(this.beforeGrade) + parseInt(this.intraoperativeGrade)
      if (grade <= 13) {
        return '低风险'
      } else if (grade <= 24) {
        return '中度风险'
      } else {
        return '高风险'
      }
    }
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
        url: getRecord + '/' + this.currentPatient.operationId + '/' + 'W1'
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
          protectWritId: 'W1'
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
            text-align: center;
            tr{
              td{
                border-top: 1px solid #E8E8E8;
                border-right: 1px solid #E8E8E8;
                color: #444444;
                font-size: 14px;
                height: 40px;
                &.left{
                  text-align: left;
                  padding-left: 20px;
                }
                &.right{
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
                    // padding: unset;
                  }
                }
                &:nth-last-child(2){
                  /deep/ .el-radio__label{
                    // padding: unset;
                  }
                }
                &:nth-last-child(1){
                  /deep/ .el-checkbox__label{
                    // padding: unset;
                    display:none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
