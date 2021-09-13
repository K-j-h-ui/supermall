import {debounce} from "./utils"
import BackTop from "../components/content/backtop/BackTop";

export const itemListenerMixin ={
  data(){
    return{
    itemImageListener:null,
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh,50)

    this.itemImageListener = ()=>{
     newRefresh()
    }
     this.$bus.$on("itemImageLoad",this.itemImageListener)
      
  },
}

export const backTopMixin = {
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position){
      this.isShowBackTop = -(position.y)>1000
    }
  },
  components: {
    BackTop
  }
}
