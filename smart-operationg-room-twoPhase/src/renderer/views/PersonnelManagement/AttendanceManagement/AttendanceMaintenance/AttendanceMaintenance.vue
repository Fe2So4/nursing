<template>
  <div class="attendance-maintenance-container">
    <el-form
      ref="form"
      :model="form"
    >
      <el-select
        v-model="value"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.attendance-maintenance-container {
  height: 100%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
  border-radius: 5px;
}
</style>
