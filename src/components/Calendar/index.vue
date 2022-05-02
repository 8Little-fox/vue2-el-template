<template>
  <div>
    <div class="header">
      <div>
        <slot name="search" />
      </div>
      <div class="header-right">
        <div @click="todayChange()" class="today">今天</div>
        <img
          class="btn-img"
          @click="calChange('prev')"
          src="@/assets/prev.png"
        />
        <div class="center">{{ calendarOptions.initialDate }}</div>
        <img
          class="btn-img"
          @click="calChange('next')"
          src="@/assets/next.png"
        />
      </div>
    </div>
    <FullCalendar
      :options="calendarOptions"
      @dayClick="dayClick"
      class="calendar"
      ref="fullCalendar"
    />
  </div>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// import { approvalStatus } from '@/api/trainer/index'
// import store from '@/store/index'
import dayjs from 'dayjs'
import calendar from './calendar'
import { debounce } from '@/utils/tools/method'
import Common from '@/utils/tools/Common'
import calendarConfig from './calendar.config'

export default {
  components: {
    FullCalendar
  },
  props: {
    calendarData: {
      type: Array,
      default: () => []
    },
    // 是否禁止拖动
    editable: {
      type: Boolean,
      default: false
    },
    // 编辑状态
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        ...calendarConfig, // 日历基础配置
        views: {
          dayGridMonth: {
            // 转农历
            dayCellContent: this.dayCellContent
          }
        },
        moreLinkContent: {
          html: '<div id="text"><span>全部日程</div>'
        },
        editable: this.editable, // 是否可以进行（拖动、缩放）修改
        dateClick: !this.isEdit ? this.handleDateClick : () => {}, // 单击日历某一天的单元格时的事件，后面的是可以动作函数,
        // eventRender: this.eventRender, // 修改事件内容显示格式
        // select: this.handleDateSelect, // 范围选择日期
        events: [], // 业务条数据
        // eventClick: this.handleEventClick, // 点击业务条
        selectAllow: this.handlerSelectAllow, // 禁止选择日期段
        eventDrop: this.handleDrop, // 日程拖拽停止时触发
        eventContent: this.eventContent // 向日历添加内容
      },
      transDateRange: {}, // 记录移动过的数据
      findIndex: 0,
      dropData: [] // 月份下更新后的业务条数据
    }
  },
  watch: {
    calendarData: {
      handler (newVal) {
        const data = newVal.map((_) => ({
          training_id: _.id, // 辅导业务id
          orgid: _.orgid, // 经销商id
          title: _.title, // 培训名
          start: _.start_date,
          // end: _.end_date,
          end: +new Date(_.end_date),
          color: _.color,
          stage_id: _.stage_id, // 培训内阶段Id
          status_name: _.status_name, // 状态名,
          display: 'color', // 避免业务条日期是一天时背景色透明
          editable: this.editable && !this.disposeEditable(_.start_date)
        }))
        // 移动的月份
        const stageId = this.transDateRange.stage_id
        const monthFormat = dayjs(
          stageId && this.transDateRange.start_date
        ).format('YYYY-MM')
        const month = dayjs(monthFormat).valueOf()
        const calendarMonth = dayjs(this.calendarOptions.initialDate).valueOf()
        // 时间重置为拖动完的新时间
        if (this.isEdit && stageId && month === calendarMonth) {
          this.handlerDropDate(data)
        }
        this.calendarOptions.events =
          this.transDateRange.stage_id && month === calendarMonth
            ? this.dropData
            : data
        this.$store.dispatch(
          'common/setCalendarOptions',
          this.calendarOptions.events
        )
      },
      immediate: true
    }
  },
  methods: {
    eventContent (arg) {
      const italicEl = document.createElement('div')
      const { title } = arg.event._def
      const content = arg.event._def.extendedProps.status_name
      italicEl.addEventListener('click', async () => {
        // const stageId = arg.event._def.extendedProps.stage_id
        // const { data } = await approvalStatus({ stage_id: stageId })
        italicEl.style.position = 'relative'
        const titleDom = document.createElement('div')
        titleDom.innerHTML = '审批状态：<span>审核通过</span><br>审批人：XXX<br>联系电话：1884232xxxx'
        titleDom.style.position = 'absolute'
        titleDom.style.bottom = '40px'
        titleDom.style.right = '0px'
        titleDom.id = 'my-title'
        italicEl.appendChild(titleDom)
      })

      // Common
      italicEl.addEventListener('mouseenter', (evt) => {
        Common.popupDocument(evt, title)
      })
      italicEl.addEventListener('mouseout', () => {
        const element = document.querySelector('#my-title')
        const tooltip = document.querySelector('#my-tooltip')
        if (element) element.remove()
        if (tooltip) tooltip.remove()
      })
      italicEl.innerHTML = `<div>${title}<div class="status">${content || ''}</div></div>`
      const arrayOfDomNodes = [italicEl]
      return { domNodes: arrayOfDomNodes }
    },
    dayCellContent (item) {
      const mark = sessionStorage.getItem('joinholiday')
      const oldDate = new Date(item.date).toLocaleDateString().split('/')
      const dateF = calendar.solar2lunar(oldDate[0], oldDate[1], oldDate[2])
      if (item.dayNumberText === `${mark}日`) {
        return {
          html: `<p id='selectedHolidy'><label>${dateF.cDay}</label></p><p><span>${dateF.IDayCn}</span></p>`
        }
      }
      return {
        html: `<div style="display:flex">
                <div id='day'>${dateF.cDay}</div>
                <div id='cn'>${dateF.IDayCn}</div>
              </div>`
      }
    },
    todayChange () {
      this.$refs.fullCalendar.getApi().today()
      this.calendarOptions.initialDate = dayjs().format('YYYY-MM')
    },
    // 判断当前传入的时间是否在今天之前
    disposeEditable (e) {
      return Boolean(+new Date(e) < +new Date(new Date().toDateString()))
    },
    handleDrop ({ event }) {
      const instance = '_instance'
      const def = '_def'
      const { start, end } = event[instance].range
      const { events } = this.calendarOptions
      // eslint-disable-next-line camelcase
      const { stage_id } = event[def].extendedProps
      const editRange = [
        {
          stage_id,
          start_date: dayjs(start).format('YYYY-MM-DD'),
          end_date: dayjs(end).format('YYYY-MM-DD')
        }
      ]
      this.transDateRange = editRange.pop()
      if (this.transDateRange.stage_id) {
        this.handlerDropDate(events)
        events.forEach((item) => {
          item.editable = item.stage_id === this.transDateRange.stage_id
        })
        this.dropData = events
      }
    },
    // 一次只可以拖动一个, 切换月份业务条展示最新的位置
    handlerDropDate (events) {
      const editFindIndex = events.findIndex(
        (item) => item.stage_id === this.transDateRange.stage_id
      )
      events[editFindIndex].start = this.transDateRange.start_date
      events[editFindIndex].end = +new Date(this.transDateRange.end_date)
    },
    // 点击当天
    dayClick (day, jsEvent) {
      const calendarApi = this.$refs.fullCalendar.getApi()
      const today = calendarApi.getDate()
      calendarApi.gotoDate(today)
      console.log('dayClick', day, jsEvent)
    },
    // 月份切换
    calChange: debounce(
      function (type) {
        const date = dayjs(this.calendarOptions.initialDate, 'YYYY-MM')
        this.$refs.fullCalendar.getApi()[type === 'next' ? 'next' : 'prev']()
        this.calendarOptions.initialDate =
          type === 'next'
            ? date.add(1, 'months').format('YYYY-MM')
            : date.subtract(1, 'months').format('YYYY-MM')
      },
      500,
      true
    ),
    handleDateClick (e) {
      const { orgId, calendarOptions } = this.$store.state.common
      const { trainingId } =
        this.$store.state.common.trainingObj
      const addRange = [] // 新增区间
      const dateRange = [] // 时间段
      const currentRange = [] // 当前选中的区间（8号， 9号，10号）
      // 当前点击的日期小于当天日期-禁止点击
      if (dayjs(e.date).valueOf() < dayjs().valueOf()) {
        return false
      }
      // 根据后台配置天数进行追加数据
      let dateTime = new Date(e.dateStr)
      dateTime = new Date((dateTime / 1000 - 86400) * 1000)
      for (let i = 0; i < 3; i++) {
        dateTime = new Date((dateTime / 1000 + 86400) * 1000)
        calendarOptions.forEach((item) => {
          // currentRange.push(isDuringDate(item.start,
          //   formatDateTime(Date.parse(dateTime)),
          //   formatDateTime(item.end)))
        })
        addRange.push({
          training_id: trainingId,
          orgid: orgId,
          start: dayjs(dateTime).format('YYYY-MM-DD')
        })
      }

      if (currentRange.includes(true)) {
        this.$message.error('所选时间段包含不可选日期，请重新选择')
        return false
      }
      dateRange.push({
        training_id: trainingId,
        orgid: orgId,
        title: '豪华汽车',
        color: 'rgb(207, 203, 203)',
        start: addRange[0].start,
        end: +new Date(addRange[addRange.length - 1].start)
      })
      const filterOptions = calendarOptions.filter(
        (filter) => filter.training_id !== trainingId || filter.orgid !== orgId
      )
      this.calendarOptions.events = [...filterOptions, ...dateRange]
      this.$store.dispatch(
        'common/setCalendarOptions',
        this.calendarOptions.events
      )
    },
    handlerSelectAllow (e) {
      if (dayjs(e.start).valueOf() < dayjs().valueOf) {
        this.disabled = false
      }
      return this.disable
    }
    // handleDateSelect(info) {
    //   let sTime = new Date(info.start).getTime();
    //   const eTime = new Date(info.end).getTime();
    //   const day = 1000 * 60 * 60 * 24;
    //   const count = (eTime - sTime) / day;
    //   const eventsList = [];
    //   let eventsData = {};
    //   const { events } = this.calendarOptions;
    //   const color = events[0]?.color || '#00DB00';
    //   for (let i = 0; i < count; i += 1) {
    //     const newDate = new Date(sTime);
    //     const y = newDate.getFullYear();
    //     const m = newDate.getMonth() + 1 < 10
    //       ? `0${newDate.getMonth() + 1}`
    //       : newDate.getMonth() + 1;
    //     const d = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    //     sTime += day;

    //     eventsData = {
    //       start: `${y}-${m}-${d}`,
    //       display: 'background',
    //       color,
    //     };
    //     eventsList.push(eventsData);
    //   }
    //   console.log('eventsList', eventsList);
    // },
  }
}
</script>

