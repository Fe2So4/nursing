<template>
  <div class="check-detail">
    <ul>
      <li
        class="clearfix"
        v-for="item in list"
        :key="item.text"
      >
        <div class="li-left">
          {{ item.text }}
        </div>
        <div
          class="li-right"
        >
          <i :class="item.value==='是' ? 'el-icon-check' : 'el-icon-close red'" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CheckDetail',
  data () {
    return {

    }
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .check-detail{
     height: 100%;
     ul{
      height: 100%;
      overflow-y: auto;
      padding-bottom: 10px;
      &::-webkit-scrollbar{
        display: none;
      }
      li{
        // height: 55px;
        background: #F4F7FD;
        padding: 10px;
        border-radius: 5px;
        // line-height: 55px;
        font-size: 18px;
        margin-bottom:10px;
        .li-left{
          float: left;
          color: #919398;
        }
        .li-right{
          float: right;
          color: #444444;
          i{
            height: 20px;
            width: 20px;
            background: #30C76D;
            color: #fff;
            text-align: center;
            border-radius: 50%;
            font-size: 14px;
            line-height: 20px;
            &.red{
              background: #FF595A;
            }
          }
        }
        &:last-child{
          margin-bottom: unset;
        }
      }
    }
  }
</style>
