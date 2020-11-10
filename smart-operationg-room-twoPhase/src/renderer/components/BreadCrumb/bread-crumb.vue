<template>
  <div class="bread-crumb">
    <el-breadcrumb
      class="breadcrumb"
      separator="/"
    >
      <!-- <el-breadcrumb-item v-if="erpName">{{erpName}}</el-breadcrumb-item> -->
      <el-breadcrumb-item
        v-for="(item,index) of list"
        :key="index"
      >
        <!-- v-if="item.name" -->
        <i
          class="iconfont"
          :class="item.meta.icon"
        />
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      list: null,
      icon: []
    }
  },
  created () {
    this.getbread()
  },
  methods: {
    getbread () {
      let matched = this.$route.matched.filter(item => item.name)
      // const first = matched[0]
      this.list = matched
    }
  }
}
</script>

<style lang='scss' scoped>
  .bread-crumb{

  }
</style>
