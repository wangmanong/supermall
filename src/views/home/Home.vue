<template>
  <div id="home">
    <!--顶部导航-->
    <nav-bar class="home-nav">
      <div slot="center"><h2>购物街</h2></div>
    </nav-bar>
    <tab-control :titles="titles" class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <!--轮播-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--四图推荐-->
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <!--本周流行-->
      <home-feature></home-feature>
      <!--流行 新款 精选-->
      <tab-control :titles="titles"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <!--详细列表-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>

</template>

<script>
  // import HomeSwiper from './childComps/HomeSwiper-test'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeature from './childComps/HomeFeature'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  // import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMinxin} from 'common/mixin'

  export default {
    name: "home",
    data(){
      return{
        banners:[],       //轮播数据变量定义
        recommends:[],      //轮播下的数据变量定义
        titles:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',     //流行  新款  精选 分类
        // isShowBackTop:true,    //是否显示返回顶部的图标
        tabOffsetTop:0,         //tabControll吸顶值
        isTabFixed:false,        //是否吸顶
        saveY:0             //离开当前页面前的位置
      }
    },
    components:{
      HomeSwiper,
      HomeRecommendView,
      HomeFeature,
      Scroll,
      BackTop,

      NavBar,
      TabControl,
      GoodsList
    },
    //混入
    mixins:[itemListenerMixin,backTopMinxin],
    //组件创建完发送网络请求
    created(){
      //1.请求轮播数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    //销毁函数
    destroyed(){
      // console.log('home destroyed');
    },
    activated(){
      // console.log('activated');
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      // console.log('deactivated');
      //保存离开前的Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //2.取消全局事件的监听---滚动刷新
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    mounted(){

    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      /**
       * 网络请求相关方法
       */
      //1.请求轮播数据
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          //轮播数据
          this.banners = res.data.data.banner.list
          //轮播下的推荐数据（十点抢券等）
          this.recommends = res.data.data.recommend.list
        })
      },
      //2.请求商品数据
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },

      /**
       * 事件监听相关方法
       */
      /**
       * 点击切换类型
       */
      tabClick(index){
        // console.log(index)
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      /**
       * 返回顶部点击事件
       */
      // backClick(){
      //   // this.$refs.scroll.scroll.scrollTo(0,0)
      //   this.$refs.scroll.scrollTo(0,0)
      // },
      /**
       * 滚动到一定高度展示返回顶部图标
       */
      contentScroll(position){
        // console.log(position);
        //判断BackTop（返回顶部图标）是否显示
        // this.isShowBackTop = (-position.y) > 1000
        this.isShowBack(position)

        //决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      /**
       * 上拉加载更多
       */
      loadMore(){
        // console.log('22222');
        this.getHomeGoods(this.currentType)

        //图片加载完以后重新刷新计算可滚动区域的高度
        // this.$refs.scroll.scroll.refresh()
      },
      /**
       * 获取轮播图片的高度---获取tabControl的offsetTop
       */
      //所有组件都有一个 el 属性 => 获取组件里的元素
      swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);    //614
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
  /*在使用浏览器原生滚动时，为了导航不跟随一起滚动*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

  .content{
    /*overflow: hidden;*/

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /*.tab-control{*/
  /*sticky属性：当距离顶部44px时，浏览器会自动将sticky属性变成fixed*/
  /*position: sticky;*/
  /*top: 44px;*/
  /*固定横条*/
  /*z-index: 9;*/
  /*}*/
  /*.content{*/
    /*height: calc(100% - 93px);*/
    /*margin-top: 44px;*/
    /*overflow: hidden;*/
  /*}*/
</style>
