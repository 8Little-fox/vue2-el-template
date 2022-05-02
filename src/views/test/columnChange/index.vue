<template>
  <div class="role">
    <div>
      <el-button v-for="item of 3" :key="item" @click="active = item">{{ item }}{{ item === active && 'ok' }}</el-button>
    </div>
    <ItemTable :loading="loading" :dataSource="dataSource" :columns="columns" title="角色管理" :total="total"
      :page.sync="page" @checkboxVals="(val) => checkboxVals = val">
    </ItemTable>
  </div>
</template>
<script>
  import ItemTable from '@/components/Table'
  import TableMixins from '@/mixins/table'
  import { createColumn } from '@/mixins/createColumn'

  export default {
    name: 'Test',
    components: {
      ItemTable
    },
    mixins: [TableMixins],
    data () {
      return {
        active: 1,
        inithanlder: false
      }
    },
    computed: {
      columns () {
        return {
          1: [
            createColumn('name', '名称'),
            createColumn('dataScope', '数据权限'),
            createColumn('level', '角色级别'),
            createColumn('description', '描述'),
            createColumn('createTime', '创建日期')
          ],
          2: [
            createColumn('name', '字典名称'),
            createColumn('description', '描述')
          ],
          3: [
            createColumn('dictName', '所属字典'),
            createColumn('label', '字典标签'),
            createColumn('value', '字典值'),
            createColumn('dictSort', '排序')
          ]
        }[this.active]
      },
      api () {
        return {
          1: '/api/roles',
          2: '/api/dict',
          3: '/api/dictDetail'
        }[this.active]
      }
    },
    watch: {
      active: {
        handler () {
          this.getQuerySearch()
        },
        immediate: true
      }
    }
  }
</script>
