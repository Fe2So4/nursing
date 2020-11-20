<template>
  <div class="inventory-special">
    <el-collapse
      v-model="activeNames"
      v-if="list.length"
      @change="handleChange"
    >
      <el-collapse-item
        v-for="(item,index) in list"
        :key="'collapse'+index"
        :name="index"
        :title="item.label"
      >
        <template slot="title">
          <div>
            <span>{{ item.pName }}</span>
            <span>{{ item.pId }}</span>
          </div>
        </template>
        <table
          cellSpacing="0"
          height="100%"
        >
          <thead>
            <tr>
              <th>名称</th>
              <th>术前</th>
              <th>术中加</th>
              <th>关闭前</th>
              <th>关闭后</th>
              <th>缝合后</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(_item,_index) in item.deviceList"
              :key="_index"
            >
              <td>
                {{ _item.insName }}
              </td>
              <td>
                {{ _item.before }}
              </td>
              <td>
                {{ _item.adding + _item.adding1 + _item.adding2 + _item.adding3 }}
              </td>
              <td>
                {{ _item.before2 }}
              </td>
              <td>
                {{ _item.after }}
              </td>
              <td>
                {{ _item.after2 }}
              </td>
              <td>
                <i
                  v-if="_item.before===0||_item.adding===0||_item.adding1===0||_item.adding2===0||_item.adding3===0||_item.before2===0||_item.after===0||_item.after2===0"
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
      </el-collapse-item>
    </el-collapse>
    <div
      v-else
      class="data-empty"
    >
      <div>
        <img
          src="@/assets/list-empty.png"
          alt=""
        >
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import $bus from '@/utils/busScreen'
import {mapState} from 'vuex'
import {getSpecialData} from '@/api/large-screen'
export default {
  name: 'InventorySpecial',
  data () {
    return {
      activeNames: 0,
      list: []
    }
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  methods: {
    handleChange () {

    },
    getSpecialData () {
      request({
        url: getSpecialData + `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}`,
        method: 'get'
      }).then(res => {
        let data = JSON.parse(res.data.data.specialEquipmentStr)
        if (data.length) {
          data.forEach(item => {
            let arr = []
            item.items.before.forEach(_item => {
              arr.push({ insName: _item.insName, id: item.pId, value: 0, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 })
            })
            arr.forEach(_item => {
              item.items.before.forEach(ite => {
                if (ite.insName === _item.insName) {
                  _item.before = ite.number
                }
              })
            })
            arr.forEach(_item => {
              item.items.adding.forEach(ite => {
                if (ite.insName === _item.insName) {
                  _item.adding = ite.number
                }
              })
            })
            arr.forEach(_item => {
              item.items.adding1.forEach(ite => {
                if (ite.insName === _item.insName) {
                  _item.adding1 = ite.number
                }
              })
            })
            arr.forEach(_item => {
              item.items.adding2.forEach(ite => {
                if (ite.insName === _item.insName) {
                  _item.adding2 = ite.number
                }
              })
            })
            arr.forEach(_item => {
              item.items.adding3.forEach(ite => {
                if (ite.insName === _item.insName) {
                  _item.adding3 = ite.number
                }
              })
            })
            arr.forEach(_item => {
              item.items.before2.forEach(ite => {
                if (ite.insName === _item.insName) {
                  _item.before2 = ite.number
                }
              })
            })
            arr.forEach(_item => {
              item.items.after.forEach(ite => {
                if (ite.insName === _item.insName) {
                  _item.after = ite.number
                }
              })
            })
            arr.forEach(_item => {
              item.items.after2.forEach(ite => {
                if (ite.insName === _item.insName) {
                  _item.after2 = ite.number
                }
              })
            })
            item.deviceList = arr
          })
        }
        this.list = data
      })
    }
  },
  mounted () {
    this.getSpecialData()
    $bus.$on('getSpecialData', this.getSpecialData)
  },
  beforeDestroy () {
    $bus.$off('getSpecialData')
  }
}
</script>

<style lang="scss" scoped>
  .inventory-special{
    height: 100%;
    padding-bottom: 10px;
    .data-empty{
      text-align: center;
      height: calc(100% - 58px);
      color: #91949A;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        // margin-top: 100px;
        transform: translateX(10px);
      }
    }
    .el-collapse{
      height: 100%;
      .el-collapse-item{
        margin-bottom: 10px;
      }
    }
    table{
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-collapse:separate;
      border-spacing:0 10px;
      thead{
        background: #F2F2F2;
        border-radius: 5px;
        font-size: 18px;
        tr{
          border-radius: 5px;
          th{
            line-height: 55px;
            color: #929498;
            font-weight: lighter;
          }
        }
      }
      tbody{
        height: calc(100% - 55px);
        text-align: center;
        border-collapse:separate;
        border-spacing:10px;
        overflow-y: auto;
        &::-webkit-scrollbar{
          display: none;
        }
        tr{
          margin-bottom:10px;
          border-radius: 5px;
          td{
            line-height: 55px;
            background: #F5F8FD;
            font-size: 16px;
            &:first-child{
              padding-left: 10px;
            }
            &:last-child{
              padding-right: 10px;
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
    /deep/ .el-collapse-item__header{
      background: unset;
      background: #F5F8FD;
      height: 55px;
      line-height: 55px;
      border-radius: 5px;
      font-size: 18px;
      text-indent: 10px;
      color: #919398;
      i{
        color: #388FF7;
      }
    }
    /deep/ .el-collapse-item__wrap{
      border-bottom:unset;
    }
  }
</style>
