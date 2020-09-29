<template>
  <div class="check-detail">
    <ul>
      <li class="clearfix">
        <div class="li-left">
          手术知情同意书：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-check" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
        </div>
      </li>
      <li class="clearfix">
        <div class="li-left">
          术野皮肤准备正确：
        </div>
        <div
          class="li-right"
        >
          <i class="el-icon-close red" />
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
