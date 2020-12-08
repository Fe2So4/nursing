<template>
  <div class="bar-container">
    <div
      theme="light"
      id="myChart"
      :style="{width: '100%', height: '100%'}"
    />
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')
export default {
  name: 'Bar',
  data () {
    return {
      orgOptions: {}
    }
  },
  props: {
    roomNameList: {
      type: Array,
      required: true
    },
    durationList: {
      type: Array,
      required: true
    },
    denominator: {
      type: Number,
      require: false,
      default: function () {
        return 50
      }
    }
  },
  mounted () {

  },
  methods: {
    drawLine () {
      console.log(this.durationList)
      // 基于准备好的dom，初始化echarts实例

      let myChart = echarts.init(document.getElementById('myChart'))

      // 绘制图表
      let obj = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: { text: '手术房间用时统计' },
        tooltip: {},
        // color: ['#64CDF0', '#F5686F'],
        xAxis: {
          type: 'value',
          max: (value) => {
            return this.denominator
          }
        },
        yAxis: {
          type: 'category',
          data: this.roomNameList

        },
        series: [{
          barWidth: '80%',
          name: '用时统计',
          type: 'bar',
          data: this.durationList,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#d71345', '#f47920', '#ffe600', '#45b97c', '#009ad6', '#33a3dc', '#585eaa']
                return colorList[params.dataIndex % 7]
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{c}'// 这是关键，在需要的地方加上就行了
              }
            }

          }
        }]
      }
      myChart.setOption(obj, true)
    }
  }
}
</script>
<style lang="scss" scoped>
.bar-container {
  width: 100%;
  height: 100%;
}
</style>
