<template>
  <div class="dicDetails">
    <el-form :model="formInfo" ref="formInfo" :rules="rules" >
      <ItemTable
        :loading="loading"
        :dataSource="updataDataSource"
        :columns="columns"
        :dictName="dictObj.name"
        checkbox
        :total="total"
        :page.sync="page"
        @checkboxVals="(val) => checkboxVals = val"
      >
        <template #search>
          <el-row>
            <el-col :span="21">
              字典详情
            </el-col>
            <el-col :span="3">
              <el-button :disabled="isEdit" v-if="dictObj.id" @click="handleOpenDialog()" icon="el-icon-plus" size="mini" type="primary">新增</el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </template>
        <template v-slot:opera="{ row }">
          <el-form-item v-if="isEdit && row && formId === row.id">
            <div class="oper-box">
              <el-button @click="handleSaveForm(row)" size="mini" type="success" icon="el-icon-check" />
              <el-button @click="handleCancelRow(row)" icon="el-icon-remove" type="info" size="mini" />
            </div>
          </el-form-item>
          <el-form-item v-else>
            <div class="oper-box">
              <el-button :disabled="isEdit" @click="handleOpenDialog(row)" type="primary" icon="el-icon-edit" size="mini" />
              <el-button :disabled="isEdit" @click="handleDelRow(row, true)" icon="el-icon-delete" size="mini" type="danger" />
            </div>
          </el-form-item>
        </template>
        <template v-slot:label="{ row }">
          <el-form-item prop="label" v-if="formEdit(row)">
            <el-input  v-model="formInfo.label"></el-input>
          </el-form-item>
          <div v-else>{{row.label}}</div>
        </template>
        <template v-slot:value="{ row }">
          <el-form-item
            v-if="formEdit(row)"
            prop="value"
            >
            <el-input v-model="formInfo.value" type="number"></el-input>
          </el-form-item>
          <div v-else>{{row.value}}</div>
        </template>
        <template v-slot:dictSort="{ row }">
          <el-form-item v-if="formEdit(row)">
            <el-input v-model="formInfo.dictSort"></el-input>
          </el-form-item>
          <div v-else>{{row.dictSort}}</div>
        </template>
      </ItemTable>
    </el-form>
  </div>
</template>

<script>
  import ItemTable from '@/components/Table'
  import TableMixins from '@/mixins/table'
  import ToolsMixins from '@/mixins/edit'
  import { createColumn } from '@/mixins/createColumn'
  export default {
    name: 'DicDetails',
    components: {
      ItemTable
    },
    mixins: [TableMixins, ToolsMixins],
    props: {
      dictObj: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    watch: {
      dictObj (newVal, oldVal) {
        if (newVal.name) {
          this.query = { dictName: newVal.name }
          this.handleGetTable()
        }
      }
    },
    computed: {
      updataDataSource () {
        return this.dataSource.map((item) => {
          return {
            ...item,
            dictName: this.query.dictName
          }
        })
      }
    },
    data () {
      return {
        api: '/api/dictDetail',
        columns: [
          createColumn('dictName', '所属字典'),
          createColumn('label', '字典标签', true),
          createColumn('value', '字典值', true),
          createColumn('dictSort', '排序', true),
          createColumn('opera', '操作', true)
        ],
        rules: {
          label: [{ required: true, message: '请输入字典标签', trigger: 'blur' }],
          value: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
          deptSort: [{ required: true }]
        },
        inithanlder: false,
        sort: 'dictSort,asc',
        title: '字典详情',
        dataUnShift: {}
      }
    },
    methods: {
      handleToggleOpenDialog () {
        this.formInfo.dict = { id: this.dictObj.id }
        this.$set(this.formInfo, 'deptSort', 10)
      },
      hanldeInputSave () {
        this.$watch('formInfo.value', (val) => {
          this.$set(this.formInfo, 'label', val * 10)
        })
      },
      handleOpenBeforeDialog () {
        this.dataUnShift = {
          dictName: this.query.dictName
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dicDetails {
    padding-top: 20px;
  }
</style>
