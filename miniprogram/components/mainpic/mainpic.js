// components/mainpic/mainpic.js
import {  IsEmpty } from '../../public/tools/index.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    picList: {
      type: String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    movV: [{ index: -1, x: 25, y: 15 }],
    ami:0,
    count:0
  },
  
  attached: function (e) {
    const { picList } = this.data;
    if (IsEmpty(picList) || JSON.parse(picList).length==0){
      return;
    }
    let newpic = JSON.parse(picList);
    let finalmov = [];
    for (let i in newpic) {
      let b = i;
      let obj = {};
      if (b < 4) {
        obj = {
          index: b,
          x: 25 + b * 95,
          y: 15,
          url: 'https://iyvchart.oss-cn-hangzhou.aliyuncs.com/'+newpic[i].url
        }
      } else {
        obj = {
          index: b,
          x: 25,
          y: 120,
          url: 'https://iyvchart.oss-cn-hangzhou.aliyuncs.com/'+newpic[i].url
        }
      }
      finalmov.push(obj);
    }

    let length = finalmov.length;
    if (finalmov.length < 5) {
      let obj = {}
      if (finalmov.length < 4) {
        obj = {
          index: -1,
          x: 25 + finalmov.length * 95,
          y: 15,
        }
      } else {
        obj = {
          index: -1,
          x: 25,
          y: 120,
        }
      }
      finalmov.push(obj);
    }
    this.callbakcmain(finalmov);
    this.setData({ movV: finalmov, count: length })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    compare:function(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    delpic:function(e){
      const { movV, count } = this.data;
      let index = e.currentTarget.dataset.type;//下标
      let ind = movV[index].index;//真的ind
      //遍历替换删除添加
      let newmov = [];
      for (let i in movV){
        if (movV[i].index!=-1){
          newmov.push(movV[i]);
        }
      }//没有最后一张的数组
      //按照index 排序，可以对应上下标
      newmov = newmov.sort(this.compare('index'));
      //删除当前选择一张，重新排序
      newmov.splice(ind,1);
      let finalmov = [];
      for (let i in newmov) {
        let b = i;
        let obj = {};
        if (b < 4) {
          obj = {
            index: b,
            x: 25 + b * 95,
            y: 15,
            url: newmov[i].url
          }
        } else {
          obj = {
            index: b,
            x: 25,
            y: 120,
            url: newmov[i].url
          }
        } 
        finalmov.push(obj);
      }

      let length = finalmov.length;
      if (finalmov.length < 5) {
        let obj = {}
        if (finalmov.length < 4) {
          obj = {
            index: -1,
            x: 25 + finalmov.length * 95,
            y: 15,
          }
        } else {
          obj = {
            index: -1,
            x: 25,
            y: 120,
          }
        }
        finalmov.push(obj);
      }
      this.callbakcmain(finalmov);
      this.setData({ movV: finalmov, count: length})
    }, 
    callbakcmain:function(movV){
      let newmov = [];
      for (let i in movV) {
        if (movV[i].index != -1) {
          newmov.push(movV[i]);
        }
      }//没有最后一张的数组
      newmov = newmov.sort(this.compare('index'));
      this.triggerEvent('callback', { data: newmov }, {});
    }, 
    chooseImg:function(e){
      let self = this;
      const { count, movV } = this.data;
      wx.chooseImage({
        count: 5 - count,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log(res.tempFilePaths);
          let path = res.tempFilePaths;
          let movarr = movV;
          movarr.pop();
          let length = movarr.length;
          for (let i in path){
            let b = length + parseInt(i);
            let obj = {};
            if (b<4){
              obj = {
                index: b,
                x: 25 + b*95,
                y: 15,
                url: path[i]
              }
            }else{
              obj = {
                index: b,
                x: 25,
                y: 120,
                url: path[i]
              }
            }
            movarr.push(obj);
          }
          
          length = movarr.length;
          if (movarr.length<5){
            let obj = {}
            if (movarr.length < 4) {
              obj = {
                index: -1,
                x: 25 + movarr.length * 95,
                y: 15,
              }
            } else {
              obj = {
                index: -1,
                x: 25,
                y: 120,
              }
            }
            movarr.push(obj);
          }
          self.callbakcmain(movarr);
          self.setData({ movV: movarr, count: length});
        }
      });
    },
    movchage: function (e) {
      const { movV, ami } = this.data;
      let self = this;
      if (ami == 1) {
        return;
      }
      const { x, y } = e.detail;
      let ind = e.currentTarget.dataset.index;
      this.ind = ind;
      this.x = x;
      this.y = y;
    },
    movend: function (e) {
      const { movV, ami } = this.data;
      let self = this;
      const { x, y, ind } = this;
      let newmoV = movV;
      let flag = 1;
      //换算为 90 90
      for (let i in movV) {
        if (i != ind && movV[i].index!=-1) {
          let culx = Math.abs(x - movV[i].x);
          let culy = Math.abs(y - movV[i].y);
          if (culx < 46 && culy < 46) {
            //对换数据
            flag = 0;
            let able = JSON.parse(JSON.stringify(movV));
            newmoV[i].x = able[ind].x;
            newmoV[i].y = able[ind].y;
            newmoV[i].index = able[ind].index;
            newmoV[ind].x = able[i].x;
            newmoV[ind].y = able[i].y;
            newmoV[ind].index = able[i].index;
            // newmoV[ind] = able;
            this.setData({ movV: newmoV, ami: 1 });//暂时禁用
            setTimeout((e) => {
              self.setData({ ami: 0 });
            }, 800)
            break;
          }
        }
      }
      if (flag) {
        this.setData({ movV: newmoV, ami: 0 });
      }
      self.callbakcmain(newmoV);
    }
  }
})
