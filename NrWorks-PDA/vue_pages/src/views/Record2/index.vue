<template>
  <div class="record2">
    <van-nav-bar
      title="护理记录单(二)"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="保存"
    >
    </van-nav-bar>
    <PatientCard></PatientCard>
    <div class="list">
      <van-cell-group>
        <van-cell title="手术科室：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.deptName"/>
          </template>
        </van-cell>
        <van-cell title="手术方式：" value="内容" title-class="left-title" value-class="right-value">
          <template #right-icon>
            <van-field v-model="recordForm.opsName"/>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top:15px;">
        <van-cell title="手术类型：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.opsType" :options="typeOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术前意识评估：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.consciousness" :options="consciousnessOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术前皮肤评估：" value="内容">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.skin.skinName" :options="skinOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <div v-show="recordForm.skin.skinName === '2'">
          <van-cell title="部位：" value="内容" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.skin.skinLocate"/>
            </template>
          </van-cell>
          <van-cell title="程度：" value="内容" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.skin.skinDegree"/>
            </template>
          </van-cell>
        </div>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="麻醉方式：" title-class="left-title" value-class="right-value multipul-select" value="内容" @click="handleShowDialog({list:'anesMethodOptions',model:'anesthesiaMode',title:'麻醉方式'})">
          <template #right-icon>
            <span class="mul-ellipsis">{{handleFilterLabel({list:'anesMethodOptions',value:'anesthesiaMode'})}}</span>
            <!-- <van-icon name="play"/> -->
          </template>
        </van-cell>
        <van-cell title="手术体位：" title-class="left-title" value-class="right-value multipul-select" value="内容" @click="handleShowDialog({list:'bodyOptions',model:'position',title:'手术体位'})">
          <template #right-icon>
            <span class="mul-ellipsis">{{handleFilterLabel({list:'bodyOptions',value:'position'})}}</span>
            <!-- <van-icon name="play"/> -->
          </template>
        </van-cell>
        <van-cell title="体位装置：" title-class="left-title" value-class="right-value multipul-select" value="内容" @click="handleShowDialog({list:'deviceOptions',model:'device',title:'体位装置'})">
          <template #right-icon>
            <span class="mul-ellipsis">{{handleFilterLabel({list:'deviceOptions',value:'device'})}}</span>
            <!-- <van-icon name="play"/> -->
          </template>
        </van-cell>
        <van-cell title="约束带：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.constraints" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="导尿管：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.catheter.catheterName" :options="catheterOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <div v-show="recordForm.catheter.catheterName==='2' || recordForm.catheter.catheterName==='3'">
          <van-cell title="型号：" value="" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.catheter.catheterType"/>
            </template>
          </van-cell>
          <van-cell title="尿液性质：" value="" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.catheter.catheterNature"/>
            </template>
          </van-cell>
          <van-cell title="插入者" title-class="sign-title" @click="handleShowSignature('catheterSign')"></van-cell>
          <div style="padding:0 16px;">
            <div class="signatureImage-content" v-if="recordForm.catheter.catheterSign!==''">
              <img :src="recordForm.catheter.catheterSign" alt="" class="signatureImage">
            </div>
          </div>
        </div>
        <van-cell title="电刀：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.electrotome.electrotomeName" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="电切功率：" value="" v-show="recordForm.electrotome.electrotomeName==='2'">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.electrotome.electrotomeDQ" :options="wOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="电凝功率：" value="" v-show="recordForm.electrotome.electrotomeName==='2'">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF" >
              <van-dropdown-item v-model="recordForm.electrotome.electrotomeDN" :options="wOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="电极板位置：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.equipment.electrotomeLocation" :options="djbOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="气囊止血机：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.bhMachine.bhMachineName" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <div v-show="recordForm.bhMachine.bhMachineName==='2'">
          <template v-for="(item,index) in recordForm.bhMachine.bhMachineList">
            <van-cell :title="'部位'+(index+1)" :key="'locate'+index" >
              <template #right-icon>
                <van-dropdown-menu active-color="#3478FF">
                  <van-dropdown-item v-model="item.locateName" :options="locationOptions" />
                </van-dropdown-menu>
              </template>
            </van-cell>
            <van-cell class="presure" :key="'presure'+index" title="" v-show="recordForm.bhMachine.bhMachineList[index].locateName!==''">
              <template #right-icon>
                <van-dropdown-menu active-color="#3478FF">
                  <van-dropdown-item v-model="item.presure" :options="presureOptions" />
                </van-dropdown-menu>
              </template>
            </van-cell>
            <van-cell :key="'presureValue'+index" :title="item.presure" v-show="recordForm.bhMachine.bhMachineList[index].presure!==''">
              <template #right-icon>
                <van-dropdown-menu active-color="#3478FF">
                  <van-dropdown-item v-model="item.presureValue" :options="presureValueList" />
                </van-dropdown-menu>
              </template>
            </van-cell>
          </template>
          <template v-for="(item,index) in recordForm.bhMachine.bhMachineList">
            <van-cell :title="(index+1)+'('+'部位'+(index+1)+')'" :key="'locate'+index" style="background:#e2e2e2;">
            </van-cell>
            <van-cell title="充气时间" :key="'cq'+index" :value="formatTime(recordForm.bhMachine.bhMachineList[index].cqTime)" @click="handleShowTime('cqTime'+index)">
            </van-cell>
            <van-cell title="签名" title-class="sign-title" :key="'cqsign'+index" @click="handleShowSignature('cqSign'+index)">
            </van-cell>
            <!-- <div :key="'cqsignImage'+index" v-if="item.cqSign!==''" style="text-align:center;">
              <img :src="item.cqSign" alt="" class="signatureImage">
            </div> -->
            <div style="padding:0 16px;" :key="'cqsignImage'+index" v-if="item.cqSign!==''">
              <div class="signatureImage-content" v-if="item.cqSign!==''">
                <img :src="item.cqSign" alt="" class="signatureImage">
              </div>
            </div>
            <van-cell title="放气时间" :key="'fq'+index" @click="handleShowTime('fqTime'+index)" :value="formatTime(recordForm.bhMachine.bhMachineList[index].fqTime)">
            </van-cell>
            <van-cell title="签名" title-class="sign-title" :key="'fqsign'+index" @click="handleShowSignature('fqSign'+index)">
            </van-cell>
            <!-- <div :key="'fqsignImage'+index" v-if="item.fqSign!==''" style="text-align:center;">
              <img :src="item.fqSign" alt="" class="signatureImage">
            </div> -->
            <div style="padding:0 16px;" :key="'fqsignImage'+index" v-if="item.fqSign!==''">
              <div class="signatureImage-content" v-if="item.cqSign!==''">
                <img :src="item.fqSign" alt="" class="signatureImage">
              </div>
            </div>
          </template>
        </div>
        <van-cell title="术中冲洗：" title-class="left-title" value-class="right-value multipul-select" value="" @click="handleShowDialog({list:'szcxOptions',model:'rinseList',title:'术中冲洗'})">
          <template #right-icon>
            <span class="mul-ellipsis">{{handleFilterLabel({list:'szcxOptions',value:'rinseList'})}}</span>
            <!-- <van-icon name="play"/> -->
          </template>
        </van-cell>
        <div v-show="recordForm.rinse.rinseList.indexOf('3')!==-1">
          <van-cell title="药液1：" value="" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.rinse.liquidMedicine1"/>
            </template>
          </van-cell>
          <van-cell title="药液2：" value="" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.rinse.liquidMedicine2"/>
            </template>
          </van-cell>
          <van-cell title="药液3：" value="" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.rinse.liquidMedicine3"/>
            </template>
          </van-cell>
          <van-cell title="药液4：" value="" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="recordForm.rinse.liquidMedicine4"/>
            </template>
          </van-cell>
        </div>
        <van-cell title="腰穿留置：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.waistPuncture.waistPunctureName" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <div v-show="recordForm.waistPuncture.waistPunctureName==='2'">
          <van-cell title="操作者" title-class="sign-title" @click="handleShowSignature('operationDoc')"></van-cell>
          <!-- <div v-if="recordForm.waistPuncture.operationDoc!==''" style="text-align:center;">
            <img :src="recordForm.waistPuncture.operationDoc" alt="" class="signatureImage">
          </div> -->
          <div style="padding:0 16px;" v-if="recordForm.waistPuncture.operationDoc!==''">
            <div class="signatureImage-content" v-if="recordForm.waistPuncture.operationDoc!==''">
              <img :src="recordForm.waistPuncture.operationDoc" alt="" class="signatureImage">
            </div>
          </div>
          <van-cell title="拔针心时间" @click="handleShowTime('needleHeartTime')" :value="formatTime(recordForm.waistPuncture.needleHeartTime)"></van-cell>
          <van-cell title="签名" title-class="sign-title" @click="handleShowSignature('needleHeartSign')"></van-cell>
          <!-- <div v-if="recordForm.waistPuncture.needleHeartSign!==''" style="text-align:center;">
            <img :src="recordForm.waistPuncture.needleHeartSign" alt="" class="signatureImage">
          </div> -->
          <div style="padding:0 16px;" v-if="recordForm.waistPuncture.needleHeartSign!==''">
            <div class="signatureImage-content" v-if="recordForm.waistPuncture.needleHeartSign!==''">
              <img :src="recordForm.waistPuncture.needleHeartSign" alt="" class="signatureImage">
            </div>
          </div>
          <van-cell title="拔针时间" @click="handleShowTime('needleTime')" :value="formatTime(recordForm.waistPuncture.needleTime)"></van-cell>
          <van-cell title="签名" title-class="sign-title" @click="handleShowSignature('needleSign')"></van-cell>
          <!-- <div v-if="recordForm.waistPuncture.needleSign!==''" style="text-align:center;">
            <img :src="recordForm.waistPuncture.needleSign" alt="" class="signatureImage">
          </div> -->
          <div style="padding:0 16px;" v-if="recordForm.waistPuncture.needleSign!==''">
            <div class="signatureImage-content" v-if="recordForm.waistPuncture.needleSign!==''">
              <img :src="recordForm.waistPuncture.needleSign" alt="" class="signatureImage">
            </div>
          </div>
        </div>
        <van-cell title="术中特殊交班：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.handOver.handOverName" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="特殊交班备注：" value="" v-show="recordForm.handOver.handOverName==='2'" >
          <template #right-icon>
            <van-field v-model="recordForm.handOver.handOverRemarks" />
          </template>
        </van-cell>
        <van-cell title="术中冰冻：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.frozen.frozenName" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <div v-show="recordForm.frozen.frozenName==='2'">
          <template v-for="(item,index) in recordForm.frozen.frozenList">
            <van-cell :title="(index+1)+'.'" :key="item.sendDoc" style="background:#e2e2e2;"> </van-cell>
            <van-cell title="送验者" :key="item.sendDoc" title-class="sign-title" @click="handleShowSignature('sendTestDoc'+index)"></van-cell>
            <!-- <div v-if="item.sendDoc!==''" :key="item.sendDoc" style="text-align:center;">
              <img :src="item.sendDoc" alt="" class="signatureImage">
            </div> -->
            <div style="padding:0 16px;" v-if="item.sendDoc!==''" :key="item.sendDoc">
              <div class="signatureImage-content" v-if="item.sendDoc!==''">
                <img :src="item.sendDoc" alt="" class="signatureImage">
              </div>
            </div>
            <van-cell title="报告接收者" :key="item.receiveDoc" title-class="sign-title" @click="handleShowSignature('receiveDoc'+index)"></van-cell>
            <!-- <div v-if="item.receiveDoc!==''" :key="item.receiveDoc" style="text-align:center;">
              <img :src="item.receiveDoc" alt="" class="signatureImage">
            </div> -->
            <div style="padding:0 16px;" v-if="item.receiveDoc!==''" :key="item.receiveDoc">
              <div class="signatureImage-content" v-if="item.receiveDoc!==''">
                <img :src="item.receiveDoc" alt="" class="signatureImage">
              </div>
            </div>
          </template>
        </div>
        <van-cell title="病理：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.pathology.pathologyName" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="数量：" v-show="recordForm.pathology.pathologyName==='2'">
            <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.pathologyCount" :options="pathologyList" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell v-show="recordForm.pathology.pathologyName==='2'" title="送验医生签名" title-class="sign-title" @click="handleShowSignature('sendDoc')"></van-cell>
        <!-- <div v-if="recordForm.pathology.pathologyName==='2'&&recordForm.pathology.sendDoc!==''" style="text-align:center;">
          <img :src="recordForm.pathology.sendDoc" alt="" class="signatureImage">
        </div> -->
        <div style="padding:0 16px;" v-if="recordForm.pathology.pathologyName==='2'&&recordForm.pathology.sendDoc!==''">
          <div class="signatureImage-content" v-if="recordForm.pathology.pathologyName==='2'&&recordForm.pathology.sendDoc!==''">
            <img :src="recordForm.pathology.sendDoc" alt="" class="signatureImage">
          </div>
        </div>
        <van-cell title="植入物：" value="">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF">
              <van-dropdown-item v-model="recordForm.implants" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell title="术中可观察的受压部位皮肤：" style="background:#E8E8E8;">
        </van-cell>
        <template v-for="(item,index) in recordForm.compressedSkin">
          <van-cell :title="(2+index*2)+'小时'" value="" :key="'hour'+index">
            <template #right-icon>
              <van-dropdown-menu active-color="#3478FF">
                <van-dropdown-item v-model="item.isFull" :options="skinOptions" />
              </van-dropdown-menu>
            </template>
          </van-cell>
          <van-cell v-show="item.isFull === '2'" title="皮损情况：" :key="'hour'+item" value="" title-class="left-title" value-class="right-value">
            <template #right-icon>
              <van-field v-model="item.skinStatus"/>
            </template>
          </van-cell>
        </template>
      </van-cell-group>
      <van-cell-group class="sign-area">
        <van-cell title="巡回护士签名" title-class="sign-title" @click="handleShowSignature('nursesSignature')"></van-cell>
        <!-- <div v-if="recordForm.nursesSignature!==''" style="text-align:center;">
          <img :src="recordForm.nursesSignature" alt="" class="signatureImage">
        </div> -->
        <div style="padding:0 16px;" v-if="recordForm.nursesSignature!==''">
          <div class="signatureImage-content" v-if="recordForm.nursesSignature!==''">
            <img :src="recordForm.nursesSignature" alt="" class="signatureImage">
          </div>
        </div>
        <van-cell title="术中交接班">
          <template #right-icon>
            <van-dropdown-menu active-color="#3478FF" direction="up" class="van-dropdown-menu__title_top">
              <van-dropdown-item v-model="recordForm.opsChange.opsChangeName" :options="constraintOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <template v-for="(item,index) in recordForm.opsChange.opsChangeList">
          <van-cell v-show="recordForm.opsChange.opsChangeName==='2'" title="时间" :key="'time'+index" :value="formatTime(recordForm.opsChange.opsChangeList[index].time)" @click="handleShowTime('opsChangeList'+index)"></van-cell>
          <van-cell v-show="recordForm.opsChange.opsChangeName==='2'" title="交班人签名" :key="'jiaobr'+index" title-class="sign-title" @click="handleShowSignature('jiaobrSign'+index)"></van-cell>
          <!-- <div v-if="recordForm.opsChange.opsChangeName==='2'&&recordForm.opsChange.opsChangeList[index].jiaobrSign!==''" style="text-align:center;" :key="'jiebr'+index">
            <img :src="recordForm.opsChange.opsChangeList[index].jiaobrSign" alt="" class="signatureImage">
          </div> -->
          <div style="padding:0 16px;" v-if="recordForm.opsChange.opsChangeName==='2'&&recordForm.opsChange.opsChangeList[index].jiaobrSign!==''" :key="'jiebr'+index">
            <div class="signatureImage-content" v-if="recordForm.nursesSignature!==''">
              <img :src="recordForm.opsChange.opsChangeList[index].jiaobrSign" alt="" class="signatureImage">
            </div>
          </div>
          <van-cell v-show="recordForm.opsChange.opsChangeName==='2'" title="接班人签名" :key="'jbr'+index" title-class="sign-title" @click="handleShowSignature('jiebrSign'+index)"></van-cell>
          <!-- <div v-if="recordForm.opsChange.opsChangeName==='2'&&recordForm.opsChange.opsChangeList[index].jiebrSign" style="text-align:center;" :key="'jbr'+index">
            <img :src="recordForm.opsChange.opsChangeList[index].jiebrSign" alt="" class="signatureImage">
          </div> -->
          <div style="padding:0 16px;" v-if="recordForm.opsChange.opsChangeName==='2'&&recordForm.opsChange.opsChangeList[index].jiebrSign" :key="'jbr'+index">
            <div class="signatureImage-content" v-if="recordForm.nursesSignature!==''">
              <img :src="recordForm.opsChange.opsChangeList[index].jiebrSign" alt="" class="signatureImage">
            </div>
          </div>
        </template>
      </van-cell-group>
      <van-dialog width="80%" v-model="showDialog" show-cancel-button
      :title="dialogTitle" :before-close="handleCloseDialog" @confirm="handleDialogConfirm">
        <div class="dialog-checkbox">
          <van-checkbox-group v-model="result">
            <van-checkbox v-for="item in checkBoxList" :key="item.value" :name="item.value" shape="square">{{item.text}}</van-checkbox>
          </van-checkbox-group>
        </div>
      </van-dialog>
    </div>
    <van-action-sheet v-model="timeVisible">
      <template slot="default">
        <van-datetime-picker
            v-if="timeVisible"
            v-model="currentDate"
            @cancel="handleCancel"
            @confirm="handleConfirm"
            item-height="60"
            type="datetime"
            title="选择完整时间"
        />
      </template>
    </van-action-sheet>
    <signature :visible="visible" v-if="visible" @handleClose="handleCloseSignature" @handleSubmit="handleSubmitImage"/>
  </div>
