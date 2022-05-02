import request from '@/utils/request'
export default {
  data () {
    return {
      dataSource: [],
      loading: false,
      page: 1,
      total: 0,
      size: 10,
      query: {},
      inithanlder: true
    }
  },
  watch: {
    page: 'handleGetTable'
  },
  mounted () {
    this.inithanlder && this.handleGetTable()
  },
  methods: {
    handleGetTable () {
      this.loading = true
      request.setPath(this.api).get(this.getQueryParams()).then((res) => {
        this.dataSource = res.content
        this.total = res.totalElements
        this.handleCompleteTable()
      }).finally(() => { this.loading = false })
    },
    handleDoExport () {
      this.loading = true
      request.setPath(`${this.api}/download`).export(this.getQueryParams(), `${this.title}数据`, 'xlsx')
      .finally(() => { this.loading = false })
    },
    getQueryParams: function () {
      return {
        page: this.page - 1,
        size: this.size,
        sort: this.sort,
        ...this.query
      }
    },
    getQuerySearch () {
      this.query = {}
      if (this.page === 1) {
        this.handleGetTable()
        return
      }
      this.page = 1
    },
    /**
     * 表格获取后
     */
    handleCompleteTable () {}
  }
}
