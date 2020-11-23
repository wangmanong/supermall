<template>
  <div class="shop-cart">
    <!--导航-->
    <cart-nav-bar></cart-nav-bar>
    <div v-if="$store.state.cartList.length > 0">
      <!--商品列表-->
      <cart-list></cart-list>
    </div>
    <div v-if="$store.state.cartList.length == 0" class="img">
      <img src="~assets/img/cart/gouwuc.jpg" alt="">
      <div></div>
    </div>
    <!--底部汇总-->
    <cart-pay></cart-pay>
  </div>
</template>

<script>
  import CartNavBar from './childComps/CartNavBar'
  import CartList from './childComps/CartList'
  import CartPay from './childComps/CartPay'

  export default {
    name: "shop-cart",
    data(){
      return {
        lengths:this.length
      }
    },
    components:{
      CartNavBar,
      CartList,
      CartPay
    },
    methods:{

    }
  }
</script>

<style scoped>
  .img{
    height:calc(100% - 96px);
    background-color: #F2F2F2;
  }
  .img img{
    width:100%;
  }
  .img div{
    width:100%;
    height:400px;
    background-color: #f2f2f2;
  }

</style>
