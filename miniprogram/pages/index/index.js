//index.js
const app = getApp()
var cm = require('../../biz/login.js')//引用JS
import { navigate, checkAuth,api } from '../../public/tools/index.js'
const regeneratorRuntime = require('../../public/tools/ren.js')
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: '',
    auth:0,
  
  },

  onLoad: function(opionts) {
    console.log(opionts)
    api({
      url: '/wx/getmemberId',
      params: {
        num_iid: '558623004775'
      },
      callback: (res) => {
        console.log(res);
      }
    });
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // this.setData({ avatarUrl: app.globalData.userInfo.data.avatarUrl,auth:1});
    checkAuth(0,(res)=>{
      this.setData({ avatarUrl: app.globalData.userInfo.data.avatarUrl, auth: 1 });
    });
  
  },
  
  showDemo: function (e){
    let demo = e.currentTarget.dataset.demo;
    let text = '' ;
    if (demo=='18'){
      navigate({
        url: '/pages/backtest/backtest',
        type: 'push'
      });
      return
    }
    switch(demo){
      case '1':
        text = '条件渲染';
      break;
      case '2':
        text = 'wsx';
      break;
      case '3':
        text = '自定义组件';
      break;
    }
    navigate({
      url: '/pages/chooseLib/chooseLib',
      params: { tem: demo, text: text}, 
      type:'push'
    });
  }
})
