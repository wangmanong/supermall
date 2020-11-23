<template>
  <div class="cart-nav">
    <nav-bar>
      <div class="left" slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="center" slot="center">购物车({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { mapGetters } from 'vuex'
  export default {
    name: "cart-nav-bar",
    components:{
      NavBar
    },
    methods:{
      backClick(){
        this.$router.push('/')
        // if(window.history.length <= 1){
        //   this.$router.push({path:'/'})
        //   // return false
        // }else{
        //   this.$router.go(-1)
        // }
      }
    },
    computed:{
      ...mapGetters({
        length:'getCartCount'
      })
    }
  }
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-tint);
  }
  .center{
    font-size: 22px;
    color: #fff;
  }
  .left{
    margin-top: 6px;
  }
</style>
