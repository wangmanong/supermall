<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    props:{
      // message:{
      //   type:String,
      //   default:'加入购物车成功'
      // },
      // show:{
      //   type:Boolean,
      //   default:false
      // }
    },
    data(){
      return{
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,datest=2000){
        this.isShow = true;
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        },datest)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9;
    background-color: rgba(0,0,0,.8);
    padding: 5px 10px;
  }
</style>
