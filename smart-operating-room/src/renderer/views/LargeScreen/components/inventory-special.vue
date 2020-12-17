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
              v-for="(_item,_index) in item.items"
              :key="_index"
            >
              <td>
                {{ _item.insName }}
              </td>
              <td>
                {{ _item.before }}
              </td>
              <td>
                {{ _item.adding }}
              </td>
              <td>
                {{ _item.adding1 }}
              </td>
              <td>
                {{ _item.adding2 }}
              </td>
              <td>
                {{ _item.adding3 }}
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
                  v-if="_item[_item.type] === _item.before2 && _item[_item.type] === _item.after && _item[_item.type] === _item.after2"
                  :class="{'el-icon-check':true}"
                />
                <i
                  v-else
                  :class="{'el-icon-close':true,'red':true}"
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
import request from '@/utils/request2'
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
        this.list = data.allList
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
        font-size: 16px;
        tr{
          border-radius: 5px;
          th{
            line-height: 55px;
            color: #929498;
            font-weight: lighter;
            min-width: 60px;
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
              border-radius: 5px 0 0 5px;
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
