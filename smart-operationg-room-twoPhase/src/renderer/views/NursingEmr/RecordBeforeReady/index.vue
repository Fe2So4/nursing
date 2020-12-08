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
                rowspan="2"
                style="width:138px;"
              >
                评估项目
              </td>
              <td
                rowspan="2"
              >
                病房护士确认栏
              </td>
              <td style="width:40px;" />
              <td style="width:40px;" />
              <td style="height:35px;width:120px;">
                手术护士确认栏
              </td>
            </tr>
            <tr>
              <td style="height:35px;">
                是
              </td>
              <td>否</td>
              <td>说明具体情况</td>
            </tr>
            <tr>
              <td style="height:52px;">
                术前一日晚睡眠
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.sleep.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="正常">
                    正常
                  </el-radio>
                  <el-radio label="失眠">
                    失眠
                  </el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-radio
                  label="是"
                  :disabled="recordForm.disabled"
                  v-model="recordForm.sleep.ensure"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  :disabled="recordForm.disabled"
                  v-model="recordForm.sleep.ensure"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                心理状态
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.psychology.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="稳定">
                    稳定
                  </el-radio>
                  <el-radio label="紧张">
                    紧张
                  </el-radio>
                  <el-radio label="焦虑">
                    焦虑
                  </el-radio>
                  <el-radio label="恐惧">
                    恐惧
                  </el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-radio
                  label="是"
                  :disabled="recordForm.disabled"
                  v-model="recordForm.psychology.ensure"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  :disabled="recordForm.disabled"
                  v-model="recordForm.psychology.ensure"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                风险评估
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.risk.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <el-checkbox-group
                  v-model="recordForm.risk.checkList"
                  :disabled="recordForm.disabled"
                >
                  <el-checkbox label="跌倒" />
                  <el-checkbox label="营养" />
                  <el-checkbox label="压疮 营养" />
                </el-checkbox-group>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.risk.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.risk.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                药物过敏史
              </td>
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
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.allergy.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.allergy.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                已禁食
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.fasting.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="是">
                    是
                  </el-radio>
                  <el-radio label="否">
                    否
                  </el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.fasting.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.fasting.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                已肠道准备
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.intestine.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="是">
                    是
                  </el-radio>
                  <el-radio label="否">
                    否
                  </el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.intestine.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.intestine.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:72px;">
                取下假牙、隐形眼镜、首饰贵重物品
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.valuables.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="是">
                    是
                  </el-radio>
                  <el-radio label="否">
                    否
                  </el-radio>
                </el-radio-group>
                <span>
                  <span>备注：</span>
                  <LineInput
                    :value.sync="recordForm.valuables.remark"
                    input-width="620px"
                    :disabled="recordForm.disabled"
                  />
                </span>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.valuables.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.valuables.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:170px;">
                随带药品
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.medicineWithYou.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <div>
                  <span>
                    药品名称及数量
                  </span>
                  <el-button
                    type="info"
                    size="mini"
                    plain
                    :disabled="recordForm.disabled"
                  >
                    扫码核对
                  </el-button>
                </div>
                <div><span>[乙10%]注射用矛头蝮蛇血凝酶（巴曲亭）1iu/瓶2.0瓶</span></div>
                <div><span>[甲]氯化钠针（百特塑袋）100ml*0.9% 1.0袋+[甲]头孢呋辛钠针（西力欣）750mg 2.0支</span><i class="el-icon-success" /></div>
                <div><span>[乙20%]左奥硝唑氯化钠注射液（优诺安）0.5g：100ml 1.0瓶</span><i class="el-icon-success" /></div>
              </td>
              <td>
                <el-radio
                  label="是"
                  :disabled="recordForm.disabled"
                  v-model="recordForm.medicineWithYou.ensure"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  :disabled="recordForm.disabled"
                  v-model="recordForm.medicineWithYou.ensure"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:102px;">
                随带病史
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.medicalHistory.status"
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
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.medicalHistory.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.medicalHistory.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:102px;">
                随带物品
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.goodsWithYou.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <div>
                  <span>
                    <span>腹带* </span><span>
                      <LineInput
                        :value.sync="recordForm.goodsWithYou.fd"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>胃管* </span><span>
                      <LineInput
                        :value.sync="recordForm.goodsWithYou.wg"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>塑管* </span><span>
                      <LineInput
                        :value.sync="recordForm.goodsWithYou.sg"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>防压疮敷料* </span><span>
                      <LineInput
                        :value.sync="recordForm.goodsWithYou.fycfl"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                </div>
                <div>
                  <span>
                    <span>造口袋* </span><span>
                      <LineInput
                        :value.sync="recordForm.goodsWithYou.zkd"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>胸瓶* </span><span>
                      <LineInput
                        :value.sync="recordForm.goodsWithYou.xp"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>穿刺针* </span><span>
                      <LineInput
                        :value.sync="recordForm.goodsWithYou.ccz"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>其他* </span><span>
                      <LineInput
                        :value.sync="recordForm.goodsWithYou.qt"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                </div>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.goodsWithYou.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.goodsWithYou.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>腰带</td>
            </tr>
            <tr>
              <td style="height:52px;">
                抗血栓袜
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.socks.status"
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
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.socks.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.socks.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                随带影像学检查
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.pacu.status"
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
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.pacu.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.pacu.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                随带导管情况
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.catheter.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <LineInput
                  :value.sync="recordForm.catheter.catheterName"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.catheter.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.catheter.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                女性月经情况
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.menstruation.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <span>(如果患者为男性此条无需填写)</span>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.menstruation.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.menstruation.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                备注
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.remark.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    有
                  </el-radio>
                </el-radio-group>
                <span>说明：</span>
                <LineInput
                  :value.sync="recordForm.remark.explain"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.remark.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.remark.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                交接签名及时间
              </td>
              <td
                class="left"
                colspan="4"
              >
                <span>
                  <span>病区护士：</span>
                  <LineInput
                    :disabled="recordForm.disabled"
                    :value.sync="recordForm.handover.areaNurse"
                    input-width="100px"
                  />
                </span>
                <span>
                  <span>交接时间：</span>
                  <LineInput
                    :disabled="recordForm.disabled"
                    :value.sync="recordForm.handover.time1"
                    input-width="150px"
                  />
                </span>
                <span>
                  <span>工务员：</span>
                  <LineInput
                    :disabled="recordForm.disabled"
                    :value.sync="recordForm.handover.civilServant"
                    input-width="100px"
                  />
                </span>
                <span>
                  <span>手术室护士：</span>
                  <LineInput
                    :disabled="recordForm.disabled"
                    :value.sync="recordForm.handover.roomNurse"
                    input-width="100px"
                  />
                </span>
                <span>
                  <span>交接时间：</span>
                  <LineInput
                    :disabled="recordForm.disabled"
                    :value.sync="recordForm.handover.time2"
                    input-width="150px"
                  />
                </span>
              </td>
              <!-- <td><el-radio label="是" v-model="recordForm.handover.ensure"/></td>
              <td><el-radio label="否" /></td>
              <td></td> -->
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
      id: '',
      recordForm: {
        // 睡眠
        sleep: {
          status: '',
          ensure: ''
        },
        // 心理
        psychology: {
          status: '',
          ensure: ''
        },
        // 风险
        risk: {
          ensure: '',
          status: '',
          checkList: []
        },
        // 过敏
        allergy: {
          ensure: '',
          status: ''
        },
        // 已禁食
        fasting: {
          ensure: '',
          status: ''
        },
        // 肠道准备
        intestine: {
          ensure: '',
          status: ''
        },
        // 贵重物品
        valuables: {
          ensure: '',
          status: '',
          remark: ''
        },
        // 随身带药
        medicineWithYou: {
          ensure: '',
          status: ''
        },
        // 随带病史
        medicalHistory: {
          ensure: '',
          status: ''
        },
        // 随带物品
        goodsWithYou: {
          ensure: '',
          status: '',
          fd: '',
          wg: '',
          sg: '',
          fycfl: '',
          zkd: '',
          xp: '',
          ccz: '',
          qt: ''
        },
        // 抗血栓袜
        socks: {
          status: '',
          ensure: ''
        },
        // 医疗影像学
        pacu: {
          status: '',
          ensure: ''
        },
        // 随带导管
        catheter: {
          ensure: '',
          status: '',
          catheterName: ''
        },
        // 月经
        menstruation: {
          ensure: '',
          status: ''
        },
        // 备注
        remark: {
          ensure: '',
          status: '',
          explain: ''
        },
        // 交接签名及时间
        handover: {
          areaNurse: '',
          time1: '',
          civilServant: '',
          roomNurse: '',
          time2: ''
        },
        disabled: false
      }
    }
  },
  components: {
    PatientInfo, LineInput
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
        url: getRecord + '/' + this.currentPatient.operationId + '/' + 'W11'
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
          protectWritId: 'W11'
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
      // padding-left:20px;
      border-radius: 5px;
      .rb-option{
        text-align: right;
        padding: 10px 20px 10px 0;
      }
      .rb-table{
        height: calc(100% - 48px);
        overflow-y: scroll;
        padding:0 20px;
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
                &.left{
                  text-align: left;
                  padding-left: 20px;
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
                    display:none;
                  }
                }
                &:nth-last-child(2){
                  /deep/ .el-radio__label{
                    display:none;
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