</template>

<script>
import Signature from '@/components/Signature'
import PatientCard from '@/components/PatientCard'
import request from '@/utils/request'
import {submitRecord, getRecordData} from '@/api/nursing-record'
import {mapState} from 'vuex'
import $bus from '@/utils/bus'
import moment from 'moment'
export default {
  name: 'Record2',
  data () {
    return {
      checked: true,
      currentTime: '',
      currentDate: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      visible: false,
      timeVisible: false,
      input: '',
      checkBoxList: [],
      dialogTitle: '',
      showDialog: false,
      showFullSkin: false,
      currenSign: '',
      value1: '',
      option: [
        { text: 'PACU', value: '1' },
        { text: '病房', value: '2' },
        { text: 'ICU病房', value: '3' },
        { text: '急诊', value: '4' },
        { text: '离院', value: '5' }
      ],
      result: [],
      // 电极板
      djbOptions: [{text: '大腿', value: '1'}, {text: '小腿', value: '2'}, {text: '臀部', value: '3'}, {text: '其它', value: '4'}, {text: '负极返回路垫', value: '5'}, {text: '无', value: '6'}, {text: '', value: ''}],
      wOptions: [],
      // 术中冲洗
      szcxOptions: [{text: '0.9%氯化钠溶液', value: '1'}, {text: '灭菌注射用水', value: '2'}, {text: '药液', value: '3'}],
      // 病理数量
      pathologyList: [{text: '1', value: '1'}, {text: '2', value: '2'}, {text: '3', value: '3'}, {text: '4', value: '4'}, {text: '5', value: '5'}, {text: '6', value: '6'}, {text: '7', value: '7'}, {text: '8', value: '8'}, {text: '9', value: '9'}, {text: '10', value: '10'}, {text: '', value: ''}],
      catheterOptions: [{text: '无', value: '1'}, {text: '病房带入', value: '2'}, {text: '手术室插入', value: '3'}, {text: '', value: ''}],
      constraintOptions: [{value: '1', text: '无'}, {value: '2', text: '有'}, {value: '', text: ''}], // 约束带
      bodyOptions: [{text: '仰卧位', value: '1'},
        {text: '俯卧位', value: '2'},
        {text: '左侧卧位', value: '3'},
        {text: '右侧卧位', value: '4'},
        {text: '左侧俯卧位', value: '5'},
        {text: '右侧俯卧位', value: '6'},
        {text: '坐位', value: '7'},
        {text: '俯卧位', value: '8'}
      ],
      presureValueList: [],
      presureOptions: [{text: 'kPa', value: 'kPa'}, {text: 'mmHg', value: 'mmHg'}, {text: '', value: ''}],
      deviceOptions: [
        {text: '肩垫', value: '1'},
        {text: '腋垫', value: '2'},
        {text: '胸垫', value: '3'},
        {text: '背垫', value: '4'},
        {text: '腰垫', value: '5'},
        {text: '肘垫', value: '6'},
        {text: '两脚间垫', value: '7'},
        {text: '膝垫', value: '8'},
        {text: '后跟垫', value: '9'},
        {text: '其他', value: '10'},
        {text: '无', value: '11'}
      ],
      anesMethodOptions: [{text: '全麻', value: '1'}, {text: '臂丛麻醉', value: '2'}, {text: '硬膜外麻醉', value: '3'},
        {text: '丛麻醉', value: '4'}, {text: '跟阻麻醉', value: '5'}, {text: '静脉麻醉', value: '6'}, {text: '腰麻', value: '7'},
        {text: '颈从麻醉', value: '8'}, {text: '局麻监护', value: '9'}, {text: '局麻', value: '10'}, {text: '唤醒麻醉', value: '11'}],
      typeOptions: [
        {
          text: '择期',
          value: '1'
        },
        {
          text: '非择期',
          value: '2'
        },
        {
          text: '急诊',
          value: '3'
        },
        {
          text: '',
          value: ''
        }
      ],
      skinOptions: [{text: '完整', value: '1'}, {text: '不完整', value: '2'}, {text: '', value: ''}],
      locationOptions: [{text: '左上肢', value: '1'}, {text: '左下肢', value: '2'}, {text: '右上肢', value: '3'}, {text: '右下肢', value: '4'}, {text: '', value: ''}],
      consciousnessOptions: [{text: '清醒', value: '1'}, {text: '烦躁', value: '2'}, {text: '昏迷', value: '3'}, {text: '', value: ''}],
      recordForm: {
        anesthesiaMode: [],
        catheter: {
          // 导管
          catheterName: '', // 插管类型
          catheterSign: '', // 插管人姓名
          catheterType: '',
          catheterNature: ''
        },
        // 电刀
        electrotome: {
          electrotomeDQ: '', // 电切功率
          electrotomeDN: '', // 电凝功率
          electrotomeName: ''
        }, // 电刀名称
        bhMachine: {
          bhMachineName: '',
          bhMachineList: [
            {presure: '', presureValue: '', locateName: '', cqTime: '', cqSign: '', fqTime: '', fqSign: ''},
            {presure: '', presureValue: '', locateName: '', cqTime: '', cqSign: '', fqTime: '', fqSign: ''},
            {presure: '', presureValue: '', locateName: '', cqTime: '', cqSign: '', fqTime: '', fqSign: ''}]
        },
        compressedSkin: [], // 受压皮肤
        consciousness: '',
        constraints: '',
        cureNo: '',
        deptName: '',
        device: [], // 体位装置
        diagnosis: '',
        equipment: {
          // 电极板位置
          electrotomeLocation: ''
        },
        frozen: {
          frozenName: '',
          frozenList: [{sendDoc: '', receiveDoc: ''}, {sendDoc: '', receiveDoc: ''}, {sendDoc: '', receiveDoc: ''}, {sendDoc: '', receiveDoc: ''}, {sendDoc: '', receiveDoc: ''}]
        },
        handOver: {
          handOverName: '',
          handOverRemarks: ''
        },
        implants: '',
        nursesSignature: '',
        opsChange: {
          opsChangeName: '',
          opsChangeList: [{time: moment(new Date()).format('YYYY-MM-DD HH:mm'), jiaobrSign: '', jiebrSign: ''}, {time: moment(new Date()).format('YYYY-MM-DD HH:mm'), jiaobrSign: '', jiebrSign: ''}]
        },
        opsMode: '',
        opsType: '',
        pathology: {
          pathologyName: '',
          pathologyCount: '',
          sendDoc: ''
        },
        patientName: '',
        position: [],
        rinse: {
          rinseName: '',
          rinseList: [],
          liquidMedicine1: '',
          liquidMedicine2: '',
          liquidMedicine3: '',
          liquidMedicine4: ''
        },
        skin: {
          skinName: '',
          skinLocate: '',
          skinDegree: ''
        },
        waistPuncture: {
          waistPunctureName: '',
          operationDoc: '',
          needleHeartTime: '',
          needleTime: '',
          needleSign: '',
          needleHeartSign: ''
        }
      }
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  components: {
    Signature, PatientCard
  },
  created () {
    this.handleOpenConstraint()
    for (let i = 1; i <= 8; i++) {
      this.recordForm.compressedSkin.push({isFull: '', skinStatus: ''})
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    formatTime (time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    },
    handleFilterLabel (obj) {
      let str = ''
      var reg = /,$/gi
      // setTimeout(() => {
      if (this.recordForm[obj.value] !== '' && obj.value !== 'rinseList') {
        this[obj.list].forEach(item => {
          this.recordForm[obj.value].forEach(_item => {
            if (item.value === _item) {
              str = str + item.text + ','
            }
          })
        })
        return str.replace(reg, '')
      } else if (this.recordForm.rinse[obj.value] !== '' && obj.value === 'rinseList') {
        this[obj.list].forEach(item => {
          this.recordForm.rinse.rinseList.forEach(_item => {
            if (item.value === _item) {
              str = str + item.text + ','
            }
          })
        })
        return str.replace(reg, '')
      } else {
        return ''
      }
      // }, 10)
    },
    handleShowTime (param) {
      if (param.indexOf('opsChangeList') !== -1) {
        let index = parseInt(param.substr(param.length - 1, 1))
        this.currentDate = moment(this.recordForm.opsChange.opsChangeList[index].time).toDate()
      } else if (param.indexOf('cqTime') !== -1) {
        let index = parseInt(param.substr(param.length - 1, 1))
        this.currentDate = moment(this.recordForm.bhMachine.bhMachineList[index].cqTime).toDate()
      } else if (param.indexOf('fqTime') !== -1) {
        let index = parseInt(param.substr(param.length - 1, 1))
        this.currentDate = moment(this.recordForm.bhMachine.bhMachineList[index].fqTime).toDate()
      } else {
        this.currentDate = moment(this.recordForm.waistPuncture[param]).toDate()
      }
      this.currentTime = param
      this.timeVisible = true
    },
    handleConfirm (value) {
      if (this.currentTime.indexOf('opsChangeList') !== -1) {
        let index = parseInt(this.currentTime.substr(this.currentTime.length - 1, 1))
        this.recordForm.opsChange.opsChangeList[index].time = moment(value).format('YYYY-MM-DD HH:mm')
      } else if (this.currentTime.indexOf('cqTime') !== -1) {
        let index = parseInt(this.currentTime.substr(this.currentTime.length - 1, 1))
        this.recordForm.bhMachine.bhMachineList[index].cqTime = moment(value).format('YYYY-MM-DD HH:mm')
      } else if (this.currentTime.indexOf('fqTime') !== -1) {
        let index = parseInt(this.currentTime.substr(this.currentTime.length - 1, 1))
        this.recordForm.bhMachine.bhMachineList[index].fqTime = moment(value).format('YYYY-MM-DD HH:mm')
      } else {
        this.recordForm.waistPuncture[this.currentTime] = moment(value).format('YYYY-MM-DD HH:mm')
      }
      this.timeVisible = false
    },
    handleCancel () {
      this.timeVisible = false
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      var reg = /,$/gi
      this.recordForm.equipment.electrotome = this.recordForm.electrotome
      // this.recordForm.equipment.electrotomeLocation = this.recordForm.electrotomeLocation
      this.recordForm.equipment.bhMachine = this.recordForm.bhMachine
      this.recordForm.admitNo = this.patientInfo.admitNo
      this.recordForm.cureNo = this.patientInfo.cureNo
      this.recordForm.skin = this.recordForm.skin
      this.recordForm.hospitalNo = this.patientInfo.hospitalNo
      this.recordForm.recordTwoState = '2'
      this.recordForm.device = this.recordForm.device.length > 0 ? this.recordForm.device.join(',').replace(reg, '') : ''
      this.recordForm.position = this.recordForm.position.join(',').replace(reg, '')
      this.recordForm.anesthesiaMode = this.recordForm.anesthesiaMode.join(',').replace(reg, '')
      request({
        method: 'post',
        url: submitRecord,
        data: this.recordForm
      }).then(res => {
        if (res.data.code === 200) {
          this.$notify({type: 'success', message: '保存成功'})
          // this.recordForm.anesthesiaMode = this.recordForm.anesthesiaMode.split(',')
          $bus.$emit('getPatientDataUpdate')
          this.getData()
        }
      })
    },
    getData () {
      request({
        url: getRecordData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}`,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        if (data.recordTwoState !== '0') {
          if (!this.IsEmpty(data.equipment)) {
            data.electrotome = data.equipment.electrotome
            // this.recordForm.electrotomeLocation = JSON.parse(JSON.stringify(this.recordForm.equipment.electrotomeLocation))
            data.bhMachine = data.equipment.bhMachine
          }
          data.anesthesiaMode = data.anesthesiaMode.split(',')
          data.position = data.position.split(',')
          data.device = data.device.split(',')
          this.recordForm = data
        }
      })
    },
    handleOpenConstraint () {
      let arr = []
      for (var i = 20; i <= 160; i++) {
        arr.push({text: i, value: i})
      }
      for (var j = 200; j <= 300; j++) {
        this.presureValueList.push({text: j, value: j})
      }
      this.presureValueList.push({text: '', value: ''})
      arr.push({text: '', value: ''})
      this.wOptions = arr
    },
    handleShowSignature (param) {
      this.currenSign = param
      this.visible = true
    },
    handleCloseSignature () {
      this.visible = false
    },
    handleCloseDialog (action, done) {
      done()
    },
    handleDialogConfirm () {
      switch (this.dialogTitle) {
        case '导管':
          this.recordForm.catheter = this.result
          break
        case '留置导管固定畅通':
          this.recordForm.conduit = this.result
          break
        case '术中冲洗':
          this.recordForm.rinse.rinseList = this.result
          break
        case '手术体位':
          this.recordForm.position = this.result
          break
        case '麻醉方式':
          this.recordForm.anesthesiaMode = this.result
          break
        case '体位装置':
          this.recordForm.device = this.result
          break
      }
    },
    handleSubmitImage (image) {
      if (this.currenSign.indexOf('jiebrSign') !== -1 || this.currenSign.indexOf('jiaobrSign') !== -1) {
        let index = parseInt(this.currenSign.substr(this.currenSign.length - 1, 1))
        if (this.currenSign.indexOf('jiebrSign') !== -1) {
          this.recordForm.opsChange.opsChangeList[index].jiebrSign = image
        } else {
          this.recordForm.opsChange.opsChangeList[index].jiaobrSign = image
        }
      } else if (this.currenSign.indexOf('cq') !== -1 || this.currenSign.indexOf('fq') !== -1) {
        let index = parseInt(this.currenSign.substr(this.currenSign.length - 1, 1))
        if (this.currenSign.indexOf('cq') !== -1) {
          this.recordForm.bhMachine.bhMachineList[index].cqSign = image
        } else {
          this.recordForm.bhMachine.bhMachineList[index].fqSign = image
        }
      } else if (this.currenSign === 'catheterSign') {
        this.recordForm.catheter.catheterSign = image
      } else if (this.currenSign === 'operationDoc') {
        this.recordForm.waistPuncture.operationDoc = image
      } else if (this.currenSign === 'needleHeartSign') {
        this.recordForm.waistPuncture.needleHeartSign = image
      } else if (this.currenSign === 'needleSign') {
        this.recordForm.waistPuncture.needleSign = image
      } else if (this.currenSign === 'sendDoc') {
        this.recordForm.pathology.sendDoc = image
      } else if (this.currenSign.indexOf('receiveDoc') !== -1 || this.currenSign.indexOf('sendTestDoc') !== -1) {
        let index = parseInt(this.currenSign.substr(this.currenSign.length - 1, 1))
        if (this.currenSign.indexOf('receiveDoc') !== -1) {
          this.recordForm.frozen.frozenList[index].receiveDoc = image
        } else {
          this.recordForm.frozen.frozenList[index].sendDoc = image
        }
      } else {
        this.recordForm[this.currenSign] = image
      }
    },
    handleChange () {
      this.showFullSkin = !this.showFullSkin
    },
    handleShowDialog (obj) {
      this.dialogTitle = obj.title
      if (obj.title === '术中冲洗') {
        this.result = this.recordForm.rinse.rinseList
      } else {
        this.result = this.recordForm[obj.model]
      }
      this.checkBoxList = this[obj.list]
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .record2{
    height: 100%;
    .van-nav-bar{
      height: 100px;
      background: linear-gradient(90deg, #666666, #303030);
      /deep/ .van-nav-bar__title{
        color:#ffffff;
        font-size: 34px;
        line-height: 100px;
      }
      /deep/ .van-nav-bar__text{
        color: #ffffff;
        font-size: 30px;
      }
      /deep/ .van-icon-arrow-left{
        color: #ffffff;
        font-size: 36px;
      }
    }
    .list{
      height:calc(100% - 324px);
      overflow-y: auto;
    }
    .van-cell{
      line-height: 94px;
      color: #2E2E2E;
      font-size: 30px;
      &::after{
        border-color: #E2E2E2;
      }
      &.presure{
        height: 104px !important;
      }
      .first-cell{
        flex: unset;
      }
      .left-title{
        flex: unset;
      }
      .right-value{
        .van-field{
          padding-top: 0;
          padding-bottom: 0;
        }
      }
      .van-dropdown-menu{
        height: 100%;
        /deep/ .van-dropdown-menu__bar{
          height: 100%;
          box-shadow: unset;
        }
        /deep/ .van-dropdown-menu__item{
          justify-content: flex-end;
        }
        /deep/ .van-dropdown-menu__title{
          font-size: 30px;
          line-height: unset;
          padding-right: 30px;
          &::after{
            border-color: transparent transparent  #808080 #808080;
            border-width: 6px;
            // margin-top: -6px;
            right: 5px;
          }
        }
        /deep/ .van-dropdown-item__option{
          font-size: 30px;
          line-height: 60px;
        }
      }
      /deep/ .van-icon-play{
        transform: rotate(90deg);
        font-size: 20px;
        vertical-align: middle;
      }
    }
    .van-cell{
      .van-cell__value{
        color: #7F7F7F;
      }
      .sign-title{
        color: #32db64;
      }
    }
    .van-cell-group{
      &.sign-area{
        margin-top: 15px;
        margin-bottom: 15px;
        .van-cell{
          .van-cell__value{
            color: #7F7F7F;
          }
          .sign-title{
            color: #32db64;
          }
        }
      }
    }
    .van-dialog{
      font-size: 30px;
      /deep/ .van-dialog__header{
        line-height: 80px;
        text-align: left;
        text-indent: 20px;
        border-bottom:1px solid #e2e2e2;
      }
      .van-checkbox{
        padding-left: 15px;
        /deep/ .van-checkbox__icon{
          line-height: 80px;
          // height: 60px;
          width: 30px;
          height: 30px;
          .van-icon{
            line-height: 30px;
            width: 30px;
            height: 30px;
          }
        }
        /deep/ .van-checkbox__label{
          line-height: 80px;
        }
      }
      /deep/ .van-dialog__footer{
        /deep/ .van-button{
          line-height: 80px;
          height: 80px;
          font-size: 26px;
        }
      }
    }
    .van-overlay{
      background-color: rgba(0,0,0,0.5);
    }
  }
</style>
