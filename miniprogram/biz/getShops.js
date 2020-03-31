import { api, IsEmpty, cloud } from '../public/tools/index.js';
import { Secret_Key } from '../public/tools/Secret.js';
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

/**
 *云函数更新 
 */
function upCloudFund({ type = '', nick = '', shopId = '', shop_funds = '', callback }) {
  cloud({
    name: 'shop_fund',
    params: {
      type: 'get',
      nick: nick,
      shopId: shopId,
    },
    callback: (res) => {
      let funds = 0
      if (IsEmpty(res.result.data)) {
        funds = 0;
      } else {
        funds = res.result.data[0].shop_funds;
        funds = Secret_Key(funds, 'appido', 'decryption');
        funds = parseInt(funds);
      }
      if (type == 'get') {
        callback(funds);
        return;
      }
      shop_funds = parseInt(shop_funds) + funds;
      shop_funds = Secret_Key(JSON.stringify(shop_funds), 'appido', 'encryption');
      if (IsEmpty(res.result.data)) {
        cloud({
          name: 'shop_fund',
          params: {
            type: 'save',
            nick: nick,
            shopId: shopId,
            shop_funds: shop_funds,
          },
          callback: (res) => {

          }
        });
      } else {
        cloud({
          name: 'shop_fund',
          params: {
            type: 'update',
            nick: nick,
            shopId: shopId,
            shop_funds: shop_funds,
          },
          callback: (res) => {

          }
        })
      }
    }
  });
}
module.exports.getshops = getshops;
module.exports.getitems = getitems;
module.exports.collect = collect;
module.exports.showCollect = showCollect;
module.exports.upCloudFund = upCloudFund;