<template>
  <div class="panel-chart" :style="{height: height,width: width }"/>
</template>

<script>
import echarts from 'echarts'
import request from '@/utils/request'
import resize from '@/views/dashboard/mixins/resize'
require('echarts/theme/macarons')
export default {
  mixins: [resize],
  props: {
    height: {
      type: String,
      default: '350px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.on('click', this.handleClick)

      request.setPath('/api/users/referees').get().then(res => {
        this.chart.setOption({
          title: {
            text: '统计推荐人'
          },
          xAxis: {
            type: 'category',
            data: res.map(item => item.name)
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'bar',
            data: res.map(item => item.value),
            showBackground: true
          }]
        })
      })
    },
    handleClick (params) {
      console.log('*******', params)
      this.$emit('click', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-chart {
  padding: 20px;
  height: 500px;
  border-color: antiquewhite;
}
</style>
