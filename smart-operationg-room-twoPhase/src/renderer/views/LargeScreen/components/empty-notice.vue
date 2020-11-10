<template>
  <div class="empty-notice">
    <div class="top">
      <i class="el-icon-warning-outline" />
      <span>目前未绑定患者，请在PDA中进行操作！</span>
    </div>
    <div class="bottom">
      <ul>
        <li>
          <div class="li-top">
            <i />
            <span>术前-进手术室之前</span>
          </div>
          <div class="li-bottom">
            <p>患者病史摘要、当前有效医嘱、化验报告/危急值</p>
            <p>检查报告、房间清洁、设备检查</p>
            <p>术中带药、抗生素用药</p>
          </div>
        </li>
        <li>
          <div class="li-top">
            <i />
            <span>术中-进手术室之后</span>
          </div>
          <div class="li-bottom">
            <p>安全核查：Sign In、Time Out、Sign Out</p>
            <p>手术器械清点</p>
            <p>护理记录单2、术中病理</p>
          </div>
        </li>
        <li>
          <div class="li-top">
            <i />
            <span>术后-离开手术室</span>
          </div>
          <div class="li-bottom">
            <p>安全核查：Sign In、Time Out、Sign Out</p>
            <p>手术器械清点</p>
            <p>护理记录单2、术中病理</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .empty-notice{
    .top{
      height: 70px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      color: #303133;
      font-size: 24px;
      line-height: 70px;
      padding-left: 20px;
      vertical-align: middle;
      border-top: 5px solid #3377ff;
      i{
        color:#3377FF;
        font-weight: bold;
      }
    }
    .bottom{
      margin-top: 20px;
      ul{
        display: flex;
        li{
          flex: 1;
          box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
          border-radius: 10px;
          .li-top{
            color:#303133;
            padding-left: 20px;
            i{
              width: 4px;
              display: inline-block;
              height: 18px;
              background: #3377FF;
              border-radius: 2px;
              vertical-align: middle;
              margin-right: 4px;
            }
            span{
              display: inline-block;
              vertical-align: middle;
            }
            line-height: 58px;
          }
          .li-bottom{
            color: #919398;
            padding-left: 20px;
            border-top: 1px solid #E9EBF4;
            p{
              line-height: 40px;
            }
          }
          &:nth-child(2){
            margin: 0 25px;
          }
        }
      }
    }
  }
</style>
