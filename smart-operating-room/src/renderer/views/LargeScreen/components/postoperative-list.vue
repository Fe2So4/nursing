<template>
  <div class="postoperative-list">
    <div class="title">
      生命体征
      <i />
    </div>
    <div class="content">
      <template>
        <ul>
          <li>
            <span>心率</span>
            <span>83</span>
            <span>bpm</span>
          </li>
          <li>
            <span>心率</span>
            <span>83</span>
            <span>bpm</span>
          </li>
          <li>
            <span>心率</span>
            <span>83</span>
            <span>bpm</span>
          </li>
          <li>
            <span>心率</span>
            <span>83</span>
            <span>bpm</span>
          </li>
        </ul>
        <!-- <div
          class="data-empty"
        >
          <div>
            <img
              src="@/assets/list-empty.png"
              alt=""
            >
            <p>暂无数据</p>
          </div>
        </div> -->
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostoperativeList',
  data () {
    return {
      // itemStatus:1,
      activeNames: 1,
      list: []
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
  .postoperative-list{
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 10px;
    height: 100%;
    flex: 0.35;
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
    .content{
      padding: 10px;
      overflow-y: auto;
      height: calc(100% - 58px);
      &::-webkit-scrollbar{
        display: none;
      }
      .el-collapse{
        height: 100%;
        .el-collapse-item{
          margin-bottom: 10px;
        }
      }
    }
    ul{
      li{
        background: #F4F7FD;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-radius: 5px;
        font-size: 18px;
        margin-bottom:10px;
        span{
          color:#3377ff;
          &:nth-child(2){
            color: #08b147;
          }
          &:last-child{
            color:#ff8845;
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
