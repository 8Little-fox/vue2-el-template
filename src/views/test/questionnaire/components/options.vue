<template>
  <div>
    {{ruleForm.data}}
    <template v-for="(item, index) of ruleForm.data">
      <div :key="index">
        <el-form-item :label="`年龄${index}`" :prop="`data.${index}.age`" :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
          }">
          <el-input v-model="item.age"></el-input>
        </el-form-item>
        <el-form-item :label="`性别${index}`" :prop="`data.${index}.sex`" :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
          }">
          <el-input v-model="item.sex"></el-input>
        </el-form-item>
      </div>
    </template>
    <el-button @click="handleAdd">add</el-button>
  </div>
</template>
<!-- <div v-for="(item, index) in data" :key="index">
      <el-form :model="item" :ref="'ref-'+ index" :rules="rules" label-width="100px">
        <el-row>
          <el-tag>孙组件</el-tag>
          <el-col :span="6">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div> -->
<script>
  export default {
    props: {
      ruleForm: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      'ruleForm.data': {
        handler (val) {
          console.log('val', val)
          this.$emit('ruleForms', val)
        },
        deep: true
      }
    },
    data () {
      return {
        rules: {
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleAdd () {
        this.ruleForm.data.push({ age: '', sex: '' })
      }
    }
  }
</script>
