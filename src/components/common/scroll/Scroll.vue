<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot>
    </slot>
  </div>
</div>
</template>

<script>
  import BScroll from "better-scroll"   
   export default {
     props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
     },
     name:"Scroll",
     data(){
       return {
         scroll : null
       }
     },
     mounted(){
      //  1.创建scroll对象
       this.scroll = new BScroll(this.$refs.wrapper,{
         click:true,
         probeType:this.probeType,
         pullUpLoad:this.pullUpLoad
       })
      //  this.scroll.scrollTo(0,0);
      
      // 2.监听滚动位置
      if (this.probeType ===2 || this.probeType === 3){

     
        this.scroll.on("scroll",(position) =>{
          this.$emit("scroll",position)
          // 发射一个叫emit的时间给父组件
        })
      }
        // 3.监听滚动到底部
        if(this.pullUpLoad){
          this.scroll.on("pullingUp",()=>{
              this.$emit("pullingUp")
          })
        }
     },
     methods: {
       scrollTo(x,y,time=500){
         this.scroll &&  this.scroll.scrollTo(x,y,time)
       },
       refresh(){
         console.log("sss")
         this.scroll &&  this.scroll.refresh()
       },
       finishPullUp(){
         this.scroll && this.scroll.finishPullUp()
       },
       getScrollY(){
         return this.scroll ?  this.scroll.y : 0 
       }
     },
   }
</script>

<style scoped>
</style>