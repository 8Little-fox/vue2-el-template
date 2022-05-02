<template>
  <div class="line-chart" :style="{ height: height, width: width }" />
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
    },
    autoResize: {
      type: Boolean,
      default: true
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
      request
        .setPath('/api/sOrder/statistical')
        .get()
        .then((res) => {
          this.chart.setOption({
            title: {
              text: '下单统计'
            },
            xAxis: {
              data: res.map((item) => item.name)
            },
            yAxis: {},
            series: [
              {
                type: 'line',
                data: res.map((item) => item.value),
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                }
              }
            ]
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
  padding: 20px;
  height: 500px;
  border-color: antiquewhite;
}
</style>
