// components/acom/acom.js
var myBehavior = require('../mycomponent/mybehavior.js')
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [myBehavior],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _changeBe: function () {
      this.setData({ myBehaviorData: '吕布奉先' });
    }
  }
})
