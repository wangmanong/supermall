<template>
  <div class="my-detail">
    <div class="balance">
      <div class="cen">
        <span class="sp">0.00</span>
        <span>元</span>
      </div>
      <div>我的余额</div>
    </div>
    <div class="discount">
      <div class="cen">
        <span class="sp">0</span>
        <span>个</span>
      </div>
      <div>我的优惠</div>
    </div>
    <div class="integral">
      <div class="cen">
        <span class="sp">0</span>
        <span>分</span>
      </div>
      <div>我的积分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "profile-my-detail"
  }
</script>

<style scoped>
  .my-detail{
    width: 100%;
    height: 85px;
    display: flex;
    border-bottom: 7px solid #f2f2f2;
  }
  .my-detail div{
    flex: 1;
  }
  .balance{
    font-weight: 600;
    padding: 20px 20px;
    text-align: center;
  }
  .discount{
    font-weight: 600;
    text-align: center;
    padding: 20px 20px;
  }
  .integral{
    font-weight: 600;
    text-align: center;
    padding: 20px 20px;
  }
  .sp{
    color: #ff8198;
  }
</style>
