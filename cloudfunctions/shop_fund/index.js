
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => new Promise((resolve, reject) => {
  let type = event.type;
  switch (type){
    case 'save':
      db.collection('shop_funds').add({
        data: {
          nick: event.nick,
          shopId: event.shopId,
          shop_funds: event.shop_funds
        },
      }).then(res => {
        resolve(res);
      });
    break;
    case 'get':
      db.collection('shop_funds').where({
        nick: event.nick,
        shopId: event.shopId,
      }).get().then(res => {
        resolve(res);
      });
    break;
    case 'update':
      db.collection('shop_funds').where({
        nick: event.nick,
        shopId: event.shopId,
      })
      .update({
        data: {
          shop_funds: event.shop_funds
        },
      }).then(res => {
        resolve(res);
      });
    break;
    default:
      resolve({code:500});
    break;
  }
  
})
