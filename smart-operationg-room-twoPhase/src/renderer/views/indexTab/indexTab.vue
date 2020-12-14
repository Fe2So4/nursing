<template>
  <div class="index-tab-container">
    <!-- <div class="tab-context">
      <div

        class="tab-item"
        v-for="item in TabLength"
        :key="item.label"
      >

        <div
          @click="pushRouterChange(item)"
          class="item-content"
          :class="{'renyuan':item.label === '人员管理','shebei':item.label === '设备管理','yiqi':item.label === '护理一期','keshi':item.label === '科室管理'}"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="clear" />
    </div> -->
    <div class="tab-left">
      <div
        @click="pushRouterChange(item)"
        class="left-item"
        v-for="(item,index) in leftTab"
        :key="index"
      >
        <div
          class="item-icon"
        >
          <img
            style="max-width:100%"
            :src="item.icon"
            alt=""
          >
        </div>
        <div class="item-title">
          <div
            class="title-label"
            style="font-size:30px"
          >
            {{ item.label }}
          </div>
          <div
            class="title-name"
            style="font-size:16px;color:#808080;margin-top:10px"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="tab-right">
      <div
        @click="pushRouterChange(item)"
        class="right-item"
        v-for="(item,index) in rightTab"
        :key="index"
      >
        <div
          class="item-icon"
        >
          <img
            style="max-width:90%"
            :src="item.icon"
            alt=""
          >
        </div>
        <div class="item-title">
          <div
            class="title-label"
            style="font-size:30px"
          >
            {{ item.label }}
          </div>
          <div
            class="title-name"
            style="font-size:16px;color:#808080;margin-top:10px"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
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
      ],
      leftTab: [
        {label: '人员管理', name: 'Personnel management', icon: require('@/assets/tinified/personnel-management.png')},
        {label: '科室管理', name: 'Department management', icon: require('@/assets/tinified/department-management.png')},
        {label: '设备管理', name: 'Device management', icon: require('@/assets/tinified/device-management.png')},
        {label: '护理电子病历', name: 'Electronk nursing record', icon: require('@/assets/tinified/nursing-record.png')}
      ],
      rightTab: [
        {label: '手术计费', name: 'Operation charge', icon: require('@/assets/tinified/operation-charge.png')},
        {label: '统计查询', name: 'Statistical query', icon: require('@/assets/tinified/statistical-query.png')},
        {label: '护理一期', name: 'Nursing phase 1', icon: require('@/assets/tinified/nursing-phase.png')}
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
  padding: 100px;
  background-color: #3D434C;
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  .tab-left {
    align-items: center;
    height: 100%;
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .left-item {
      cursor: pointer;
      width: 45%;
      height: 46%;
      background: #FFFFFF;
      box-shadow: 0px 5px 15px 0px rgba(168, 73, 14, 0.2);
      border-radius: 10px;

      background-color: #fff;
      display: flex;
      align-items: center;
      .item-icon {
        padding: 40px;
      }

    }
  }
  .tab-right {
    padding-left: 40px;
    height: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    // flex-direction: column;
    flex-wrap: wrap;
    .right-item {
      cursor: pointer;
      height: 30%;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0px 5px 15px 0px rgba(168, 73, 14, 0.2);
      border-radius: 10px;
      background-color: #fff;
      display: flex;
      align-items: center;
      .item-icon {
        padding: 40px;
      }
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

// .tab-context {
//     width: 100%;
//     .tab-item {
//       box-sizing: border-box;
//       float: left;
//       width: 20%;
//       height: 120px;
//       div {
//         text-align: center;
//       }
//       .item-content {
//         cursor: pointer;
//         height: 100%;
//         width: 100%;
//         line-height: 120px;
//       }
//     }
//     .tab-item:hover {
//       color: #fff;
//     }
//     .clear {
//       clear: both;
//     }
//   }
</style>
