<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"  ></check-button>
    <span>全选</span>
  </div>

    <div class="price">
      合计¥:{{totalprice}}
    </div>

    <div class="calc" @click="calcClick">去计算:({{checklength}})</div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },

  computed: {
    ...mapGetters(['cartList']),
   totalprice(){
      return  "￥"  + this.cartList.filter(item=> {
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.count * item.price
      },0)
   },
    checklength(){
      return this.cartList.filter(item => item.checked).reduce((preValue,item)=>{
        return preValue + item.count
      },0)
    },
     isSelectAll(){
      if (this.cartlength === 0) {
        return true
      }else {
        return !(this.cartList.filter(item => !item.checked).length)
        }
     },
  },
   methods: {
    checkClick(){
      if (this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
      // this.$toast.methods.isShow
    },
     calcClick(){
      //  console.log("sdsadsf")
       if (this.isSelectAll){
         this.$toast.show("請選擇要購買的商品！",2000)
       }
     }
  },
    
 }
</script>

<style scoped>
.bottom-bar{
  background-color: #dbe5ec;

  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;


}
.check-button{
  width: 20px;
  height: 20px;
   line-height: 20px;
  margin-right: 10px;
}
.check-content{
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-left: 10px;
  width: 60px;
}
.price{
  color: #ff5777;
  margin-left: 20px;
  flex: 1;
  font-size: 13px;
}
.calc{
 width: 90px;
  color: white;
  text-align: center;
  background-color:red;
  font-size: 14px;
}
</style>