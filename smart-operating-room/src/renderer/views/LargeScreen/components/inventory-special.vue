<template>
  <div class="inventory-special">
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
        <tr>
          <td>
            纱布
          </td>
          <td>
            0
          </td>
          <td>
            0
          </td>
          <td>
            5
          </td>
          <td>
            5
          </td>
          <td>
            5
          </td>
          <td>
            <i class="el-icon-check" />
          </td>
        </tr>
        <tr
          v-for="item in 10"
          :key="'table'+item"
        >
          <td>
            纱布
          </td>
          <td>
            0
          </td>
          <td>
            0
          </td>
          <td>
            5
          </td>
          <td>
            5
          </td>
          <td>
            5
          </td>
          <td>
            <i class="el-icon-close red" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'InventorySpecial',
  data () {
    return {
    //   { name: '腔脑室外引流管', value: 26, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '小纱布', value: 25, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '腔镜纱布', value: 24, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '纱布', value: 23, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '纱布垫', value: 22, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '脑棉', value: 21, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '纱条', value: 20, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '缝针', value: 19, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '刀片', value: 18, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '切口保护器', value: 17, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '长电刀头', value: 13, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '红色尿管', value: 12, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '皮片', value: 11, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '彩带', value: 10, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '临时阻断夹', value: 9, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '花生米', value: 8, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '穿刺针', value: 7, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '纱带', value: 6, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '线团', value: 5, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '血管夹', value: 4, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '长针头', value: 3, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '清洁片', value: 2, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 },
    //   { name: '电刀头', value: 1, before: 0, adding: 0, adding1: 0, adding2: 0, adding3: 0, before2: 0, after: 0, after2: 0 }
    }
  }
}
</script>

<style lang="scss" scoped>
  .inventory-special{
    height: 100%;
    padding-bottom: 10px;
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
  }
</style>