<style lang="scss" scoped>
.class1 {
  color: red;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 0 15px 4px;
  text-align: center;
  height: 69px;
  background: rgba(255, 255, 255, 0.45);
  box-shadow: inset 0px 0px 0px 0px rgba(19, 37, 85, 0.42);
  border: 1px solid rgba(81, 198, 244, 0.29);
  .header-right {
    display: flex;
    margin-right: 20px;
  }
  .today {
    width: 95px;
    height: 29px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #384f9b;
    margin-right: 20px;
    color: #384f9b;
    line-height: 29px;
  }
  .btn-img {
    width: 29px;
    height: 29px;
  }
  .center {
    width: 143px;
    height: 29px;
    background: #ffffff;
    opacity: 0.41;
    border: 1px solid #bccee3;
    line-height: 29px;
  }
}
.calendar {
  width: 100%;
  // height: 100%;
}
.status {
  // float: right;
  // color: red;
}
#calendar {
  //* various CSS styles to make calendar
  background-color: #a0a8a0;
}
.fc-theme-standard {
  border: 1px solid #e6e8ec;
  box-sizing: border-box;
}
::v-deep #my-title {
  width: 250px;
  height: 100px;
  border: #ccc 1px solid;
  background-color: #fff;
  color: #000;
}
.fc-event-title {
  //事件样式
  width: 1500px;
  height: 1000px;
  background-color: red;
}
.fc-scrollgrid-sync-inner {
  height: 75px;
}
::v-deep .fc-col-header-cell-cushion {
  //周几的字
  line-height: 75px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #1c3373;
}
.fc-daygrid-day-number {
  position: absolute;
  left: 0;
}
.fc-scroller-harness {
  height: 74px;
}
::v-deep .fc-scroller-harness {
  height: 100%;
}
#fc-dom-767 {
  font-family: PingFangSC-Regular, PingFang SC;
}
::v-deep .fc-event-main div > div {
  padding: 0 10px;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
::v-deep .fc-button-primary:disabled {
  //按钮样式
  width: 54px;
  height: 29px;
  background: linear-gradient(90deg, #334fa0 0%, #3c85b8 100%);
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  opacity: 1;
}
::v-deep .fc-button-primary {
  //按钮样式
  /*color: red;*/
  margin-top: 10px;
  width: 54px;
  height: 29px;
  background: #f9fafe;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #727b84;
  line-height: 17px;
}
::v-deep .fc-daygrid-event {
  // 日程样式
  height: 34px;
  border-radius: 2px;
  line-height: 34px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
}
::v-deep .fc-daygrid-day-top {
  display: -webkit-box;
  #cn {
    margin-right: 110px;
    margin-top: 10px;
    // padding-right: 20px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 25px;
  }
  #day {
    margin-top: 10px;
    margin-right: 10px;
    font-size: 24px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #999999;
    line-height: 28px;
  }
  #text {
    span {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #384f9b;
      line-height: 20px;
    }
  }
}
</style>
