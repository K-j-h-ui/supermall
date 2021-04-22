<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name:"NavBar"
}
</script>
<style scoped>
  .nav-bar {
    display:flex ;
    line-height: 44px;
    height:44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.15);
  }

  .left,.right {
    width: 60px;
  }

  .center {
    flex:1
    /* flex等于1之后，左右设置后中间直接自适应，铺满 */
  }
</style>