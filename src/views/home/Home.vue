<template>
  <div id ="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
       <tab-control 
       :titles="['流行','新款','精选']"   
      @tabClick="tabClick"
      ref="tabControl1" class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
      <!-- @scroll="contentScroll"接收自定义事件给其自定义方法 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"   
      @tabClick="tabClick"
      ref="tabControl2" />

      <good-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMutidata,getHomeGoods} from "network/home"
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from "components/content/goods/GoodsList"
import BackTop from "components/content/backtop/BackTop"
// 组件名竟然可以被命名
import Scroll from "components/common/scroll/Scroll"
import {debounce} from "common/utils"
import {itemListenerMixin} from "common/mixin"



export default {
  components: {
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
    GoodList,
    Scroll,
    BackTop,
    
     },
  name:"Home",
  mixins:[itemListenerMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        "pop":{page:0,list:[] },
        "new":{page:0,list:[] },
        "sell":{page:0,list:[] },
      },
      currentType:"pop",
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }

  },
  computed :{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed(){
    console.log("home destroyed");
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
     
    this.$bus.$off("itemImageLoad",this.itemImageListenr)
  },
  created(){
    // 1.请求多个数据
    this.getHomeMutidata()
    // 2.请求商品数据
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")  
  },
  mounted() {
   
  },
  methods:{
    
    // 关于点击事件的监听
      tabClick(index){
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell" 
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      console.log("ahaoggss")
    },
      backClick(){
    // this.$refs.scroll.scroll.scrollTo(0,0)  可以做以下优化
    this.$refs.scroll.scrollTo(0,0,300)
  },
  contentScroll(position){
    // 1.判断backtop是否显示
    this.isShowBackTop = -(position.y)>1000
    // 2.决定tabctrol是否吸顶（position:fixed）
    this.isTabFixed = (-position.y) >this.tabOffsetTop
  },
  loadMore(){
    this.getHomeGoods(this.currentType)
  },
 swiperImageLoad(){
   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
  
 },
  
    getHomeMutidata(){
      getHomeMutidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page =this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].
        
        list.push(...res.data.list)
        this.goods[type].page += 1;

      this.$refs.scroll.finishPullUp()
      })
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            


}
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    /* view port */
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    /* height: 300px; */
    overflow: hidden;
    
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /* .content {
    height: calc(100% -93px);

    overflow: hidden;
    margin-top: 51px;
  } */
  /* .fixed{
    position: fixed;
    top: 44px;
    right: 0;
    left:0;

  } */
</style>