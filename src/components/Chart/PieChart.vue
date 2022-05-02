<template>
  <div class="pie-chart" :style="{ height: height, width: width }" />
</template>
<script>
import echarts from 'echarts'
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
      this.chart.setOption({
        color: ['#DA373E', '#EC6448', '#EC8153', '#ECB153'],
        series: [
          {
            name: '饼图',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: 20, name: '活动评论5条', percent: '100%' },
              { value: 10, name: '问答评论15条 15%', percent: '0%' },
              { value: 40, name: '课程评论50条 50%', percent: '0%' },
              { value: 40, name: '分享评论25条 25%', percent: '0%' }
            ]
          }
        ],
        graphic: {
          // 添加原生图形元素组件
          elements: [
            {
              type: 'text', // 组件类型
              left: 'center', // 定位
              top: '43%', // 定位
              style: {
                // 样式
                text: '累计发布评论', // 文字
                fontSize: 13, // 文字大小
                textAlign: 'center', // 定位
                width: 30,
                height: 30
              }
            },
            {
              type: 'text',
              left: 'center',
              top: '52%',
              style: {
                text: '140条',
                fontSize: 18,
                textAlign: 'center',
                width: 30,
                height: 25
                // fill: '#3BA5D9'
              }
            }
          ]
        }
      })
    }
  }
}
</script>
