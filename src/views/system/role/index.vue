<template>
  <div class="role">
    <ItemTable :loading="loading" :dataSource="dataSource" :columns="columns" title="角色管理" checkbox :total="total"
      :page.sync="page" @checkboxVals="(val) => checkboxVals = val">
      <template #search>
        <el-row :gutter="20">
          <el-form>
            <el-col :span="4">
              <el-form-item>
                <el-input v-model="query.blurry" placeholder="请输入名称或者描述"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <date-range-picker v-model="query.createTime" class="date-item" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button @click="handleGetTable" icon="el-icon-search" size="mini" type="primary">搜索</el-button>
                <el-button @click="getQuerySearch" icon="el-icon-refresh-left" size="mini" type="warning">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="m-b-15">
          <el-button :disabled="checkboxVals.length !== 0 " @click="handleOpenDialog()" icon="el-icon-plus" size="mini" type="primary">新增
          </el-button>
          <el-button @click="handleDelRow" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
          <el-button @click="handleDoExport" type="success" size="mini" icon="el-icon-upload el-icon--right">导出
          </el-button>
        </div>
      </template>
      <template v-slot:opera="{ row }">
        <el-button @click="handleOpenDialog(row)" type="primary" icon="el-icon-edit" size="mini" />
        <el-button @click="handleDelRow(row)" icon="el-icon-delete" size="mini" type="danger" />
      </template>

    </ItemTable>
    <template>
      <el-dialog :title="formTitle" :visible.sync="dialog" width="40%" append-to-body>
        <el-form :model="formInfo" :rules="rules" ref="formInfo" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formInfo.name"></el-input>
          </el-form-item>
          <el-col :span="12">
            <el-form-item label="角色级别">
              <el-input-number v-model="formInfo.level" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据范围">
              <el-select v-model="formInfo.dataScope" placeholder="请选择" @change="changeSelect" style="width: 100%">
                <el-option v-for="item of dataOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="formInfo.dataScope === '自定义'" label="数据权限">
              <TreeSelect
                v-model="formInfo.depts"
                :options="deptsList"
                :load-options="loadDepts"
                multiple
                placeholder="请选择"
               />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述信息">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formInfo.description">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="handleOpenSaveBefore()">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  import ItemTable from '@/components/Table'
  import TableMixins from '@/mixins/table'
  import ToolsMixins from '@/mixins/tools'
  import { createColumn } from '@/mixins/createColumn'
  import request from '@/utils/request'
  import DateRangePicker from '@/components/DateRangePicker'
  import TreeSelect, { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'Role',
    components: {
      ItemTable,
      DateRangePicker,
      TreeSelect
    },
    mixins: [TableMixins, ToolsMixins],
    data () {
      return {
        api: '/api/roles',
        columns: [
          createColumn('name', '名称'),
          createColumn('dataScope', '数据权限'),
          createColumn('level', '角色级别'),
          createColumn('description', '描述'),
          createColumn('createTime', '创建日期'),
          createColumn('opera', '操作', true)
        ],
        rules: {
          name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
        },
        disabled: false,
        dataOptions: ['全部', '本级', '自定义'],
        deptsList: [],
        title: '角色',
        checkboxVals: [],
        sort: 'level,asc'
      }
    },
    methods: {
      async handleGetDept (pid = '') {
        const res = await request.setPath('/api/dept', true).get({ enabled: true, pid })
        return res.content.map(item => {
          if (item.hasChildren) {
            item.children = null
          }
          return item
        })
      },
      async handleDept () {
        this.deptsList = await this.handleGetDept()
      },
      async loadDepts ({ action, parentNode, callback }) {
        if (action === LOAD_CHILDREN_OPTIONS) {
          parentNode.children = await this.handleGetDept(parentNode.id)
          setTimeout(callback, 200)
        }
      },
      async hanlderSuperior (deptsValue) {
        request.setPath('/api/dept/superior', true).post(deptsValue).then(res => {
          this.deptsList = res.content
          this.handleDept()
        })
      },
      handleToggleOpenDialog () {
        if (!this.formId) {
          this.$set(this.formInfo, 'level', 1)
          this.formInfo.depts = []
          return
        }
        const depts = this.formInfo.depts
        if (depts.length) {
          const deptValue = depts.map(({ id }) => id)
          this.$set(this.formInfo, 'depts', deptValue)
          this.hanlderSuperior(deptValue)
        }
      },
      handleOpenSaveBefore () {
        if (this.formInfo.dataScope === '自定义' && this.formInfo?.depts.length === 0) {
          this.$message({
            message: '自定义数据权限不能为空',
            type: 'warning'
          })
          return false
        }
        if (this.formInfo?.depts.length) {
          this.formInfo.depts = this.formInfo.depts.map((id) => ({ id }))
        }
        this.handleSaveForm()
      },
      changeSelect (val) {
        if (val === '自定义') {
          this.handleDept()
          return
        }
        this.formInfo.depts = []
      }
    }
  }
</script>
