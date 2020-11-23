<template>
  <nav-bar class="category-nav">
    <div slot="left" class="left" @click="leftClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center">
      <input type="text" class="center" placeholder="搜索">
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "cate-nav-bar",
    components:{
      NavBar
    },
    methods:{
      leftClick(){
        this.$router.push({
          path:'/'
        })
      }
    }
  }
</script>

<style scoped>
  .category-nav{
    position: fixed;
    top: 0;
    background-color: #ff8198;
  }
  .left{
    margin-top: 6px;
  }
  .center{
    width: 255px;
    height: 30px;
    border-radius: 15px;
    background: #f7f7f7;
    border: none;
    padding-left: 35px;
    margin-left: 1%;
  }

</style>
