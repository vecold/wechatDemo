// pages/chooseLib/chooseLib.js
import { navigate, api, local, choosepic, upload, downloadPic, getQrcode, drawShopPic, getShopPic, drawItemPic, cloud } from '../../public/tools/index.js';
import { sendTempale, getTempale } from '../../biz/tempale.js';
import { getshops, getitems, collect, showCollect, upCloudFund } from '../../biz/getShops.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopfund:0,
    movV: JSON.stringify([
      {
        "id": 0,
        "url": "wechat/90675/hello2019-03-20.jpeg",
        "show": "0"
      },
      {
        "id": 1,
        "url": "wechat/90675/hello2019-03-20.jpeg",
        "show": "1"
      }
    ]),
    ami:0,
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    demotext:'',
    demo: 0,
    dataFieldA: 'hello',
    dataFieldB: 'world',
    mycomponent: 1,
    savekey:'',
    savedata:'',
    removekey: '',
    getkey: '',
    getdata: '',
    qrcode:'',
    imgUrls: ["https://cbu01.alicdn.com/img/ibank/2011/697/511/384115796_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/812/699/4146996218_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/914/064/4169460419_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/527/820/4165028725_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/419/610/4165016914_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/345/002/4166200543_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/062/602/4166206260_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/567/491/4166194765_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/709/369/4146963907_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/447/149/4172941744_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/243/059/4172950342_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/929/930/4176039929_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/719/449/4172944917_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/450/360/4176063054_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/669/706/4171607966_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/706/059/4172950607_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/887/240/4176042788_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/284/150/4176051482_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2017/824/840/4176048428_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2011/547/511/384115745_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2011/807/431/384134708_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2011/438/511/384115834_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2011/527/311/384113725_1401670587.jpg", "https://cbu01.alicdn.com/img/ibank/2011/470/441/384144074_1401670587.jpg"]
  },
  onShareAppMessage: function (options){
    console.log(options);//options看文档
    wx.showShareMenu({
      withShareTicket:true,
      success:(res)=>{
        console.log(res)
      }
    })
    // wx.updateShareMenu(Object object)
    return {
      title: '测试分享功能',
      path: '/pages/index/index?id=123',
      imageUrl: 'http://pic115.nipic.com/file/20161121/24323102_193221391000_2.jpg'//5:4
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const { tem, text } = options
    this.setData({ demo: tem, demotext: text});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  destroy: function (event) {
    console.log(event);
    let data = event.currentTarget.dataset;
    this.setData({ mycomponent: data.type });
  },

  getcomponent: function (event) {
    console.log(this.selectComponent('#mycomponent'));
  },
  onMyEvent: function (event) {
    console.log('parent event');
  },

  posthttp: function (e){
    api({ 
      url: '/wx/supplyTid', 
      params: { 
        seller_nick: '萌晓月cy',//卖家的
        mid:'b2b-2190174972',//卖家的
        uid: '2190174972',//卖家的
        shopName: '今天柠檬酸不酸',//卖家的
        shopId: '26044',//卖家的
        buyer_nick:'deadpool',//买家的微信昵称
        paymont:100,//总价
        goods_num:5,//货品总数
        titles:'test goods name ',//商品主标题
        buyerContact: {
          phone: '123456789',//联系电话
          address: 'test detail address',
          province: '江苏省',//省市区
          city: '南京市',
          town: '天门区',
          receiver_name: '王啸坤',
        },
        item_list:[{
          goods_img:'i am a pic',//子订单图片，如果没有sku就是主图
          goods_name:'i am name ',//子订单商品名
          price:20,//单价
          amoumt:2,//数量
          totalamount:40,//总价
          outer_id:'454465',//sku 信息中获取
          goods_id:'543088304606',//num_iid
          outer_sku_id: '454465',//sku 信息中获取
          properties_name: 'skuname',//sku 信息中获取
          sku_img: 'i am skupic',//sku 信息中获取
          sku_id: '5566777222',//sku 信息中获取
          goods_out_price: 40,//对外部的价钱，与price一致即可
        },
          {
            goods_img: 'i am a pic',//子订单图片，如果没有sku就是主图
            goods_name: 'i am name ',
            price: 20,
            amoumt: 3,
            totalamount: 60,//总价
            outer_id: '454465',
            goods_id: '543088304606',//num_iid
            outer_sku_id: '454465',
            properties_name: 'skuname',
            sku_img: 'i am skupic',
            skuid: '5566777222',
            productId: '455455454',
            goods_out_price: 40,
          },
        ],
      }, 
      method: 'post',
      callback:(res)=>{
        console.log(res)
      } 
    });
  },
  gethttp: function (e){
    // wx.request({
    //   url: 'https://devweb1688.aiyongbao.com/test/gethttp',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
        
    //   },
    //   success(res) {
    //     console.log(res)//回掉session_key存到微信云端
        
    //   }
    // });
    api({ 
      url: '/Test/gethttp', 
      params: { word: 'hello' },
      callback:(res)=>{
        console.log(res)
      }
    });
  },
  bindKeyInput:function(e){
    this.data[`${e.currentTarget.dataset.type}`] = e.detail.value;
    this.setData({...this.data});
  },
  datatran:function(e){
    const { savekey, savedata, getkey, removekey } = this.data;
    let trantype = e.currentTarget.dataset.type;
    switch (trantype) {
      case 'save':
        local({ key: savekey, data: savedata,type:'save'});
      break;
      case 'get':
        let data = local({ key: getkey, type: 'get' });
        console.log(data)
        this.setData({getdata:data});
      break;
      case 'remove':
        local({ key: removekey, type: 'remove' });
      break;
      case 'clear':
        local({ type: 'clear' });
      break;
      default:
      break;
    }
  },
  formSubmit: function (e) {
    //要真机
    let formId = e.detail.formId;
    // getTempale((res)=>{
      api({
        url: '/wx/sendTempale',
        method: 'post',
        params: {
          type:'seller',
          shopid:'47361',
          // form_id: formId,
          // keyword: ['123123','1','2','3','4'],
          page: 'pages/index/index?sence=1'
        },
        callback: res => {
        }
      });
    // })
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  // 上传图片
  doUpload: function () {
    //选择图片
    choosepic(1,(res)=>{
      wx.showLoading({
        title: '上传中',
      })
      const filePath = res.tempFilePaths[0]
      // 上传图片
      const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
      console.log(filePath, cloudPath);
      this.setData({ upload: 1, imagePath: filePath});
      wx.hideLoading()
      // upload({
      //   cloudPath: cloudPath,
      //   filePath: filePath,
      //   callback:(res)=>{
      //     console.log(res.tempFilePath)//这里的路径可直接下载 #A

      //   }
      // });
    });
  },
  previewImage:function(){
    wx.previewImage({
      current: this.data.imagePath, // 当前显示图片的http链接   
      urls: [this.data.imagePath] // 需要预览的图片http链接列表   
    })
   
  },
  // 下载图片
  doDownload: function () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              downloadPic('cloud://wechatshop-3adb86.7765-wechatshop-3adb86/my-image.jpg')//一般都会通过接口获取fileID，测试可用 #A
            }
          })
        }else{
          downloadPic('cloud://wechatshop-3adb86.7765-wechatshop-3adb86/my-image.jpg')
        }
      }
    })
  },
  getqrcode:function (){
    getQrcode({
      sence:'hello',
      page:'pages/login/login',
      callback:(res)=>{
        this.setData({ qrcode: res});
      }
    });
  },
  testpic:function (){
    drawShopPic({     ava:'https://wx.qlogo.cn/mmopen/vi_32/icaYhiapVcmsz8GYm4dwHxen5iaACEgZpd7hE8V8xib8AFedeb1xCgbxP8DsS9q3YzH8NqD6GBSJBMRw2yRUH79jaQ/132',
      sence:'hello', 
      page:'pages/login/login', 
      shopname:'品质家居生活馆', 
      canvasID:'myCanvas'
      });
  },
  share:function (){
    let self = this;
    getShopPic({
      canvasId: 'myCanvas',
      that: self,
      callback:(res)=>{
        console.log(res)
        self.setData({
          prurl: res,
        })
      }
    });
  },
  save:function(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.prurl,
      success: (res) => {
        console.log(res)          
      },
      fail: (res) => {
        console.error(res)
      },
    })
  },
  itempic:function(){
    let self = this;
    drawItemPic({
      ava: 'https://cbu01.alicdn.com/img/order/trading/320/655/156406499332/8533673508_1376380072.80x80.jpg_60x60.jpg',
      sence: 'hello',
      page: 'pages/login/login',
      itemtitle: '创意小丁玻璃杯 高硼硅水杯耐高温玻璃杯 可定制广告礼品',
      money:'¥40.00',
      canvasID: 'item'
    });
  },
  itemshare: function () {
    let self = this;
    getShopPic({
      canvasId: 'item',
      width: 548,
      height: 974,
      callback: (res) => {
        self.setData({
          itemprurl: res,
        })
      }
    });
  },
  itemsave: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.itemprurl,
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.error(res)
      },
    })
  },
  handleContact: function(e){
    console.log(e.path)
    console.log(e.query)
  },
  openurl:function(e){
    wx.openUrl({
      url: 'https://devweb1688.aiyongbao.com',
      fail: (msg) => {
        console.log('fail:', msg)
      },
      success: (msg) => {
        console.log('success:', msg)
      }
    })
  },
  dobean:function(e){
    //埋点方法，按照产品运维给的事件和key-value关系填写
    console.log('debena')
    wx.reportAnalytics('seller_change2buyer_click', {click:1})
  },
  testurl:function(e){
    getitems({
      page:0,
      // seller_nick:'摸金校尉13209677569'
      // ecs:'ASC'//'DESC'
      // origin_title:'132'
    }); 
    // getshops({
    //   shopid: '25180'
    // });
    // collect({
    //   type: 'collectitem',
    //   value:'23456',
    //   wechatId:'oXwGY1NGXoLoKola7SpaC0y3851E',
    // })
    // showCollect({
    //   wechatId: 'oXwGY1NGXoLoKola7SpaC0y3851E',
    // })
  },
  getphone:function(e){
    console.log(e)
    let rd_session = local({ type: 'get', key: 'rd_session' });
    wx.request({
      url: 'https://devweb1688.aiyongbao.com/wx/decodePhone',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        rd_session: rd_session,
      },
      success(res) {
        console.log(res)
      }
    })
  },
  viewmove:function(e){
    console.log(e)
  },
  picJude:function(e){
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=>{
        console.log(res.tempFilePaths[0]);
        wx.uploadFile({
          url:'https://devwechat.aiyongbao.com/wxitem/picJude',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) { 
            console.log(res)
          }
        });
      }
    });
  },
  bdJude: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res.tempFilePaths[0]);
        wx.uploadFile({
          url: 'https://devwechat.aiyongbao.com/wxitem/bdpic',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            console.log(res)
          }
        });
      }
    });
  },
  ossJude: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res.tempFilePaths[0]);
        wx.uploadFile({
          url: 'https://devwechat.aiyongbao.com/wxitem/osspic?shopId=90675',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            console.log(res)
          }
        });
      }
    });
  },
  judemsg:function(e){
    wx.request({
      url: 'https://devweb1688.aiyongbao.com/wx/msgJude',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        content:''
      },
      success(res) {
        console.log(res)//回掉session_key存到微信云端

      }
    }); 
  },
  getsys:function(e){
    wx.getSystemInfo({
      success:(res)=>{
        console.log(res)
      },
    })
  },
  wxpay:function(e){
    let app = getApp();
    api({
      url:'/wxpay/supplyOrder',
      params: { total_fee: '1', device_info: 'xcx', openid: app.globalData.userInfo.data.openId},
      callback:(rsp)=>{
        console.log(rsp)
        wx.requestPayment({
          package: rsp.package,
          paySign: rsp.paySign,
          nonceStr: rsp.nonceStr,
          signType: rsp.signType,
          timeStamp: rsp.timeStamp+'',
          success:(rsp)=>{
            console.log(rsp)
          },
          fail:(rsp)=>{
            console.warn(rsp)
          }
        });

      }
    });
  },
  cypay:function(e){
    let app = getApp();
    api({
      url: '/wxpay/test',
      params: { money: '30', openid: app.globalData.userInfo.data.openId },
      callback: (rsp) => {
        console.log(rsp)

      }
    });
  },
  navtoindex:function(e){
    navigate({
      url: '/pages/index/index',
      type: 'push'
    });
  },
  pay:function(e){
  },
  changeworld:function(e){
    this.setData({ dataFieldB:"china"});
  },
  helloclib:function(e){
    wx.setClipboardData({
      data: 'data',
      success(res) {
        wx.showToast({
          title: '你是真的皮',
          icon:'none'
        })
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  cloudf:function(e){
    cloud({ 
      name: 'shop_fund', 
      params:{
        type:'get',
        nick: '大金刚',
        shopId: 90657,
        shop_funds: 17800
      },
      callback:(res)=>{
        console.log(res)
      }
    })
  },
  // movchage:function(e){
  //   const { movV, ami } = this.data;
  //   let self = this;
  //   if(ami == 1){
  //     return;
  //   }
  //   const { x, y } = e.detail;
  //   let ind = e.currentTarget.dataset.index;
  //   this.ind = ind;
  //   this.x = x;
  //   this.y = y;
  //   // let newmoV = movV;
  //   // //换算为 90 90
  //   // for (let i in movV){
  //   //   if (i != ind){
  //   //     let culx = Math.abs(x - movV[i].x);
  //   //     let culy = Math.abs(y - movV[i].y);
  //   //     if(culx<46&&culy<46){
  //   //       //对换数据
  //   //       let able = movV[i];
  //   //       newmoV[i] = newmoV[ind];
  //   //       newmoV[ind] = able;
  //   //       this.setData({ movV: newmoV, ami:1});//暂时禁用
  //   //       setTimeout((e)=>{
  //   //         self.setData({ami: 0});
  //   //       },800)
  //   //       break;
  //   //     }
  //   //   }
  //   // }
  // },
  testgoods:function(e){
    // api({
    //   url: '/wx/itemDetail',
    //   params: {
    //     num_iid:'3175295',
    //   },
    //   callback: (res) => {
    //   }
    // });
    // return;
    api({
      url: '/wxgoods/pushgood',
      params: { 
        type: 'modi',//add 发布 modi 修改
        data:JSON.stringify({
          num_iid: '155358645890675',//modi必传
          shopId:'90675',//店铺ID
          shopName:'无敌大金刚',//店铺名字
          title:'测试商品8888',//主标题
          num:200,//库存
          isPush:1,//是否上架
          brandcat: 10986,//类目ID
          props_name:'品牌:Leaduu;颜色:三合一;',//各个sku的规格描述组合，分号分开
          tag_price: '666.00',//string标牌价
          list_price: '169.00',//标牌价
          cost_price: '169.00',//成本价
          pic_path: JSON.stringify([
            {
              "id": 0,
              "url": "wechat/90675/hello2019-03-20.jpeg",
              "show": "0"
            },
            {
              "id": 1,
              "url": "img/ibank/2019/583/112/10649211385_149261721.jpg",
              "show": ""
            }
          ]),//主图列表  商品修改中 id 即是顺序  show 即是是否展示
          description: JSON.stringify([{
            "id": 0,
            "url": "https://iyvchart.oss-cn-hangzhou.aliyuncs.com/wechat/90675/hello2019-03-20.jpeg",
            "show": "0"
          },
            {
              "id": 1,
              "url": "https://iyvchart.oss-cn-hangzhou.aliyuncs.com/wechat/90675/hello2019-03-20.jpeg",
              "show": "1"
            }
          ]),//详情描述，逻辑同上
          skus:JSON.stringify([
            {
              sku_title: "方头带瓶水壶;220",//sku标题，最好能与主商品prop_name对应
              sku_tag_price: '60.00',//sku划线价
              sku_list_price: '60.00',//sku标价
              sku_inventory: 200,//sku库存
              pic_path:'wechat/90675/hello2019-03-20.jpeg',//sku图片
              sku_id:'15535864589325',//商品skuID modi时必须传
            },
          ]),
        }),
      },
      callback: (res) => {
        console.log(res)
      }
    });
  },
  callbackmin:function(e){
    console.log(e)
    let data = e.detail.data;
  },
  // movend:function(e){
  //   const { movV, ami } = this.data;
  //   let self = this;
  //   const { x, y, ind } = this;
  //   let newmoV = movV;
  //   let flag = 1;
  //   //换算为 90 90
  //   for (let i in movV){
  //     if (i != ind){
  //       let culx = Math.abs(x - movV[i].x);
  //       let culy = Math.abs(y - movV[i].y);
  //       if(culx<46&&culy<46){
  //         //对换数据
  //         flag = 0;
  //         let able = movV[i];
  //         newmoV[i] = newmoV[ind];
  //         newmoV[ind] = able;
  //         this.setData({ movV: newmoV, ami:1});//暂时禁用
  //         setTimeout((e)=>{
  //           self.setData({ami: 0});
  //         },800)
  //         break;
  //       }
  //     }
  //   }
  //   if (flag){
  //     this.setData({ movV: newmoV, ami: 0 });
  //   }
  // },
  testmini:function(e){
    wx.navigateToMiniProgram({
      appId: 'wx08c77d4e3bb67d91',
      path: 'pages/index/index?vip=aiyong112233',
      envVersion: 'trial',
      success(res) {
        // 打开成功
      }
    })
  },
  getfund:function(e){
    let self = this;
    upCloudFund({
      type: 'get',
      nick: '我们曾经走过的路',
      shopId: JSON.stringify(115164+''),
      callback: (res) => {
        self.setData({ shopfund: res/100});
        console.log(res);
      }
    });
  },
  updatefund: function (e) {
    // upCloudFund({
    //   nick: '我们曾经走过的路',
    //   shopId: JSON.stringify(115164 + ''),
    //   shop_funds: 1293,
    // });
  },
  
})