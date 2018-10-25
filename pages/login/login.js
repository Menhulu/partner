// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    ercodeSrc: ""
  },
  //检查登录
  checkLogin: function () {
    var that = this;
    //调登陆接口
    wx.request({
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded', //这里注意POST请求content-type是小写，大写会报错  
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      method: "POST",
      url: "https://events.jdcloud.com/login.ashx?act=checklogin",
      success(res) {
        if (res.data.ret == 1) {
          //获取用户信息
          wx.request({
            data: {},
            header: {
              'content-type': 'application/x-www-form-urlencoded',  //这里注意POST请求content-type是小写，大写会报错  
              'cookie': wx.getStorageSync("sessionid")//读取cookie
            },
            method: "POST",
            url: "https://events.jdcloud.com/handler.ashx?act=view2",
            success(res) {
              if (res.data.length > 0) {
                //获取用户信息
                that.setData({
                  userInfo: res.data[0],
                  ercodeSrc: "https://events.jdcloud.com" + res.data[0].QrCode
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 3000
                })
              }
            }
          })

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
          wx.navigateTo({
            url: '../index/index?showLogin=true&loginBtn=true'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  logOut:function(){
    wx.removeStorageSync("sessionid")
    wx.navigateBack();
  }
})