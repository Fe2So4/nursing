<template>
  <div class="cal-wrap">
    <div class="cal-top">
      <div class="cal-YM">
        <div class="YM-text ovh">
          <div
            title="上一月"
            class="cal-left hand fl"
            @click="getPrevMonth"
          >
            <span> <i class="el-icon-arrow-left" /></span>
          </div>
          <div class="titleDay">
            {{ calendar.year }}年{{ calendar.month }}月
          </div>
          <!-- <span
            @click="backToday"
            class="hand"
            title="返回今天"
            v-if="showToday"
            >今</span> -->

          <div
            title="下一月"
            class="cal-right hand fr"
            @click="getNextMonth"
          >
            <span> <i class="el-icon-arrow-right" /> </span>
          </div>
        </div>
      </div>
      <div class="cal-week-wrap ovh">
        <div class="cal-week red">
          星期日
        </div>
        <div
          class="cal-week"
          v-for="(item, index) in calendar.weeks"
          :key="index"
        >
          {{ item }}
        </div>
        <div class="cal-week red">
          星期六
        </div>
      </div>
    </div>
    <el-scrollbar style="height:700px">
      <table
        id="table"
        class="cal-table mb20"
      >
        <tr
          v-for="(item, itemIndex) in calendar.dayList"
          :key="itemIndex"
        >
          <td
            v-for="key in item"
            :key="key.date"
            :class="{ 'bg-grey': key.disable }"
          >
            <div
              class="cal-item"
              :class="{ 'cal-active': calendar.isDay == key.date }"
            >
              <div style="height:44px">
                <div class="item-day">
                  {{ key.day }}
                </div>
              </div>
              <div
                class="item-type"
                v-for="(item,index) in 6"
                :key="index"
              >
                123
              </div>
            </div>
          </td>
        </tr>
      </table>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  mounted () {
    this.backToday()
  },
  props: {
    showToday: {
      type: Boolean,
      default: false // 是否显示返回今天按钮
    }
  },
  data () {
    return {
      calLoading: false,
      calendar: {
        // 日历
        dayList: [], // 二维数组，循环行，循环列
        prev: [],
        current: [],
        next: [],
        year: '',
        month: '',
        weeks: ['星期一', '星期二', '星期三', '星期四', '星期五'],
        isDay: '' // 判断是否是'今天'
      }
    }
  },
  methods: {
    initDate (val) {
      if (val < 10) {
        return '0' + val
      } else {
        return val
      }
    },
    getLastDate (year, month) {
      return new Date(year, month, 0)
    },
    getmonthDays () {
      // 获取上月 当前月和下月天数
      let that = this
      let y = that.calendar.year
      let m = that.calendar.month
      let preYear // 上一年
      let preMonth // 上一月
      let nextYear // 下一年
      let nextMonth // 下一月
      that.calendar.current = []
      that.calendar.prev = []
      that.calendar.next = []

      // 当前月天数
      for (let i = 1; i <= that.getLastDate(y, m).getDate(); i++) {
        // date用于日期判断，day用于显示，flag用于状态判断
        that.calendar.current.push({
          date: y + '-' + m + '-' + that.initDate(i),
          day: i,
          timeList: [],
          disable: true
        })
      }

      /* 上月 */
      let d = that.getLastDate(y, m - 1).getDate() // 上月一共多少天
      preYear = m === 1 ? y - 1 : y // 当前月是1月，那么上一月的年份要-1
      preMonth = m === 1 ? 12 : that.initDate(parseInt(m) - 1) // 当前月是1月，那么上一月是12月
      for (let j = that.getLastDate(y, m - 1).getDay(); j >= 0; j--) {
        that.calendar.prev.push({
          date: preYear + '-' + preMonth + '-' + (d - j),
          day: d - j,
          timeList: [],
          disable: true
        })
      }

      /* 下月 */
      nextYear = m === 12 ? y + 1 : y // 当前月是12月，那么下一月的年份要+1
      nextMonth = m === 12 ? '01' : that.initDate(parseInt(m) + 1) // 当前月是12月，那么下一月是1月
      for (
        let k = 1;
        k <= 42 - that.calendar.current.length - that.calendar.prev.length;
        k++
      ) {
        that.calendar.next.push({
          date: nextYear + '-' + nextMonth + '-' + that.initDate(k),
          day: k,
          timeList: [],
          disable: true
        })
      }
      that.calendar.dayList = []

      // 数组合并
      let tempArr = that.calendar.prev.concat(
        that.calendar.current,
        that.calendar.next
      )
      // 数组分组，每7个一组
      for (let i = 0; i < tempArr.length; i += 7) {
        that.calendar.dayList.push(tempArr.slice(i, i + 7))
      }
      let count = 0
      that.calendar.dayList[0].forEach(item => {
        if (item.day > 7) {
          item.day = ''
          count++
        }
      })

      if (count === 7) {
        that.calendar.dayList.shift()
      }
      let length = that.calendar.dayList.length - 1
      let endCount = 0
      that.calendar.dayList[length].forEach(item => {
        if (item.day < 20) {
          item.day = ''
          endCount++
        }
      })
      that.calendar.dayList[length - 1].forEach(item => {
        if (item.day < 15) {
          item.day = ''
        }
      })
      if (endCount === 7) {
        that.calendar.dayList.pop()
      }
    },
    getPrevMonth () {
      // 上一月
      console.log(this.calendar.month)
      if (this.calendar.month !== '01') {
        this.calendar.month = this.initDate(--this.calendar.month)
      } else {
        this.calendar.month = 12
        this.calendar.year = --this.calendar.year
      }
      this.getmonthDays()
      this.currentDay()
      this.$emit('on-click', 0)
    },
    getNextMonth () {
      // 下一月
      if (this.calendar.month < 12) {
        this.calendar.month = this.initDate(++this.calendar.month)
      } else {
        this.calendar.month = '01'
        this.calendar.year = ++this.calendar.year
      }
      this.getmonthDays()
      this.currentDay()
      this.$emit('on-click', 1)
    },
    currentDay () {
      // 获取今天,高亮显示今天
      let that = this
      let date = new Date()
      let y = that.calendar.year
      let m = that.calendar.month

      if (y === date.getFullYear() && m === date.getMonth() + 1) {
        // 如果是当年当月
        that.calendar.isDay = y + '-' + m + '-' + that.initDate(date.getDate()) // 获取到今天的号数
      } else {
        that.calendar.isDay = -1
      }
    },
    backToday () {
      // 返回今天
      let that = this
      let d = new Date()
      that.calendar.year = d.getFullYear()
      that.calendar.month = that.initDate(d.getMonth() + 1)
      that.currentDay()
      that.getmonthDays()
    }
  }
}
</script>
<style lang="scss" scoped >
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden !important;
}
.ivu-affix {
  background: #fff;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.hand {
  cursor: pointer;
}
.titleDay {
    font-weight: 600;
    font-size: 18px;
}
.cal-wrap,
.perconsult .cert-title + p {
  font-family: "SimSun";
}
.cal-YM {
    padding-bottom: 20px;
  text-align: center;
  font-size: 28px;
  /* line-height: 50px; */
  width: 260px;
  margin: 0 auto;
}
.cal-body {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.cal-week-wrap {
  display: table;
  width: 100%;
  border-bottom: none;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
  border-radius: 5px;
}
.cal-week {
  box-sizing: border-box;
  /* border-right: 2px rgb(239, 239, 239) solid; */
  color: #fff;
  color: #888888;
  /* background-color: #143298; */
  width: 14.28%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  float: left;
}
.YM-text {
  display: flex;
  font-size: 18px;
  justify-content: center;
  align-items: center;
}
.YM-text span {
  /* display: inline-block;
  margin: -10px 0 0 10px;
  width: 26px;
  height: 26px;
  border-radius: 3px;
  background: #f17437;
  line-height: 26px;
  color: #fff;
  font-size: 14px; */
}
.cal-left,
.cal-right {
  font-size: 22px;
  width: 20px;
  text-align: center;
}
.cal-left {
    margin-right: 20px;
}
.cal-right  {
    margin-left: 20px;
}
.cal-left:hover > i,
.cal-right:hover > i {
  color: #3583f7;
}
.cal-table {
  height: 100%;
  overflow: hidden;
  width: 100%;
  border: 1px solid #e5e5e5;
  text-align: center;
  background-color: #fff;
  border-collapse: collapse;
}
.cal-table tr {
  border-bottom: 1px solid #e5e5e5;
}
.cal-table tr td:first-child .cal-item > span,
.cal-table tr td:last-child .cal-item > span {
  color: red;
}
.cal-table td {
  border-right: 1px rgb(239, 239, 239) solid;
  cursor: pointer;
  vertical-align: top;
}
.cal-table td:hover {
  background: #f5f5ed;
}

.cal-item {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}
.cal-item > span {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 4px auto;
  line-height: 32px;
  font-size: 16px;
}
.cal-item .item-type {
  width: 60%;
  text-align: left;
  border-left: 1px solid #366FE2;
  /* padding-left: 0 20px; */
  margin: 0 15px;
  background-color: #DEE9FF;
  padding-left: 10px;
  margin-bottom: 5px;
}
.cal-active .item-day {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff !important;
    background: #3583f7;
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cal-time-list {
  font-size: 12px;
  text-align: left;
}
.cal-time-list > p {
  width: 100px;
  margin: 0 auto;
  padding-left: 8px;
  height: 18px;
  line-height: 18px;
}
.cal-time-list > p > span {
  display: block;
  overflow: hidden;
}
.item-day {
  font-weight: 600;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  /* background-color: #ccc; */
}
</style>>
