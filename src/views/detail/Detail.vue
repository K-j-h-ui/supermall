<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/> 
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <!-- <div>{{$store.state.cartList.length}}</div> -->
    <detail-swiper :top-images="topImages"/> 
    <detail-base-info :goods ="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageload="imageLoad"/>  
    <detail-param-info  ref="params" :param-info="paramInfo"/>  
    <detail-comment-info ref="comment" :comment-info="commentInfo" />
    <goods-list  ref="recommend" :goods="recommends"/>
  </scroll>
  <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>   
  <!-- <toast :message="message" :show="show"/>                    -->
</div> 
</template>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import GoodsList from "components/content/goods/GoodsList"
// import Toast from "components/common/toast/Toast"
import Scroll from "components/common/scroll/Scroll"

import {getDetail,Goods,Shop, GoodsParam, getRecommend}  from "network/detail"
import {debounce} from "common/utils"
import {itemListenerMixin} from "common/mixin"
import {backTopMixin} from "common/mixin";
import DetailBottomBar from './childComps/DetailBottomBar.vue'

export default{
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    // Toast

  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      iid:null ,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
       commentInfo: {},
        recommends: [],
        themeTopYs:[],        
        getThemeTopY:null,
        // message:'',
        // show:false
    }
  },
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // this.$route.params.iid 哪个活跃就哪个

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      // 轮播图数据
      console.log(res)
      const data = res.result;
      this.topImages = data.itemInfo.topImages
    
    // 获取商品信息
    this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    // 3.创建商品信息的对象
    this.shop = new Shop(data.shopInfo)
    //4.保存商品的详情数据
    this.detailInfo =data.detailInfo;
   //5.获取参数信息
    this.paramInfo = new GoodsParam(data.itemParams.info , data.itemParams.rule)
   //6.获取评论信息
   
     this.commentInfo = data.rate.list[0]
    })
    getRecommend().then((res)=> {
      this.recommends = res.data.list
    }),
    this.getThemeTopY = debounce (()=>{
      this.themeTopYs = []
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
     this.themeTopYs.push(Number.MAX_VALUE);
    
    console.log(this.themeTopYs);
    },100)
  },
    
   mounted() {
   
  },
  // updated(){
  //   this.themeTopYs = []
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  // },
  destroyed() {
    this.$bus.$off("itemImageLoad",this.itemImageListener)
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.refresh()

     this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
     contentScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && ((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]))) {
          this.currentIndex = i
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.listenShowBackTop(position)
    },
    addToCart(){
      // 获取购物车需要展示的信息
       const product = {}
     product.image = this.topImages[0];
     product.title = this.goods.title;
     product.desc = this.goods.desc;
     product.price = this.goods.realPrice;
     product.iid = this.iid;
        //  console.log("sssssssssssssssssssssssssss")
    //  this.$store.commit("addCart",product)
    //  使用Vuex
    this.$store.dispatch("addCart",product).then(res =>{
      // this.show=true;
      // this.message=res;

      // setTimeout(()=>{
      //   this.show=false;
      // this.message="";
      // },1500)
      this.$toast.show(res,2000)
      // console.log(res);
    })
    } 
  },
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 把详情页下面的导航栏隐藏掉 */
    /* ******牛逼操作******* */

    height: 100vh;
    /* 不然滚动不了 */
  }  
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    overflow: hidden;
/* 解决了backtop不显示的问题，为什么呢？？？？*/
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>