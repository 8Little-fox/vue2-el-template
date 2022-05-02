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
        legend: {
          top: '30%',
          right: '20%',
          icon: 'circle',
          itemGap: 16, // 设置legend的间距
          itemWidth: 30, // 设置宽度
          itemHeight: 14, // 设置高度
          orient: 'vertical', // 垂直显示还是水平显示
          textStyle: { fontSize: '14' }, // legend字体大小
          data: ['未知', '工作', '待机'],
          formatter: function (name) {
            let pieLegendVale = {}
            const dataFilter = [
              { value: 20, name: '未知', percent: '10%' },
              { value: 10, name: '工作', percent: '10%' },
              { value: 40, name: '待机', percent: '10%' }
            ]
            dataFilter.filter((item) => {
              if (item.name === name) {
                pieLegendVale = item
              }
            })
            return (
              pieLegendVale.name + '  ' + pieLegendVale.value + '  ' + pieLegendVale.percent + '项'
            )
          }
        },
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
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 20, name: '未知', percent: '10%' },
              { value: 10, name: '工作', percent: '10%' },
              { value: 40, name: '待机', percent: '10%' }
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
                text: '发布数量', // 文字
                fontSize: 13, // 文字大小
                textAlign: 'center', // 定位
                width: 30,
                height: 30,
                fill: 'darkgray' // 字体颜色
              }
            },
            {
              type: 'text',
              left: 'center',
              top: '52%',
              style: {
                text: '80GB',
                fontSize: 18,
                textAlign: 'center',
                width: 30,
                height: 25,
                fill: '#3BA5D9'
              }
            }
          ]
        }
      })
    }
  }
}
</script>
