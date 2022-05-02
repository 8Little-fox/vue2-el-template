<template>
  <div>
    {{starNum}}
    <Star :starNum.sync="starNum"/>

    <div v-for="(item, index) of produceLists" :key="index" class="shop-item">
      <div>{{ item.name }}-{{ item.price }}元</div>
      <el-button @click="shopChange(item)">加入购物车</el-button>
    </div>
    <div style="margin: 30px;">🛒</div>
    <div
      class="shop-item"
      v-for="(card, cardIndex) of cardLists"
      :key="'shop-item' + cardIndex"
    >
      <div>{{ card.name }} 数量{{ card.quantity }}</div>
      <div>
        <el-button @click="addChange(card)">增加</el-button>
        <el-button @click="reduceChange(card, cardIndex)">减少</el-button>
      </div>
    </div>
    <div>总价 {{ cardsTotal }}</div>
  </div>
</template>

<script>
import Star from '@/components/Star/index'
export default {
  components: {
    Star
  },
  data () {
    return {
      produceLists: [
        { id: 1, name: '商品A', price: 10, quantity: 1 },
        { id: 2, name: '商品B', price: 15, quantity: 1 },
        { id: 3, name: '商品C', price: 20, quantity: 1 }
      ],
      cardLists: [],
      starNum: 5
    }
  },
  computed: {
    cardsTotal () {
      return this.cardLists.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0)
    }
  },
  methods: {
    shopChange (item) {
      // 同一个商品加入购物车
      const filterCard = this.cardLists.some(card => card.id === item.id)
      if (filterCard) {
        item.quantity += 1
        return
      }
      this.cardLists.push(item)
    },
    addChange (card) {
      card.quantity += 1
    },
    reduceChange (card, cardIndex) {
      if (card.quantity === 1) {
        this.cardLists.splice(cardIndex, 1)
        return
      }
      card.quantity -= 1
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-item {
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
