// components/piccom/piccom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imagePath: String // 简化的定义方式
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultpath:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageload: function (e) {
      console.log(e)
      let width = e.detail.width;
      let height = e.detail.height;
      width = 750;
      height = height * 750/width;
      this.setData({  width: width, height: height})
    }
  },
  created: function(e){
  },
  attached: function (e) {
    
  },
  
})
