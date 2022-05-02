import request from '@/utils/request'

export default {
  data () {
    return {
      dialog: false,
      formInfo: {},
      markId: 'id',
      isEdit: false
    }
  },
  computed: {
    formId () {
      return this.formInfo?.id
    }
  },
  methods: {
    /**
     * 新增/编辑
     * @param {*} row
     */
    handleOpenDialog (row = {}) {
      this.isEdit = true
      if (row.id) {
        this.formInfo = JSON.parse(JSON.stringify(row))
      } else {
        this.handleOpenBeforeDialog()
        this.updataDataSource.unshift({ ...this.dataUnShift })
        this.handleToggleOpenDialog()
      }
    },
    /**
     * 保存
     */
    handleSaveForm () {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          const formInfo = JSON.parse(JSON.stringify(this.formInfo))
          request.setPath(this.api)[this.formId ? 'put' : 'post'](formInfo)
          .then(() => {
            this.isEdit = false
            this.handleGetTable()
            this.hanldeInputSave()
          })
        }
      })
    },
    /**
     * 取消
     * @param {}} row
     */
    handleCancelRow (row) {
      this.isEdit = false
      const updataDataSource = this.updataDataSource
      const findIndex = updataDataSource.findIndex(({ id }) => id === this.formId)
      if (this.formId) {
        if (findIndex !== -1) {
          this.$set(updataDataSource, findIndex, row)
        }
      } else {
        this.updataDataSource.shift({})
      }
      this.$refs.formInfo.clearValidate()
      this.formInfo = {}
      // Object.keys(this.watchObj).forEach((key) => {
      //   this.watchObj[key]() && (this.watchObj[key] = null)
      // })
      // this.watchObj = {}
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
    formEdit (row) {
      return this.isEdit && this.formId === row.id
    },
    handleDoExport () {
      this.loading = true
      request.setPath(`${this.api}/download`).export(this.getQueryParams(), `${this.title}数据`, 'xlsx')
      .finally(() => { this.loading = false })
    },
    handleToggleOpenDialog () {},
    handleOpenBeforeDialog () {},
    handleOpenSaveBefore () {},
    handleDelBefore () {},
    handlerDelAfter () {}
  }
}
