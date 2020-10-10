<template>
  <div class="header">
    <div class="title">
      <div class="name">
        许佳康
      </div>
      <div class="num">
        住院号:91184463
      </div>
    </div>
    <div class="btnList">
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
      >
        刷新
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
      >
        打印
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
      >
        Excle
      </vxe-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NursingHeader'
}
</script>

<style scoped lang="scss">
.btn {
  width: 90px;
  background-color: #EAEEF7;
}
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 40px 0 20px;
  .title {
    min-width: 220px;
    display: flex;
    color: #444444;
    font-weight: 600;
    align-items: center;
    .num {
      margin-left: 20px;
    }
  }
  .btnList {
    display: flex;
    align-items: center;
  }
}
</style>
