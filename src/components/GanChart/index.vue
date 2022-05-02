<template>
  <div class="gantt-wrapper" :class="{ resizable: resizable }">
    <v-gantt-chart
      ref="ganttChart"
      :hideHeader="hideHeader"
      :enableGrab="enableGrab"
      :startTime="startTime"
      :endTime="endTimeFixOffset"
      :cellWidth="cellWidth"
      :cellHeight="cellHeight"
      :titleWidth="titleWidth"
      :titleHeight="titleHeight"
      :scale="scale"
      :timeLines="timeLines"
      :dataKey="dataKey"
      :arrayKeys="arrayKeys"
      :datas="gantData"
      class="chart-container"
    >
      <template v-slot:block="{ data, item }">
        {{item}}
        <MainBlock
          :data="data"
          :cellHeight="cellHeight"
          :currentTime="currentTime"
          :item="item"
        />
      </template>
      <template v-slot:left="{ data }">
        <LeftBarItem
          :data="data"
          :active-id="activeId"
          @activate="activate"
          :all-org-shown="allOrgShown"
          @allOrgShownChange="allOrgShownChanged"
        />
      </template>
      <template v-slot:timeline="{ day, getTimeScales }">
        <TimeScaleItem :day="day" :getTimeScales="getTimeScales" />
      </template>
      <template v-slot:title>
        <LeftBarHead @activate="changeDataType" />
      </template>
    </v-gantt-chart>

    <ResizeHandle v-model="titleWidth" @resizable="resizableChange" />
  </div>
</template>

<script>
import dayjs from 'dayjs'

import ganttConfig from './gantt.config'

import ResizeHandle from './ResizeHandle.vue'
import LeftBarHead from './LeftBarHead.vue'
import LeftBarItem from './LeftBarItem.vue'
import MainBlock from './MainBlock.vue'
import TimeScaleItem from './TimeScaleItem.vue'

export default {
  name: 'GanttChart',
  components: {
    ResizeHandle,
    LeftBarHead,
    MainBlock,
    LeftBarItem,
    TimeScaleItem
  },
  props: {
    gantData: { type: Array, default: () => [] },
    startTime: { type: String, default: undefined },
    endTime: { type: String, default: undefined },
    activeType: { type: Number, default: undefined },
    allOrgShown: { type: Boolean, default: false }
  },
  computed: {
    endTimeFixOffset () {
      return dayjs(this.endTime, 'YYYY-MM-DD')
        .add(1, 'days')
        .format('YYYY-MM-DD')
    }
  },
  watch: {
    gantData: {
      handler (newVal) {
        this.infoData = newVal
      }
    },
    startTime: {
      immediate: true,
      handler () {
        this.setBlocksBackground()
      }
    },
    times: 'updateData'
  },
  data () {
    return {
      resizable: false,
      infoData: [],
      activeId: '这是一个线下培训',
      currentTime: dayjs(),
      ...ganttConfig,
      times: [
        dayjs().subtract(5, 'hour').toString(),
        dayjs().add(29, 'day').add(2, 'hour').toString()
      ],
      scrollToPostion: { x: 10000, y: 10000 },
      arrayKeys: ['gtArray', 'error'],
      scrollToY: 0
    }
  },
  mounted () {
    this.setBlocksBackground()
  },
  methods: {
    // 滚动某一天至中间
    scrollToTime (date) {
      if (!this.$refs.ganttChart) {
        return
      }

      // todo: 偏移的天数
      const offsetDate = dayjs(date).subtract(8, 'days').format('YYYY-MM-DD')
      this.$refs.ganttChart.scrollToTimehandle(offsetDate)
    },
    resizableChange (evt) {
      this.resizable = evt
    },

    // 设置甘特图背景
    setBlocksBackground () {
      const els = document.getElementsByClassName('gantt-blocks') || []
      if (!els?.length) {
        return
      }

      const days = []
      let start = dayjs(this.startTime, 'YYYY-MM-DD').day()
      for (let i = 0; i < 7; i += 1) {
        days.push(start)
        start += 1
        start %= 7
      }
      [].forEach.call(els, (el) => {
        if (!el.style) {
          el.style = {}
        }
        const lineColor = '#ECECEC'
        const darkColor = '#F5F7FB'
        const lightColor = '#FFFFFF'
        const blockWidthPercent = 100 / 7
        const lineWidthPercent = 0.5

        let linear = 'linear-gradient(to right, '

        days.forEach((day, index) => {
          const bgColor = day === 0 || day === 6 ? darkColor : lightColor

          linear +=
            lineColor +
            ' ' +
            this.parsePercent(index * blockWidthPercent) +
            '% ' +
            this.parsePercent(index * blockWidthPercent + lineWidthPercent) +
            '%, '
          linear +=
            bgColor +
            ' ' +
            this.parsePercent(index * blockWidthPercent + lineWidthPercent) +
            '% ' +
            this.parsePercent((index + 1) * blockWidthPercent) +
            (index === 6 ? '%' : '%, ')
        })

        linear += ')'

        el.style.backgroundImage = linear
      })
    },
    parsePercent (width) {
      return width > 100 ? 100 : width
    },

    // 切换经销商/业务
    changeDataType (val) {
      this.$emit('change', val)
    },
    // 当前选中
    activate (data) {
      console.log('data', data)
      this.activeId = data.name
      this.infoData.forEach((e) => {
        if (e.name === data.name) {
          e.checked = data.checked
        }
      })
    },

    allOrgShownChanged (evt) {
      this.$emit('allOrgShownChanged', evt)
    }
  }
}
</script>

<style scoped lang="scss">
.gantt-wrapper {
  position: relative;

  &.resizable * {
    user-select: none;
  }
}

input[type="range"] {
  width: 100px;
}

.top-bar {
  height: 40px;
}

.chart-container {
  //height: calc(100% - 58px);
  background-color: transparent;
  box-shadow: none !important;
  outline: none !important;
  border: none !important;

  ::v-deep {
    .gantt-container {
      background-color: transparent;
    }

    .gantt-header {
      background-color: transparent;
    }

    .gantt-header-title {
      margin-right: 20px;
      background-color: transparent;
    }

    .gantt-timeline-wrapper {
      transform: translateX(25px);
    }

    .gantt-timeline-block {
      &:last-child {
        //display: none;
      }
    }

    .gantt-markline {
      transform: translateY(-10px);

      .gantt-markline-label {
        display: none;
      }
    }

    .gantt-leftbar-wrapper {
      margin-right: 20px;
      border: 1px solid #cfdaea;
      border-top-width: 0;
      outline: none !important;
    }

    .gantt-blocks {
      min-height: 100%;
      background-color: white;
      background-size: 350px 100% !important;
      background-image: linear-gradient(#ececec 1px, transparent 0),
        linear-gradient(90deg, #ececec 1px, transparent 0);
    }

    .gantt-scroll-x {
      overflow-y: hidden;
    }

    .gantt-scroll-y {
      overflow-x: hidden;
    }

    .gantt-scroll-x,
    .gantt-scroll-y {
      border: none;
      outline: none;
      box-shadow: none;

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        border: none;
      }

      &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
      }

      &::-webkit-scrollbar-corner {
        width: 0;
        height: 0;
        display: none;
      }

      &::-webkit-scrollbar-thumb {
        border: none;
        border-radius: 10px;
        background-color: #b4bbc5;

        &:hover {
          background-color: #909090;
        }
      }
    }
  }
}
</style>
