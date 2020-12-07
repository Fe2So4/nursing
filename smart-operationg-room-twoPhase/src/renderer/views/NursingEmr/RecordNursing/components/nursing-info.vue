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
      >
        解 锁
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
                <el-checkbox-group
                  v-model="checkboxList"
                  size="mini"
                >
                  <el-checkbox>
                    <span>平卧</span>
                    <span>
                      <el-select size="mini">
                        <el-option>1</el-option>
                      </el-select>
                    </span>
                  </el-checkbox>
                  <el-checkbox>
                    <span>侧卧</span>
                    <span>
                      <el-select size="mini">
                        <el-option>1</el-option>
                      </el-select>
                    </span>
                    <span>度</span>
                  </el-checkbox>
                  <el-checkbox>
                    <span>颈仰卧位</span>
                  </el-checkbox>
                  <el-checkbox>
                    <span>截石位</span>
                  </el-checkbox>
                  <el-checkbox>
                    <span>俯卧位</span>
                  </el-checkbox>
                  <el-checkbox>
                    <span>侧俯卧位</span>
                  </el-checkbox>
                  <el-checkbox>
                    <span>剪刀位</span>
                  </el-checkbox>
                  <el-checkbox>
                    <span>其他</span>
                    <span>
                      <LineInput
                        :value="value"
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
                    :value="value"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>腹部</span>
                <span>
                  <LineInput
                    :value="value"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>胃管</span>
                <span>
                  <LineInput
                    :value="value"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>导尿管</span>
                <span>
                  <LineInput
                    :value="value"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>颈部</span>
                <span>
                  <LineInput
                    :value="value"
                    input-width="150px"
                  />
                </span>
              </span>
              <span>
                <span>其他</span>
                <span>
                  <LineInput
                    :value="value"
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
              <el-radio-group v-model="radio">
                <el-radio :value="1">
                  正常
                </el-radio>
                <el-radio :value="2">
                  不正常
                </el-radio>
              </el-radio-group>
              <el-checkbox-group
                v-model="checkboxList"
                size="mini"
              >
                <el-checkbox>
                  灼伤
                </el-checkbox>
                <el-checkbox>
                  压疮
                </el-checkbox>
                <el-checkbox>
                  <span>其他</span>
                  <span>
                    <LineInput
                      :value="value"
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
                  :value="value"
                  input-width="200px"
                />
              </span>
              <span>少浆血：</span>
              <span>
                <LineInput
                  :value="value"
                  input-width="100px"
                />
              </span>
              <span>血浆：</span>
              <span>
                <LineInput
                  :value="value"
                  input-width="100px"
                />
              </span>
              <span>其他：</span>
              <span>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </span>
              <span>
                开始时间
              </span>
              <span>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </span>
              <span>
                结束时间
              </span>
              <span>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </span>
              <span>
                输血反应
              </span>
              <span>
                <LineInput
                  :value="value"
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
import LineInput from '@/components/LineInput'
export default {
  name: 'NursingInfo',
  data () {
    return {
      checkboxList: [],
      value: '',
      radio: ''
    }
  },
  components: {
    LineInput
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
