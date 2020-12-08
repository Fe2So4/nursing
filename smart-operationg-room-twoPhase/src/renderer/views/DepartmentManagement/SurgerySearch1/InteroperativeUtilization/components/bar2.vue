<template>
  <div class="bar-container2">
    <div
      theme="light"
      id="myChart2"
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
  name: 'Bar2',
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
    percentageList: {
      type: Array,
      required: true
    }
  },
  mounted () {
    // this.drawLine()
  },
  methods: {
    drawLine () {
      console.log(this.roomNameList)
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart2'))
      // 绘制图表

      let obj = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function (params) {
            return '{c}%'
          }
        },
        title: { text: '手术房间利用率统计' },
        // color: ['#64CDF0', '#F5686F'],
        xAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          },
          max: function (value) {
            return 100
          }
        },
        yAxis: {
          type: 'category',
          data: this.roomNameList

        },
        series: [{
          barWidth: '80%',
          name: 'axis',
          type: 'bar',
          data: this.percentageList,

          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#d71345', '#f47920', '#ffe600', '#45b97c', '#009ad6', '#33a3dc', '#585eaa']
                return colorList[params.dataIndex % 7]
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{c}%'// 这是关键，在需要的地方加上就行了
              }

            }
          }
        }]
      }
      myChart.setOption(obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.bar-container2 {
  width: 100%;
  height: 100%;
}
</style>
