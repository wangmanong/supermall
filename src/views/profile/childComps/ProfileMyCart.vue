<template>
  <div class="my-cart">
    <div>
      <img src="~assets/img/profile/cart.svg" alt="">
      <span>我的购物车</span>
    </div>
    <div>
      <img src="~assets/img/profile/shopping.svg" alt="">
      <span>下载购物APP</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "profile-my-cart"
  }
</script>

<style scoped>
  .my-cart{
    width: 100%;
    height: 100px;
    /*background-color: orangered;*/
  }
  .my-cart div{
    height: 50%;
    border-top: 2px solid #f2f2f2;
    padding: 3px;
  }
  img{
    width: 45px;
    height: 27px;
    position: relative;
    top: 7px;
    left: 5px;
  }
  span{
    font-weight: 700;
    position: relative;
    left: 2px;
  }
</style>
