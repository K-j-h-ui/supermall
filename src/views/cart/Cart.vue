<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
    </nav-bar>

<!-- 列表 -->
   <cart-list/>

<!-- 底部 -->
    <cart-button-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartButtonBar from "./childComps/CartBottomBar"
import {mapGetters} from "vuex"
// getter的内置语法

export default {
  name: "Cart",
  components:{
      NavBar,
    CartList,
    CartButtonBar,
      
  },
  computed:{
    // ...mapGetters(['cartLength',"cartList"])
  //   // 还有个对象语法
    ...mapGetters({
      length:"cartLength"
    })
  }
}

</script>

<style scoped>
  .nav-bar{
      background-color: var(--color-tint);
      color:#fff;
      /* font-weight: 700; */
  }
</style>
