<template>
  <div class="inventory-basic">
    <table
      cellSpacing="0"
      height="100%"
    >
      <thead>
        <tr>
          <th>名称</th>
          <th>术前</th>
          <th>术中1</th>
          <th>术中2</th>
          <th>术中3</th>
          <th>术中4</th>
          <th>关闭前</th>
          <th>关闭后</th>
          <th>缝合后</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in deviceList"
          :key="item.name"
        >
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.before }}
          </td>
          <td>
            {{ item.adding }}
          </td>
          <td>
            {{ item.adding1 }}
          </td>
          <td>
            {{ item.adding2 }}
          </td>
          <td>
            {{ item.adding3 }}
          </td>
          <td>
            {{ item.before2 }}
          </td>
          <td>
            {{ item.after }}
          </td>
          <td>
            {{ item.after2 }}
          </td>
          <td>
            <i
              v-if="item.before2!==item.all||item.after!==item.all||item.after2!==item.all"
              :class="{'el-icon-close':true,'red':true}"
            />
            <i
              v-else
              :class="{'el-icon-check':true}"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import request from '@/utils/request2'
import {mapState} from 'vuex'
import {getOrdinaryData} from '@/api/large-screen'
import $bus from '@/utils/busScreen'
export default {
  name: 'InventoryBasic',
  data () {
    return {
      deviceList: [
        { name: '腔脑室外引流管', value: 26, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '小纱布', value: 25, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '腔镜纱布', value: 24, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '纱布', value: 23, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '纱布垫', value: 22, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '脑棉', value: 21, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '纱条', value: 20, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '缝针', value: 19, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '刀片', value: 18, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '切口保护器', value: 17, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '长电刀头', value: 13, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '红色尿管', value: 12, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '皮片', value: 11, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '彩带', value: 10, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '临时阻断夹', value: 9, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '花生米', value: 8, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '穿刺针', value: 7, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '纱带', value: 6, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '线团', value: 5, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '血管夹', value: 4, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '长针头', value: 3, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '清洁片', value: 2, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
        { name: '电刀头', value: 1, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 }
      ],
      list: []
    }
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  methods: {
    getOrdinaryData () {
      request({
        url: getOrdinaryData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        if (!this.IsEmpty(data.basicEquipment)) {
          data.basicEquipment.before.forEach(item => {
            for (let i = 0; i < this.deviceList.length; i++) {
              if (this.deviceList[i].name === item.insName) { this.deviceList[i].before = item.number }
            }
          })
          data.basicEquipment.adding.forEach(item => {
            for (let i = 0; i < this.deviceList.length; i++) {
              if (this.deviceList[i].name === item.insName) { this.deviceList[i].adding = item.number }
            }
          })
          data.basicEquipment.adding1.forEach(item => {
            for (let i = 0; i < this.deviceList.length; i++) {
              if (this.deviceList[i].name === item.insName) { this.deviceList[i].adding1 = item.number }
            }
          })
          data.basicEquipment.adding2.forEach(item => {
            for (let i = 0; i < this.deviceList.length; i++) {
              if (this.deviceList[i].name === item.insName) {
                this.deviceList[i].adding2 = item.number
              }
            }
          })
          data.basicEquipment.adding3.forEach(item => {
            for (let i = 0; i < this.deviceList.length; i++) {
              if (this.deviceList[i].name === item.insName) {
                this.deviceList[i].adding3 = item.number
              }
            }
          })
          data.basicEquipment.before2.forEach(item => {
            for (let i = 0; i < this.deviceList.length; i++) {
              if (this.deviceList[i].name === item.insName) {
                this.deviceList[i].before2 = item.number
              }
            }
          })
          data.basicEquipment.after.forEach(item => {
            for (let i = 0; i < this.deviceList.length; i++) {
              if (this.deviceList[i].name === item.insName) {
                this.deviceList[i].after = item.number
              }
            }
          })
          data.basicEquipment.after2.forEach(item => {
            for (let i = 0; i < this.deviceList.length; i++) {
              if (this.deviceList[i].name === item.insName) {
                this.deviceList[i].after2 = item.number
              }
            }
          })
          this.deviceList.forEach(item => {
            item.all = item.before + item.adding + item.adding1 + item.adding2 + item.adding3
          })
        }
      })
    }
  },
  created () {
    this.getOrdinaryData()
  },
  mounted () {
    $bus.$on('getOrdinaryData', this.getOrdinaryData)
  },
  beforeDestroy () {
    $bus.$off('getOrdinaryData')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/themes';
  .inventory-basic{
    height: 100%;
    padding-bottom: 10px;
    table{
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-collapse:separate;
      border-spacing:0 10px;
      thead{
        @include theme-property('background-color',background_color_device_thead);
        border-radius: 5px;
        font-size: 16px;
        tr{
          border-radius: 5px;
          th{
            line-height: 55px;
            @include theme-property('color',font_color_secondary);
            min-width: 60px;
            font-weight: lighter;
            &:first-child{
              border-radius: 5px 0 0 5px;
            }
            &:last-child{
              border-radius: 0 5px 5px 0;
              min-width: unset;
              width: 30px;
            }
          }
        }
      }
      tbody{
        height: calc(100% - 55px);
        text-align: center;
        border-collapse:separate;
        border-spacing:10px;
        font-size: 16px;
        overflow-y: auto;
        &::-webkit-scrollbar{
          display: none;
        }
        tr{
          margin-bottom:10px;
          border-radius: 5px;
          td{
            line-height: 20px;
            padding:18px 0;
            @include theme-property('background-color',background_color_info_item);
            @include theme-property('color',font_color_value);
            &:first-child{
              padding-left: 10px;
              border-radius: 5px 0 0 5px;
              @include theme-property('color',font_color_secondary);
            }
            &:last-child{
              padding-right: 10px;
              border-radius: 0 5px 5px 0;
              i{
                display: inline-block;
                height: 20px;
                width: 20px;
                font-size: 14px;
                color: #ffffff;
                line-height: 20px;
                border-radius: 50%;
                background: #30C76D;
                &.red{
                  background: #FF595A;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
