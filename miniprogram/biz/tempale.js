import { api } from '../public/tools/index.js';
// 可调用微信的API
function getTempale(callback) {
  api({ 
    url:'/wx/getTempale',
    callback:res=>{
      callback(res)
    }
  });
}

// 可调用微信的API
function sendTempale({ nick1688, template_id, form_id, keyword,page,callback}) {
  api({
    url: '/wx/sendTempale',
    method:'post',
    params:{  
      nick1688: nick1688,
      template_id: template_id,
      form_id: form_id,
      keyword: keyword,
      page: page
    }, 
    callback: res => {
      callback(res)
    }
  });
}

module.exports.getTempale = getTempale
module.exports.sendTempale = sendTempale