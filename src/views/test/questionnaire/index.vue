<template>
  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
      <Problem ref="childRules" :ruleForm="ruleForm" @ruleForms="handleRule"/>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import Problem from './components/problem'
  export default {
    components: {
      Problem
    },
    data () {
      return {
        ruleForm: {
          data: []
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        },
        is_flag: false
      }
    },
    methods: {

      handleRule (val) {
        this.ruleForm.data = val
      },
      submitForm (formName) {
        this.$refs.ruleForm.validate((valid) => {
          console.log('valid', valid)
            if (valid) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保全信息不完整，请继续填写完整')
            }
        })
        // this.$refs.ruleForm.validate((valid) => {
        //   this.is_flag = valid
        // })
        // const grandsonFlag = this.$refs.childRules.$refs.grandsonRules.validateForm()
        // console.log('grandsonFlag', grandsonFlag)
        // if (this.is_flag && grandsonFlag) {
        //   this.$message.success('保存成功')
        // } else {
        //   this.$message.error('保全信息不完整，请继续填写完整')
        // }
      }
    }
  }
</script>
