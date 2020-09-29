<template>
  <div class="nursing-record">
    <div class="title">
      护理记录单二
      <i />
    </div>
    <div class="nav">
      <ul>
        <li>
          <div class="li-left">
            手术方式
          </div>
          <div class="li-right">
            1
          </div>
        </li>
        <li>
          <div class="li-left">
            手术方式
          </div>
          <div class="li-right">
            1
          </div>
        </li>
        <li>
          <div class="li-left">
            手术方式
          </div>
          <div class="li-right">
            1
          </div>
        </li>
        <li
          v-for="item in 10"
          :key="item"
        >
          <div class="li-left">
            手术方式
          </div>
          <div class="li-right">
            1
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NursingRecord',
  data () {
    return {
      // itemStatus:1,
    }
  },
  components: {
  },
  props: {

  },
  methods: {
    handleChange () {

    }
  }
}
</script>

<style scoped lang="scss">
  .nursing-record{
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 10px;
    height: 100%;
    flex: 0.25;
    padding: 0 10px;
    margin-right: 20px;
    &:last-child{
      margin-right: unset;
    }
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
    .nav{
      height: calc(100% - 58px);
      ul{
        overflow-y: auto;
        height: 100%;
        padding:10px 0;
        &::-webkit-scrollbar{
          display: none;
        }
        li{
          display: flex;
          justify-content: space-between;
          background: #F4F7FD;
          padding: 10px;
          border-radius: 5px;
          font-size: 18px;
          margin-bottom:10px;
          .li-left{
            color: #919398;
          }
          .li-right{
            color: #444444;
          }
          &:last-child{
            margin-bottom: unset;
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
