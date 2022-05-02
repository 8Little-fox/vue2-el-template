<template>
  <a-modal title="固定任务" :visible="showModal" :width="900">
    <div class="fx-end">
      <i class="iconfont">&#xe671;</i>
    </div>
    <div v-for="(item, index) of tableSource" :key="index" class="m-t-10">
      <div class="dia-title">任务{{ index + 1 }}</div>
      <div>
        <a-table
          :columns="item.columns"
          :data-source="item.data"
          :pagination="false"
        >
          <template #b="{ record }">
            <a-col :span="8">
              <a-select label-in-value placeholder="请选择">
                <a-select-option v-for="(item, index) of record.b" :key="index">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-col>
          </template>
          <template #c="{ record }">
            <a-select label-in-value placeholder="请选择">
              <a-select-option v-for="(item, index) of record.c" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
          <template #d="{ record }">
            <a-select label-in-value placeholder="请选择">
              <a-select-option v-for="(item, index) of record.e" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
          <template #e="{ record }">
            <a-select label-in-value placeholder="请选择">
              <a-select-option v-for="(item, index) of record.e" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
          <template #f="{ record }">
            <a-select label-in-value placeholder="请选择">
              <a-select-option v-for="(item, index) of record.f" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
        </a-table>
      </div>
    </div>
    <a-button @click="handlerAdd" class="task-btn" type="text"
      ><i class="iconfont m-r-5">&#xe674;</i>添加任务</a-button
    >
    <template #footer>
      <a-button @click="$emit('cancel')">取消</a-button>
      <a-button @click="$emit('confirm')" class="ant-btn-color">保存</a-button>
    </template>
  </a-modal>
</template>
<script>
import { reactive, computed, inject } from 'vue'

// const copyDataSource = [
//   {
//     columns: [
//       {
//         title: '属性',
//         dataIndex: 'a',
//       },
//       {
//         title: '概念#1',
//         dataIndex: 'b',
//         slots: { customRender: 'b' },
//       },
//       {
//         title: '概念#2',
//         dataIndex: 'c',
//         slots: { customRender: 'c' },
//       },
//       {
//         title: '概念#3',
//         dataIndex: 'd',
//         slots: { customRender: 'd' },
//       },
//       {
//         title: '概念#4',
//         dataIndex: 'e',
//         slots: { customRender: 'e' },
//       },
//       {
//         title: '概念#5',
//         dataIndex: 'f',
//         slots: { customRender: 'f' },
//       },
//     ],
//     data: [
//       {
//         key: '1',
//         a: '品牌',
//         b: [
//           { menuKey: 1, label: '华为1' },
//           { menuKey: 2, label: '华为2' },
//           { menuKey: 3, label: '华为3' },
//         ],
//         c: [
//           { menuKey: 1, label: '联想1' },
//           { menuKey: 2, label: '联想2' },
//           { menuKey: 3, label: '联想3' },
//         ],
//         d: [
//           { menuKey: 1, label: '惠普1' },
//           { menuKey: 2, label: '惠普1' },
//           { menuKey: 3, label: '惠普1' },
//         ],
//         e: [
//           { menuKey: 1, label: '苹果1' },
//           { menuKey: 2, label: '苹果2' },
//           { menuKey: 3, label: '苹果3' },
//         ],
//         f: [
//           { menuKey: 1, label: '戴尔1' },
//           { menuKey: 2, label: '戴尔2' },
//           { menuKey: 3, label: '戴尔3' },
//         ],
//       },
//     ],
//   },
// ];
// const dataSource = [
//   {
//     columns: [
//       {
//         title: '属性',
//         dataIndex: 'a',
//       },
//       {
//         title: '概念#1',
//         dataIndex: 'b',
//         slots: { customRender: 'b' },
//       },
//       {
//         title: '概念#2',
//         dataIndex: 'c',
//         slots: { customRender: 'c' },
//       },
//       {
//         title: '概念#3',
//         dataIndex: 'd',
//         slots: { customRender: 'd' },
//       },
//       {
//         title: '概念#4',
//         dataIndex: 'e',
//         slots: { customRender: 'e' },
//       },
//       {
//         title: '概念#5',
//         dataIndex: 'f',
//         slots: { customRender: 'f' },
//       },
//     ],
//     data: [
//       {
//         key: '1',
//         a: '品牌',
//         b: [
//           { menuKey: 1, label: '华为1' },
//           { menuKey: 2, label: '华为2' },
//           { menuKey: 3, label: '华为3' },
//         ],
//         c: [
//           { menuKey: 1, label: '联想1' },
//           { menuKey: 2, label: '联想2' },
//           { menuKey: 3, label: '联想3' },
//         ],
//         d: [
//           { menuKey: 1, label: '惠普1' },
//           { menuKey: 2, label: '惠普1' },
//           { menuKey: 3, label: '惠普1' },
//         ],
//         e: [
//           { menuKey: 1, label: '苹果1' },
//           { menuKey: 2, label: '苹果2' },
//           { menuKey: 3, label: '苹果3' },
//         ],
//         f: [
//           { menuKey: 1, label: '戴尔1' },
//           { menuKey: 2, label: '戴尔2' },
//           { menuKey: 3, label: '戴尔3' },
//         ],
//       },
//     ],
//   },
// ];
export const useAddHandlerEffect = () => {
  // 表头属性
  const configConcept = inject('configConcept')
  console.log('configConceptconfigConcept', configConcept.value)

  // 属性label/等级options
  const propertyArr = computed(() =>
    inject('cbcList').value.map((item, index) => ({
      id: item.id,
      label: item.option || `属性#${index + 1}`,
      options: item.cascades.map((value, i) => value.option || `级别${i + 1}`)
    }))
  )
  console.log('propertyArr', propertyArr.value)
  const dataSource = reactive([
    {
      columns: [{}],
      data: propertyArr.value
    }
  ])
  console.log('******', propertyArr.value)
  const tableSource = reactive(dataSource)
  const handlerAdd = () => {
    // tableSource.push(...copyDataSource);
  }
  return {
    tableSource,
    handlerAdd
  }
}

export default {
  name: 'TaskDialog',
  props: {
    showModal: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const { tableSource, handlerAdd } = useAddHandlerEffect()
    return {
      tableSource,
      handlerAdd
    }
  }
}
</script>
<style lang="scss" scoped>
.dia-title {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 28px;
  color: #00021e;
  opacity: 1;
}
.task-btn {
  color: #73c3d9;
}
</style>
