<template>
<div>
  222
  <GanChart
    ref="ganttChart"
    :gant-data="trainData"
    :start-time="startTime"
    :end-time="endTime"
    class="gantt-wrap-inner"
  />
</div>
</template>

<script>
import GanChart from '@/components/GanChart/index'
import ganData from './mock.js' // 伪造的数据
import dayjs from 'dayjs' // 时间库
export default {
  components: {
    GanChart
  },
  data () {
    return {
      trainData: ganData.ganData,
      startTime: dayjs().subtract(1, 'months').format('YYYY-MM-DD'),
      endTime: dayjs().endOf('months').format('YYYY-MM-DD'),
       parent: 0,
      activeType: 1,
      globalRowId: 1
    }
  },
  mounted () {
    console.log('ganData', ganData.ganData)
  },
  methods: {
    doScrollToPostion () {
      this.$refs.gantt.scrollToPostionHandle({ x: 100, y: 100 })
    },
    doScrollToTime () {
      this.$refs.gantt.scrollToTimehandle('Fri, 31 Jul 2020 12:41:39 GMT')
    }
  }
}
</script>

<style lang="scss" scoped>
.gant-wrap {
  width: 1200px;
  height: 100%;
  margin: auto;
  padding: 10px 0;
  background-color: transparent;
}

.search {
  margin-bottom: 10px;
  padding: 16px 20px 6px;
  border: 1px solid rgba(81, 198, 244, 0.29);
  border-radius: 2px;
  background: #FFFFFF;
  box-shadow: inset 0 0 0 0 rgba(19, 37, 85, 0.42);

  .search-form {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    .export-btn {
      display: flex;
      margin-left: auto;

      .back-day {
        width: 95px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #334FA0;
        border-radius: 4px;
        border: 1px solid #334FA0;
        margin: 0 26px 0 20px;
        cursor: pointer;
      }
    }
  }
}

.form-item {
  margin-right: 20px !important;
  margin-bottom: 10px !important;
}

.gantt-wrap-inner {
  //height: calc(100% - 185px);
  height: calc(100% - 200px);
  background-color: transparent;
}

::v-deep .search-form .ant-form-item-label {
  display: block;
  line-height: 28px;
  text-align: left;
}

::v-deep .search-btn .ant-btn-primary {
  background: linear-gradient(90deg, #334FA0 0%, #3C85B8 100%);
  border-radius: 4px;
  border-color: transparent;
  outline: none;
}

::v-deep .search-btn .ant-btn-primary:focus {
  border-color: transparent;
}
</style>
