import { domain } from '../../biz/env.js';
import { DeAes2,Decrypt,Encrypt,productionToken,objKeySort } from   '../tools/Secret.js'
const  qurlimg = 'https://q.aiyongbao.com/wechat/images/';


function cloud({name='',params={},callback}){
  wx.cloud.callFunction({
    name: name,
    data: params,
    success(res) {
      if (callback){
        callback(res);
      }
    },
    complete: res => {
      console.log('callFunction test result: ', res)
    },
    fail: console.error
  })
}

/**
 * https://developers.weixin.qq.com/minigame/dev/api/wx.saveImageToPhotosAlbum.html
 * 保存图片到系统相册。
 * @params filePath 图片文件路径，可以是临时文件路径或永久文件路径，不支持网络图片路径 必填
 * 
 */
function saveImageToPhotosAlbum({ filePath, successText = "保存成功！", errorText = "保存失败！"},successCallback,errorCallback=undefined){
    wx.saveImageToPhotosAlbum({
        filePath: filePath,
        success: (res) => {
            if (!IsEmpty(successText)){
                wx.showToast({
                    title: successText,
                    icon: 'none',
                    mask: true,
                    duration: 2000
                });
            }
            successCallback(res);
        },
        fail:(error)=>{
            if (!IsEmpty(errorText)) {
                wx.showToast({
                    title: errorText,
                    icon: 'none',
                    mask: true,
                    duration: 2000
                });
            }
            if (!IsEmpty(errorCallback)) {
                errorCallback(error);
            }
        }
    })
}
/*
  喜闻乐见的IsEmpty
*/
function IsEmpty(key) {
  if (typeof (key) === 'string') {
    key = key.replace(/(^\s*)|(\s*$)/g, '');
    if (key == '' || key == null || key == 'null' || key == undefined || key == 'undefined') {
      return true
    } else {
      return false
    }
  } else if (typeof (key) === 'undefined') {
    return true;
  } else if (typeof (key) == 'object') {
    for (let i in key) {
      return false;
    }
    return true;
  } else if (typeof (key) == 'boolean') {
    return false;
  }
};
/*
  太长的参数就不要用这个
  url 页面路径
  params 参数
  type 操作类型
*/
function navigate({ url, params, type, callback, num }) {
  let querysry = '';
  if (!IsEmpty(params)) {
    querysry = '?';
    for (let key in params) {
      querysry += `${key}=${params[key]}&`;
    }
  }
  switch (type) {
    default:
    case 'push':
      wx.navigateTo({
        url: url + querysry,
        success: res => {
          if (callback) {
            callback(res);
          }
        },
        fail: res => {
          console.error(res);
        }
      });
      break;
    case 'redirectTo':
      //关闭当前页面，跳转到应用内的某个页面
      wx.redirectTo({
        url: url + querysry,
        success: res => {
          if (callback) {
            callback(res);
          }
        },
        fail: res => {
          console.error(res);
        }
      })
      break;
    case 'reLaunch':
      //关闭所有页面，跳转到应用内的某个页面
      wx.reLaunch({
        url: url + querysry,
        success: res => {
          if (callback) {
            callback(res);
          }
        },
        fail: res => {
          console.error(res);
        }
      })
      break;
    case 'navigateBack':
      //返回上几层页面
      wx.navigateBack({
        delta: num,
        success: res => {
          if (callback) {
            callback(res);
          }
        },
        fail: res => {
          console.error(res);
        }
      })
      break;
    case 'switchTab':
      //跳转 tabBar 页面（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数。
      wx.switchTab({
        url: url
      })
      break;
  }
}

/**
 * 把json解析成字符串
 * author 张文
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function childStr(data) {
  let childArr = [];
  if (typeof (data) == 'object') {
    for (let key in data) {
      for (let i in this.childStr(data[key])) {
        childArr.push('[' + key + ']' + this.childStr(data[key])[i]);
      }
    }
  } else {
    childArr.push(('=' + encodeURIComponent(data)));
  }
  return childArr;
}
/**
* 把json解析成字符串
* author 张文
* @param  {[type]} data [description]
* @return {[type]}      [description]
*/
function buildStr(data) {
  let str = '';
  for (let key in data) {
    for (let i in childStr(data[key])) {
      str += (key + childStr(data[key])[i] + '&');
    }
  }
  return str.substr(0, str.length - 1);
}

