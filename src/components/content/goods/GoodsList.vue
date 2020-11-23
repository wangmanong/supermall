<template>
  <div class="goods">
    <goods-list-item  v-for="(item,index) in goods" :key="index" :goods-item="item"/>
    <!--{{goods}}-->
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name: "goods-list",
    props:{
      goods:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
.goods{
  display: flex;
  /*根据wrap包裹关系让一行显示几个*/
  flex-wrap:wrap;
  /*均等分*/
  justify-content: space-around;
}

</style>
