// 可调用微信的API
import { api, local } from '../public/tools/index.js';
function getCode({phone, callback}) {
  let rd_session = local({ type: 'get', key: 'rd_session' });
  api({
    url: '/wx/sendCode',
    params: {
      phone: phone,
      rd_session: rd_session
    },
    callback: (res) => {
      if(res.value){
        wx.showToast({
          title: res.value,
          icon:'none'
        })
      }else{
        callback(res)
      }
     }
  });
}

module.exports.getCode = getCode;