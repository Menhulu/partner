//index.js
var QQMapWX = require('../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
var interval = "";
//获取应用实例
const app = getApp()
Page({
  data: {
    openid:"",
    showLoginModal: false,
    showDownloadModal: false,
    login_mobile: "",
    login_vercode: "",
    //login_vcode: "",
    //login_vcode_src: "https://events.jdcloud.com/VerifyCodeHandler.ashx?temp=jllz1wno",
    userInfo: {},
    getVcodeMsg: "获取验证码",
    getVcodeMsgBtn: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    img: {
      index_bg: "../imgs/index-bg.png",
      index_introduction: "../imgs/index-introduction.png",
      index_schedule: "../imgs/index-schedule.png",
      index_guest: "../imgs/index-guest.png",
      index_wx: "../imgs/index-wx.png",
      index_download: "../imgs/index-download.png",
      index_location: "../imgs/index-location.png",
      index_register: "../imgs/index-register.png",
      index_partner: "../imgs/index-partner.png",
      index_question: "../imgs/index_question.png",
    },
    loginBtn: false,
    questionLoginBtn: false
  },
  showLogin: function() {
    //查看是否登录过
    this.setData({
      loginBtn: true,
      questionLoginBtn: false,
    })
    var that = this;
    var sessionid = wx.getStorageSync("sessionid");
    if (sessionid) {
      wx.request({
        data: {},
        header: {
          'content-type': 'application/x-www-form-urlencoded', //这里注意POST请求content-type是小写，大写会报错  
          'cookie': sessionid//读取cookie
        },
        method: "POST",
        url: "https://events.jdcloud.com/login.ashx?act=checklogin",
        success(res) {
          if (res.data.ret == 1) {
            //获取用户信息
            //登录过直接跳登录展示页面
            wx.navigateTo({
              url: '../login/login'
            })
          } else {
            clearInterval(interval)
            that.setData({
              showLoginModal: true,
              getVcodeMsgBtn: false,
              getVcodeMsg: "获取验证码"
            })
          }
        }
      })
    } else {
      clearInterval(interval)
      this.setData({
        showLoginModal: true,
        getVcodeMsgBtn: false,
        getVcodeMsg: "获取验证码"
      })
    }
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideLoginModal: function() {
    this.setData({
      showLoginModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideLoginModal();
  },
  //关闭下载对话框
  closeDlDialog: function() {
    this.setData({
      showDownloadModal: false,
    });
  },
  /**
   * 对话框确认按钮点击登陆事件
   */
  onLogin: function(e) {
    this.hideLoginModal();

    var goto = e.currentTarget.dataset.goto;
    //校验数据
    var warnMsg = [];
    if (this.data.login_mobile == "") {
      warnMsg.push("请输入手机号")
    } else {
      if ((/^1[345789]\d{9}$/.test(this.data.login_mobile))) {} else {
        warnMsg.push("您输入的手机号格式错误")
      }
    }
    if (this.data.login_vercode == "") {
      warnMsg.push("请输入验证码")
    }
    if (warnMsg.length > 0) {
      wx.showModal({
        title: '提示',
        content: warnMsg.join("\r\n"),
      })
    } else {
      //调登陆接口
      var that = this;
       //获取openID
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          //获取用户信息
          if (res.code) {
            wx.request({
              url: "https://solutions.jdcloud.com/api/v1/partnerUser/getOpenId",
              data: {
                js_code: res.code
              },
              method: 'POST',
              success(userRes) {
                if (userRes.data.code == 200 && userRes.data.data.openid) {
                  that.setData({
                    openid: userRes.data.data.openid
                  });
                  //去登录
                  that.diLoginAction(goto)
                } else { }
              }
            })
          }
        }
      })
     
    }

  },

  //调登录接口
  diLoginAction: function (goto){
    var that = this;
    wx.request({
      data: {
        mobile: this.data.login_mobile,
        vercode: this.data.login_vercode,
        openid: this.data.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //这里注意POST请求content-type是小写，大写会报错  
      },
      method: "POST",
      url: "https://events.jdcloud.com/login.ashx?act=dologin",
      success(res) {
        if (res.data.ret == 1) {
          wx.setStorageSync("sessionid", res.header["Set-Cookie"])
          //判断跳转到登陆页面还是问卷调查
          if (goto == "login") {
            wx.navigateTo({
              url: '../login/login'
            })
          } else if (goto == "question") {
            wx.navigateTo({
              url: '../questionnaire/questionnaire'
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
          that.setData({
            showLoginModal: true
          });
        }
      }
    })

  },
  //获取手机号input值
  getPhoneValue: function(e) {
    this.setData({
      login_mobile: e.detail.value
    })
  },
  //获取手机号验证码
  getVcodeValue: function(e) {
    this.setData({
      login_vercode: e.detail.value
    })
  },
  //获取图片验证码
  getImgVcodeValue: function(e) {
    this.setData({
      login_vcode: e.detail.value
    })
  },
  //发送手机验证码
  sendLoginVCode: function() {
    //手机号获取注册验证码
    //先验证手机号
    if (this.data.login_mobile == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      if ((/^1[345789]\d{9}$/.test(this.data.login_mobile))) {
        var that = this;
        //发送验证码
        wx.request({
          data: {
            mobile: this.data.login_mobile
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //这里注意POST请求content-type是小写，大写会报错  
          },
          method: "POST",
          url: "https://events.jdcloud.com/valcode.ashx?act=sendval2",
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
              interval = setInterval(function() {
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
  //获取图片验证码
  sendImgLoginVCode: function() {
    var temp = new Date().getTime().toString(36);
    this.setData({
      login_vcode_src: "https://events.jdcloud.com/VerifyCodeHandler.ashx?temp=" + temp
    })
  },
  //事件处理函数
  bindViewTap: function(event) {

    if (event.currentTarget.dataset.index) {
      const index = event.currentTarget.dataset.index;
      if (index == 0) {
        wx.navigateTo({
          url: '../introduction/introduction'
        })
      } else if (index == 1) {
        wx.navigateTo({
          url: '../schedule/schedule'
        })
      } else if (index == 2) {
        // this.setData({
        //   showDownloadModal: true
        // })
        wx.navigateTo({
          url: '../guest/guest'
        })
      } else if (index == 3) {
        wx.navigateTo({
          url: '../download/download'
        })
      } else if (index == 4) {
        var that = this;
        wx.getLocation({
          type: 'wgs84',
          success: function(res) {
            console.log(res)
            var latitude1 = res.latitude
            var longitude1 = res.longitude
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: latitude1,
                longitude: longitude1
              },
              success: function(res) {
                console.log(res);
                var add = res.result.address
                that.setData({
                  wd: latitude1,
                  jd: longitude1,
                  address: add
                })
                wx.openLocation({
                  longitude: 116.4593310000,
                  latitude: 39.9101850000,
                  name: "北京中国大饭店（北京市朝阳区建国门外大街1号）",
                })
              }
            })
          },
          fail: function(res) {
            wx.getSetting({
              success: (response) => {
                if (!response.authSetting['scope.userLocation']) {
                  //用户不同意获取用户信息，提示并打开设置
                  wx.openSetting({
                    success: (res) => {}
                  })
                } else {}
              }
            })
          }
        });
      } else if (index == 5) {
        wx.navigateTo({
          url: '../partner/partner'
        })
      } else if (index == 6) {
        // wx.navigateTo({
        //   url: '../register/register'
        // })
      } else if (index == 7) {
        //查看是否登录过
        // this.setData({
        //   loginBtn: false,
        //   questionLoginBtn: true,
        // })
        // let sessionid = wx.getStorageSync("sessionid");
        // var that = this;
        // if (sessionid) {
        //   wx.request({
        //     data: {},
        //     header: {
        //       'content-type': 'application/x-www-form-urlencoded', //这里注意POST请求content-type是小写，大写会报错  
        //       'cookie': sessionid//读取cookie
        //     },
        //     method: "POST",
        //     url: "https://events.jdcloud.com/login.ashx?act=checklogin",
        //     success(res) {
        //       if (res.data.ret == 1) {
        //         //获取用户信息
        //         //登录过直接跳登录展示页面
        //         wx.navigateTo({
        //           url: '../questionnaire/questionnaire'
        //         })
        //       } else {
        //         clearInterval(interval)
        //         that.setData({
        //           showLoginModal: true,
        //           getVcodeMsgBtn: false,
        //           getVcodeMsg: "获取验证码"
        //         })
        //       }
        //     }
        //   }) 
        // } else {
        //   clearInterval(interval)
        //   that.setData({
        //     showLoginModal: true,
        //     getVcodeMsgBtn: false,
        //     getVcodeMsg: "获取验证码"
        //   })
        // }
      } else if (index == 8){
        wx.navigateTo({
          url: '../live/live'
        })
      }else{

      }
    } else {}
  },
  bindGetUserInfo: function(e) {
    wx.getSetting({
      success: (response) => {
        // if (!response.authSetting['scope.userInfo']) {
        // } else {
        // }
        //跳转到页面
        wx.navigateTo({
          url: '../introduction/introduction'
        })
      }
    })

  },
  onLoad: function(option) {
    if (option.showLogin == "true"){
      clearInterval(interval)
      this.setData({
        showLoginModal: true,
        getVcodeMsgBtn: false,
        getVcodeMsg: "获取验证码"
      })
      if (option.loginBtn == "true"){
        this.setData({
          loginBtn: true,
          questionLoginBtn: false,
        })
      } else if (option.questionLoginBtn == "true"){
        this.setData({
          loginBtn: false,
          questionLoginBtn: true,
        })
      }
    }else{
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '26UBZ-U4I66-YXQSY-MLDW6-QG6K7-UJBLV'
    });
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})