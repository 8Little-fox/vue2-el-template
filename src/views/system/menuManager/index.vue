<template>
  <div class="menuManager">
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
      @checkboxVals="(val) => checkboxVals = val"
    >
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
          <el-button @click="handleOpenDialog()" icon="el-icon-plus" size="mini" type="primary">新增
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
      <template v-slot:icon="{ row }">
        <svg-icon :icon-class="row.icon"></svg-icon>
      </template>
    </ItemTable>
    <template>
      <el-dialog :title="formTitle" :visible.sync="dialog" width="35%" append-to-body>
        <el-form :model="formInfo" :rules="rules" ref="formInfo" label-width="100px" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :lg="24" :xl="12">
              <el-form-item label="菜单类型">
                <el-radio-group v-model="formInfo.type" size="small">
                  <el-radio-button label="0">目录</el-radio-button>
                  <el-radio-button label="1">菜单</el-radio-button>
                  <el-radio-button label="2">按钮</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <template v-if="formInfo.type == 2">
              <el-col :span="12">
                <el-form-item label="按钮名称" prop="title">
                  <el-input v-model="formInfo.title" placeholder="请输入按钮名称"></el-input>
                </el-form-item>
              </el-col>
            </template>
           <template v-if="formInfo.type != 2">
              <el-col>
                <el-form-item label="菜单图标">
                  <el-popover placement="bottom-start" width="450" trigger="click" @show="$refs['iconSelect'].reset()">
                    <IconSelect ref="iconSelect" @selected="(val) => $set(formInfo, 'icon', val)"/>
                    <el-input slot="reference" v-model="formInfo.icon" placeholder="点击选择图标">
                      <svg-icon v-if="formInfo.icon" slot="prefix" :icon-class="formInfo.icon" class="el-input__icon"></svg-icon>
                      <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                    </el-input>
                  </el-popover>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :xl="8">
                <el-form-item label="外链菜单">
                  <el-radio-group v-model="formInfo.iFrame" size="small">
                    <el-radio-button label="true">是</el-radio-button>
                    <el-radio-button label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :xl="8">
                <el-form-item label="菜单可见">
                  <el-radio-group v-model="formInfo.hidden" size="small">
                    <el-radio-button label="true">是</el-radio-button>
                    <el-radio-button label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
           </template>
            <template v-if="formInfo.type == 1">
              <el-col :lg="12" :xl="8">
                <el-form-item label="菜单缓存">
                  <el-radio-group v-model="formInfo.cache" size="small">
                    <el-radio-button label="true">是</el-radio-button>
                    <el-radio-button label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="formInfo.type != 2">
              <el-col :span="formInfo.type != 0 ? 12 : 24">
                <el-form-item label="菜单标题" prop="title">
                  <el-input v-model="formInfo.title" placeholder="请输入菜单标题"></el-input>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="formInfo.type != 0">
              <el-col :span="12">
                <el-form-item label="权限标识">
                  <el-input v-model="formInfo.permission" placeholder="请输入权限标识"></el-input>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="formInfo.type != 2">
              <el-col :span="12">
                <el-form-item label="路由地址" prop="path">
                  <el-input v-model="formInfo.path" placeholder="请输入路由地址" ></el-input>
                </el-form-item>
              </el-col>
            </template>
            <el-col :span="12">
              <el-form-item label="菜单排序">
                <el-input-number v-model="formInfo.menuSort" controls-position="right" :min="1" :max="10"></el-input-number>
              </el-form-item>
            </el-col>
            <template v-if="formInfo.type == 1">
              <el-col :span="12">
                <el-form-item label="组件名称">
                  <el-input v-model="formInfo.componentName" placeholder="匹配组件内Name字段"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组件路径">
                  <el-input v-model="formInfo.component" placeholder="请输入组件路径"></el-input>
                </el-form-item>
              </el-col>
            </template>
            <el-col :span="24">
              <el-form-item label="上级类目">
                <treeselect
                    v-model="formInfo.pid"
                    :options="menus"
                    :load-options="loadMenus"
                    placeholder="选择上级类目"
                  />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="handleSaveForm">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  import ItemTable from '@/components/Table'
  import TableMixins from '@/mixins/table'
  import ToolsMixins from '@/mixins/tools'
  import request from '@/utils/request'
  import DateRangePicker from '@/components/DateRangePicker'
  import IconSelect from '@/components/IconSelect'
  import { IS_RADIO } from './constants'
  import { createColumn } from '@/mixins/createColumn'
  import Treeselect, { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'menuManager',
    components: {
      DateRangePicker,
      IconSelect,
      ItemTable,
      Treeselect
    },
    mixins: [TableMixins, ToolsMixins],
    data () {
      return {
        api: '/api/menus',
        columns: [
          createColumn('title', '菜单标题', 150),
          createColumn('icon', '图标', 150),
          createColumn('menuSort', '排序', { sortable: 'sortable' }, 150),
          createColumn('permission', '权限标识', 150),
          createColumn('path', '组件路径组件路径组件路径', 200),
          createColumn('iFrame', '外链', { dict: 'IS_RADIO' }, 150),
          createColumn('cache', '缓存', { dict: 'IS_RADIO' }, 150),
          createColumn('hidden', '可见', { dict: 'IS_RADIO' }, 150),
          createColumn('createTime', '创建日期', 150),
          createColumn('opera', '操作', { fixed: 'right' }, 150, true)
        ],
        IS_RADIO: Object.freeze(IS_RADIO),
        rules: {
          title: [{ required: true, message: '请输入菜单标题', trigger: 'blur' }],
          path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }]
        },
        sort: 'id,desc',
        title: '菜单',
        menus: [],
        loadNodeMap: new Map()
      }
    },
    methods: {
      handleCompleteTable () {
        if (this.formInfo.pid) {
         this.refreshLoadTree(this.newPid)
        }
      },
      loadMenus ({ action, parentNode, callback }) {
        if (action === LOAD_CHILDREN_OPTIONS) {
          request.setPath('/api/menus/lazy', true).get({ pid: parentNode.id }).then(res => {
            parentNode.children = res.map(function (obj) {
              if (!obj.leaf) {
                obj.children = null
              }
              return obj
            })
            setTimeout(callback, 200)
          })
        }
      },
      hanlderSuperior () {
        request.setPath('/api/menus/superior', true).post([this.formInfo.id]).then(res => {
           const children = res.map(function (obj) {
            if (!obj.leaf && !obj.hasChildren) {
              obj.children = null
            }
            return obj
          })
          this.menus.push({ id: 0, label: '顶级类目', children: children })
        })
      },
      handleToggleOpenDialog () {
        this.menus = []
        if (!this.formId) {
          this.$set(this.formInfo, 'type', 0)
          this.$set(this.formInfo, 'iFrame', false)
          this.$set(this.formInfo, 'hidden', true)
          this.$set(this.formInfo, 'cache', false)
          this.$set(this.formInfo, 'menuSort', 10)
          this.$set(this.formInfo, 'pid', '0')
          this.menus.push({ id: 0, label: '顶级类目', children: null })
          return
        }
        if (this.formInfo.type === 0) {
         this.$set(this.formInfo, 'pid', '0')
        }
        this.hanlderSuperior()
      }
    }
  }
</script>
