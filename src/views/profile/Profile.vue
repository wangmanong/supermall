<template>
  <div class="profile">
    <!--头部导航-->
    <profile-nav-bar></profile-nav-bar>
    <!--我的内容-->
    <profile-my-detail></profile-my-detail>
    <!--我的信息-->
    <profile-my-news></profile-my-news>
    <!--我的购物车-->
    <profile-my-cart></profile-my-cart>
  </div>
</template>

<script>
  import ProfileNavBar from './childComps/ProfileNavBar'
  import ProfileMyDetail from './childComps/ProfileMyDetail'
  import ProfileMyNews from './childComps/ProfileMyNews'
  import ProfileMyCart from './childComps/ProfileMyCart'
  export default {
    name: "profile",
    components:{
      ProfileNavBar,
      ProfileMyDetail,
      ProfileMyNews,
      ProfileMyCart
    }
  }
</script>

<style scoped>

</style>
