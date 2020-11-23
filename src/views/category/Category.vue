<template>
  <div id="category">
    <!--导航-->
    <cate-nav-bar></cate-nav-bar>
    <!--内容-->
    <cate-contents :cateLeftInfo="cateLeftInfo"></cate-contents>
  </div>
</template>

<script>
  import CateNavBar from './childComps/CateNavBar'
  import CateContents from './childComps/CateContents'

  // 网络请求JS模块
  import {getCateInfo} from "network/category";

  export default {
    name: "category",
    components:{
      CateNavBar,
      CateContents
    },
    data(){
      return{
        cateLeftInfo:[]
      }
    },
    created(){
      getCateInfo().then(res => {
        let data = res.data.data.category
        //获取左侧列表的信息
        this.cateLeftInfo = data.list
      // console.log(this.cateLeftInfo)
      })
    }
  }
</script>

<style scoped>
  /*#category{*/
    /*position: relative;*/
    /*background-color: #fff;*/
    /*height: 100vh;*/
  /*}*/
  /*.content{*/
    /*position: absolute;*/
    /*top: 46px;*/
    /*bottom: 62px;*/
    /*left: 0;*/
    /*right: 0;*/
  /*}*/
</style>