function api({ host = domain.zhost, url, method = 'post', params = {}, callback, errorcallback }) {
  let self = this;
  params.rd_session = local({ type: 'get', key: 'rd_session' });
  //请求参数转为JSON字符串
  var jsonStr = JSON.stringify(params);
  //根据特定规则生成Token
  var token = productionToken(params);
  //加密请求参数
  var aesData = Encrypt(jsonStr)
  wx.request({
    url: host+url,
    method: method,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Token': token
    },
    data: {
      aesData: aesData
    },
    // data: params,
    success: function (res) {
      //判断请求结果是否成功
      try {
        let data = res.data;
        var result = DeAes2(data);
        if (!IsEmpty(result)) {
          data = JSON.parse(result);
        }
        console.log(data)
        if (!IsEmpty(data.code) && data.code != 200) {
          wx.showToast({
            title: data.value,
            icon: 'none'
          })
          return;
        } else {
          if(!IsEmpty(callback)){
            callback(data)
          }
        }
      } catch (e) {
        console.warn(e)
      }
    },
    fail: function (res) {
    },
  })
}

// function api({ host = domain.zhost, url, method = 'post', params={}, callback, errorcallback }) {
//   let self = this;
//   params.rd_session = local({ type: 'get', key: 'rd_session' });
//   let args = '';
//   let datatype = method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded';
//   if (method == 'get') {
//     args = buildStr(params);
//     if (args != '') {
//       args = '?' + args;
//     }
//   }
//   wx.request({
//     url: host + url + args,
//     method: method,
//     dataType: method == 'get' ? 'jsonp' : 'json',
//     data: method == 'get' ? {} : params,
//     header: {
//       'content-type': datatype
//     },
//     success(res) {
//       console.log(res)
//       try{
//         let data = res.data;
//         if (typeof (res.data) == 'string' && !IsEmpty(res.data)){
//           data = JSON.parse(res.data);
//         }
//         if(!IsEmpty(data.code)&&data.code!=200){
//           wx.showToast({
//             title: data.value,
//             icon:'none'
//           })
//           return;
//         }else{
//           if (method == 'get') {
//             callback(JSON.parse(res.data))
//           } else {
//             callback(res.data)
//           }
//         }
//       }catch(e){
//         console.warn(e)
//       }
      
//     },
//     fail(res) {
//       console.error(res)
//     }
//   })
// }
/*
  type
  操作类型
  同步存储
*/
function local({ key, data, type }) {
  /*
    string key
    本地缓存中指定的 key

    Object|string data
    需要存储的内容
  */
  switch (type) {
    case 'save':
      try {
        wx.setStorageSync(key, data);
        return 1;
      } catch (e) {
        console.error(e)
        return 0;
      }
      break;
    case 'get':
      try {
        let data = wx.getStorageSync(key);
        return data;
      } catch (e) {
        console.error(e)
        return 0;
      }
      break;
    case 'remove':
      try {
        wx.removeStorageSync(key);
        return 1;
      } catch (e) {
        console.error(e)
        return 0;
      }
      break;
    case 'clear':
      try {
        wx.clearStorageSync();
        return 1;
      } catch (e) {
        console.error(e)
        return 0;
      }
      break;
    case 'info':
      try {
        let data = wx.getStorageInfoSync();
        return data;
      } catch (e) {
        console.error(e)
        return 0;
      }
      break;
  }
}

/*
  type
  操作类型
  异步存储
*/
function asyLocal({ key, data, type }) {
  /*
    string key
    本地缓存中指定的 key

    Object|string data
    需要存储的内容
  */
  switch (type) {
    case 'save':
      wx.setStorage({
        key: key,
        data: data,
        success(res) {
          return 1;
        },
        fail(res) {
          console.log(res);
          return 0;
        }
      ,
      });
      break;
    case 'remove':
      wx.removeStorage({
        key: key,
        success(res) {
          return 1;
        },
        fail(res) {
          console.log(res);
          return 0;
        }
      })
      break;
  }
}
/*
  小程序登录
*/
function programLogin(callback, type) {
  let refesh = () => {
    wx.login({
      success: res => {
        //获取code后台处理
        api({ 
          url:'/wx/xcxSessionKey',
          params: { 
            code: res.code
          },
          callback:(rsp)=>{
            if (!IsEmpty(rsp)) {
              local({ key: 'rd_session', data: rsp.rd_session, type: 'save' });
              callback();
            }
          }
        })
      }
    });
  }
  wx.checkSession({
    success: res => {
      if (type == 1) {
        refesh();
      } else {
        callback();
      }
    },
    fail: res => {
      //重新登录授权
      refesh();
    }
  });//检测是否过期
}


