import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装Vuex
Vue.use(Vuex)

//2.创建实例
const store = new Vuex.Store({
  //保存状态
  state:{
    cartList:[]
  },
  mutations,
  //异步操作,判断逻辑
  actions,
  //计算属性
  getters,
  //划分模块
  modules:{}
})

//3.挂载到Vue实例
export default store
