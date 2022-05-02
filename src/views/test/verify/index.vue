<template>
  <div class="verify-container">
    <vab-verify
      ref="slideDiv"
      :w="350"
      :slider-text="text"
      :h="175"
      @success="handleSuccess"
      @fail="handleError"
    ></vab-verify>
    <el-date-picker
      v-model="value1"
      type="monthrange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份">
    </el-date-picker>
  </div>
</template>

<script>
  import VabVerify from '@/plugins/vabVerify'
  export default {
    name: 'Verify',
    components: { VabVerify },
    data () {
      return {
        text: '向右滑动',
        value1: '',
        mydate: null,
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    methods: {
      handleSuccess () {
        this.$message('校验成功')
        // this.$baseMessage('校验成功', 'success')
      },
      handleError () {
        this.$message('校验成功')
        // this.$baseMessage('校验失败', 'error')
      }
    }
  }
</script>
