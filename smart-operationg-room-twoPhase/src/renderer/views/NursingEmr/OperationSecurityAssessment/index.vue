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
              <td>
                <div>
                  <p>手术切口清洁程度</p>
                  <div>
                    <p>
                      <span>
                        <el-radio
                          :label="1"
                          v-model="recordForm.incision"
                          :disabled="recordForm.disabled"
                        >
                          Ⅰ类手术切口（清洁手术）
                        </el-radio>
                      </span>
                      <span>0分</span>
                    </p>
                    <p>手术野无污染：手术切口周边无炎症；患者没有进行气道、食道和/或尿道插管；患者没有意识障碍。</p>
                  </div>
                  <div>
                    <p>
                      <span>
                        <el-radio
                          :label="2"
                          v-model="recordForm.incision"
                          :disabled="recordForm.disabled"
                        >
                          Ⅱ类手术切口（相对清洁手术）
                        </el-radio>
                      </span>
                      <span>0分</span>
                    </p>
                    <p>上、下呼吸道，上、下消化道，泌尿生殖道或经以上器官的手术；患者进行气道、食道和/或尿道插管;</p>
                  </div>
                  <div>
                    <p>
                      <span>
                        <el-radio
                          :label="3"
                          v-model="recordForm.incision"
                          :disabled="recordForm.disabled"
                        >
                          Ⅲ类手术切口（清洁-污染手术）
                        </el-radio>
                      </span>
                      <span>1分</span>
                    </p>
                    <p>开放新鲜且不干净的伤口；前次手术后感染的切口；术中需采取消毒措施的切口。</p>
                  </div>
                  <div>
                    <p>
                      <span>
                        <el-radio
                          :label="4"
                          v-model="recordForm.incision"
                          :disabled="recordForm.disabled"
                        >
                          Ⅳ类手术切口（污染手术）
                        </el-radio>
                      </span>
                      <span>1分</span>
                    </p>
                    <p>严重的外伤，手术切口有炎症、组织坏死，或有内脏引流管。</p>
                  </div>
                  <div>
                    <p class="right">
                      <span>手术医师签名：</span>
                      <span>
                        <LineInput
                          input-width="150px"
                          :value.sync="recordForm.opeDoc"
                          :disabled="recordForm.disabled"
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <p>
                    麻醉分级（ASA分级）
                  </p>
                  <div>
                    <span>
                      <el-radio
                        :label="1"
                        v-model="recordForm.asa"
                        :disabled="recordForm.disabled"
                      >
                        P1:正常的患者；除局部病变外，无系统性疾病。
                      </el-radio>
                    </span>
                    <span>0分</span>
                  </div>
                  <div>
                    <span>
                      <el-radio
                        :label="2"
                        v-model="recordForm.asa"
                        :disabled="recordForm.disabled"
                      >
                        P2:患者有轻微的临床症状；有轻度或中度系统性疾病。
                      </el-radio>
                    </span>
                    <span>0分</span>
                  </div>
                  <div>
                    <span>
                      <el-radio
                        :label="3"
                        v-model="recordForm.asa"
                        :disabled="recordForm.disabled"
                      >
                        P3:有严重系统性疾病；日常活动受限，但未丧失工作能力。
                      </el-radio>
                    </span>
                    <span>1分</span>
                  </div>
                  <div>
                    <span>
                      <el-radio
                        :label="4"
                        v-model="recordForm.asa"
                        :disabled="recordForm.disabled"
                      >
                        P4:有严重系统性疾病；已丧失工作能力，威胁生命安全。
                      </el-radio>
                    </span>
                    <span>1分</span>
                  </div>
                  <div>
                    <span>
                      <el-radio
                        :label="5"
                        v-model="recordForm.asa"
                        :disabled="recordForm.disabled"
                      >
                        P5:病情危重，生命难以维持的濒死患者。
                      </el-radio>
                    </span>
                    <span>1分</span>
                  </div>
                  <div>
                    <span>
                      <el-radio
                        :label="6"
                        v-model="recordForm.asa"
                        :disabled="recordForm.disabled"
                      >
                        P6:脑死亡患者。
                      </el-radio>
                    </span>
                    <span>1分</span>
                  </div>
                  <p>手术类别</p>
                  <div>
                    <el-radio-group
                      v-model="recordForm.opeType"
                      :disabled="recordForm.disabled"
                    >
                      <el-radio :label="1">
                        浅层手术组织
                      </el-radio>
                      <el-radio :label="2">
                        器官手术
                      </el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <el-radio-group
                      v-model="recordForm.opeType"
                      :disabled="recordForm.disabled"
                    >
                      <el-radio :label="3">
                        深部组织手术
                      </el-radio>
                      <el-radio :label="4">
                        腔隙手术
                      </el-radio>
                    </el-radio-group>
                  </div>
                  <div class="right">
                    <span>麻醉医师签名：</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.anaesDoc"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <p>
                    手术持续时间
                  </p>
                  <div>
                    <span>
                      <el-radio
                        :label="1"
                        v-model="recordForm.continueTime"
                        :disabled="recordForm.disabled"
                      >
                        T1:手术在3小时内完成
                      </el-radio>
                    </span>
                    <span>0分</span>
                  </div>
                  <div>
                    <span>
                      <el-radio
                        :label="2"
                        v-model="recordForm.continueTime"
                        :disabled="recordForm.disabled"
                      >
                        T2:完成手术，超过3小时
                      </el-radio>
                    </span>
                    <span>0分</span>
                  </div>
                  <div>
                    <span>
                      <el-radio
                        :label="3"
                        v-model="recordForm.continueTime"
                        :disabled="recordForm.disabled"
                      >
                        T3:急诊手术
                      </el-radio>
                    </span>
                    <span>0分</span>
                  </div>
                  <div class="right">
                    <span>巡回护士签名：</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.nurse"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <p>
                    <span>手术风险评估：</span>
                    <span>手术切口清洁程度</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.riskAssessment.clean"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                    <span>分+麻醉ASA分级</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.riskAssessment.asaLevel"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                    <span>
                      分+手术持续时间
                    </span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.riskAssessment.continueTime1"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                    <span>
                      分=
                    </span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value.sync="recordForm.riskAssessment.continueTime2"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                    <span>
                      分
                    </span>
                  </p>
                  <p>
                    <span>NNIS分级：</span>
                    <span>
                      <el-radio-group
                        v-model="recordForm.nnis"
                        :disabled="recordForm.disabled"
                      >
                        <el-radio :label="0">0</el-radio>
                        <el-radio :label="1">1</el-radio>
                        <el-radio :label="2">2</el-radio>
                        <el-radio :label="3">3</el-radio>
                      </el-radio-group>
                    </span>
                  </p>
                </div>
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
        incision: '',
        opeDoc: '',
        asa: '',
        opeType: '',
        anaesDoc: '',
        continueTime: '',
        nurse: '',
        riskAssessment: {
          clean: '',
          asaLevel: '',
          continueTime: ''
        },
        nnis: ''
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
        url: getRecord + '/' + this.currentPatient.operationId + '/' + 'W3'
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
          protectWritId: 'W3'
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
