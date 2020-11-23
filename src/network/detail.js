import {request} from './request'

export function getDetail(iid){
  return request ({
    url:'/detail',
    params:{
      iid
    }
  })
}

//详情页信息整合
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPricerice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//商家信息整合
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

//商品详细参数信息
export class GoodsParam{
  constructor(info,rule){
    // images可能没有值
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set
    this.sizes = rule.tables
  }
}

//推荐商品信息
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}
