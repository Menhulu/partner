// pages/ques_address/ques_address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
    hideTips: false,
    openId: "",
    form: {
      sessionid: "",
      openId: "",
      name: "",
      phone: "",
      area: "",
      detailAddress: ""
    },
    dataValid: false,
    alreadyConfirm: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      openId: options.openId
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var area = 'form.area';
    this.setData({
      region: e.detail.value,
      [area]: e.detail.value[0] + e.detail.value[1] + e.detail.value[2],
      hideTips: true
    })
  },
  //获取input
  getInputValue: function(e) {
    var val = e.currentTarget.dataset.val;
    if (val == "name") {
      var name = 'form.name';
      this.setData({
        [name]: e.detail.value
      })
    } else if (val == "phone") {
      var phone = 'form.phone';
      this.setData({
        [phone]: e.detail.value
      })
    } else if (val == "detail") {
      var detailAddress = 'form.detailAddress';
      this.setData({
        [detailAddress]: e.detail.value
      })
    } else {}
  },
  validFormData: function(data) {
    var dataWarning = [];
    var flag = 0;
    if (data.name == "") {
      flag = 1;
      dataWarning.push("请填写收货人");
    }
    if (data.phone == "") {
      flag = 1;
      dataWarning.push("请填写手机号码");
    } else {
      if ((/^1[345789]\d{9}$/.test(data.phone))) {} else {
        flag = 1;
        dataWarning.push("手机号格式错误");
      }
    }
    if (data.area == "") {
      flag = 1;
      dataWarning.push("请填写所在地区");
    }
    if (data.detailAddress == "") {
      flag = 1;
      dataWarning.push("请填写详细地址");
    }
    if (flag == 1) {
      this.setData({
        dataValid: false
      })
      wx.showModal({
        title: '提示',
        content: dataWarning.join("\r\n"),
      })
    } else {
      this.setData({
        dataValid: true
      })
    }
  },
  confirmForm: function() {
    var that = this;
    //校验数据格式
    this.validFormData(this.data.form);
    if (this.data.dataValid) {
      this.setData({
        alreadyConfirm: true
      })
      //获取sessionid
      var sessionid = wx.getStorageSync("sessionid");

      this.setData({
        alreadyConfirm: true
      })
      wx.request({
        data: {
          cookie: sessionid,
          openId: that.data.openId,
          name: that.data.form.name,
          phone: that.data.form.phone,
          address: that.data.form.area + that.data.form.detailAddress,
        },
        method: "POST",
        url: "https://solutions.jdcloud.com/api/v1/partner/questionUserAddress/",
        //url: "http://localhost:30008/api/v1/partner/questionUserAddress/",
        success(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '保存成功',
              icon: 'none',
              duration: 3000
            })
            setTimeout(function() {
              wx.redirectTo({
                url: '../index/index'
              })
            }, 2000);
          } else if (res.data.code == 401) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
            setTimeout(function() {
              wx.navigateTo({
                url: '../index/index?showLogin=true&questionLoginBtn=true'
              })
            }, 2000);
          } else {}
        }
      })
    } else {

    }

  },
})