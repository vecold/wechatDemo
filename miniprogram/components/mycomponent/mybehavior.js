// my-behavior.js
module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  data: {
    myBehaviorData: '丁原吕布'
  },
  attached: function () { console.log('Behavior_attached') },
  methods: {
    myBehaviorMethod: function () { 
      console.log('myBehaviorMethod') 
    }
  }
})

//一个通用的模块，Behavior可以引用Behavior，一个组件/页面也可引用多个Behavior，方法重复已最后引入的方法为准，生命周期一次执行