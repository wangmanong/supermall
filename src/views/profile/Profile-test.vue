<template>
  <div class="wraper" ref="aaaaaa">
    <!--<button @click="btnClick">按钮</button>-->
    <ul class="content">
      <li>我的列表1</li>
      <li>我的列表2</li>
      <li>我的列表3</li>
      <li>我的列表4</li>
      <li>我的列表5</li>
      <li>我的列表6</li>
      <li>我的列表7</li>
      <li>我的列表8</li>
      <li>我的列表9</li>
      <li>我的列表10</li>
      <li>我的列表11</li>
      <li>我的列表12</li>
      <li>我的列表13</li>
      <li>我的列表14</li>
      <li>我的列表15</li>
      <li>我的列表16</li>
      <li>我的列表17</li>
      <li>我的列表18</li>
      <li>我的列表19</li>
      <li>我的列表20</li>
      <li>我的列表21</li>
      <li>我的列表22</li>
      <li>我的列表23</li>
      <li>我的列表24</li>
      <li>我的列表25</li>
      <li>我的列表26</li>
      <li>我的列表27</li>
      <li>我的列表28</li>
      <li>我的列表29</li>
      <li>我的列表30</li>
      <li>我的列表31</li>
      <li>我的列表32</li>
      <li>我的列表33</li>
      <li>我的列表34</li>
      <li>我的列表35</li>
      <li>我的列表36</li>
      <li>我的列表37</li>
    </ul>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "profile",
    data(){
      return{
        scroll:null
      }
    },
    //组件挂载完之后
    mounted(){
      this.scroll = new BScroll(document.querySelector('.wraper'),{
        probeType:3,
        pullUpLoad:true
      })
      this.scroll.on('scroll',(position)=>{
        console.log(position)
      })
      this.scroll.on('pullingUp',()=>{
        console.log('上拉加载更多')
      })
    },
    methods:{
      btnClick(){
        console.log('+++++++++++++++++++++')
      }
    }
  }
</script>

<style scoped>
  .wraper{
    height: 300px;
    background-color:red;

    overflow: hidden;
    /*在y轴上可滚动*/
    /*overflow-y: scroll;*/
  }
</style>
