<template>
  <div class="info-list">
    <div class="title">
      {{ title }}
      <i />
    </div>
    <ul v-if="list.length>0">
      <li
        class="clearfix"
        v-for="item in list"
        :key="item.value"
      >
        <div class="li-left">
          {{ item.label }}
        </div>
        <div class="li-right">
          <span>{{ item.time }}</span>
          <i class="el-icon-arrow-right" />
        </div>
      </li>
    </ul>
    <div
      v-else
      class="data-empty"
    >
      <div>
        <img
          src="../../assets/list-empty.png"
          alt=""
        >
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoList',
  data () {
    return {

    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .info-list{
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 10px;
    // height: 400px;
    height: 100%;
    width: 256px;
    margin-right: 20px;
    .title{
      position: relative;
      text-indent: 33px;
      line-height: 58px;
      border-bottom:1px solid #E9EBF4;
      color: #303133;
      font-size: 20px;
      i{
        position: absolute;
        width: 4px;
        left: 20px;
        top: 0;
        bottom: 0;
        margin:auto;
        height: 18px;
        background: #3377FF;
        border-radius: 2px;
      }
    }
    ul{
      padding: 10px;
      height: calc(100% - 58px);
      &::-webkit-scrollbar{
        display: none;
      }
      li{
        height: 55px;
        background: #F4F7FD;
        padding: 0 10px;
        border-radius: 5px;
        line-height: 55px;
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
            color:#388FF7;
          }
        }
      }
    }
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
  }
</style>
