<script>
/**
 * 从过 a 页面退出到登录页面，登录后还进入 a 页面
 */
export default {
  created () {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function (h) {
    return h()
  }
}
</script>
