/**
 * 云函数 自动确认收货
 */
const tools = require('./cdutils.js');
const { api, savefund, getfund,updatefund,IsEmpty,Secret_Key } = tools; 

exports.main = async (event, context) => {
  var res = await api({
    url:'wxitem/tarorder',
    params: { type: 'get' }
  });
  var proarr = [];
  for(let i in res){//遍历订单
    var shopfunds = await getfund({ nick: res[i].seller_nick, shopId: res[i].shop_id});
    console.log(shopfunds);
    let value = shopfunds.data[0];
    if (!IsEmpty(value)) {//有值更新
      let funds = Secret_Key(value.shop_funds, 'appido', 'decryption');
      funds = parseInt(funds) + parseInt(res[i].money);
      funds = Secret_Key(JSON.stringify(funds), 'appido', 'encryption');
      let up = await updatefund({ nick: res[i].seller_nick, shopId: res[i].shop_id, shop_funds: funds });
    } else {//没有保存
      let shop_funds = Secret_Key(JSON.stringify(parseInt(res[i].money)), 'appido', 'encryption');
      let save = await savefund({ nick: res[i].seller_nick, shopId: res[i].shop_id, shop_funds: shop_funds });
    }
  }  
  var rds = await api({
    url: 'wxitem/tarorder',
    params: { type: 'update' }
  });
  // var shopfunds = await Promise.all(proarr);
  
  // let uparr = [];
  // for (let i in shopfunds){
  //   let value = shopfunds[i].data[0];
  //   if (!IsEmpty(value)){
  //     let funds = Secret_Key(value.shop_funds, 'appido', 'decryption');
  //     funds = parseInt(funds) + parseInt(res[i].money);
  //     funds = Secret_Key(JSON.stringify(funds), 'appido', 'encryption');
  //     uparr.push(updatefund({ nick: res[i].seller_nick, shopId: res[i].shop_id, shop_funds: funds}));
  //   }else{
  //     let shop_funds = Secret_Key(JSON.stringify(parseInt(res[i].money)), 'appido', 'encryption');
  //     uparr.push(savefund({ nick: res[i].seller_nick, shopId: res[i].shop_id, shop_funds: shop_funds }));
  //   }
  // }
  // var update = await Promise.all(uparr);
}