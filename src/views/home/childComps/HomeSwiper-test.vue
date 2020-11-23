<template>
  <div id="hy-swiper">
    <div class="swiper" v-for="(item,index) in banners" :key="index" v-show="currentIndex == index">
      <!--<slot></slot>-->
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </div>
    <div class="indicator">
      <div v-for="(item,index) in banners" :key="index" class="indi-item" :class="{active:currentIndex == index ? 'selected' : ''}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home-swiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      },
      interval:{
        type:Number,
        default:3000
      }
    },
    data(){
      return{
        currentIndex:0       //当前的index
      }
    },
    mounted(){
      setTimeout(() => {
        //开启定时器
        this.startTimer()
      })

    },
    methods:{
      // 定时器操作
      startTimer:function(){
        this.playTimer = window.setInterval(() => {
          this.currentIndex ++
          if(this.currentIndex == this.banners.length){
            this.currentIndex = 0
          }
        },this.interval)
      }
    }

  }
</script>

<style scoped>
#hy-swiper{
  overflow: hidden;
  position: relative;
}
  .swiper{
    display: flex;
  }
  .swiper img{
    width: 100%;
    height: 230px;
  }
  .indicator{
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212,62,46,1.0);
}
</style>
