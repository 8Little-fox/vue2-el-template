<template>
  <div>
    <SelectCom />
    <SelectCom />
    <div style="margin: 20px">
      <el-button
        @click="
          () => {
            visible = true;
          }
        "
        >test btn</el-button
      >
      <el-dialog title="测试弹窗" :visible.sync="visible">
        <el-form ref="formInfo" :rules="rules" :model="formInfo" :validate-on-rule-change="false">
          <el-form-item prop="test" label="test">
            <el-input v-model="formInfo.test" />
          </el-form-item>
          <el-form-item prop="test2" label="test2">
            <el-input v-model="formInfo.test2" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="handleOkForm()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-button @click="handlerRequest">测试axios</el-button>
  </div>
</template>

<script>
import SelectCom from '@/components/Select/index'
import { getListAPI } from './api.js'
export default {
  name: 'Select',
  components: {
    SelectCom
  },
  data () {
    return {
      visible: false,
      formInfo: {}
    }
  },
  computed: {
    rules () {
        if (!this.visible) {
          return {}
        }
        const isRequired = !!this.formInfo.test
        const baseRules = {
          test: [
            { required: true, message: '必须填', trigger: 'blur' }
          ]
        }
        const otherRules = isRequired ? { test2: [{ required: true, message: '必须填2', trigger: 'blur' }] } : {}
        return { ...baseRules, ...otherRules }
    }
  },
    watch: {
      'formInfo.test' (val) {
        this.$refs.formInfo[!val ? 'clearValidate' : 'validateField'](['test2'])
      },
      visible (val) {
        if (!val) {
          this.$refs.formInfo.clearValidate()
          this.formInfo = {}
        }
      }
    },
    methods: {
      handlerRequest () {
        getListAPI().then(res => { console.log(res) })
          setTimeout(() => {
            getListAPI().then(res => { console.log(res) })
          }, 200)
          setTimeout(() => {
            getListAPI().then(res => { console.log(res) })
          }, 400)
      },
      handleOkForm () {
        this.$refs.formInfo.validate((valid) => {
          if (valid) {
            console.log(this.formInfo)
            this.visible = false
          }
        })
      }
  }
}
</script>

<style>
</style>
