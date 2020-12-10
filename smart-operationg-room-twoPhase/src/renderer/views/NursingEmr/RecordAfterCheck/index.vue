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
        <el-button
          type="primary"
          size="mini"
        >
          更新病房确认
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
                手术护士确认栏
              </td>
              <td style="width:40px;" />
              <td style="width:40px;" />
              <td style="height:35px;width:120px;">
                病房护士确认栏
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
                术中留置导管情况
              </td>
              <td class="left">
                <div>
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
                </div>
                <div>
                  <span>数量*</span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.catheter.count"
                      input-width="620px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                  <el-radio-group
                    v-model="recordForm.catheter.comfort"
                    :disabled="recordForm.disabled"
                  >
                    <el-radio label="通畅">
                      通畅
                    </el-radio>
                    <el-radio label="不畅">
                      不畅
                    </el-radio>
                  </el-radio-group>
                </div>
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
              <td style="height:82px;">
                静脉通路情况
              </td>
              <td class="left">
                <div>
                  <el-radio-group
                    v-model="recordForm.venous.status"
                    :disabled="recordForm.disabled"
                  >
                    <el-radio label="无">
                      无
                    </el-radio>
                    <el-radio label="有">
                      有
                    </el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <el-checkbox-group
                    v-model="recordForm.venous.checkList"
                    :disabled="recordForm.disabled"
                  >
                    <el-checkbox label="浅静脉" />
                    <el-checkbox label="PICC" />
                    <el-checkbox label="CVC" />
                    <el-checkbox label="PORT" />
                    <el-checkbox label="通畅" />
                    <el-checkbox label="不畅" />
                    <el-checkbox label="其它" />
                  </el-checkbox-group>
                </div>
                <div>
                  <span>
                    <LineInput
                      :value.sync="recordForm.venous.other"
                      input-width="620px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                </div>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.venous.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.venous.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                术前带药
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.preoperativeMedication.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="已执行">
                    已执行
                  </el-radio>
                  <el-radio label="未执行">
                    未执行
                  </el-radio>
                </el-radio-group>
                <span>备注</span>
                <LineInput
                  :value.sync="recordForm.preoperativeMedication.remark"
                  :disabled="recordForm.disabled"
                  input-width="620px"
                />
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.preoperativeMedication.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.preoperativeMedication.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                归还药品
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.returnDrugs.status"
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
                  v-model="recordForm.returnDrugs.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.returnDrugs.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:82px;">
                带回血制品情况
              </td>
              <td
                class="left"
                style="vertical-align:middle;"
              >
                <el-radio-group
                  v-model="recordForm.returnBlood.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="是">
                    是
                  </el-radio>
                  <el-radio label="否">
                    否
                  </el-radio>
                </el-radio-group>
                <el-input
                  type="textarea"
                  v-model="recordForm.returnBlood.description"
                  style="width:600px;vertical-align:middle;"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.returnBlood.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.returnBlood.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                归还影像学检查
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.returnPacu.status"
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
                  v-model="recordForm.returnPacu.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.returnPacu.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:72px;">
                术后皮肤粘膜情况
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.skin.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="完整">
                    完整
                  </el-radio>
                  <el-radio label="破损">
                    破损
                  </el-radio>
                  <el-radio label="发红">
                    发红
                  </el-radio>
                </el-radio-group>
                <span>
                  （术后门罗评分：分）
                </span>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.skin.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.skin.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                归还病史
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.returnHistory.status"
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
                  v-model="recordForm.returnHistory.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.returnHistory.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td style="height:102px;">
                归还物品情况
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.returnGoods.status"
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
                        :value.sync="recordForm.returnGoods.fd"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>胃管* </span><span>
                      <LineInput
                        :value.sync="recordForm.returnGoods.wg"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>塑管* </span><span>
                      <LineInput
                        :value.sync="recordForm.returnGoods.sg"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>防压疮敷料* </span><span>
                      <LineInput
                        :value.sync="recordForm.returnGoods.fycfl"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                </div>
                <div>
                  <span>
                    <span>造口袋* </span><span>
                      <LineInput
                        :value.sync="recordForm.returnGoods.zkd"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>胸瓶* </span><span>
                      <LineInput
                        :value.sync="recordForm.returnGoods.xp"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>穿刺针* </span><span>
                      <LineInput
                        :value.sync="recordForm.returnGoods.ccz"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                  <span>
                    <span>其他* </span><span>
                      <LineInput
                        :value.sync="recordForm.returnGoods.qt"
                        input-width="100px"
                        :disabled="recordForm.disabled"
                      /></span>
                  </span>
                </div>
              </td>
              <td>
                <el-radio
                  label="是"
                  v-model="recordForm.returnGoods.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  :disabled="recordForm.disabled"
                  v-model="recordForm.returnGoods.ensure"
                />
              </td>
              <td />
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
                术中添加情况
              </td>
              <td class="left">
                <el-radio-group
                  v-model="recordForm.adding.status"
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
                  v-model="recordForm.adding.ensure"
                  :disabled="recordForm.disabled"
                />
              </td>
              <td>
                <el-radio
                  label="否"
                  v-model="recordForm.adding.ensure"
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
                <span>
                  说明
                </span>
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
                <div>
                  <span>
                    <span>手术室护士：</span>
                    <LineInput
                      :value.sync="recordForm.handover.sssNurse"
                      input-width="100px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                  <span>
                    <span>麻醉医生：</span>
                    <LineInput
                      :value.sync="recordForm.handover.anaesDoc"
                      input-width="150px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                  <span>
                    <span>送复苏室工务员：</span>
                    <LineInput
                      :value.sync="recordForm.handover.sfssCivil"
                      input-width="100px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                  <span>
                    <span>交接时间：</span>
                    <LineInput
                      :value.sync="recordForm.handover.time1"
                      input-width="150px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <span>复苏室护士：</span>
                    <LineInput
                      :value.sync="recordForm.handover.fssNurse"
                      input-width="100px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                  <span>
                    <span>病区护士：</span>
                    <LineInput
                      :value.sync="recordForm.handover.areaNurse"
                      input-width="150px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                  <span>
                    <span>送到病房工务员：</span>
                    <LineInput
                      :value.sync="recordForm.handover.sbfCivil"
                      input-width="100px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                  <span>
                    <span>交接时间：</span>
                    <LineInput
                      :value.sync="recordForm.handover.time2"
                      input-width="150px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
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
      recordForm: {
        disabled: false,
        catheter: {
          status: '',
          count: '',
          comfort: ''
        },
        venous: {
          status: '',
          ensure: '',
          checkList: [],
          other: ''
        },
        preoperativeMedication: {
          status: '',
          remark: '',
          ensure: ''
        },
        returnDrugs: {
          status: '',
          ensure: ''
        },
        returnBlood: {
          status: '',
          ensure: '',
          description: ''
        },
        returnPacu: {
          status: '',
          ensure: ''
        },
        skin: {
          status: '',
          ensure: ''
        },
        returnHistory: {
          status: '',
          ensure: ''
        },
        returnGoods: {
          status: '',
          ensure: '',
          yd: '',
          fd: '',
          qt: '',
          wg: '',
          sg: '',
          fycfl: '',
          xp: '',
          zkd: '',
          ccz: ''
        },
        socks: {
          status: '',
          ensure: ''
        },
        adding: {
          status: '',
          ensure: ''
        },
        remark: {
          status: '',
          explain: '',
          ensure: ''
        },
        handover: {
          time1: '',
          time2: '',
          sssNurse: '',
          fssNurse: '',
          anaesDoc: '',
          areaNurse: '',
          sfssCivil: '',
          sbfCivil: ''
        }
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
        url: getRecord + '/' + this.currentPatient.operationId + '/' + 'W8'
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
          protectWritId: 'W8'
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
      padding-left:20px;
      border-radius: 5px;
      .rb-option{
        text-align: right;
        padding: 10px 20px;
      }
      .rb-table{
        height: calc(100% - 48px);
        overflow-y: scroll;
        padding-bottom: 20px;
        padding-right: 20px;
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
                    padding: unset;
                    display:none;
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
