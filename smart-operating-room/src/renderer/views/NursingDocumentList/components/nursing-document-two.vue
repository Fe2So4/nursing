<template>
  <div
    class="hulijilv-two-container"
    id="nursing-document-two"
  >
    <div class="wenben-content-info">
      <table>
        <thead style="display: table-header-group;">
          <div class="container-title">
            福建医科大学附属第一医院
          </div>
          <div class="info-content-title">
            手术病人护理记录单(二)
          </div>
          <div class="wenben-content-userinfo">
            <div class="row">
              <div class="col">
                <span class="row-lable">病人信息：</span>
                <div class="row-text">
                  {{ form.patient }}
                </div>
              </div>
              <div class="col-40">
                <span class="row-lable">手术日期：</span>
                <div class="row-text">
                  {{ form.opsDate }}
                </div>
              </div>
              <div class="col">
                <span class="row-lable">手术房间：</span>
                <div
                  class="row-text"
                  style="width:70px"
                >
                  {{ form.opsRoom }}
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col"
                style="width:30%"
              >
                <span class="row-lable">术前诊断：</span>
                <div class="row-text">
                  {{ form.diagnosis }}
                </div>
              </div>
              <div
                style="width:66%"
                class="col-50"
              >
                <span
                  style="width: 118px"
                  class="row-lable"
                >手术方式：</span>
                <div
                  class="row-text"
                  style="text-align:left"
                >
                  {{ form.opsName }}
                </div>
              </div>
            </div>
          </div>
        </thead>
      </table>
      <div class="info-content-container">
        <div class="context1">
          <span>1、手术类型：</span>
          <span style="marginLeft:105px">
            <span>择期</span>
            <IsSelect :myselect="form.opsType === '1' ? true : false" />
          </span>
          <span class="mgl50">
            <span>非择期</span>
            <IsSelect :myselect="form.opsType === '2' ? true : false" />
          </span>
          <span class="mgl50">
            <span>急诊</span>
            <IsSelect :myselect="form.opsType === '3' ? true : false" />
          </span>
        </div>
        <div class="context1">
          <span>2、术前意识评估：</span>
          <span style="marginLeft:77px">
            <span>清醒</span>
            <IsSelect :myselect="form.consciousness === '1' ? true : false" />
          </span>
          <span style="marginLeft:65px">
            <span>烦躁</span>
            <IsSelect :myselect="form.consciousness === '2' ? true : false" />
          </span>
          <span class="mgl50">
            <span>昏迷</span>
            <IsSelect :myselect="form.consciousness === '3' ? true : false" />
          </span>
        </div>
        <div class="context1">
          <span>3、术前皮肤评估：</span>
          <span style="marginLeft:20px">
            <span>完整</span>
            <IsSelect :myselect="form.skin.skinName === '1' ? true : false" />
            <span>皮肤不完整</span>
            <IsSelect :myselect="form.skin.skinName === '2' ? true : false" />
          </span>
          <span class="input-div mgl50">
            <span>部位</span>
            <div
              style="textAlign:center"
              class="input-div-context"
            >
              {{ form.skin.skinLocate || '' }}
            </div>
          </span>
          <span class="input-div">
            <span>程度</span>
            <div
              style="textAlign:center"
              class="input-div-context"
            >
              {{ form.skin.skinDegree || '' }}
            </div>
          </span>
        </div>
        <div class="context1">
          <span>4、麻醉方式：</span>
          <span
            style="marginLeft:20px"
            v-for="item in selectAne"
            :key="item.value"
          >
            <span>{{ item.text }}</span>
            <IsSelect :myselect="true" />
          </span>
        </div>
        <div class="context1">
          <span>5、手术体位：</span>
          <span
            style="marginLeft:6px"
            v-for="item in selectBody"
            :key="item.value"
          >
            <span>{{ item.text }}</span>
            <IsSelect :myselect="true" />
          </span>
        </div>
        <div class="context1">
          <span>6、体位装置：</span>
          <span
            style="marginLeft:6px"
            v-for="item in selectDev"
            :key="item.value"
          >
            <span>{{ item.text }}</span>
            <IsSelect :myselect="true" />
          </span>
        </div>
        <div class="context1">
          <span>7、约束带：</span>
          <span style="marginLeft:6px">
            <span>无</span>

            <IsSelect :myselect="form.constraints === '1' ? true : false" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <IsSelect :myselect="form.constraints === '2' ? true : false" />
          </span>
        </div>
        <div class="context1">
          <span>8、导尿管：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <IsSelect
              :myselect="catheter.catheterName === '1' ? true : false"
            />
          </span>
          <span style="marginLeft:6px">
            <span>病房带入</span>
            <IsSelect
              :myselect="catheter.catheterName === '2' ? true : false"
            />
          </span>
          <span style="marginLeft:6px">
            <span>手术室插入</span>
            <IsSelect
              :myselect="catheter.catheterName === '3' ? true : false"
            />
          </span>
          <span class="input-div mgl5">
            <span>插管者</span>
            <div
              class="input-div-context-short"
              style="height:30px;textAlign:center;width:120px"
            >
              <img
                style="height:100%"
                :src="catheter.catheterSign"
                alt=""
              >
            </div>
          </span>
          <span class="input-div mgl5">
            <span>型号</span>
            <div
              class="input-div-context-short"
              style="textAlign:center"
            >
              {{ catheter.catheterType || '' }}
            </div>
          </span>
          <span class="input-div mgl5">
            <span>尿液性质</span>
            <div
              class="input-div-context-short"
              style="textAlign:center"
            >
              {{ catheter.catheterNature || '' }}
            </div>
          </span>
        </div>
        <div class="context1">
          <span>9、设备使用：</span>
          <span style="marginLeft:6px">
            <span>电刀：</span>
            <span>1. 电切</span>
            <span>无</span>
            <IsSelect
              :myselect="
                equipment.electrotome.electrotomeName === '1' ? true : false
              "
            />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <IsSelect
              :myselect="
                equipment.electrotome.electrotomeName === '2' ? true : false
              "
            />
          </span>
          <span class="input-div mgl5">
            <span>功率</span>
            <div
              style="textAlign:center"
              class="input-div-context-short"
            >
              {{ equipment.electrotome.electrotomeDQ || '' }}
            </div>
          </span>
          <span>电凝</span>
          <span class="input-div mgl5">
            <span>功率</span>
            <div
              style="textAlign:center"
              class="input-div-context-short"
            >
              {{ equipment.electrotome.electrotomeDN || '' }}
            </div>
          </span>
        </div>
        <div class="context1">
          <span>电极板位置：</span>
          <span style="marginLeft:6px">
            <span>大腿</span>
            <IsSelect
              :myselect="equipment.electrotomeLocation === '1' ? true : false"
            />
          </span>
          <span style="marginLeft:6px">
            <span>小腿</span>
            <IsSelect
              :myselect="equipment.electrotomeLocation === '2' ? true : false"
            />
          </span>
          <span style="marginLeft:6px">
            <span>臀部</span>
            <IsSelect
              :myselect="equipment.electrotomeLocation === '3' ? true : false"
            />
          </span>
          <span style="marginLeft:6px">
            <span>其他</span>
            <IsSelect
              :myselect="equipment.electrotomeLocation === '4' ? true : false"
            />
          </span>
          <span style="marginLeft:15px">
            <span>负极电路板回垫</span>
            <IsSelect
              :myselect="equipment.electrotomeLocation === '5' ? true : false"
            />
          </span>
          <span style="marginLeft:15px">
            <span>无</span>
            <IsSelect
              :myselect="equipment.electrotomeLocation === '6' ? true : false"
            />
          </span>
        </div>
        <div class="context1">
          <span>气囊止血机：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <IsSelect
              :myselect="
                equipment.bhMachine.bhMachineName === '1' ? true : false
              "
            />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <IsSelect
              :myselect="
                equipment.bhMachine.bhMachineName === '2' ? true : false
              "
            />
          </span>
        </div>
        <div class="context2">
          <div
            style="marginLeft:10px"
            class="context2-box"
            v-for="(item, index) in equipment.bhMachine.bhMachineList || []"
            :key="index"
          >
            <div class="box-row">
              <span class="input-div mgl5">
                <span>部位</span>
                <div
                  class="input-div-context-short"
                  style="width:60px;textAlign:center"
                >
                  {{ item.locateName | capitalize }}
                </div>
              </span>
              <span
                class="input-div mgl5"
                style="flex:1"
              >
                <span style="marginLeft:8px">压力</span>
                <div
                  class="input-div-context-short"
                  style="textAlign:center;flex:1"
                >
                  {{ item.presureValue }} {{ item.presure }}
                </div>
              </span>
            </div>
            <div class="box-row">
              <span
                class="input-div mgl5"
                style="width:100%"
              >
                <span>充气时间</span>
                <div
                  style="flex: 1;padding-left: 5px;textAlign:center"
                  class="input-div-context-short-60"
                >
                  {{ item.cqTime }}
                </div>
              </span>
            </div>
            <div class="box-row">
              <span
                class="input-div mgl5"
                style="width:100%"
              >
                <span style="lineHeight:30px">签名</span>
                <div
                  class="input-div-context-short-60"
                  style="height:30px;flex:1"
                >
                  <img
                    style="height:100%"
                    :src="item.cqSign"
                    alt=""
                  >
                </div>
              </span>
            </div>
            <div class="box-row">
              <span
                class="input-div mgl5"
                style="width:100%"
              >
                <span>放气时间</span>
                <div
                  style="flex: 1;padding-left: 5px;textAlign:center"
                  class="input-div-context-short-60"
                >
                  {{ item.fqTime }}
                </div>
              </span>
            </div>
            <div class="box-row">
              <span
                class="input-div mgl5"
                style="width:100%"
              >
                <span style="lineHeight:30px">签名</span>
                <div
                  class="input-div-context-short-60"
                  style="height:30px;flex:1"
                >
                  <img
                    style="height:100%"
                    :src="item.fqSign"
                    alt=""
                  >
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="context1">
          <span>10、手术冲洗：</span>
          <span style="marginLeft:6px">
            <span>0.9%氯化钠溶液</span>
            <IsSelect :myselect="rinse.rinseStr.includes('1') ? true : false" />
          </span>
          <span style="marginLeft:6px">
            <span>灭菌注射用水</span>
            <IsSelect :myselect="rinse.rinseStr.includes('2') ? true : false" />
          </span>
          <!-- <span class="input-div mgl5">
            <span style="marginLeft:8px">药液</span>
            <span style="marginLeft:8px">1、</span>
            <div class="input-div-context-short-60">{{ rinse.liquidMedicine1 || '氯化钠溶液' }}</div>
            <span style="marginLeft:8px">2、</span>
            <div class="input-div-context-short-60">{{ rinse.liquidMedicine2 || '' }}</div>
            <span style="marginLeft:8px">3、</span>
            <div class="input-div-context-short-60">{{ rinse.liquidMedicine3 || '' }}</div>
            <span style="marginLeft:8px">4、</span>
            <div class="input-div-context-short-60">{{ rinse.liquidMedicine4 || '' }}</div>
          </span> -->
        </div>
        <div class="context1">
          <span class="input-div mgl5">
            <span style="marginLeft:8px">药液</span>
            <span style="marginLeft:8px">1、</span>
            <div
              class="input-div-context"
              style="width:140px;textAlign:center"
            >
              {{ rinse.liquidMedicine1 || '' }}
            </div>
            <span style="marginLeft:8px">2、</span>
            <div
              class="input-div-context"
              style="width:140px;textAlign:center"
            >
              {{ rinse.liquidMedicine2 || '' }}
            </div>
            <span style="marginLeft:8px">3、</span>
            <div
              class="input-div-context"
              style="width:140px;textAlign:center"
            >
              {{ rinse.liquidMedicine3 || '' }}
            </div>
            <span style="marginLeft:8px">4、</span>
            <div
              class="input-div-context"
              style="width:140px;textAlign:center"
            >
              {{ rinse.liquidMedicine4 || '' }}
            </div>
          </span>
        </div>
        <div class="context1 mgt20">
          <span>11、腰穿留置：</span>
          <span>
            <span>无</span>
            <IsSelect
              :myselect="waistPuncture.waistPunctureName === '1' ? true : false"
            />
          </span>
          <span>
            <span>有</span>
            <IsSelect
              :myselect="waistPuncture.waistPunctureName === '2' ? true : false"
            />
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:6px">操作者</span>
            <div
              class="input-div-context"
              style="height:30px;textAlign:center"
            >
              <img
                :src="waistPuncture.operationDoc"
                alt=""
                style="height:100%"
              >
            </div>
          </span>
        </div>
        <div class="context1 mgt20">
          <span class="input-div mgl5">
            <span>拔针芯时间</span>
            <div
              class="input-div-context-short-140"
              style="textAlign:center"
            >
              {{ waistPuncture.needleHeartTime }}
            </div>
            <span style="marginLeft:6px">签名</span>
            <div
              class="input-div-context"
              style="height:30px;textAlign:center"
            >
              <img
                :src="waistPuncture.needleHeartSign"
                alt=""
                style="height:100%"
              >
            </div>
            <span style="marginLeft:6px">拔针时间</span>
            <div
              class="input-div-context-short-140"
              style="textAlign:center"
            >
              {{ waistPuncture.needleTime }}
            </div>
            <span style="marginLeft:8px">签名</span>
            <div
              class="input-div-context"
              style="height:30px;textAlign:center"
            >
              <img
                :src="waistPuncture.needleSign"
                alt=""
                style="height:100%"
              >
            </div>
          </span>
        </div>
        <div
          class="context1 mgt20"
          style="flexWrap: wrap"
        >
          <div>
            <span>12、术中特殊交班：</span>
            <span style="marginLeft:6px">
              <span>无</span>
              <IsSelect
                :myselect="handOver.handOverName === '1' ? true : false"
              />
            </span>
            <span style="marginLeft:6px">
              <span>有</span>
              <IsSelect
                :myselect="handOver.handOverName === '2' ? true : false"
              />
            </span>
          </div>
          <div
            style="width:300px;borderBottom:1px solid #000;marginLeft:10px;textAlign:center"
          >
            {{ handOver.handOverRemarks }}
          </div>
        </div>
        <div
          class="context1"
          style="marginTop:15px"
        >
          <div>
            <span>13、术中冰冻：</span>
            <span style="marginLeft:6px">
              <span>无</span>
              <IsSelect :myselect="frozen.frozenName === '1' ? true : false" />
            </span>
            <span style="marginLeft:6px">
              <span>有</span>
              <IsSelect :myselect="frozen.frozenName === '2' ? true : false" />
            </span>
          </div>
          <div style="marginLeft:50px">
            <span
              class="input-div mgl5"
              v-for="(item, index) in frozen.frozenList"
              :key="index"
            >
              <span style="marginLeft:8px">送检者{{ index + 1 }}、</span>
              <div
                class="input-div-context-short-60"
                style="width:150px;height:30px;textAlign:center"
              >
                <img
                  style="height:100%"
                  :src="item.sendDoc"
                  alt=""
                >
              </div>

              <span style="marginLeft:8px">报告接收者</span>
              <div
                class="input-div-context-short-60"
                style="width:150px;height:30px;textAlign:center"
              >
                <img
                  style="height:100%"
                  :src="item.receiveDoc"
                  alt=""
                >
              </div>
            </span>
          </div>
        </div>

        <div
          class="context1"
          style="marginTop:15px"
        >
          <span style="marginLeft:60px">
            <span>病理：</span>
            <span>无</span>
            <IsSelect
              :myselect="pathology.pathologyName === '1' ? true : false"
            />
            <span>有</span>
            <IsSelect
              :myselect="pathology.pathologyName === '2' ? true : false"
            />
            <span>数量：</span>
            <span>{{ pathology.pathologyCount }}</span>
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">送检医生</span>
            <div
              class="input-div-context-short"
              style="width:150px;height:30px;textAlign:center"
            >
              <img
                style="height:100%"
                :src="pathology.sendDoc"
                alt=""
              >
            </div>
          </span>
        </div>
        <div class="context1">
          <span>14、植入体：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <IsSelect :myselect="implants === '1' ? true : false" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <IsSelect :myselect="implants === '2' ? true : false" />
          </span>
          <span class="input-div mgl5">
            详见植入物使用登记单
          </span>
        </div>
        <div class="context1">
          <span>16、术中可观察的受压部位皮肤：</span>
        </div>
        <div class="context1">
          <table
            border="1"
            style="border-collapse:collapse;"
          >
            <tr>
              <th>
                <div class="table-th-time">
                  手术时间
                </div>
                <div class="line" />
                <div class="table-th-xiangmu">
                  项目
                </div>
              </th>
              <th>2小时</th>
              <th>4小时</th>
              <th>6小时</th>
              <th>8小时</th>
              <th>10小时</th>
              <th>12小时</th>
              <th>14小时</th>
              <th>16小时</th>
            </tr>
            <tr>
              <td style="textAlign:center">
                皮损情况
              </td>
              <td
                v-for="(item, index) in 8"
                :key="index"
              >
                <div>
                  <IsSelect
                    :myselect="
                      compressedSkin[item - 1].isFull === '1' ? true : false
                    "
                  />
                  <span>完整</span>
                </div>
                <div>
                  <IsSelect
                    :myselect="
                      compressedSkin[item - 1].isFull === '2' ? true : false
                    "
                  />
                  <span>皮损情况</span>
                </div>
                <div style="width:75px;word-break:break-all">
                  {{ compressedSkin[item - 1].skinStatus }}
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="context1 mgt10">
          <span>18、巡回护士签名：</span>
          <span class="input-div">
            <div
              class="input-div-context-short"
              style="width:150px;height:30px;textAlign:center"
            >
              <img
                :src="nursesSignature"
                style="height:100%"
                alt=""
              >
            </div>
          </span>
        </div>
        <div class="context1">
          <span>19、术中交接班：</span>
        </div>
        <div
          class="context1"
          style="marginLeft:80px"
        >
          <div>
            <span style="marginLeft:6px">
              <span>无</span>

              <IsSelect
                :myselect="opsChange.opsChangeName === '1' ? true : false"
              />
            </span>
            <span style="marginLeft:6px">
              <span>有</span>
              <IsSelect
                :myselect="opsChange.opsChangeName === '2' ? true : false"
              />
            </span>
          </div>
          <div>
            <div
              style="display:flex"
              v-for="(item, index) in opsChange.opsChangeList"
              :key="index"
            >
              <span class="input-div mgl5">
                <span style="marginLeft:8px">时间</span>
                <div
                  class="input-div-context-noborder"
                  style="width:140px;textAlign:center"
                >
                  {{ item.time }}
                </div>
              </span>
              <span class="input-div mgl5">
                <span style="marginLeft:8px">交班人签名</span>
                <div
                  class="input-div-context-noborder"
                  style="width:120px;height:30px;textAlign:center"
                >
                  <img
                    style="height:100%"
                    :src="item.jiaobrSign"
                    alt=""
                  >
                  <!-- 123 -->
                </div>
              </span>
              <span class="input-div mgl5">
                <span style="marginLeft:8px">接班人签名</span>
                <div
                  class="input-div-context-noborder"
                  style="width:140px;height:30px;textAlign:center"
                >
                  <img
                    style="height:100%"
                    :src="item.jiebrSign"
                    alt=""
                  >
                  <!-- 123 -->
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import IsSelect from './components/isSelect'
import { ipcRenderer } from 'electron'
export default {
  name: 'NursingDocumentTwo',
  data () {
    return {
      htmlTitle: '护理记录单(二)',
      form: {
        patient: '',
        opsDate: '',
        opsRoom: '',
        diagnosis: '',
        opsName: '',
        opsType: '',
        consciousness: '',

        skin: {
          // 皮肤评估
          skinDegree: '',
          skinLocate: '',
          skinName: ''
        },
        constraints: ''
      },
      catheter: {
        // 导尿管
        catheterName: '',
        catheterSign: '', // base64
        catheterType: '',
        catheterNature: ''
      },
      equipment: {
        // 设备使用
        electrotome: {}, // 电刀
        bhMachine: {
          bhMachineList: []
        }, // 血泵机器
        electrotomeLocation: '' // 电极板
      },
      rinse: {
        // 手术冲洗
        rinseName: '',
        rinseList: [],
        rinseStr: ''
      },
      waistPuncture: {
        // 腰穿留置
        waistPunctureName: '',
        operationDoc: '',
        needleTime: '',
        needleSign: '',
        needleHeartSign: '',
        needleHeartTime: ''
      },
      handOver: {
        // 术中特殊交接班
        handOverName: '',
        handOverRemarks: ''
      },
      opsChange: {
        // 术中交接班
        opsChangeName: '',
        opsChangeList: []
      },
      compressedSkin: [
        // 受压皮肤
        {
          isFull: '',
          skinStatus: ''
        },
        { isFull: '', skinStatus: '' },
        { isFull: '', skinStatus: '' },
        { isFull: '', skinStatus: '' },
        { isFull: '', skinStatus: '' },
        { isFull: '', skinStatus: '' },
        { isFull: '', skinStatus: '' },
        { isFull: '', skinStatus: '' }
      ],
      frozen: {
        // 术中冰冻
        frozenName: '',
        frozenList: []
      },
      pathology: {
        // 病理
        pathologyCount: '',
        pathologyName: '',
        sendDoc: ''
      },
      implants: '', // 植入体
      nursesSignature: '', // 护士qianm
      wenshuData: {},
      anesMethodOptionArr: [
        { text: '全麻', value: '1' },
        { text: '臂丛麻醉', value: '2' },
        { text: '硬膜外麻醉', value: '3' },
        { text: '丛麻醉', value: '4' },
        { text: '跟阻麻醉', value: '5' },
        { text: '静脉麻醉', value: '6' },
        { text: '腰麻', value: '7' },
        { text: '颈从麻醉', value: '8' },
        { text: '局麻监护', value: '9' },
        { text: '局麻', value: '10' },
        { text: '唤醒麻醉', value: '11' }
      ],
      selectAne: [],
      bodyOptionArr: [
        { text: '仰卧位', value: '1' },
        { text: '俯卧位', value: '2' },
        { text: '左侧卧位', value: '3' },
        { text: '右侧卧位', value: '4' },
        { text: '左侧俯卧位', value: '5' },
        { text: '右侧俯卧位', value: '6' },
        { text: '坐位', value: '7' },
        { text: '截石位', value: '8' }
      ],
      selectBody: [],
      deviceOption: [
        { text: '肩垫', value: '1' },
        { text: '腋垫', value: '2' },
        { text: '胸垫', value: '3' },
        { text: '背垫', value: '4' },
        { text: '腰垫', value: '5' },
        { text: '肘垫', value: '6' },
        { text: '两脚间垫', value: '7' },
        { text: '膝垫', value: '8' },
        { text: '后跟垫', value: '9' },
        { text: '其他', value: '10' },
        { text: '无', value: '11' }
      ],
      selectDev: [],
      arr: []
    }
  },
  mounted () {
    this.getWenShuData()
    Bus.$on('clickShuaXinTwo', res => {
      if (res === '1') {
        this.utilsDebounce(() => {
          this.getWenShuData()
        }, 200)
      } else if (res === '2') {
        this.utilsDebounce(() => {
          this.dayin()
        }, 200)
      } else if (res === '3') {
        this.htmlTitle =
          this.$store.state['nursing-document-list'].patientName +
          '护理记录单(二)'
        this.utilsDebounce(() => {
          //  this.getPdf('nursing-document-two')
          this.daochuPDF()
        }, 200)
      }
    })
  },
  methods: {
    dayin () {
      this.printCurrent()
    },
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('nursing-document-two')
        .outerHTML
      const options = { silent: true }
      // options = JSON.stringify(options)
      ipcRenderer.send(
        'printChannel',
        printHtml,
        'nursing-document-two.css',
        options
      )
    },
    daochuPDF () {
      const printHtml = document.getElementById('nursing-document-two')
        .outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      this.utilsDebounce(() => {
        ipcRenderer.send(
          'printpdfChannel',
          printHtml,
          'nursing-document-two.css',
          options
        )
      }, 1000)
    },
    getWenShuData () {
      let obj = {
        cureNo: this.$store.state['nursing-document-list'].cureNo,
        hospitalNo: this.$store.state['nursing-document-list'].hospitalNo,
        operSchNo: this.$store.state['nursing-document-list'].operSchNo

        // hospitalNo: 666,
        // cureNo: 1010
      }
      this.$store.dispatch('ReqNursingDocumentTwo', obj).then(res => {
        if (res.status === 200 && res.data.code === 200) {
          this.wenshuData = res.data.data
          console.log(this.wenshuData)
          this.form.patient =
            this.$store.state['nursing-document-list'].patientName +
            '-' +
            this.$store.state['nursing-document-list'].hospitalNo
          this.form.opsDate = this.wenshuData.opsDate
          this.form.opsRoom = this.wenshuData.opsRoom
          this.form.diagnosis = this.wenshuData.diagnosis
          this.form.opsName = this.wenshuData.opsName
          this.form.opsType = this.wenshuData.opsType
          this.form.consciousness = this.wenshuData.consciousness
          this.form.skin = this.wenshuData.skin
          this.form.constraints = this.wenshuData.constraints
          this.catheter = this.wenshuData.catheter
          this.equipment = this.wenshuData.equipment
          if (this.IsEmpty(this.equipment)) {
            this.equipment = {
              // 设备使用
              electrotome: {}, // 电刀
              bhMachine: {
                bhMachineList: []
              }, // 血泵机器
              electrotomeLocation: '' // 电极板
            }
          }
          if (!this.IsEmpty(this.wenshuData.rinse)) {
            this.rinse = this.wenshuData.rinse
            this.rinse.rinseStr = this.rinse.rinseList.join(',')
          }

          this.waistPuncture = this.wenshuData.waistPuncture
          this.opsChange = this.wenshuData.opsChange
          this.handOver = this.wenshuData.handOver
          this.frozen = this.wenshuData.frozen
          this.pathology = this.wenshuData.pathology
          this.implants = this.wenshuData.implants
          this.nursesSignature = this.wenshuData.nursesSignature
          this.compressedSkin = this.wenshuData.compressedSkin
          if (this.IsEmpty(this.compressedSkin)) {
            this.compressedSkin = [
              // 受压皮肤
              {
                isFull: '',
                skinStatus: ''
              },
              { isFull: '', skinStatus: '' },
              { isFull: '', skinStatus: '' },
              { isFull: '', skinStatus: '' },
              { isFull: '', skinStatus: '' },
              { isFull: '', skinStatus: '' },
              { isFull: '', skinStatus: '' },
              { isFull: '', skinStatus: '' }
            ]
          }
          // 判断麻醉方式数组
          if (!this.IsEmpty(this.wenshuData.anesthesiaMode)) {
            this.selectAne = []
            if (this.wenshuData.anesthesiaMode.includes(',')) {
              this.arr = []
              this.arr = this.wenshuData.anesthesiaMode.split(',')
            } else {
              this.arr = []
              this.arr.push(this.wenshuData.anesthesiaMode)
            }
            this.anesMethodOptionArr.forEach(item => {
              this.arr.forEach(v => {
                if (item.value === v) {
                  this.selectAne.push(item)
                }
              })
            })
          }
          // 判断手术体位
          if (!this.IsEmpty(this.wenshuData.position)) {
            this.selectBody = []
            if (this.wenshuData.position.includes(',')) {
              this.arr = []
              this.arr = this.wenshuData.position.split(',')
            } else {
              this.arr = []
              this.arr.push(this.wenshuData.position)
            }
            this.bodyOptionArr.forEach(item => {
              this.arr.forEach(v => {
                if (item.value === v) {
                  this.selectBody.push(item)
                }
              })
            })
          }

          // 判断体位装置
          if (!this.IsEmpty(this.wenshuData.device)) {
            this.selectDev = []
            if (this.wenshuData.device.includes(',')) {
              this.arr = []
              this.arr = this.wenshuData.device.split(',')
            } else {
              this.arr = []
              this.arr.push(this.wenshuData.device)
            }
            this.deviceOption.forEach(item => {
              this.arr.forEach(v => {
                if (item.value === v) {
                  this.selectDev.push(item)
                }
              })
            })
          }
        }
      })
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      if (value === '1') {
        return '左上肢'
      }
      if (value === '2') {
        return '左下肢'
      }
      if (value === '3') {
        return '右下肢'
      }
      if (value === '4') {
        return '右下肢'
      }
    }
  },
  components: {
    IsSelect
  }
}
</script>

