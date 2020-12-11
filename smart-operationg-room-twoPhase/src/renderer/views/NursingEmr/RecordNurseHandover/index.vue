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
        <!-- <el-button
          type="primary"
          size="mini"
        >
          更新病房确认
        </el-button> -->
      </div>
      <div class="rb-table">
        <table cellspacing="0">
          <tbody>
            <tr>
              <td
                class="left"
              >
                巡回护士交接班内容
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                一、患者情况
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                1.基本情况：
                <el-radio-group
                  v-model="recordForm.basicInfo.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="稳定">
                    稳定
                  </el-radio>
                  <el-radio label="危重">
                    危重
                  </el-radio>
                </el-radio-group>
                <span>
                  <LineInput
                    :value.sync="recordForm.basicInfo.description"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                2.免疫报告：
                <el-radio-group
                  v-model="recordForm.immune.status"
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
                  <LineInput
                    :value.sync="recordForm.immune.description"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                3.药物过敏：
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
                  <LineInput
                    :value.sync="recordForm.allergy.description"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                4.静脉通路：
                <el-radio-group
                  v-model="recordForm.venous.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="外周">
                    外周
                  </el-radio>
                  <el-radio label="CVC单腔">
                    CVC单腔
                  </el-radio>
                  <el-radio label="CVC双腔">
                    CVC双腔
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                5.皮肤情况：
                <el-radio-group
                  v-model="recordForm.skin.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="好">
                    好
                  </el-radio>
                  <el-radio label="压红">
                    <span>压红：部位及大小</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.skin.position1"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                  <el-radio label="破渍">
                    <span>破渍：部位及大小</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.skin.position2"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                6.植入物：
                <el-radio-group
                  v-model="recordForm.implants.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有：名称及部位</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.implants.position"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                7.药物使用情况：
                <el-radio-group
                  v-model="recordForm.medicineUse.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有：已用药（名称及数量）</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.medicineUse.count1"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                  <el-radio label="未用药">
                    <span>未用药（名称及数量）</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.medicineUse.count2"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                8.输血使用情况：
                <el-radio-group
                  v-model="recordForm.bloodUse.status"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有：已用血（名称及数量）</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.bloodUse.count1"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                  <el-radio label="未用血">
                    <span>未用血（名称及数量）</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.bloodUse.count2"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                9.交接时手术名称：
                <LineInput
                  :value.sync="recordForm.opeName"
                  input-width="500px"
                  :disabled="recordForm.disabled"
                />
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                二、房间内配置情况
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                1.房间内配置物品是否齐全：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.goodsComplete.status"
                >
                  <el-radio label="齐全">
                    齐全
                  </el-radio>
                  <el-radio label="维修">
                    <span>维修：</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.goodsComplete.repair"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                  <el-radio label="缺失">
                    <span>缺失：</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.goodsComplete.defect"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                2.房间内配置物品有无出错：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.goodsError.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有：借出物品与去向</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.goodsError.whereAbouts"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                3.房间有无借入其他房间物品：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.lend.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有：借入物品与房间号</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.lend.description"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                三、患者手术用物使用及准备情况：
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                1.高值耗材：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.highValue.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.highValue.description"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                2.特殊器械：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.specialDevice.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.specialDevice.description"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                3.特殊设备：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.specialEquipment.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有:设备名称</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.specialEquipment.name"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                4.腔镜镜头及设备：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.chamberLens.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有:设备名称</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.chamberLens.deviceName"
                        input-width="150px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                  <el-radio label="设备地点">
                    <span>放置地点：</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.chamberLens.position1"
                        input-width="150px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                  <el-radio label="名称">
                    <span>镜头名称：</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.chamberLens.lensName"
                        input-width="150px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                  <el-radio label="镜头">
                    <span>放置地点</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.chamberLens.position2"
                        input-width="150px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                五、其他：
              </td>
            </tr>
            <tr>
              <td class="left">
                1.前台手术有无特殊情况：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.beforeOpeSpecial.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.beforeOpeSpecial.description"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                2.其他特殊情况：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.otherOpeSpecial.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.otherOpeSpecial.description"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                <span>
                  <span>
                    交班者：
                  </span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.otherOpeSpecial.shiftHandoverPerson"
                      input-width="300px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                </span>
                <span>
                  <span>
                    接班者：
                  </span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.otherOpeSpecial.successor"
                      input-width="300px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                </span>
                <span>
                  <span>
                    交班时间：
                  </span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.otherOpeSpecial.time"
                      input-width="300px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td>洗手护士交接班内容</td>
            </tr>
            <tr>
              <td>患者手术用物使用及准备情况：</td>
            </tr>
            <tr>
              <td class="left">
                1.高值耗材：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.washNurseHandover.highValue.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.washNurseHandover.highValue.description"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                2.特殊器械：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.washNurseHandover.specialDevice.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.washNurseHandover.specialDevice.description"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                3.特殊设备：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.washNurseHandover.specialEquipment.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有：设备名称</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.washNurseHandover.specialEquipment.description"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                4.腔镜镜头及设备：
                <el-radio-group
                  :disabled="recordForm.disabled"
                  v-model="recordForm.washNurseHandover.chamberLens.status"
                >
                  <el-radio label="无">
                    无
                  </el-radio>
                  <el-radio label="有">
                    <span>有：设备名称</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.washNurseHandover.chamberLens.deviceName"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                  <el-radio label="镜头名称">
                    <span>镜头名称：</span>
                    <span>
                      <LineInput
                        :value.sync="recordForm.washNurseHandover.chamberLens.lensName"
                        input-width="300px"
                        :disabled="recordForm.disabled"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                <span>
                  <span>
                    交班者：
                  </span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.washNurseHandover.handover.shiftHandoverPerson"
                      input-width="300px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                </span>
                <span>
                  <span>
                    接班者：
                  </span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.washNurseHandover.handover.successor"
                      input-width="300px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                </span>
                <span>
                  <span>
                    交班时间：
                  </span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.washNurseHandover.handover.time"
                      input-width="300px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
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
      recordForm: {
        disabled: false,
        basicInfo: {
          status: '',
          description: ''
        },
        immune: {
          status: '',
          description: ''
        },
        allergy: {
          status: '',
          description: ''
        },
        venous: {
          status: '',
          description: ''
        },
        skin: {
          status: '',
          position1: '',
          position2: ''
        },
        implants: {
          status: '',
          position: ''
        },
        medicineUse: {
          status: '',
          count1: '',
          count2: ''
        },
        bloodUse: {
          status: '',
          count1: '',
          count2: ''
        },
        opeName: '',
        goodsError: {
          status: '',
          whereAbouts: ''
        },
        goodsComplete: {
          status: '',
          repair: '',
          defect: ''
        },
        lend: {
          status: '',
          description: ''
        },
        highValue: {
          status: '',
          description: ''
        },
        specialDevice: {
          status: '',
          description: ''
        },
        specialEquipment: {
          status: '',
          name: ''
        },
        chamberLens: {
          status: '',
          deviceName: '',
          position1: '',
          position2: '',
          lensName: ''
        },
        beforeOpeSpecial: {
          status: '',
          description: ''
        },
        otherOpeSpecial: {
          status: '',
          description: '',
          time: '',
          shiftHandoverPerson: '',
          successor: ''
        },
        washNurseHandover: {
          highValue: {
            status: '',
            description: ''
          },
          specialDevice: {
            status: '',
            description: ''
          },
          specialEquipment: {
            status: '',
            description: ''
          },
          chamberLens: {
            status: '',
            deviceName: '',
            lensName: ''
          },
          handover: {
            successor: '',
            shiftHandoverPerson: '',
            time: ''
          }
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
        url: getRecord + '/' + this.currentPatient.operationId + '/' + 'W6'
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
          protectWritId: 'W6'
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
                height: 50px;
                padding-left: 20px;
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
