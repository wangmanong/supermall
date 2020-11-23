<template>
  <div class="profile-bar" @click="loginClick">
    <div class="information">我的信息</div>
    <div slot="left" class="left"><img src="~assets/img/profile/avatar.svg" alt=""></div>
    <div slot="center" class="center">
      <span class="login">登录/注册</span>
      <span class="logo">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定的手机号</span>
      </span>
    </div>
    <div slot="right" class="right"><i class="iconfont icon-youzhixiang"></i></div>
  </div>
</template>

<script>
  export default {
    name: "profile-nav-bar",
    components:{
    },
    methods:{
      loginClick(){
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .profile-bar{
    width: 100%;
    height: 140px;
    background-color: #ff8198;
    position: relative;
    padding: 10px 10px 20px;
  }
  .information{
    text-align: center;
    padding-top: 10px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 900;
  }
  .left{
    position: absolute;
    bottom: 3px;
    left: 7px;
  }
  .left img{
    width: 75px;
    height: 75px;
  }
  .center{
    width:55%;
    height: 70px;
    position: absolute;
    left: 27%;
    bottom: 1px;
  }
  .login{
    color: #ffffff;
    font-size: 18px;
    font-weight: 900;
    display: block;
  }
  .logo{

  }
  .logo img{
    width: 20px;
    height: 20px;
    position: relative;
    top: 3px;
  }
  .logo span{
    color: #ffffff;
    font-weight: 900;
  }
  .right{
    width: 25px;
    height: 33px;
    display: inline-block;
  }
  .iconfont{
    font-size: 20px;
    position: relative;
    top: 35px;
    color: #ffffff;
  }
</style>
