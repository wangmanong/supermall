<template>
  <div class="wraper" ref="wraper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
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
    data(){
      return {
        scroll:null
      }
    },
    mounted(){
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wraper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })

      // this.scroll.scrollTo(0,0)    //返回顶部x,y
      //2.监听滚动位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      //3.上拉加载更多---监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          // console.log('111111');
          this.$emit('pullingUp')
        })
      }


      // console.log(this.scroll);   //scrollHeight可滚动区域
      //图片加载完成刷新
      this.scroll.refresh()
    },
    methods:{
      scrollTo(x,y){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,500)
      },

      //加载完成后再刷新
      refresh(){
        // console.log('++++++++++');
        this.scroll && this.scroll.refresh()
      },
      //数据加载完成并展示后进行下一次上拉加载更多
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      //离开当前页面前的位置
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }

  }
</script>

<style scoped>

</style>
