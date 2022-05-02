<template>
  <div>
    <h1>单个Excel导出</h1>
    <table border>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>登陆次数</th>
        <th>部门</th>
      </tr>
      <tr v-for="item in dataList" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.loginTime }}</td>
        <td>{{ item.department }}</td>
      </tr>
    </table>
    <button @click="exportExcel">导出信息</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [
        { name: '张明', loginTime: 16, id: 1, department: '生产部', sex: '男' },
        { name: '小金', loginTime: 11, id: 2, department: '生产部', sex: '女' },
        { name: '小凌', loginTime: 21, id: 3, department: '生产部', sex: '男' },
        { name: '盖伦', loginTime: 5, id: 4, department: '测试部', sex: '男' }
      ]
    }
  },
  methods: {
    // 导出excel
    exportExcel () {
      // 引入文件
      // eslint-disable-next-line camelcase
      const { export_json_to_excel } = require('./Export2Excel.js')
      const tHeader = ['ID', '名称', '登陆次数', '部门']
      const filterVal = ['id', 'name', 'loginTime', 'department']
      const data = this.formatJson(filterVal, this.dataList)
      export_json_to_excel(
        tHeader,
        data,
        '部门登陆信息' + new Date().toLocaleDateString()
      )
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
