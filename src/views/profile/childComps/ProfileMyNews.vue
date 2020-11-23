<template>
  <div class="my-news">
    <div class="information">
      <img src="~assets/img/profile/message.svg" alt="">
      <span>我的信息</span>
    </div>
    <div class="shop">
      <img src="~assets/img/profile/pointer.svg" alt="">
      <span>我的商城</span>
    </div>
    <div class="member">
      <img src="~assets/img/profile/vip.svg" alt="">
      <span>会员卡</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "profile-my-news"
  }
</script>

<style scoped>
  .my-news{
    width: 100%;
    height: 160px;
    /*background-color: orange;*/
    border-bottom: 7px solid #F2F2F2;
  }
  .my-news div{
    height: 35%;
    border-top: 2px solid #f2f2f2;
    padding: 7px;
  }
  img{
    width: 45px;
    height: 27px;
    position: relative;
    top: 8px;
    left: 2px;
  }
  span{
    font-weight: 700;
  }
</style>
