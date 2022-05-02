import Mock from 'mockjs'
import dayjs from 'dayjs'

const colorList = [
  '(252, 105, 100)',
  '(247, 167, 71)',
  '(116, 202, 90)',
  '(83, 186, 241)',
  '(208, 142, 2231)'
]
const nameList = '希望号,飞翼号,光明号,窥探号,力神号,警官号,闪电流星号,博士号,霹雳火神号,狙击手号,希望之光号,南海忍者号,火速E3号,山神号,安全卫士号,铁锤号,寿星号,星星号,罗曼斯卡,欲望号,霹雳雷电号,消防号,欧洲之星号'.split(
  ','
)
const typeList = '🚅,🚈,🚄'.split(',')

const Random = Mock.Random

let colNum = 10
let times = [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
var template = {
  id: () =>
    'JHR' +
    Random.natural(100, 999) +
    Random.character('upper') +
    Random.character('upper'),
  name: () => Random.pick(nameList),
  type: () => Random.pick(typeList),
  colorPair: () => {
    const a = 'rgb' + Random.pick(colorList)
    return {
      dark: a.replace(')', ',0.8)'),
      light: a.replace(')', ',0.1)')
    }
  },
  speed: () => Random.natural(0, 200),
  gtArray: () => {
    const temp = []
    let i = 0
    const j = Random.natural(colNum - 1, colNum)
    let tempStart = dayjs(times[0]).subtract(12, 'hour')
    let tempEnd = dayjs(times[0]).subtract(12, 'hour')

    while (i < j) {
      tempStart = tempEnd.add(Random.natural(1, 5), 'hour')
      tempEnd = tempStart.add(Random.natural(1, 5), 'hour')
      temp.push({
        id:
          Random.character('upper') +
          Random.character('upper') +
          Random.natural(1000, 9999),
        passenger: Random.natural(10, 200),
        start: tempStart.toString(),
        end: tempEnd.toString()
      })

      i++
    }
    return temp
  }
}
const ganData = [
  { name: '这是一个线下培训的标题', color: '#94DAC1', count: 5, data: [{ name: '2阶段', count: 5, data: [{ name: '刘晓勇', count: 2, data: [{ stage_id: 4, training_id: 6, lecturer_id: 6970, orgid: 791, start_date: '2022-01-04', end_date: '2022-01-10', stage: 2, status: 1, status_sub: 0, to_be_confirmed: 0, lecturer_user: { truename: '刘晓勇', id: 6970 }, org: { name: '重庆金榜汽车销售服务有限公司', id: 791 }, color: '#94DAC1' }, { stage_id: 9, training_id: 6, lecturer_id: 6970, orgid: 791, start_date: '2022-01-13', end_date: '2022-01-18', stage: 2, status: 1, status_sub: 0, to_be_confirmed: 0, lecturer_user: { truename: '刘晓勇', id: 6970 }, org: { name: '重庆金榜汽车销售服务有限公司', id: 791 }, color: '#94DAC1' }], parent: 2, checked: false, rowId: 3, gtArray: [{ training_id: 6, stage_id: 4, name: '重庆金榜汽车销售服务有限公司', start: '2022-01-04 00:00:00', end: '2022-01-10 23:59:59', status: 1, status_sub: 0, stage: 2, to_be_confirmed: 0 }, { training_id: 6, stage_id: 9, name: '重庆金榜汽车销售服务有限公司', start: '2022-01-13 00:00:00', end: '2022-01-18 23:59:59', status: 1, status_sub: 0, stage: 2, to_be_confirmed: 0 }], color: '#94DAC1' }, { name: '马龙平', count: 3, data: [{ stage_id: 7, training_id: 6, lecturer_id: 12623, orgid: 1794, start_date: '', end_date: '', stage: 2, status: 2, status_sub: 0, to_be_confirmed: 1, lecturer_user: { truename: '马龙平', id: 12623 }, org: { name: '山东鸿运汽车交易广场有限公司', id: 1794 }, color: '#94DAC1' }, { stage_id: 10, training_id: 6, lecturer_id: 12623, orgid: 1, start_date: '', end_date: '', stage: 2, status: 1, status_sub: 0, to_be_confirmed: 1, lecturer_user: { truename: '马龙平', id: 12623 }, org: { name: '全部', id: 1 }, color: '#94DAC1' }, { stage_id: 11, training_id: 6, lecturer_id: 12623, orgid: 1, start_date: '', end_date: '', stage: 2, status: 1, status_sub: 0, to_be_confirmed: 1, lecturer_user: { truename: '马龙平', id: 12623 }, org: { name: '全部', id: 1 }, color: '#94DAC1' }], parent: 2, checked: false, rowId: 4, gtArray: [{ training_id: 6, stage_id: 7, name: '山东鸿运汽车交易广场有限公司', start: ' 00:00:00', end: ' 23:59:59', status: 2, status_sub: 0, stage: 2, to_be_confirmed: 1 }, { training_id: 6, stage_id: 10, name: '全部', start: ' 00:00:00', end: ' 23:59:59', status: 1, status_sub: 0, stage: 2, to_be_confirmed: 1 }, { training_id: 6, stage_id: 11, name: '全部', start: ' 00:00:00', end: ' 23:59:59', status: 1, status_sub: 0, stage: 2, to_be_confirmed: 1 }], color: '#94DAC1' }], parent: 1, checked: false, rowId: 2 }], parent: 0, checked: false, rowId: 1 }
]
function mockDatas (nums, col, t) {
  colNum = col
  times = t
  const datas = []
  for (let i = 0, j = Random.natural(nums, nums); i < j; i++) {
    datas.push(Mock.mock(template))
  }
  console.log('datas*****', datas)
  return datas
}

export default {
  mockDatas,
  ganData
}
