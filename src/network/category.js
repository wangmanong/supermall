import {request} from './request'

// 分类栏
export function getCateInfo(){
  return request({
    url:'/category'
  })
}

// 详细列表栏
export function getDetailInfo(maitKey){
  return request({
    url:'/subcategory',
    params:{
      maitKey
    }
  })
}