<style scoped lang="scss">
@import './../../../styles/wenshu.scss';
.hulijilv-two-container {
  width: 824px;
  // height: 920px;
  min-width: 824px;
  min-height: 920px;
  background-color: #fff;
  padding: 10px;
  .container-title {
    // border-bottom: 1px solid #000;
    text-align: center;
    font-weight: 600;
    margin: 0 70px;
  }
  .wenben-content-info {
    display: flex;
    flex-direction: column;
    .info-content-title {
      text-align: center;
      letter-spacing: 5px;
      font-weight: 600;
      text-indent: 5px;
      font-size: 16px;
    }
    .info-content-form {
      padding-left: 15px;
    }
  }
  .info-content-container {
    margin-top: 25px;
    padding-left: 20px;
    font-size: 14px;
    .context1 {
      display: flex;
      table {
        tr {
          th {
            width: 85px;
            height: 70px;
            .table-th-time {
              width: 40px;
              position: relative;
              left: 40px;
            }
            .table-th-xiangmu {
              width: 40px;
            }
          }
          td {
            width: 85px;
            height: 70px;
            padding-left: 3px;
          }
        }
      }
    }
    .context2 {
      display: flex;
      // justify-content: center;
      .context2-box {
        font-size: 12px;
        width: 240px;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #000;
        padding: 5px;
        .box-row {
          width: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
.input-div {
  display: flex;
  .input-div-context {
    padding: 0 5px;
    width: 100px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-noborder {
    padding: 0 5px;
    width: 100px;
  }
  .input-div-context-short {
    padding: 0 5px;
    width: 80px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-short-60 {
    // padding: 0 5px;
    width: 60px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-short-140 {
    // padding: 0 5px;
    width: 150px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-long {
    padding: 0 5px;
    width: 380px;
    border-bottom: 1px solid #000;
  }
}
.mgt10 {
  margin-top: 10px;
}
.mgt20 {
  margin-top: 10px;
}
.mgl50 {
  margin-left: 50px;
}
.mgl5 {
  margin-left: 5px;
}
.line {
  width: 84px;
  height: 1px;
  background-color: #000;
  transform: rotate(-140deg);
  // width: 110px;
}
.row {
  width: 100%;
  display: flex;
  height: 28px;
  padding-left: 10px;
}
.col {
  display: flex;
  font-size: 14px;
  width: 30%;
  flex-wrap: nowrap;
}
.col-20 {
  display: flex;
  font-size: 14px;
  width: 20%;
  flex-wrap: nowrap;
}

.col-40 {
  display: flex;
  font-size: 14px;
  flex-wrap: nowrap;
  width: 40%;
}
.col-45 {
  display: flex;
  font-size: 14px;
  flex-wrap: nowrap;
  width: 45%;
}
.col-50 {
  display: flex;
  font-size: 14px;
  width: 50%;
  flex-wrap: nowrap;
}
.col-70 {
  display: flex;
  font-size: 14px;
  width: 70%;
  flex-wrap: nowrap;
}

.row-lable {
  width: 135px;
  line-height: 28px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.row-text {
  line-height: 28px;
  width: 100%;
  padding: 0 10px;
  height: 25px;
  text-align: center;
  border-bottom: 1px solid;
}
</style>
