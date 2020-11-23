<template>
  <div id="detail">
    <!--导航-->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!--轮播-->
      <detail-swiper :topImages="topImages" ref="scroll"></detail-swiper>
      <!--详细信息展示-->
      <detail-base-info :goods="goods"></detail-base-info>
      <!--店铺信息展示-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--商品详细信息-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <!--商品参数信息-->
      <detail-param-info :param-info="paramInfo" ref="paramInfo"></detail-param-info>
      <!--商品评论信息-->
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <!--商品推荐信息-->
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!--底部工具栏-->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!--<toast :message="message" :show="show" class="toast"></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import {debounce} from "common/utils";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
  import {itemListenerMixin,backTopMinxin} from 'common/mixin'
  // import Toast from 'components/common/toast/Toast'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
      // Toast

    },
    //混入
    mixins:[itemListenerMixin,backTopMinxin],
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommend:[],
        themeTopYs:[],         //详情导航栏的切换
        getThemeTopY:null,
        currentIndex : 0
        // message:'',
        // show:false
      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情页数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.data.result
        //2.1 获取顶部的轮播图片
        this.topImages = data.itemInfo.topImages
        //2.2 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //2.3 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //2.4 获取商品详细信息
        this.detailInfo = data.detailInfo
        //2.5 获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //2.6 获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      //3. 请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommend = res.data.data.list
      })

      //等到把前面的内容都渲染完以后，判断时才有值，然后会执行回调函数
      //$nextTick是仅仅把里面的DOM渲染完，但是图片还没有加载完，所以offsetTop拿到的值不对
      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })

      //4. 给getThemeTopY赋值（对this.getThemeTopY赋值操作进行防抖操作）
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop)
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      })
    },
    methods:{
      //监听详情图片加载完成以后的事件
      imageLoad(){
        this.refresh

        //每次图片刷新完成后获取高度
        this.getThemeTopY()
      },
      //监听导航标题与内容的联动效果
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      //滚动的主题与导航标题的对应
      contentScroll(position){
        // console.log(position);
        //1. 获取y值
        const positionY = -position.y
        // console.log(positionY);
        //2.posiotionY与主题中的值对比
        //[0, 2955, 4377, 4572]
        //positionY 在 0 和 2955 之间，index=0
        //positionY 在 2955 和 4377 之间，index=1
        //positionY 在 4377 和 4572 之间，index=2
        //positionY 在 4572 之后，index=3
        let length = this.themeTopYs.length
        for(let i = 0; i < length-1; i++){
          // if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i])){
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //是否回到顶部
        this.isShowBack(position)
      },

      // 返回顶部事件
      // backClick(){
      //   console.log('=========');
      //   this.$refs.scroll.scrollTo(0,0)
      //
      // }

      //加入购物车
      addToCart(){
        // console.log('加入到购物车');
        //1.获取到添加到购物车的信息
        const products = {};
        products.iid = this.iid;
        products.image = this.topImages[0];
        products.title = this.goods.title;
        products.desc = this.goods.desc;
        products.price = this.goods.realPrice;
        // console.log(products);
        //2.将商品添加到购物车
        // this.$store.commit('addCart',products)    //在mutations中的写法
        this.$store.dispatch('addCart',products).then(res => {
          // console.log(res);
          // this.show = true;
          // this.message = res
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // },1500)
          this.$toast.show(res,2000)
        })
      }
    },
    mounted(){



    },
    updated(){

    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    /*position: relative;*/
    /*z-index: 9;*/
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .content{
    /*height: calc(100% - 44px);*/
    /*overflow: hidden;*/

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
