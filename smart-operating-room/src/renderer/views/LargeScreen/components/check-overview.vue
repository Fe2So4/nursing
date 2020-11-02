<template>
  <div class="overview">
    <div class="triangle">
      <div class="state1">
        <span>
          <i>Sign In</i>
        </span>
      </div>
      <div class="state2">
        <span>
          <i>Time Out</i>
        </span>
      </div>
      <div class="state3">
        <span>
          <i>Sign Out</i>
        </span>
      </div>
      <div class="title">
        !
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  props: {
    stateList: {
      type: Object,
      required: true
    }
  },
  method: {

  }
}
</script>

<style lang="scss" scoped>
  .overview{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .triangle{
      width:0;
      top: -80px;
      height:0;
      transform:rotate(180deg);
      border-style:solid;
      border-color:transparent;
      border-width: 200px 100px 100px 100px;
      border-top-color:orange;
      position: relative;
      .title{
        font-size: 60px;
        position: absolute;
        left: 10px;
        right: 0;
        top: -150px;
        margin: auto;
        transform: rotate(180deg);
      }
      .state1,.state2,.state3{
        box-sizing: border-box;
        position: relative;
        width: 60px;
        height: 60px;
        transform: rotate(45deg);
        overflow: hidden;
        span{
          display: block;
          background: red;
          box-sizing: border-box;
          position: absolute;
          width: 100%;
          height: 100%;
          content:" ";
          transform: rotate(-45deg);
          border: 1px solid red;
          overflow: hidden;
          background-color: red;
          transform-origin: center center;
          i{
            display: inline-block;
            width: 60px;
            height: 60px;
            font-style: normal;
            transform: rotate(180deg);
            text-align: center;
            line-height: 60px;
            color:#fff;
            font-size: 12px;
          }
          &::after{
            position: absolute;
            top: -1px;
            left: -1px;
            content:" ";
            width: 100%;
            height: 100%;
            transform: rotate(135deg);
            border: 1px solid red;
          }
          &::before{
            position: absolute;
            left: 0;
            top: 0;
            box-sizing: border-box;
            content:" ";
            width: 100%;
            height: 100%;
            transform: rotate(135deg);
            border: 10px solid red;
          }
        }
      }
      .state1{
        position:absolute;
        bottom: 0;
        right: -30px;
      }
      .state2{
        left: 60px;
        position: absolute;
        bottom: 170px;
      }
      .state3{
        right: 60px;
        position: absolute;
        bottom: 170px;
      }
    }
  }
</style>
