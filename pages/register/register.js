// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registerSuc: false,
    registerLutan: "",
    registerErcode: "",
    form: {
      uname: "",
      company: "",
      postions: "",
      industry: "",
      luntan: "",
      email: "",
      mobile: "",
      valcode: "",
    },
    getVcodeMsg:"获取验证码",
    getVcodeMsgBtn: false,
    postions_list: ['董事长/总裁/总经理', '技术总监', '技术经理', 'CIO/CTO', 'CFO', 'CXO', '业务总监/经理', '政府官员', '个人开发者', '老师', '学生', '其他'],
    industries: ['IT_通信_电子_互联网', '金融业', '房地产_建筑业', '商业服务', '贸易_批发_零售_租赁业', '生产_加工_制造金融业', '交通_运输_物流_仓储房地产_建筑业', '服务业', '文化_传媒_娱乐_体育', '能源_矿产_环保', '政府_非盈利机构', '农_林_牧_渔_其他'],
    luntans: ['分论坛一：创无限 ▪ 智能营销', '分论坛二：创无限 ▪ 智能物联', '分论坛三：创无限 ▪ 人工智能', '分论坛四：创无限 ▪ 智能城市'],
    dataValid: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //获取用户姓名
  getNameValue: function (e) {
    var uname = 'form.uname';
    this.setData({
      [uname]: e.detail.value
    })
  },
  //获取公司名称
  getCompanyValue: function (e) {
    var company = 'form.company';
    this.setData({
      [company]: e.detail.value
    })
  },
  //获取职位
  getPostionsValue: function (e) {
    var postions = 'form.postions';
    this.setData({
      postions_index: e.detail.value,
      [postions]: this.data.postions_list[e.detail.value]
    })
  },
  //获取所属行业
  getIndustryValue: function (e) {
    var industry = 'form.industry';
    this.setData({
      industryIndex: e.detail.value,
      [industry]: this.data.industries[e.detail.value]
    })
  },
  //获取分论坛
  getLuntanValue: function (e) {
    var luntan = 'form.luntan';
    this.setData({
      luntanIndex: e.detail.value,
      [luntan]: this.data.luntans[e.detail.value]
    })
  },
  //获取邮箱
  getEmailValue: function (e) {
    var email = 'form.email';
    this.setData({
      [email]: e.detail.value
    })
  },
  //获取手机号input值
  getPhoneValue: function (e) {
    var mobile = 'form.mobile';
    this.setData({
      [mobile]: e.detail.value
    })
  },
  //获取手机号验证码
  getVcodeValue: function (e) {
    var valcode = 'form.valcode';
    this.setData({
      [valcode]: e.detail.value
    })
  },
  sendVCode: function () {
    //手机号获取注册验证码
    //先验证手机号
    if (this.data.form.mobile == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      if ((/^1[345789]\d{9}$/.test(this.data.form.mobile))) {
        //发送验证码
        var that = this;
        wx.request({
          data: {
            mobile: this.data.form.mobile
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'  //这里注意POST请求content-type是小写，大写会报错  
          },
          method: "POST",
          url: "https://events.jdcloud.com/valcode.ashx?act=sendval",
          success(res) {
            if (res.data.ret == 1) {
              wx.showToast({
                title: '验证码已发送，请注意查收短信',
                icon: 'none',
                duration: 3000
              })
              //倒计时
              var time = 61;
              that.setData({
                getVcodeMsgBtn: true
              })
              var interval = setInterval(function () {
                time--;
                that.setData({
                  getVcodeMsg: time + '秒后重新发送'
                })
                if (time <= 0) {
                  clearInterval(interval)
                  that.setData({
                    getVcodeMsgBtn: false,
                    getVcodeMsg: "获取验证码"
                  })
                }
              }, 1000)  
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
          title: '手机号格式错误',
          icon: 'none',
          duration: 3000
        })
      }
    }
  },
  validFormData: function (data) {
    var dataWarning = [];
    var flag = 0;
    if (data.uname == "") {
      flag = 1;
      dataWarning.push("请填写姓名");
    }
    if (data.company == "") {
      flag = 1;
      dataWarning.push("请填写公司名称");
    }
    if (data.postions == "") {
      flag = 1;
      dataWarning.push("请填写职位");
    }
    if (data.industry == "") {
      flag = 1;
      dataWarning.push("请填写所属行业");
    }
    if (data.luntan == "") {
      flag = 1;
      dataWarning.push("请填写分论坛");
    }
    if (data.email == "") {
      flag = 1;
      dataWarning.push("请填写邮箱");
    } else {
      if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(data.email)) {
      } else {
        flag = 1;
        dataWarning.push("邮箱格式错误");
      }
    }
    if (data.mobile == "") {
      flag = 1;
      dataWarning.push("请填写手机");
    } else {
      if ((/^1[345789]\d{9}$/.test(data.mobile))) {
      } else {
        flag = 1;
        dataWarning.push("手机号格式错误");
      }
    }
    if (data.valcode == "") {
      flag = 1;
      dataWarning.push("请填写验证码");
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
  formSubmit: function (e) {
    var that = this;
    //校验数据格式
    this.validFormData(this.data.form);
    if (this.data.dataValid) {
      //数据有效
      //提交表单数据
      wx.request({
        data: {
          data: JSON.stringify(this.data.form)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'  //这里注意POST请求content-type是小写，大写会报错  
        },
        method: "POST",
        url: "https://events.jdcloud.com/handler.ashx?act=add&source=ZJJTBI",
        success(res) {
          if (res.data.ret == 1) {
            wx.showToast({
              title: "注册成功",
              icon: 'none',
              duration: 3000
            })
            that.setData({
              registerSuc: true
            })
            wx.request({
              data: {
                code: res.data.msg
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'  //这里注意POST请求content-type是小写，大写会报错  
              },
              method: "POST",
              url: "https://events.jdcloud.com/handler.ashx?act=view",
              success(res) {
                if (res.data.length > 0) {
                  that.setData({
                    registerLutan: res.data[0].LunTan,
                    registerErcode: "https://events.jdcloud.com" + res.data[0].QrCode,
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
          }
        }
      })
    } else {
    }
  },
})