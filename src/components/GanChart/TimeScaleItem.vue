<template>
  <div class="time-scale-item-wrapper"
       :style="{'height': titleHeight + 'px'}">
<!--    <div class="month"-->
<!--         :class="{'start': isFirst, 'middle': isMiddle, 'end': isLast}">-->
<!--      <span v-if="showMonth">{{ month }}</span>-->
<!--    </div>-->
    <div class="time-scale-item"
         :style="{'height': titleHeight + 'px'}">
      <div class="time-scale-item-inner"
           :class="{'today': isToday}">
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import config from './gantt.config'

export default {
  name: 'TimeScaleItem',
  props: {
    day: {},
    getTimeScales: {}
  },
  computed: {
    month () {
      return this.day.format('YYYY-MM') || ''
    },
    date () {
      return this.day.format('DD') || ''
    },
    isToday () {
      return dayjs().isSame(this.day.format('YYYY-MM-DD'), 'days')
    },
    showMonth () {
      return this.isFirst || this.isMiddle || this.isLast
    },
    isFirst () {
      return dayjs().startOf('months').isSame(this.day.format('YYYY-MM-DD'), 'days')
    },
    isMiddle () {
      return dayjs().date(15).isSame(this.day.format('YYYY-MM-DD'), 'days')
    },
    isLast () {
      return dayjs().endOf('months').isSame(this.day.format('YYYY-MM-DD'), 'days')
    }
  },
  data () {
    return {
      titleHeight: config.titleHeight
    }
  }
}
</script>

<style scoped lang="scss">
.time-scale-item-wrapper {
  position: relative;
}

.month {
  position: absolute;
  top: -100%;
  left: 0;
  height: 30px;
  white-space: nowrap;
}

.time-scale-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;

  .time-scale-item-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 31px;
    height: 29px;
    margin: 0 auto;
    border-radius: 4px;
    font-size: 14px;
    font-family: DINAlternate-Bold, DINAlternate, sans-serif;
    font-weight: bold;
    color: #666666;

    &.today {
      color: #FFFFFF;
      background: linear-gradient(90deg, #334FA0 0%, #3C85B8 100%);
    }
  }
}
</style>
