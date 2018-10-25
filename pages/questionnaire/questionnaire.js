// pages/questionnaire/questionnaire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      openid: ""
    },
    alreadyChoose: false,
    form: {
      cookie: "",
      openId: "",
      name: "",
      phone: "",
      company: "",
      email: "",
      position: "",
      part: "",
      time: "",
      industry: "",
      advice: "",
    },
    dataValid: false,
    showConfirmModal: false,
    alreadyConfirm: false,
    positionList: [{
        "value": "董事长/总裁/总经理",
        "checked": false
      },
      {
        "value": "技术经理",
        "checked": false
      },
      {
        "value": "CIO/CTO",
        "checked": false
      },
      {
        "value": "业务总监/经理",
        "checked": false
      },
      {
        "value": "CFO",
        "checked": false
      },
      {
        "value": "老师",
        "checked": false
      },
      {
        "value": "CXO",
        "checked": false
      },
      {
        "value": "个人开发者",
        "checked": false
      },
      {
        "value": "政府官员",
        "checked": false
      },
      {
        "value": "学生",
        "checked": false
      },
      {
        "value": "技术总监",
        "checked": false
      },
      {
        "value": "其他",
        "checked": false
      }
    ],
    partList: [{
        "value": "网站",
        "checked": false
      },
      {
        "value": "供应链云",
        "checked": false
      },
      {
        "value": "云灾备",
        "checked": false
      },
      {
        "value": "营销云",
        "checked": false
      },
      {
        "value": "混合云",
        "checked": false
      },
      {
        "value": "中小企业云",
        "checked": false
      },
      {
        "value": "DevOps",
        "checked": false
      },
      {
        "value": "产业云",
        "checked": false
      },
      {
        "value": "大数据",
        "checked": false
      },
      {
        "value": "电商云",
        "checked": false
      },
      {
        "value": "视频及内容分发",
        "checked": false
      },
      {
        "value": "金蝶智慧记",
        "checked": false
      },
      {
        "value": "移动办公",
        "checked": false
      },
      {
        "value": "智能客服",
        "checked": false
      },
      {
        "value": "其他",
        "checked": false
      },
    ],
    timeList: [{
      "value": "1-3个月",
      "checked": false
    }, {
      "value": "3-6个月",
      "checked": false
    }, {
      "value": "6-12个月",
      "checked": false
    }, {
      "value": "12个月以上",
      "checked": false
    }, ],
    industryList: [{
      "value": "互联网",
      "checked": false
    }, {
      "value": "制造",
      "checked": false
    }, {
      "value": "IT",
      "checked": false
    }, {
      "value": "物流",
      "checked": false
    }, {
      "value": "通信",
      "checked": false
    }, {
      "value": "医疗",
      "checked": false
    }, {
      "value": "金融",
      "checked": false
    }, {
      "value": "教育",
      "checked": false
    }, {
      "value": "广告",
      "checked": false
    }, {
      "value": "政府公共事业",
      "checked": false
    }, {
      "value": "零售",
      "checked": false
    }, {
      "value": "其他",
      "checked": false
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // //计算中奖率
    // let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // let win = 0;
    // let lose = 0;
    // console.log(nums);
    // for (let index = 0; index < 99; index++) {
    //   nums.sort(function() {
    //     return (0.5 - Math.random());
    //   })
    //   console.log(index + "----" + nums);
    //   if (nums[0] == 0) {
    //     win++;
    //   } else {
    //     lose++;
    //   }
    // }
    // console.log("win--------------" + win);
    // console.log("lose--------------" + lose);

    var that = this;
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
                var openId = 'form.openId';
                that.setData({
                  [openId]: userRes.data.data.openid
                });
                //查询问卷活动结果
                wx.request({
                  method: "GET",
                  url: "https://solutions.jdcloud.com/api/v1/partner/questionUser/" + that.data.form.openId,
                  //url: "http://localhost:30008/api/v1/partner/questionUser/" + that.data.form.openId,
                  success(vres) {
                    if (vres.data.code == 200 && vres.data.data && vres.data.data.length > 0) {
                      //已经参加过
                      that.setData({
                        alreadyChoose: true,
                        form: vres.data.data[0]
                      });
                      //反选数据处理
                      var radioList = [{
                          key: "position",
                          val: that.data.positionList
                        }, {
                          key: "part",
                          val: that.data.partList
                        },
                        {
                          key: "time",
                          val: that.data.timeList
                        }, {
                          key: "industry",
                          val: that.data.industryList
                        }
                      ];
                      radioList.forEach(function(currentValue, index, arr) {
                        if (currentValue.key == "position") {
                          for (var subIndex = 0; subIndex < currentValue.val.length; subIndex++) {
                            if (currentValue.val[subIndex].value == that.data.form.position) {
                              var itemCheck = "positionList[" + subIndex + "].checked";
                              that.setData({
                                [itemCheck]: true
                              });
                            } else {}
                          }
                        } else if (currentValue.key == "part") {
                          for (var subIndex = 0; subIndex < currentValue.val.length; subIndex++) {
                            if (currentValue.val[subIndex].value == that.data.form.part) {
                              var itemCheck = "partList[" + subIndex + "].checked";
                              that.setData({
                                [itemCheck]: true
                              });
                            } else {}
                          }

                        } else if (currentValue.key == "time") {
                          for (var subIndex = 0; subIndex < currentValue.val.length; subIndex++) {
                            if (currentValue.val[subIndex].value == that.data.form.time) {
                              var itemCheck = "timeList[" + subIndex + "].checked";
                              that.setData({
                                [itemCheck]: true
                              });
                            } else {}
                          }

                        } else if (currentValue.key == "industry") {
                          for (var subIndex = 0; subIndex < currentValue.val.length; subIndex++) {
                            if (currentValue.val[subIndex].value == that.data.form.industry) {
                              var itemCheck = "industryList[" + subIndex + "].checked";
                              that.setData({
                                [itemCheck]: true
                              });
                            } else {}
                          }
                        }
                      })
                    } else {
                      that.setData({
                        alreadyChoose: false
                      })
                    }
                  }
                })
              } else {}
            }
          })
        }
      }
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
    } else if (val == "company") {
      var company = 'form.company';
      this.setData({
        [company]: e.detail.value
      })
    } else if (val == "email") {
      var email = 'form.email';
      this.setData({
        [email]: e.detail.value
      })
    } else {}
  },
  //获取radio值
  radioChange: function(e) {
    var val = e.currentTarget.dataset.val;
    if (val == "position") {
      var position = 'form.position';
      this.setData({
        [position]: e.detail.value
      })
    } else if (val == "part") {
      var part = 'form.part';
      this.setData({
        [part]: e.detail.value
      })
    } else if (val == "time") {
      var time = 'form.time';
      this.setData({
        [time]: e.detail.value
      })
    } else if (val == "industry") {
      var industry = 'form.industry';
      this.setData({
        [industry]: e.detail.value
      })
    } else {}
  },
  //获取textarea的值
  bindTextAreaBlur: function(e) {
    var advice = 'form.advice';
    this.setData({
      [advice]: e.detail.value
    })
  },
  validFormData: function(data) {
    var dataWarning = [];
    var flag = 0;
    if (data.name == "") {
      flag = 1;
      dataWarning.push("请填写姓名");
    }
    if (data.phone == "") {
      flag = 1;
      dataWarning.push("请填写手机");
    } else {
      if ((/^1[345789]\d{9}$/.test(data.phone))) {} else {
        flag = 1;
        dataWarning.push("手机号格式错误");
      }
    }
    if (data.company == "") {
      flag = 1;
      dataWarning.push("请填写公司名称");
    }
    if (data.email == "") {
      flag = 1;
      dataWarning.push("请填写邮箱");
    } else {
      if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(data.email)) {} else {
        flag = 1;
        dataWarning.push("邮箱格式错误");
      }
    }
    if (data.position == "") {
      flag = 1;
      dataWarning.push("请选择职务");
    }
    if (data.time == "") {
      flag = 1;
      dataWarning.push("请选择何时部署");
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
      var cookie = 'form.cookie';
      this.setData({
        [cookie]: sessionid
      })
      this.setData({
        alreadyConfirm: true
      })
      wx.request({
        data: this.data.form,
        method: "POST",
        url: "https://solutions.jdcloud.com/api/v1/partner/questionUser/",
        //url: "http://localhost:30008/api/v1/partner/questionUser/",
        success(res) {
          if (res.data.code == 200 && res.data.data.length > 0) {
            if (res.data.data[0].win == "1") {
              //中奖情况
              wx.navigateTo({
                url: '../ques_address/ques_address?openId=' + that.data.form.openId
              })
            } else {
              //未中奖情况
              that.setData({
                showConfirmModal: true,
              })
            }
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
    } else {}
  },
  //关闭对话框,去下载
  closeDlDialog: function() {
    this.setData({
      showConfirmModal: false,
    });
    wx.navigateTo({
      url: '../download/download'
    })
  },
  //关闭对话框，取消
  closeDlDialog: function() {
    this.setData({
      showConfirmModal: false,
    });
    wx.navigateTo({
      url: '../index/index'
    })
  },
  //打开对话框
  openDlDialog: function() {
    this.setData({
      alreadyConfirm: true
    })
    this.setData({
      showConfirmModal: true,
    });
  }
})