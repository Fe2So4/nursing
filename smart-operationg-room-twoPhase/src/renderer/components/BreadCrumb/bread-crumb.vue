<template>
  <div class="bread-crumb">
    <span>当前位置：</span>
    <el-breadcrumb
      class="breadcrumb"
      separator="/"
    >
      <!-- <el-breadcrumb-item v-if="erpName">{{erpName}}</el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{path:'/index-tab'}">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item,index) of list"
        :key="index"
        :to="{path:item.path}"
      >
        <!-- <a :href="item.path"> -->
        {{ item.meta.title }}
        <!-- </a> -->
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
    // this.getbread()
  },
  watch: {
    $route: {
      handler (val) {
        // return val
        // this.getbread()
        console.log(this.$route.matched, 'this.$route.matched')
        let matched = this.$route.matched.filter(item =>
          // console.log(item)
          item.name
        )
        // const first = matched[0]
        console.log(matched)
        this.list = matched
      },
      immediate: true
    }
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
    display: flex;
    // vertical-align: middle;
    align-items: center;
    padding-bottom: 20px;
  }
</style>
