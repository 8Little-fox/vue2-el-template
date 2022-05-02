<template>
  <!-- 替换图片循环 -->
  <div class="star-list">
    <!-- 点亮 -->
    <div v-for="(item, index) of starNum" :key="index">
      <img class="star" :src="require('@/assets/star.jpg')"  @click="handlerStar(index)" alt />
    </div>
    <!-- 未点亮 -->
    <img
      class="star"
      v-for="(item, index)  of 5 - starNum"
      :key="`${index}gray`"
      :src="require('@/assets/star-gray.jpg')"
      @click="handlerStar(item)"
      alt
    />
  </div>
</template>

<script>
export default {
  name: 'YsRate',
  props: {
    starNum: {
      type: Number,
      validator: (val) => {
        return val <= 5 && val >= 0
      }
    }
  },
  methods: {
    handlerStar (item) {
      console.log(item)
      this.$emit('update:starNum', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.star-list {
  display: flex;
  justify-content: center;
  .star {
    width: 21px;
    height: 21px;
    margin-right: 5px;
  }
}
</style>
