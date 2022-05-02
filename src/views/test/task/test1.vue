<template>
  <a-modal title="固定任务" :visible="showModal" :width="900">
    <div class="fx-end">
      <i class="iconfont">&#xe671;</i>
    </div>
    <div>
      <div v-for="(item, index) of tableSource" :key="index" class="task">
        <div class="task-title">
          <div>属性</div>
          <div v-for="(con, conIndex) of configConcept" :key="conIndex">
            属性{{ index + 1 }}
          </div>
        </div>
        <div
          v-for="(list, listIndex) of item.data"
          :key="listIndex"
          class="task-list"
        >
          <div class="task-label">{{ list.label }}</div>
          <div v-for="(con, conceptIndex) of configConcept" :key="conceptIndex">
            <a-select
              v-model="list.value[`list.value${con}`]"
              @change="handlerCon"
              placeholder="请选择"
            >
              <a-select-option
                v-for="(option, optionIndex) in list.options"
                :key="optionIndex"
                :label="option"
                :value="optionIndex + 1"
              >
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div @click="handlerAddTask">添加任务</div>
    </div>
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
  console.log('******', propertyArr.value)
  const tableSource = reactive([
    {
      columns: [{}],
      data: propertyArr.value
    }
  ])
  const handlerAdd = () => {
    tableSource.push(tableSource[0])
  }
  return {
    tableSource,
    handlerAdd,
    configConcept
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
    const { tableSource, handlerAdd, configConcept } = useAddHandlerEffect()
    return {
      tableSource,
      handlerAdd,
      configConcept
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
