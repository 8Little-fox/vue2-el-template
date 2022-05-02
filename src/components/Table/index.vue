<template>
  <el-row>
    <el-col>
      <slot name="search"/>
        <el-table
          ref="wxTable"
          v-loading="loading"
          :data="dataSource"
          v-bind="$attrs"
          v-on="$listeners"
          @selection-change="(val) => $emit('checkboxVals', val)"
          @current-change="(val) => $emit('currentVals',val)"
          highlight-current-row style="width: 100%">
          <el-table-column v-if="checkbox" type="selection" width="55" />
          <item-column
            v-for="item of columns"
            :key="item.dateIndex"
            :config="item"
            :slots="$scopedSlots[item.dataIndex]" />
          <slot name="opera" />
        </el-table>
        <el-pagination
          v-if="pagination"
          v-bind="$attrs"
          :page-sizes="[10, 15, 30, 50, 100, 500, 1000]"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :total="total"
          @size-change="(val) => $emit('update:size', val)"
          @current-change="(val) => $emit('update:page', val)"
        />
    </el-col>
  </el-row>
</template>

<script>
  import ItemColumn from './ItemColumn'
  export default {
    components: {
      ItemColumn
    },
    props: {
      dataSource: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        default: () => []
      },
      dictName: {
        type: String,
        default: ''
      },
      checkbox: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: Boolean,
        default: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        default: 0
      },
      page: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .role-span {
    font-weight: bold;
    color: #303133;
    font-size: 15px;
  }
</style>
