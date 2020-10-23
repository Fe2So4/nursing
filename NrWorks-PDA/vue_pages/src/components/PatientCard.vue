<template>
  <div class="patient-card">
      <div class="content">
          <div class="left">
            <span>{{patientInfo.operRoom}}</span>
          </div>
          <div class="right">
            <p><span>{{patientInfo.patientName}}</span><span>{{patientInfo.bedNo}}床</span><span>{{patientInfo.cureNo}}</span></p>
            <p>主刀<span class="patient-value">{{patientInfo.surgeon}}</span>麻醉<span class="patient-value">{{patientInfo.anesDoc}}</span></p>
            <p>巡回/洗手<span class="patient-value">{{patientInfo.runNurseName===''?'-':patientInfo.runNurseName}}/{{patientInfo.washNurseName===''?'-':patientInfo.washNurseName}}</span></p>
          </div>
      </div>
      <!-- <div class="operation-info">
        <p>
          <span>
            <span class="label">手术室</span>
            <span class="value">{{patientInfo.operRoom}}室</span>
          </span>
          <span>
            <span class="label">台次</span>
            <span class="value">第{{patientInfo.sequenceNo}}台</span>
          </span>
        </p>
        <p>
          <span class="label">诊断</span>
          <span class="value">{{patientInfo.diagnose}}</span>
        </p>
        <p>
          <span class="label">麻醉方式</span>
          <span class="value">{{patientInfo.anesMethod}}</span>
        </p>
      </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // patient: {}
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .patient-card{
      padding: 15px 20px;
      .content{
        background: #ffffff;
        display: flex;
        height: 194px;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px 10px 0 0;
        box-sizing: border-box;
        overflow: hidden;
        .left{
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            width: 140px;
            height: 80px;
            background: #3478FF;
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
            border-radius: 0px 40px 40px 0px;
            line-height: 80px;
            text-align: center;
            font-size: 42px;
            font-weight: bold;
            color: #ffffff;
          }
        }
        .right{
          flex: 1;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p{
            font-size: 26px;
            color: #7F7F7F;
            .patient-value{
              color: #2E2E2E;
            }
            &:nth-child(1){
              font-size: 30px;
              color: #2E2E2E;
              span{
                margin-right: 60px;
              }
            }
            &:nth-child(2){
              margin:30px 0;
              span{
                margin-left: 60px;
                &:first-child{
                  margin-right:30px;
                }
              }
            }
            &:nth-child(3){
              span{
                margin-left: 60px;
              }
            }
          }
        }
      }
      .operation-info{
        background: #ffffff;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 184px;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
        border-radius: 0 0 10px 10px;
        box-sizing: border-box;
        padding-left: 32px;
        p{
          // text-indent: 32px;
          font-size: 30px;
          &:first-child{
            display: flex;
            span{
              flex: 1;
            }
          }
          &:nth-child(2){
            margin:20px 0;
          }
          .label{
            color: #7F7F7F;
            display: inline-block;
            text-align: left;
            // text-indent: unset !important;
            width: 140px;
          }
          .value{
            color: #2E2E2E;
          }
        }
      }
    }
</style>
