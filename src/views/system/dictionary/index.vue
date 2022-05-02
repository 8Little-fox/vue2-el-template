<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <ItemTable
      :loading="loading"
      :dataSource="dataSource"
      :columns="columns"
      checkbox
      :total="total"
      :page.sync="page"
      @checkboxVals="(val) => checkboxVals = val"
      @currentVals="(val) => dictObj = val"
      >

      <template #search>
        <el-row :gutter="20">
          <el-form>
            <el-col :span="8">
              <el-form-item>
                <el-input v-model="query.blurry" placeholder="请输入名称或者描述"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
      <el-dialog :title="formTitle" :visible.sync="dialog" width="500px" append-to-body>
        <el-form :model="formInfo" :rules="rules" ref="formInfo" label-width="100px" class="demo-ruleForm">
          <el-form-item label="字典名称" prop="name">
            <el-input v-model="formInfo.name" style="width: 370px;"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formInfo.description" style="width: 370px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="handleSaveForm">确 定</el-button>
        </span>
      </el-dialog>
    </template>
    </el-col>
    <el-col :span="14">
      <!-- <DicDetails :dictObj="dictObj"></DicDetails> -->
      <allDicDetails :dictObj="dictObj"></allDicDetails>
    </el-col>
  </el-row>
</template>

<script>
  import ItemTable from '@/components/Table'
  import TableMixins from '@/mixins/table'
  import ToolsMixins from '@/mixins/tools'
  import { createColumn } from '@/mixins/createColumn'
  // import DicDetails from './components/dicDetails'
  import AllDicDetails from './components/allDicDetails'

  export default {
    name: 'Dictionary',
    components: {
      ItemTable,
      // DicDetails,
      AllDicDetails
    },
    mixins: [TableMixins, ToolsMixins],
    data () {
      return {
        api: '/api/dict',
        columns: [
          createColumn('name', '字典名称'),
          createColumn('description', '描述'),
          createColumn('opera', '操作', true)
        ],
        rules: {
          name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
        },
        checkboxVals: [],
        title: '字典',
        sort: 'id,desc',
        dictObj: {}
      }
    },
    methods: {
      handlerDelAfter () {
        this.dictObj = {}
      }
    }
  }
</script>
