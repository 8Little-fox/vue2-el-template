<template>
  <div class="dicDetails">
    <el-form :model="reComputedDataSource" ref="tableForm" :rules="rules">
      <ItemTable :loading="loading" :dataSource="reComputedDataSource.dataSource" :columns="columns"
        :dictName="dictObj.name" checkbox :total="total" :page.sync="page" @checkboxVals="(val) => checkboxVals = val">
        <template #search>
          <el-row>
            <el-col :span="15">
              字典详情
            </el-col>
            <el-col :span="9">
              <el-button :disabled="isEdit" v-if="dictObj.id" @click="handleOpenDialog()" icon="el-icon-plus"
                size="mini" type="primary">新增</el-button>
              <el-button :disabled="isEdit" v-if="dictObj.id" @click="handleAllEdit()" icon="el-icon-edit" size="mini"
                type="info">全部编辑</el-button>
              <el-button v-if="dictObj.id" :disabled="!isEdit" @click="handleSaveForm()" icon="el-icon-success"
                size="mini" type="success">保存</el-button>
              <el-button v-if="dictObj.id" @click="handleCancelRow" icon="el-icon-remove" size="mini" type="info">取消
              </el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </template>
        <template v-slot:opera="{ row }">
          <el-form-item>
            <div class="oper-box">
              <!-- <el-button :disabled="isEdit" @click="handleOpenDialog(row)" type="primary" icon="el-icon-edit" size="mini" /> -->
              <el-button :disabled="isEdit" @click="handleDelRow(row, true)" icon="el-icon-delete" size="mini"
                type="danger" />
            </div>
          </el-form-item>
        </template>
        <template v-slot:label="{ row, $index }">
          <el-form-item v-if="isEdit" :prop="'dataSource.' + $index + '.label'" :rules='rules.label'>
            <el-input v-model="row.label"></el-input>
          </el-form-item>
          <div v-else>{{row.label}}</div>
        </template>
        <template v-slot:value="{ row, $index }">
          <el-form-item v-if="isEdit" :prop="'dataSource.' + $index + '.value'" :rules='rules.value'>
            <el-input v-model="row.value" type="number"></el-input>
          </el-form-item>
          <div v-else>{{row.value}}</div>
        </template>
        <template v-slot:dictSort="{ row, $index }">
          <el-form-item v-if="isEdit" :prop="'dataSource.' + $index + '.dictSort'" :rules='rules.dictSort'>
            <el-input v-model="row.dictSort"></el-input>
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
  import ToolsMixins from '@/mixins/allEdit'
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
      reComputedDataSource () {
          return {
            dataSource: this.dataSource.map((item) => {
            return {
              ...item,
              dictName: this.query.dictName
            }
          })
        }
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
          dictSort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
        },
        inithanlder: false,
        sort: 'dictSort,asc',
        title: '字典详情',
        dataUnShift: {}
      }
    },
    methods: {
      handleToggleOpenDialog () {
        console.log('this.reComputedDataSource', this.reComputedDataSource)
        this.reComputedDataSource.dataSource.forEach((item) => {
          if (!item.dict) item.dict = { id: this.dictObj.id }
        })
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
