<template>
  <div>
    <h1>多个Excel导出</h1>
    <div class="season">
      <template v-for="(item, index) in dataList">
        <div :key="index">
          {{ `第${index + 1}季度绩效` }}
          <table border>
            <tr>
              <th>名称</th>
              <th>绩效分</th>
            </tr>
            <tr v-for="(scoreItem, scoreindex) in item" :key="scoreindex">
              <td>{{ scoreItem.name }}</td>
              <td>{{ scoreItem.score }}</td>
            </tr>
          </table>
        </div>
      </template>
    </div>
    <button @click="exportSeason">导出绩效信息</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [
        [
          { name: '张明', score: 72 },
          { name: '小金', score: 21 },
          { name: '小凌', score: 16 },
          { name: '盖伦', score: 84 }
        ],
        [
          { name: '张明', score: 32 },
          { name: '小金', score: 54 },
          { name: '小凌', score: 45 },
          { name: '盖伦', score: 26 }
        ],
        [
          { name: '张明', score: 67 },
          { name: '小金', score: 87 },
          { name: '小凌', score: 45 },
          { name: '盖伦', score: 78 }
        ],
        [
          { name: '张明', score: 54 },
          { name: '小金', score: 34 },
          { name: '小凌', score: 26 },
          { name: '盖伦', score: 34 }
        ]
      ]
    }
  },
  methods: {
    // methods 导出绩效信息excel
    exportSeason () {
      // 引入文件
      // eslint-disable-next-line camelcase
      const { export_season_to_excel } = require('./Export2Excel.js')
      // 表头
      const tHeader = ['名称', '绩效分']
      // table表格中对应的属性名
      const filterVal = ['name', 'score']
      const datas = []
      const sheets = []
      this.dataList.forEach((item, index) => {
        // 表格绑定数据转json
        datas.push(this.formatJson(filterVal, item))
        sheets.push(`第${index + 1}季度绩效`)
      })
      export_season_to_excel(
        tHeader,
        datas,
        '部门季度绩效' + new Date().toLocaleDateString(),
        sheets
      )
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
