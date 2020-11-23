import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";
export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      // console.log(payload)
      //payload是新添加的商品
      // let oldProduct = null
      // for(let item of state.cartList){
      //   console.log(item)
      //   if(item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }
      // //判断oldProduct
      // if(oldProduct){
      //   oldProduct.count += 1
      // }else{
      //   payload.count = 1
      //   state.cartList.push(payload)
      // }

      // let index = state.cartList.indexOf(payload)
      // if(index === -1){
      //   let oldProduct = state.cartList[index]
      //   oldProduct.count += 1
      // }else{
      //   payload.count = 1
      //   state.cartList.push(payload)
      // }

      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function(item){
        return item.iid === payload.iid
      })
      //2.判断oldProduct状态
      if(oldProduct){
        oldProduct.count += 1
        context.commit(ADD_COUNTER,payload)
        resolve('当前商品数量+1')
      }else{
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('加入购物车成功')
      }
      reject('出错')
    })

  }
}
