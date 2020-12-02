<template>
  <div class="index-tab-container">
    <div class="tab-context">
      <div

        class="tab-item"
        v-for="item in TabLength"
        :key="item.label"
      >
        <!-- <div>123</div> -->
        <div
          @click="pushRouterChange(item)"
          class="item-content"
          :class="{'renyuan':item.label === '人员管理','shebei':item.label === '设备管理','yiqi':item.label === '护理一期','keshi':item.label === '科室管理'}"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="clear" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexTab',
  data () {
    return {
      TabLength: [
        {
          label: '人员管理'
        },
        {
          label: '设备管理'
        },
        {
          label: '手术计费'
        },
        {
          label: '科室管理'
        },
        {
          label: '护理电子病历'
        },
        {
          label: '统计查询'
        },
        {
          label: '护理一期'
        }
      ]
    }
  },
  methods: {
    pushRouterChange (item) {
      if (item.label === '人员管理') {
        this.$router.push('/personnel')
      }
      if (item.label === '护理一期') {
        this.$router.push('/home/client-operation-orders')
      }
      if (item.label === '设备管理') {
        this.$router.push('/device')
      }
      if (item.label === '手术计费') {
        this.$router.push('/charge')
      }
      if (item.label === '科室管理') {
        this.$router.push('/department')
      }
      if (item.label === '护理电子病历') {
        this.$router.push('/emr')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index-tab-container {
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  .tab-context {
    width: 100%;
    .tab-item {
      box-sizing: border-box;
      float: left;
      width: 20%;
      height: 120px;
      div {
        text-align: center;
      }
      .item-content {
        cursor: pointer;
        height: 100%;
        width: 100%;
        line-height: 120px;
      }
    }
    .tab-item:hover {
      color: #fff;
    }
    .clear {
      clear: both;
    }
  }
}
.renyuan {
  background-color: #ccc;
}
.shebei {
  background-color: green;
}
.yiqi {
  background-color: red;
}
.keshi {
  background-color: rgb(65, 189, 226);
}
</style>
