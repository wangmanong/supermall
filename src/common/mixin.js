import {debounce} from "./utils";
import Scroll from 'components/common/scroll/Scroll'
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      refresh:null
    }
  },
  mounted(){
    // 图片加载完成的事件监听
    this.refresh = debounce(this.$refs.scroll.refresh,200)     //调用防抖函数
    //对监听的事件进行保存
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh()
      //进行防抖调用
      this.refresh()
    }
    //3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

export const backTopMinxin = {
  data(){
    return{
      isShowBackTop:false
    }
  },
  components:{
    Scroll
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    isShowBack(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
