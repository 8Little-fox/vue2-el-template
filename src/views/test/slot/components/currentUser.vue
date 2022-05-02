<template>
  <div>
    <el-button @click="filter()" size="small" type="success">筛选列</el-button>

    <el-table ref="table" :data="list" height="250" border>
      <el-table-column
        align="center"
        prop="date"
        label="日期"
        v-if="columnHeaders[0].isShow"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
        v-if="columnHeaders[1].isShow"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="地址"
        v-if="columnHeaders[2].isShow"
      >
      </el-table-column>
    </el-table>

    <el-dialog title="筛选列" :visible.sync="filterDialog" width="50%">
      <el-checkbox-group v-model="columnSelected">
        <el-checkbox
          v-for="item in columnHeaders"
          :label="item.title"
          :key="item.index"
        ></el-checkbox>
      </el-checkbox-group>
      <span slot="footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 表格数据
      list: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      // 对话框是否显示
      filterDialog: false,
      // 表格列已经选择项
      columnSelected: [],
      // 筛选表格的表头信息 index 排序 title 表头 isShow 是否展示
      columnHeaders: [
        { index: 0, title: '日期', isShow: true },
        { index: 1, title: '姓名', isShow: true },
        { index: 2, title: '地址', isShow: true }
      ]
    }
  },
  watch: {
    // 监听列表显示隐藏
    columnSelected (newArrayVal) {
      // 计算为被选中的列标题数组
      const nonSelecteds = this.columnHeaders
        .filter((item) => newArrayVal.indexOf(item.title) === -1)
        .map((item) => item.title)
      // 根据计算结果进行表格重绘
      this.columnHeaders.filter((item, i) => {
        const isNonSelected = nonSelecteds.indexOf(item.title) !== -1
        if (isNonSelected) {
          // 修改选中的 columnHeaders 里面 isShow 和 title 的状态
          this.columnHeaders[i].isShow = false
          this.columnHeaders[i].title = item.title
          // 隐藏未选中的列
          item.isShow = false
          this.$nextTick(() => {
            this.$refs.table.doLayout()
          })
        } else {
          // 修改未选中的 columnHeaders 里面 isShow 和 title 的状态
          this.columnHeaders[i].isShow = true
          this.columnHeaders[i].title = item.title
          // 显示已选中的列
          item.isShow = true
          this.$nextTick(() => {
            this.$refs.table.doLayout()
          })
        }
      })
    }
  },
  methods: {
    // 筛选列
    filter () {
      // 默认全部选中
      // 注意：对话框第 1 次打开时复选框需要默认全部选中，仅仅是第 1 次
      // 判断 columnHeaders 数组中的 isShow 是否全是 true
      // 有 1 个是 false 的都不是第 1 次 打开对话框
      const flag = this.columnHeaders
        .map((item) => {
          return item.isShow
        })
        .indexOf(false)
      if (flag === -1) {
        this.columnSelected = this.columnHeaders.map((item) => {
          return item.title
        })
      }
      this.filterDialog = true
    }
  }
}
</script>
