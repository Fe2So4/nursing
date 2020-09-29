<template>
  <div class="inspect-report">
    <div>
      <h3>检查部位：</h3>
      <div style="color:#3890F7;">
        超声波
      </div>
    </div>
    <div>
      <h3>检查项目：</h3>
      <div class="inspect-color">
        -
      </div>
    </div>
    <div>
      <h3>检查所见：</h3>
      <div class="inspect-color">
        右侧腕部伤口下见尺神经吻 合术后，吻合口内见几枚缝 线强回声，神经束位可，周 围疤痕增生明显。
      </div>
    </div>
    <div>
      <h3>检查所见：</h3>
      <div class="inspect-color">
        右侧腕部伤口下见尺神经吻 合术后，周围疤痕增生明显。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestReport'
}
</script>

<style lang="scss" scoped>
  .inspect-report{
    padding:0 10px;
    font-size: 16px;
    border-bottom:1px solid #E9ECF4;
    h3{
      color: #919398;
      font-size: 16px;
      font-weight:lighter;
    }
    .inspect-color{
      color:#444444;
    }
  }
</style>
