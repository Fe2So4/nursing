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
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
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
          }
        },
        yAxis: {
          type: 'category',
          data: ['衬衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '袜子1', '袜2子', '袜子3', '袜子5']
        },
        series: [{
          barWidth: '15%',
          name: 'axis',
          type: 'bar',
          data: [10, 20, 30, 40, 49],
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#d71345', '#f47920', '#ffe600', '#45b97c', '#009ad6', '#33a3dc', '#585eaa']
                return colorList[params.dataIndex % 7]
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{b}\n{c}%'// 这是关键，在需要的地方加上就行了
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
