<template>
  <el-submenu
    :popper-class="children.parentId?'':'sub-popper'"
    v-if="children.children"
    :index="children.path"
  >
    <template v-if="children.children">
      <side-bar-item
        v-for="item in children.children"
        :menu="menu + 1"
        :children="item"
        :key="item.path"
      />
    </template>
    <template slot="title">
      <div :class="children.parentId?'':'my-el-menu-item'">
        <!-- <i
          v-if="children.icon"
          :class="`font_family icon-jy-menu-${children.icon || 1}`"
        ><div>{{ children.title }}</div></i> -->
        <div>
          {{ children.title }}
        </div>
      </div>
    </template>
  </el-submenu>
  <el-menu-item
    @click="changeRoute(children.path)"
    :class="children.parentId?'':'my-el-menu-item'"
    v-else
    :index="children.path"
  >
    <!-- <i
      v-if="children.icon"
      :class="`font_family icon-jy-menu-${children.icon || 1}`"
    ><div>{{ children.title }}</div></i> -->
    <div>
      {{ children.title }}
    </div>
    <div
      slot="title"
      class="line"
      v-show="activeIndex === children.path"
    />
  </el-menu-item>
</template>

<script>
export default {
  name: 'SideBarItem',
  data () {
    return {

    }
  },
  props: ['children', 'menu', 'activeIndex'],
  mounted () {
    setTimeout(() => {
      var width = document.getElementById('sideBar') ? document.getElementById('sideBar').clientWidth : 0
      console.log(width)
      this.$store.dispatch('changeView', width ? width + 20 : width)
    }, 0)
  },
  methods: {
    changeRoute (to) {
      console.log(to)
      if (to) {
        this.$router.push(to)
        setTimeout(() => {
          var width = document.getElementById('sideBar') ? document.getElementById('sideBar').clientWidth : 0
          console.log(width)
          this.$store.dispatch('changeView', width ? width + 20 : width)
        }, 0)
      }
    }

  }
}
</script>

<style lang="scss" scoped type="text/css">
@import '@/variable.scss';
.my-el-menu-item {
  font-size: 16px;
}
/deep/ .el-menu{
  background-color: unset;
}
/deep/ .el-menu-item{
  // background-color: unset;
  color: #E2E9F2;
}
/deep/ .el-menu-item:focus, .el-menu-item:hover{
  background: linear-gradient(90deg, #3269CE, #2E5287);
  color: $nav-font;
  i{
    color: $nav-font;
  }
}
/deep/ .el-submenu__title{
  color: #E2E9F2;
  i{
    color: #E2E9F2;
  }
}
/deep/ .el-submenu__title:hover{
  background: linear-gradient(90deg, #3269CE, #2E5287);
  color: $nav-font;
  i{
    color: $nav-font;
  }
}
// .el-submenu {
//   // background-color: unset;
//   border-right: unset;
//   ul.el-menu {
//     background-color: $nav-bgc !important;
//     border-right: unset;
//   }
// }
.line{
  width: 6px;
  position: absolute;
  left: 0;
  top: 0;
  height: 56px;
  background: #6699FF;
}
</style>
