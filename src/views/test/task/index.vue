<template>
      <!-- 表格 -->
    <div class="my-table">
      <div class="table-tr table-th">
        <div></div>
        <div style="display: flex;" v-for="item in columnData" :key="item">
          <span v-html="item.option" />
        </div>
      </div>
      <div class="table-tr" v-for="item in lineData" :key="item">
        <div style="display: flex;">
          <span v-html="item.option" />
        </div>
        <div v-for="list in columnData" :key="list">
          <el-radio
            v-model="item.disabled"
            @change="onCheck(item)"
          />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '',
      lineData: [
        {
          id: 7691,
          option: '<p>矩阵行1</p>',
          parent_id: 0,
          group_id: 0,
          cascades: []
        },
        {
          id: 7713,
          option: '<p>矩阵行2</p>',
          parent_id: 0,
          group_id: 0,
          cascades: []
        },
        {
          id: 7741,
          option: '<p>矩阵行3</p>',
          parent_id: 0,
          group_id: 0,
          cascades: []
        }
      ],
      columnData: [
        {
          id: 7698,
          option: '<p>矩阵列0</p>',
          parent_id: 0,
          group_id: 0,
          cascades: [],
          disabled: false
        },
        {
          id: 7714,
          option: '<p>矩阵列2</p>',
          parent_id: 0,
          group_id: 0,
          cascades: [],
          disabled: false

        },
        {
          id: 7742,
          option: '<p>矩阵列3</p>',
          parent_id: 0,
          group_id: 0,
          cascades: [],
          disabled: false
        }
      ]
    }
  },
  methods: {
    onCheck (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scope>
.my-table {
  margin-top: 20px;

  .table-tr {
    display: flex;
    border-bottom: 1px solid #e8e8e8;

    div {
      flex: 1;
      text-align: left;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 58px;
      color: #a9b4c8;
    }
  }

  .table-th {
    background: #fafafa;

    div {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 62px;
      color: #00021e;
    }
  }
}
</style>
