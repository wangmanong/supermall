<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in list" :key="index" :item-info="item"></cart-list-item>
    </scroll>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  export default {
    name: "cart-list",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters({
        list:'getCartList'
      })
    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    position: absolute;
    top: 44px;
    bottom: 62px;
    left: 0;
    right: 0;
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
