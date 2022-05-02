<template>
  <div class="department">
    <ItemTable
      ref="myTables"
      :loading="loading"
      :dataSource="dataSource"
      :columns="columns"
      checkbox
      :pagination="false"
      lazy
      row-key="id"
      :load="handleLoadTree"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @checkboxVals="(val) => checkboxVals = val">
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
          <el-button :disabled="checkboxVals.length ? true : false" @click="handleOpenDialog()" icon="el-icon-plus"
            size="mini" type="primary">新增
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
      <template v-slot:enabled="{ row }">
        <el-switch v-model="row.enabled" @change="switchChange(row)"></el-switch>
      </template>
    </ItemTable>
    <el-dialog :title="formTitle" :visible.sync="dialog" width="500px" append-to-body>
      <el-form :model="formInfo" :rules="rules" ref="formInfo" label-width="100px" class="demo-ruleForm">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formInfo.name" ></el-input>
        </el-form-item>
        <el-form-item label="部门排序" prop="deptSort">
          <el-input-number v-model="formInfo.deptSort" controls-position="right" :min="1" :max="10" style="width: 370px;"></el-input-number>
        </el-form-item>
        <el-col :lg="12" :xl="12">
          <el-form-item label="顶级部门">
            <el-radio-group v-model="formInfo.isTop" @change="radioChange" size="small">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xl="12">
          <el-form-item label="状态">
            <el-radio-group v-model="formInfo.enabled" size="small">
              <el-radio label="true">启用</el-radio>
              <el-radio label="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="isTopShow">
          <el-form-item label="上级部门">
            <TreeSelect
              v-model="formInfo.pid"
              :options="deptsList"
              :load-options="loadDepts"
              placeholder="请选择上级部门"
            />
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="handleSaveForm">确 定</el-button>
      </span>
    </el-dialog>
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
    name: 'Department',
    components: {
      ItemTable,
      DateRangePicker,
      TreeSelect
    },
    mixins: [TableMixins, ToolsMixins],
    data () {
      return {
        api: '/api/dept',
        columns: [
          createColumn('name', '名称'),
          createColumn('deptSort', '排序'),
          createColumn('enabled', '状态', true),
          createColumn('createTime', '创建日期'),
          createColumn('opera', '操作', true)
        ],
        rules: {
          name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
          deptSort: [{ required: true }]
        },
        loadNodeMap: new Map(),
        parentPid: '',
        sort: 'id,desc',
        title: '部门',
        checkboxVals: [],
        deptsList: [],
        isTopShow: false
      }
    },
    methods: {
      handleCompleteTable () {
        if (this.formInfo.pid) {
         this.refreshLoadTree(this.newPid)
        }
      },
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
      hanlderSuperior (ids) {
        request.setPath('/api/dept/superior', true).post([ids]).then(res => {
          this.deptsList = res.content
          this.handleDept()
        })
      },
      radioChange (val) {
        this.isTopShow = val === '0'
        if (val === '0') {
          this.handleDept()
        }
      },
      handleToggleOpenDialog () {
        this.$set(this.formInfo, 'enabled', `${!this.formId ? 'true' : String(this.formInfo.enabled)}`)
        this.$set(this.formInfo, 'isTop', `${this.formInfo?.pid ? '0' : '1'}`)
        this.isTopShow = this.formInfo?.pid
        if (!this.formId) {
          this.$set(this.formInfo, 'deptSort', 10)
          return
        }
        if (this.formInfo?.pid) {
          this.hanlderSuperior(this.formInfo.id)
        }
      }
    }
  }
</script>