function getUserInfo(callback) {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            let encryptedData = res.encryptedData;
            let iv = res.iv;
            api({
              url:'/wx/xcxuserinfo',
              params: {
                encryptedData: encryptedData,
                iv: iv
              },
              callback(res) {
                console.log(res)
                if (IsEmpty(res) || IsEmpty(res.data) || IsEmpty(res.data.avatarUrl)) {
                  console.error('登录信息冲突，需要强制刷新');
                  callback('reAuth');
                } else {
                  var app = getApp();
                  res.data.encryptedData = encryptedData;
                  res.data.iv = iv;
                  app.globalData.userInfo = { data:{ ...app.globalData.userInfo, ...res.data
            }};
                  callback(res);
                }
              }
            });
          }
        })
      } else {
        callback('needAuth');
      }
    }
  })
}
/*
  选择图片
  number 选择多少张
*/
function choosepic(number, callback) {
  wx.chooseImage({
    count: number,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],//从
    success: function (res) {
      //如果图片大于100KB进行压缩
      if (res.tempFiles[0].size > 102400) {
        wx.compressImage({
          src: res.tempFilePaths[0],
          quality: 80,
        })
      };
      callback(res)
    },
    fail: e => {
      console.error(e)
    }
  })
}

/*
上传文件
*/
function upload({ cloudPath, filePath, callback }) {
  wx.cloud.uploadFile({
    cloudPath,
    filePath,
    success: res => {
      console.log('[上传文件] 成功：', res)
      callback(res)
    },
    fail: e => {
      console.error('[上传文件] 失败：', e)
      wx.showToast({
        icon: 'none',
        title: '上传失败',
      })
    },
    complete: () => {
      wx.hideLoading()
    }
  })
}

/*
 下载图片到相册
*/
function downloadPic(fileID, callback) {
  wx.cloud.downloadFile({
    fileID: fileID,
    success: (res) => {
      console.log(res)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: (res) => {
          if (callback) {
            callback(res)
          }
        },
        fail: (res) => {
          console.error(res)
        },
      })
    },
    fail: (res) => {
      console.error(res)
    },
  });
}
/*
最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
*/
function getQrcode({ sence, page, callback }) {
  wx.getImageInfo({
    src: 'https://zk1688.aiyongbao.com' + '/wx/xcxQrcode?str=' + sence + '&page=' + page,
    success: (res) => {
      callback(res.path);
    }
  });
}

/*
ava:用户头像
sence 场景值
page 页面
shopname 店铺名字 //最大10个字，不要超过7个字，超过就自己处理一下。。。 '品质生活...'
canvasID canvas 的ID 'myCanvas'
*/
function drawShopPic({ ava, sence, page, shopname, canvasID }) {
  wx.getSystemInfo({
    success: (res) => {
      let prwidth = Math.round(res.screenWidth * (553 / 750));//canvas占屏幕的宽比
      let prheight = Math.round(prwidth * 553 / 665);//canvas的宽高
      let dotwidth = prwidth / 553;
      let dotheight = dotwidth;//利用百分比计算
      dotheight = dotwidth;
      getQrcode({
        sence: sence,
        page: page,
        callback: (res) => {
          let qrcode = res;
          wx.getImageInfo({
            src: ava,
            success(res) {
              let toux = res.path;
              const ctx = wx.createCanvasContext(canvasID);
              // ctx.setShadow(1, 1, 2, 'black')
              ctx.setFillStyle('white');
              ctx.fillRect(0, 0, 532 * dotwidth, 665 * dotwidth)
              // ctx.setShadow(0, 0, 0, 'black')
              var r = 45 * dotwidth
              var cx = 60 * dotwidth + r
              var cy = 30 * dotheight + r
              ctx.arc(cx, cy, r, 0, 2 * Math.PI);
              ctx.fill()
              ctx.drawImage(qrcode, 117 * dotwidth, 180 * dotheight, 300 * dotwidth, 300 * dotheight);
              ctx.setFontSize(36 * dotwidth);
              ctx.setFillStyle('black')
              ctx.fillText(shopname, 180 * dotwidth, 90 * dotheight);
              ctx.fillText('长按图片', 200 * dotwidth, 557 * dotheight);
              ctx.fillText('识别图中小程序码', 120 * dotwidth, 621 * dotheight);
              ctx.save(); //绘画原型头像
              ctx.beginPath();
              var r = 45 * dotwidth
              var cx = 60 * dotwidth + r
              var cy = 30 * dotheight + r
              ctx.arc(cx, cy, r, 0, 2 * Math.PI)
              ctx.clip()
              ctx.drawImage(toux, 60 * dotwidth, 30 * dotheight, 90 * dotwidth, 90 * dotheight);
              ctx.restore()
              ctx.draw()
            }
          })
        }
      });
    }
  });
}
/**
 * 将canvs转换成图片
 */
function getShopPic({ canvasId, callback,that, width, height }) {
  wx.canvasToTempFilePath({
    // x: 0,
    // y: 0,
    // width: width,
    // height: height,
    // destWidth: width + 'rpx',
    // destHeight: height + 'rpx',
    canvasId: canvasId,
    success: function (res) {
      callback(res.tempFilePath);
    },
    fail: function (res) {
      console.log(res)
    }
  }, that)
}
/**
 *    绘画cavans文字
 */
