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
                style="width:500px;"
                class="left"
              >
                心理疏导
              </td>
              <td>
                <el-radio-group
                  v-model="recordForm.dredge"
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
                class="left"
              >
                观察皮肤
              </td>
              <td>
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
                <span>（部位：
                  <LineInput
                    :value.sync="recordForm.skin.position"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  />
                  并协助解决）
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                解释病人提出的护理问题
              </td>
              <td>
                <el-radio-group
                  v-model="recordForm.question.status"
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
                    :value.sync="recordForm.question.description"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                class="left"
              >
                征求反馈意见
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                1.您认为访视护士的服务态度
              </td>
              <td>
                <el-radio-group
                  v-model="recordForm.service"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="满意">
                    满意
                  </el-radio>
                  <el-radio label="较满意">
                    较满意
                  </el-radio>
                  <el-radio label="一般">
                    一般
                  </el-radio>
                  <el-radio label="较差">
                    较差
                  </el-radio>
                  <el-radio label="差">
                    差
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                2.您对访视护士术前宣教的是否满意
              </td>
              <td>
                <el-radio-group
                  v-model="recordForm.education"
                  :disabled="recordForm.disabled"
                >
                  <el-radio label="满意">
                    满意
                  </el-radio>
                  <el-radio label="较满意">
                    较满意
                  </el-radio>
                  <el-radio label="一般">
                    一般
                  </el-radio>
                  <el-radio label="较差">
                    较差
                  </el-radio>
                  <el-radio label="差">
                    差
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
              >
                <span>
                  <span>访视护士</span>
                  <span><LineInput
                    :value.sync="recordForm.interview.nurse"
                    input-width="300px"
                    :disabled="recordForm.disabled"
                  /></span>
                </span>
                <span>
                  <span>患者或家属签名</span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.interview.family"
                      input-width="300px"
                      :disabled="recordForm.disabled"
                    />
                  </span>
                </span>
                <span>
                  <span>访视日期</span>
                  <span>
                    <LineInput
                      :value.sync="recordForm.interview.time"
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
        dredge: '',
        disabled: false,
        skin: {
          status: '',
          position: ''
        },
        question: {
          status: '',
          description: ''
        },
        service: '',
        education: '',
        interview: {
          nurse: '',
          family: '',
          time: ''
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
        url: getRecord + '/' + this.currentPatient.operationId + '/' + 'W7'
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
          protectWritId: 'W7'
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
      padding:0 20px;
      border-radius: 5px;
      .rb-option{
        text-align: right;
        padding: 10px 0;
      }
      .rb-table{
        height: calc(100% - 48px);
        // overflow-y: scroll;
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
