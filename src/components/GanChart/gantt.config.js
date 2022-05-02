import dayjs from 'dayjs'

const config = {
  hideHeader: false,
  enableGrab: false,
  cellWidth: 50, // 时间区间的宽度
  cellHeight: 60, // 时间区间的高度
  titleHeight: 40, // 表头的高度
  titleWidth: 240, // 表头和行的宽度
  scale: 1440, // 时间轴的刻度值。单位:分钟，允许值[1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60, 120，180,240,360, 720, 1440]
  timeLines: [ // 显示标记时间，有特殊格式 [{time:'2019-01-11 18:18:18',color:'#00000'}]
    {
      time: dayjs().format('YYYY-MM-DD') + ' 21:20:00',
      color: '#386BAC'
    }
  ],
  // timeLines: [],
  arrayKeys: undefined, // 需要渲染的数组的key。默认：["gtArray"]
  dataKey: 'rowId' // 渲染的每一行的key
}

export default config
