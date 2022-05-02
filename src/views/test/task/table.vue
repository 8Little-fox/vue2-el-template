<template>
  <div>
    <div v-for="(item, index) of dataSource" :key="index" class="task">
      <div class="task-title">
        <div>属性</div>
        <div v-for="(con, conIndex) of concept" :key="conIndex">
          属性{{ index + 1 }}
        </div>
      </div>
      <div v-for="(list, listIndex) of listData" :key="listIndex" class="task-list">
        <div class="task-label">{{ list.label }}</div>
        <div v-for="(con, conceptIndex) of concept" :key="conceptIndex">
          <el-select v-model="list.value[`list.value${con}`]" @change="handlerCon" placeholder="请选择">
            <el-option
              v-for="(option, optionIndex) in list.options"
              :key="optionIndex"
              :label="option"
              :value="optionIndex + 1"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div @click="handlerAddTask">添加任务</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataSource: [],
      concept: 4,
      listData: [
        {
          label: '属性1',
          options: ['1', '2', '3'],
          value: {}
        }
        // {
        //   label: '属性2',
        //   options: ['a', 'b', 'c']
        // }
      ]
    }
  },
  created () {
    this.dataSource.push({
      columns: [
        {}
      ],
      data: this.listData
    })
    console.log('this.dataSource', this.dataSource)
  },
  methods: {
    handlerAddTask () {
      this.dataSource.push(this.dataSource[0])
    },
    handlerCon (e) {
      console.log('this.listData', this.listData)
      console.log('e', e)
    }
  }
}
</script>

<style lang="scss" scope>
.task {
  width: 80%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  &-title {
    border: 1px solid #d8dce5;
    display: flex;
    justify-content: space-between;
  }
  &-label {
    width: 180px;
    padding: 20px;
  }
  &-list {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
