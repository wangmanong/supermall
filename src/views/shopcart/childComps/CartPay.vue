<template>
  <div class="cart-pay">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectedAll"
                    @click.native="checkClick">
      </check-button>
      <span >全选</span>
    </div>
    <div class="price">合计:￥{{totalPrice}}</div>
    <button class="calculate" @click="calcuClick">提交订单({{checkLength}})</button>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'
  export default {
    name: "cart-pay",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['getCartList']),
      totalPrice(){
        return this.getCartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.getCartList.filter(item => item.checked).length
      },
      isSelectedAll(){
        if(this.getCartList.length === 0){ return false}
        //使用filter高阶函数
        // return !(this.getCartList.filter(item => !item.checked).length)

        //使用find
        // return !this.getCartList.find(item => !item.checked)

        //普通遍历
        for(let item of this.getCartList){
          if(!item.checked){
            return false
          }
        }
        return true
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectedAll){   //如果原来是全部选中，点击时状态都变成false
          this.getCartList.forEach(item => item.checked = false)
        }else{
          this.getCartList.forEach(item => item.checked = true)
        }
      },
      calcuClick(){
        this.$toast.show('请先添加商品',1500)
      }
    }
  }
</script>

<style scoped>
  .cart-pay{
    height: 40px;
    background-color: #ffffff;
    position: fixed;
    bottom: 60px;
    width: 100%;
    display: flex;
    /*line-height: 40px;*/
  }
  .cart-pay div{
    /*flex: 1;*/
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    margin-right:5px;
  }
  .price{
    line-height: 40px;
    flex: 1;
    margin-left: 23%;
  }
  .calculate{
    line-height: 40px;
    margin-right: 3%;
    background-color: #ff0000;
    margin-top: 5px;
    border: none;
    font-size: 14px;
    color: #ffffff;
    width: 100px;
  }
</style>
