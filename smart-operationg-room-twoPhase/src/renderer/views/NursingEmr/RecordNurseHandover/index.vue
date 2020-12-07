<template>
  <div class="record-before">
    <PatientInfo />
    <div class="rb-content">
      <div class="rb-option">
        <el-button
          type="primary"
          size="mini"
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
                <el-radio-group>
                  <el-radio :label="1">
                    稳定
                  </el-radio>
                  <el-radio :label="2">
                    危重
                  </el-radio>
                </el-radio-group>
                <span>
                  <LineInput
                    :value="input"
                    input-width="300px"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                2.免疫报告：
                <el-radio-group>
                  <el-radio :label="1">
                    阴性
                  </el-radio>
                  <el-radio :label="2">
                    阳性
                  </el-radio>
                </el-radio-group>
                <span>
                  <LineInput
                    :value="input"
                    input-width="300px"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                3.药物过敏：
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    有
                  </el-radio>
                </el-radio-group>
                <span>
                  <LineInput
                    :value="input"
                    input-width="300px"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td
                class="left"
              >
                4.筋脉通路：
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    外周
                  </el-radio>
                  <el-radio :label="2">
                    CVC单腔
                  </el-radio>
                  <el-radio :label="2">
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
                <el-radio-group>
                  <el-radio :label="1">
                    好
                  </el-radio>
                  <el-radio :label="2">
                    <span>压红：部位及大小</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                  <el-radio :label="3">
                    <span>破渍：部位及大小</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有：名称及部位</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有：已用药（名称及数量）</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                  <el-radio :label="3">
                    <span>未用药（名称及数量）</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有：已用血（名称及数量）</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                  <el-radio :label="3">
                    <span>未用血（名称及数量）</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                  :value="input"
                  input-width="500px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    齐全
                  </el-radio>
                  <el-radio :label="2">
                    <span>维修：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                  <el-radio :label="3">
                    <span>缺失：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有：借出物品与去向</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有：借入物品与房间号</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有:设备名称</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有:设备名称</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="150px"
                      />
                    </span>
                  </el-radio>
                  <el-radio :label="3">
                    <span>放置地点：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="150px"
                      />
                    </span>
                  </el-radio>
                  <el-radio :label="4">
                    <span>镜头名称：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="150px"
                      />
                    </span>
                  </el-radio>
                  <el-radio :label="5">
                    <span>放置地点</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="150px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                2.其他特殊情况：
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                      :value="input"
                      input-width="300px"
                    />
                  </span>
                </span>
                <span>
                  <span>
                    接班者：
                  </span>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="300px"
                    />
                  </span>
                </span>
                <span>
                  <span>
                    交班时间：
                  </span>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="300px"
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
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                2.特殊器械：
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                3.特殊设备：
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有：设备名称</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td class="left">
                4.腔镜镜头及设备：
                <el-radio-group>
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    <span>有：设备名称</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
                      />
                    </span>
                  </el-radio>
                  <el-radio :label="3">
                    <span>镜头名称：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="300px"
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
                      :value="input"
                      input-width="300px"
                    />
                  </span>
                </span>
                <span>
                  <span>
                    接班者：
                  </span>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="300px"
                    />
                  </span>
                </span>
                <span>
                  <span>
                    交班时间：
                  </span>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="300px"
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
export default {
  name: 'RecordBefore',
  data () {
    return {
      radio: '',
      input: '无',
      checkList: []
    }
  },
  components: {
    PatientInfo, LineInput
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
