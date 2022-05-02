import request from '@/utils/request'

export default {
  data () {
    return {
      dialog: false,
      formInfo: {},
      markId: 'id'
    }
  },
  computed: {
    formId () {
      return this.formInfo?.id
    },
    formTitle () {
      return this.formId ? `编辑${this.title}` : `新增${this.title}`
    }
  },
  methods: {
    handleOpenDialog (row = {}) {
      this.formInfo = JSON.parse(JSON.stringify(row))
      this.handleToggleDialog(true)
    },
    handleToggleDialog (val = false) {
      this.dialog = val
      this.handleToggleOpenDialog()
    },
    handleSaveForm () {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          const formInfo = JSON.parse(JSON.stringify(this.formInfo))
          request.setPath(this.api)[this.formId ? 'put' : 'post'](formInfo)
          .then(() => {
            this.handleToggleDialog()
            this.handleGetTable()
          })
        }
      })
    },
    handleDelRow (row, data) {
      this.$confirm('确定删除吗？？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.setPath(`${this.api}${data ? '/{id}' : ''}`).carry([row[this.markId]]).del([row[this.markId]])
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          if (this.dataSource.length === 1 && this.page !== 1) {
            this.page--
            return
          }
          this.handleGetTable()
          this.handlerDelAfter()
        })
      }).catch()
    },
    handleDoExport () {
      this.loading = true
      request.setPath(`${this.api}/download`).export(this.getQueryParams(), `${this.title}数据`, 'xlsx')
      .finally(() => { this.loading = false })
    },
    handleLoadTree (tree, treeNode, resolve) {
      request.setPath(this.api).get({ pid: tree.id }).then(res => {
        this.newPid = tree.id
        this.loadNodeMap.set(tree.id, { tree, treeNode, resolve })
        resolve(res.content)
      })
    },
    refreshLoadTree (parentId) {
      // 根据父级id取出对应节点数据
        if (this.loadNodeMap.get(parentId)) {
          const { tree, treeNode, resolve } = this.loadNodeMap.get(parentId)
          this.$set(this.$refs.myTables.$refs.wxTable.store.states.lazyTreeNodeMap, parentId, [])
          if (tree) {
            this.handleLoadTree(tree, treeNode, resolve)
          }
        }
      },
    /**
     * 停用启用开关
     * @param {*} row 列表数据
     */
    switchChange (row) {
      this.$confirm(`此操作将${row.enabled ? '启用' : '停用'}${row.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.setPath(this.api).put(row).then(res => {
          this.$message({
            type: 'success',
            message: '启用成功!'
           })
         }).catch(() => {
           row.enabled = !row.enabled
         })
      }).catch(() => {
        row.enabled = !row.enabled
      })
    },
    resetForm () {
      this.$refs.formInfo.clearValidate()
      this.dialog = false
    },
    handleToggleOpenDialog () {},
    handleOpenSaveBefore () {},
    handleDelBefore () {},
    handlerDelAfter () {}
  }
}
