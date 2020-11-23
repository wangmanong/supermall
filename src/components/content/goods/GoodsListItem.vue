<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goods-list-item",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      //获取图片的位置信息
      imageLoad(){
        // console.log('imageLoad');
        //通过事件总线向首页组件发送事件
        this.$bus.$emit('itemImageLoad')
      },
      //点击跳转详情页
      itemClick(){
        // console.log('详情页');
        this.$router.push('/detail/' + this.goodsItem.iid)
        // this.$router.push({
        //   path:'/detail',
        //   query:{
        //     iid:this.goodsItem.iid
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    margin-top: 10px;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  /*显示描述，如果一行放不下显示...*/
  .goods-info p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .cfav{
    position: relative;
  }
  .goods-info .cfav::before{
    content:'';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    /*通过伪元素的形式把收藏的小图标显示*/
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
