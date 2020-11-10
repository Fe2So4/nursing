<template>
  <el-submenu
    :popper-class="children.parentId?'':'sub-popper'"
    v-if="children.children"
    :index="children.title"
  >
    <template v-if="children.children">
      <side-bar-item

        v-for="item in children.children"
        :menu="menu + 1"
        :children="item"
        :key="item.title"
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
    @click="changeRoute(children.url)"
    :class="children.parentId?'':'my-el-menu-item'"
    v-else
    :index="children.id"
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
  props: ['children', 'menu', 'isCollapse', 'activeIndex'],
  mounted () {

  },
  methods: {
    changeRoute (to) {
      if (to) {
        this.$router.push(to)
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
.el-submenu {
  background-color: unset;
  border-right: unset;
  ul.el-menu {
    background-color: $nav-bgc !important;
    border-right: unset;
  }
}
</style>
