<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsitem="item" :key="item.image"/>
  
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem"
export default {
  name:"GoodsList",

  props:{
    goods:{
     type: Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>
<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    /* 通过控制item的宽度，再设置好wrap包裹，它就会根据宽度决定你一行显示几个 */
    justify-content: space-around;
    /* 比较均等分 */

    padding: 2px;
  }
</style>