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
        this.reComputedDataSource = JSON.parse(JSON.stringify(row))
      } else {
        this.handleOpenBeforeDialog()
        this.reComputedDataSource.dataSource.unshift({ ...this.dataUnShift })
        this.handleToggleOpenDialog()
      }
    },
    handleAllEdit () {
      this.isEdit = true
    },
    /**
     * 保存
     */
    handleSaveForm () {
      this.$refs.tableForm.validate((valid) => {
        if (valid) {
          const params = this.reComputedDataSource.dataSource
          console.log('params', params)
          request.setPath(`${this.api}/saveAll`)[this.formId ? 'put' : 'post'](params)
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
    handleCancelRow () {
      this.isEdit = false
      const updataDataSource = this.reComputedDataSource.dataSource
      updataDataSource.forEach((item) => {
        if (!item.id) {
          this.reComputedDataSource.dataSource.shift({})
        } else {
          this.$set(this.reComputedDataSource.dataSource)
        }
      })
    },
    handleDelRow (row, data) {
      console.log('row', row)
      this.$confirm('确定删除吗？？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.setPath(`${this.api}${data ? '/{id}' : ''}`).carry([row.id]).del([row.id])
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