function drawText(ctx, str, initHeight, titleHeight, canvasWidth, initwidth) {
  var lineWidth = 0;
  var lastSubStrIndex = 0; //每次开始截取的字符串的索引
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
    if (lineWidth > canvasWidth) {
      ctx.fillText(str.substring(lastSubStrIndex, i), initwidth, initHeight);//绘制截取部分
      initHeight += 15;//20为字体的高度
      lineWidth = 0;
      lastSubStrIndex = i;
      titleHeight += titleHeight;
    }
    if (i == str.length - 1) {//绘制剩余部分
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initwidth, initHeight);
    }
  }
  // 标题border-bottom 线距顶部距离
  titleHeight = titleHeight + 10;
  return titleHeight
}

/**
 * 绘画商品分享图
 */
function drawItemPic({ ava, sence, page, itemtitle,shopname, money, canvasID, callback }) {
  wx.getSystemInfo({
    success: (res) => {
      let prwidth = Math.round(res.screenWidth * (548 / 750));//canvas占屏幕的宽比
      let prheight = Math.round(prwidth * 548 / 974);//canvas的宽高
      let dotwidth = prwidth / 548;
      let dotheight = dotwidth;//利用百分比计算
      dotheight = dotwidth;
      let promise1 = new Promise((resolve, reject) => {
        getQrcode({
          sence: sence,
          page: page,
          callback: (res) => {
            console.log(res);
            resolve(res);
          }
        })
      });
      let promise2 = new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: ava,
          success(res) {
            resolve(res.path);
          }
        })
      });
      let promise3 = new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: qurlimg + 'pic_logo.png',
          success(res) {
            resolve(res.path);
          }
        })
      });
      Promise.all([promise1, promise2, promise3])
      .then((results) => {
        console.log(results)
        let qrcode = results[0];
        let pic = results[1];
        let toux = results[2];
        const ctx = wx.createCanvasContext(canvasID);
        // ctx.setShadow(1, 1, 2, 'black')
        ctx.setFillStyle('white');
        ctx.fillRect(0, 0, 547 * dotwidth, 973 * dotwidth)
        // ctx.setShadow(0, 0, 0, 'black')
        ctx.setFillStyle('black');
        ctx.setFontSize(32 * dotwidth);
        ctx.fillText(shopname, 215 * dotwidth, 100 * dotheight);
        ctx.drawImage(toux, 117 * dotwidth, 45 * dotheight, 80 * dotwidth, 80 * dotheight);
        ctx.drawImage(pic, 25 * dotwidth, 148 * dotheight, 500 * dotwidth, 550 * dotheight);
        ctx.drawImage(qrcode, 50 * dotwidth, 800 * dotheight, 150 * dotwidth, 150 * dotheight);
        ctx.setFontSize(24 * dotwidth);
        ctx.setFillStyle('black')
        drawText(ctx, itemtitle, 732 * dotwidth, 24, 328 * dotwidth, 25 * dotwidth);
        ctx.setFillStyle('#666666')
        ctx.fillText('长按图片', 354 * dotwidth, 850 * dotheight);
        ctx.fillText('识别图中小程序码', 306 * dotwidth, 874 * dotheight);
        ctx.fillText('查看详情', 354 * dotwidth, 898 * dotheight);
        ctx.setFillStyle('red');
        ctx.setFontSize(28 * dotwidth);
        ctx.fillText(money, 420 * dotwidth, 732 * dotheight);
        ctx.draw(true,function () {
          console.log('绘制完成')
          if (callback) {
            callback();
          }
        })
      })
      .catch((errResults) => {
        console.error('信息获取失败');
      }); 
    }
  });
}
//检测当前用户是否授权
function checkAuth(type,callback) {
  programLogin(() => {
    getUserInfo((res) => {
      if (res == 'needAuth') {
        if(callback) {
          callback(res);
        }
        // navigate({
        //   url: '/pages/login/login',
        //   type: 'push',
        //   params: { checkAuth: 1 }
        // });
      } else if (res == 'reAuth') {
        checkAuth(1, callback)
      }else{
        if(callback){
          callback(res);
        }
      }
    });
  }, type);//小程序登录
} 
module.exports = {
    saveImageToPhotosAlbum,
    navigate,
    IsEmpty,
    api,
    local,
    asyLocal,
    programLogin,
    getUserInfo,
    choosepic,
    upload,
    downloadPic,
    getQrcode,
    drawShopPic,
    getShopPic,
    drawItemPic,
    checkAuth,
    cloud
    // testapi,
};
