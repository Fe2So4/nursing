<template>
  <div class="test-report">
    <p><span>葡萄糖</span><span>GLU</span></p>
    <p><span>4.8</span><span>3.9-5.8/mol/l</span></p>
  </div>
</template>

<script>
export default {
  name: 'TestReport'
}
</script>

<style lang="scss" scoped>
  .test-report{
    padding:0 10px;
    font-size: 16px;
    border-bottom:1px solid #E9ECF4;
    p{
      display: flex;
      color: #444444;
      justify-content: space-between;
      &:last-child{
        color:#919398;
      }
    }
  }
</style>
