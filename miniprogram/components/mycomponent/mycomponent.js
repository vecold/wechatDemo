// components/component-tag-name.js
var myBehavior = require('mybehavior')
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [myBehavior],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    propa: {
      type: String
    },
    propB: {
      type: String
    },
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    myProperty2: String // 简化的定义方式
  },
  
  data: {}, // 私有数据，可用于模版渲染
  /**
   * 组件的初始数据
   */

  /**
   * 组件的方法列表
   */
  methods: {
    // 内部方法建议以下划线开头
    _myPrivateMethod: function (event) {
      console.log(event.currentTarget.dataset.type)
      this.setData({
        propa: 'myPrivateData'
      })
    },
    _onTap: function (){
        let myEventDetail = {} // detail对象，提供给事件监听函数
        let myEventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    _changeBe:function(){
      this.setData({ myBehaviorData: '董卓吕布' });
    },
    _tapOne:function(e){
      console.log(e);
      console.log(this.data);
      console.log(this.properties)
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
  },
  created: function(e){
    //不可执行setData
    console.log('created')
    console.log(this.data);
    console.log(this.properties)
  },
  attached: function (e) {
    console.log('com_attached')
  },
  ready: function (e) {
    console.log('ready')
    console.log(this.data);
    console.log(this.properties)
  },
  moved: function (e) {
    console.log('moved')
  }, 
  detached: function(e) {
    console.log('detached')
  },
})
