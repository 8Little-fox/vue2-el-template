import dayjs from 'dayjs'

const config = {
  // initialView: 'timeGridWeek',
  timeZone: 'local',
  initialDate: dayjs().format('YYYY-MM'), // 当前显示月份
  firstDay: 0, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
  locale: 'zh-cn', // 切换语言，当前为中文
  headerToolbar: false, // 日历头部月份切换
  businessHours: true, // 周六日灰背景
  defaultView: 'month',
  aspectRatio: 1.95, // 设置日历单元格宽度与高度的比例。
  eventLimit: true, // 设置月日程，与all-day slot的最大显示数量，超过的通过弹窗显示
  dayMaxEventRows: true, // 开启日历事件过多时的折叠功能
  selectable: true, // 点击有选中背景
  displayEventEnd: true, // 所有视图显示结束时间
  handleWindowResize: false // 是否随浏览器窗口大小变化而自动变化。
}
export default config
