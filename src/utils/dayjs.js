import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
// var relativeTime = require('dayjs/plugin/relativeTime')
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

Vue.filter('today', (time) => {
  return dayjs().to(dayjs(time))
})
console.log()
