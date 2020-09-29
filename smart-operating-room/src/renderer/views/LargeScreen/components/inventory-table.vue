<template>
  <div class="inventory-table">
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
  name: 'InventoryTable',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .inventory-table{
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
