import { api, IsEmpty } from '../public/tools/index.js';
// 获取店铺，可通过店铺ID获取
function getshops({page,shopid,callback}) {
  api({
    url:'/wx/getShops',
    params:{
      page: page,
      shopid: IsEmpty(shopid) ? '' : shopid
    },
    callback:(res)=>{console.log(res)}
  });
}


//ecs 参数 按照价格排序 升序 ASC 降序DESC 关键词搜索
function getitems({ page, seller_nick, ecs, origin_title, callback }) {
  api({
    url: '/wx/getItems',
    params: {
      page: page,
      seller_nick: IsEmpty(seller_nick) ? '' : seller_nick,
      ecs: IsEmpty(ecs) ? '' : ecs,
      origin_title: IsEmpty(origin_title) ? '' : origin_title,
    },
    callback: (res) => { 
      console.log(res)
     }
  });
}

/*收藏店铺商品类collect
collectshop 收藏店铺
collectitem 收藏商品
buyedshop 买过的店
visitedshop 逛过的店
*/
function collect({ type,value,wechatId, callback }) {
  api({
    url: '/wx/collect',
    params: {
      type: type,
      value: value,
      wechatId: wechatId,
    },
    callback: (res) => {
      console.log(res)
    }
  }); 
}
//暂定是一个逗号分割的字符串
function showCollect({wechatId, callback }) {
  api({
    url: '/wx/showCollect',
    params: {
      wechatId: wechatId,
    },
    callback: (res) => {
      console.log(res)
    }
  });
}
module.exports.getshops = getshops;
module.exports.getitems = getitems;
module.exports.collect = collect;
module.exports.showCollect = showCollect;