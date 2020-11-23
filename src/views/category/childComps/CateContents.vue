<template>
  <div class="cate">
    <div class="cate-title">
      <div v-for="(leftlist,index) in cateLeftInfo" :key="index" :class="{active:currentIndex === index}" @click="indexClick(index,leftlist)">{{leftlist.title}}</div>
    </div>
    <div class="cate-content">
      <div v-for="(item,index) in cateContentList" :key="index" class="content">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  // 网络请求JS模块
  import {getDetailInfo} from "../../../network/category";
  export default {
    name: "cate-contents",
    props:{
      cateLeftInfo:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0,
        maitKey:3627,
        cateContentList:[]
      }
    },
    methods:{
      indexClick(index,leftlist){
        this.currentIndex = index
        this.maitKey = leftlist.maitKey
        getDetailInfo(this.maitKey).then(res => {
          let dataInfo = res.data.data.list
          this.cateContentList = dataInfo
        })
      }
    },
    created(){
      getDetailInfo(this.maitKey).then(res => {
        let data = res.data.data.list
        this.cateContentList = data
      })
    }
  }
</script>

<style scoped>
  .cate{
    width: 100%;
    padding: 1px 0;
    padding-top: 0;
    margin-top: 46px;
  }
  .cate-title{
    width: 30%;
    height: 100%;
    text-align: center;
    display: block;
    float: left;
    font-weight: 900;
    position: fixed;
  }
  .cate-title div{
    line-height:47px;
  }
  .cate-title div:hover{
    cursor: pointer;
  }
  .active{
    font-size: 19px;
    background-color: #ffffff;
    border-left: 3px solid #FF8A9D;
  }
  .cate-content{
    width: 70%;
    height: 100%;
    float: right;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow:auto;
    padding-top: 8px;
  }
  .content{

  }
  .content img{
    width: 100px;
    height: 100px;
  }
  .content p{
    font-size: 16px;
    font-weight: 900;
    text-align: center;
  }
</style>
