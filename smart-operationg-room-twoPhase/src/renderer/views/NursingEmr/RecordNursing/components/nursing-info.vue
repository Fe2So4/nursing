<template>
  <div class="nursing-info">
    <div class="option">
      <el-button
        type="primary"
        size="mini"
      >
        打 印
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="unlock"
      >
        解 锁
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="saveNursingInfo"
      >
        保 存
      </el-button>
    </div>
    <div>
      <table cellspacing="0">
        <tbody>
          <tr>
            <td style="width:96px;">
              体位
            </td>
            <td>
              <span>
                <el-radio
                  v-model="formRecord.bodyPosition.radio"
                  label="平卧"
                  :disabled="this.formRecord.bodyPosition.disabled"
                >
                  <span>平卧</span>
                  <span>
                    <el-select
                      size="mini"
                      :disabled="formRecord.bodyPosition.radio==='侧卧'"
                      v-model="formRecord.bodyPosition.rotate1"
                    >
                      <el-option
                        v-for="item in rotateList"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </span>
                </el-radio>
                <el-radio
                  v-model="formRecord.bodyPosition.radio"
                  :disabled="this.formRecord.bodyPosition.disabled"
                  label="侧卧"
                >
                  <span>侧卧</span>
                  <span>
                    <el-select
                      size="mini"
                      :disabled="formRecord.bodyPosition.radio==='平卧'"
                      v-model="formRecord.bodyPosition.rotate2"
                    >
                      <el-option
                        v-for="item in rotateList"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </span>
                  <span>度</span>
                </el-radio>
                <el-checkbox-group
                  v-model="formRecord.clinostatism.list"
                  :disabled="this.formRecord.bodyPosition.disabled"
                  size="mini"
                >
                  <el-checkbox label="颈仰卧位">
                    <span>颈仰卧位</span>
                  </el-checkbox>
                  <el-checkbox label="截石位">
                    <span>截石位</span>
                  </el-checkbox>
                  <el-checkbox label="俯卧位">
                    <span>俯卧位</span>
                  </el-checkbox>
                  <el-checkbox label="侧俯卧位">
                    <span>侧俯卧位</span>
                  </el-checkbox>
                  <el-checkbox label="剪刀位">
                    <span>剪刀位</span>
                  </el-checkbox>
                  <el-checkbox label="其他">
                    <span>其他</span>
                    <span>
                      <LineInput
                        :value.sync="formRecord.clinostatism.other"
                        :disabled="!formRecord.clinostatism.list.includes('其他')&&formRecord.bodyPosition.disabled"
                        input-width="150px"
                      />
                    </span>
                  </el-checkbox>
                </el-checkbox-group>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              引流
            </td>
            <td>
              <span>
                <span>胸部</span>
                <span>
                  <LineInput
                    :value.sync="formRecord.drainage.xb"
                    :disabled="this.formRecord.bodyPosition.disabled"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>腹部</span>
                <span>
                  <LineInput
                    :value.sync="formRecord.drainage.fb"
                    :disabled="this.formRecord.bodyPosition.disabled"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>胃管</span>
                <span>
                  <LineInput
                    :value.sync="formRecord.drainage.wg"
                    :disabled="this.formRecord.bodyPosition.disabled"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>导尿管</span>
                <span>
                  <LineInput
                    :value.sync="formRecord.drainage.dlg"
                    :disabled="this.formRecord.bodyPosition.disabled"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>颈部</span>
                <span>
                  <LineInput
                    :value.sync="formRecord.drainage.jb"
                    :disabled="this.formRecord.bodyPosition.disabled"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>其他</span>
                <span>
                  <LineInput
                    :value.sync="formRecord.drainage.qt"
                    :disabled="this.formRecord.bodyPosition.disabled"
                    input-width="150px"
                  />
                </span>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              皮肤
            </td>
            <td>
              <el-radio-group
                v-model="formRecord.skin.status"
                :disabled="this.formRecord.bodyPosition.disabled"
              >
                <el-radio label="正常">
                  正常
                </el-radio>
                <el-radio label="不正常">
                  不正常
                </el-radio>
              </el-radio-group>
              <el-checkbox-group
                v-model="formRecord.skin.list"
                :disabled="this.formRecord.bodyPosition.disabled"
                size="mini"
              >
                <el-checkbox label="灼伤">
                  灼伤
                </el-checkbox>
                <el-checkbox label="压疮">
                  压疮
                </el-checkbox>
                <el-checkbox label="其他">
                  <span>其他</span>
                  <span>
                    <LineInput
                      :disabled="!formRecord.skin.list.includes('其他')&&formRecord.bodyPosition.disabled"
                      :value.sync="formRecord.skin.other"
                      input-width="150px"
                    />
                  </span>
                </el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr>
            <td>
              手术用血
            </td>
            <td>
              <span>
                <LineInput
                  :value.sync="formRecord.surgicalBlood.ssyx"
                  input-width="200px"
                  :disabled="this.formRecord.bodyPosition.disabled"
                />
              </span>
              <span>少浆血：</span>
              <span>
                <LineInput
                  :value.sync="formRecord.surgicalBlood.sjx"
                  :disabled="this.formRecord.bodyPosition.disabled"
                  input-width="100px"
                />
              </span>
              <span>血浆：</span>
              <span>
                <LineInput
                  :value.sync="formRecord.surgicalBlood.xj"
                  :disabled="this.formRecord.bodyPosition.disabled"
                  input-width="100px"
                />
              </span>
              <span>其他：</span>
              <span>
                <LineInput
                  :value.sync="formRecord.surgicalBlood.qt"
                  :disabled="this.formRecord.bodyPosition.disabled"
                  input-width="150px"
                />
              </span>
              <span>
                开始时间
              </span>
              <span>
                <LineInput
                  :value.sync="formRecord.startTime"
                  :disabled="this.formRecord.bodyPosition.disabled"
                  input-width="150px"
                />
              </span>
              <span>
                结束时间
              </span>
              <span>
                <LineInput
                  :value.sync="formRecord.endTime"
                  :disabled="this.formRecord.bodyPosition.disabled"
                  input-width="150px"
                />
              </span>
              <span>
                输血反应
              </span>
              <span>
                <LineInput
                  :value.sync="formRecord.surgicalBlood.sxfy"
                  :disabled="this.formRecord.bodyPosition.disabled"
                  input-width="200px"
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {getNursingInfo, saveNursingInfo} from '@/api/record'
import request from '@/utils/request'
import {mapState} from 'vuex'
import LineInput from '@/components/LineInput'
export default {
  name: 'NursingInfo',
  data () {
    return {
      rotateList: ['30', '45', '60', '90'],
      checkboxList: [],
      value: '',
      radio: '',
      formRecord: {
        startTime: '',
        endTime: '',
        operSchNo: '',
        bodyPosition: {
          disabled: false,
          rotate1: '',
          rotate2: '',
          radio: ''
        },
        clinostatism: {
          list: [],
          other: ''
        },
        drainage: {
          xb: '',
          fb: '',
          wg: '',
          dlg: '',
          jb: '',
          qt: ''
        },
        skin: {
          status: '',
          list: [],
          other: ''
        },
        surgicalBlood: {
          ssyx: '',
          sjx: '',
          xj: '',
          qt: '',
          sxfy: ''
        }
      }
    }
  },
  components: {
    LineInput
  },
  computed: {
    ...mapState('Base', ['currentPatient'])
  },
  mounted () {
    this.getNursingInfo()
  },
  methods: {
    unlock () {
      this.formRecord.bodyPosition.disabled = false
    },
    getNursingInfo () {
      request({
        url: getNursingInfo + '/' + this.currentPatient.operSchNum,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        if (this.formRecord.bodyPosition.disabled) {
          data.bodyPosition = JSON.parse(data.bodyPosition)
          data.clinostatism = JSON.parse(data.clinostatism)
          data.drainage = JSON.parse(data.drainage)
          data.skin = JSON.parse(data.skin)
          data.surgicalBlood = JSON.parse(data.surgicalBlood)
          this.formRecord = data
        }
      })
    },
    saveNursingInfo () {
      this.formRecord.bodyPosition.disabled = true
      request({
        url: saveNursingInfo,
        method: 'post',
        data: {
          bodyPosition: JSON.stringify(this.formRecord.bodyPosition),
          clinostatism: JSON.stringify(this.formRecord.clinostatism),
          drainage: JSON.stringify(this.formRecord.drainage),
          endTime: this.formRecord.endTime,
          operSchNo: this.currentPatient.operSchNum,
          skin: JSON.stringify(this.formRecord.skin),
          startTime: this.formRecord.startTime,
          surgicalBlood: JSON.stringify(this.formRecord.surgicalBlood)
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '保存成功'})
          this.getNursingInfo()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nursing-info{
    .option{
      text-align: right;
      padding-right: 20px;
      padding-bottom: 20px;
    }
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
</style>
