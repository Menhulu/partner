// pages/introduction/introduction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      openid: ""
    },
    currentVideo: {},
    video_list: [],
    video_form: {
      company: "",
      phone: "",
      openId: ""
    }, //表单数据
    alreadyChoose: false,
    showConfirmModal: false,
    alreadyConfirm:false,
    items: [{
        name: 'Intel',
        value: '京东云xIntel',
        checked: false
      }, {
        name: 'Smart',
        value: '京东云xSMART',
        checked: false
      },
      {
        name: 'Nielsen',
        value: '京东云x尼尔森网联',
        checked: false
      },
      {
        name: 'Shopex',
        value: '京东云x商派',
        checked: false
      },
      {
        name: 'Percent',
        value: '京东云x百分点',
        checked: false
      },
      {
        name: 'Mapgoo',
        value: '京东云x麦谷科技',
        checked: false
      },
      {
        name: 'TalkingData',
        value: '京东云xTalkingData',
        checked: false
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     //获取用户信息
    //     if (res.code) {
    //       wx.request({
    //         url: "https://solutions.jdcloud.com/api/v1/partnerUser/getOpenId",
    //         data: {
    //           js_code: res.code
    //         },
    //         method: 'POST',
    //         success(userRes) {
    //           if (userRes.data.code == 200 && userRes.data.data.openid) {
    //             var openid = 'userInfo.openid';
    //             that.setData({
    //               [openid]: userRes.data.data.openid
    //             });
    //             //查询视频活动结果
    //             wx.request({
    //               method: "GET",
    //               url: "https://solutions.jdcloud.com/api/v1/partnerUser/" + that.data.userInfo.openid,
    //               success(vres) {
    //                 if (vres.data.code == 200 && vres.data.data && vres.data.data.length > 0) {
    //                   //已经选过视频
    //                   that.setData({
    //                     alreadyChoose: true
    //                   })
    //                   for (var index = 0; index < that.data.items.length; index++) {
    //                     if (that.data.items[index].name == vres.data.data[0].video_value) {
    //                       var itemCheck = "items[" + index + "].checked";
    //                       that.setData({
    //                         [itemCheck]: true
    //                       });
    //                     } else {}
    //                   }
    //                 } else {
    //                   that.setData({
    //                     alreadyChoose: false
    //                   })
    //                 }
    //               }
    //             })
    //           } else {}
    //         }
    //       })
    //     }
    //   }
    // })

    //生成随机视频数组序列
    var my_video_list = [{
        src: "https://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/Intel.mp4",
        img_src: "http://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E8%258B%25B1%25E7%2589%25B9%25E5%25B0%2594.jpg",
        title: "京东云 x Intel"
      },
      {
        src: "https://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E7%2599%25BE%25E5%2588%2586%25E7%2582%25B9%25282%2529.mp4",
        img_src: "http://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E7%2599%25BE%25E5%2588%2586%25E7%2582%25B9.jpg",
        title: "京东云 x 百分点"
      },
      {
        src: "https://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E9%25BA%25A6%25E8%25B0%25B7%25E7%25A7%2591%25E6%258A%2580%25281%2529.mp4",
        img_src: "http://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E9%25BA%25A6%25E8%25B0%25B7%25E7%25A7%2591%25E6%258A%2580.jpg",
        title: "京东云 x 麦谷科技"
      },
      {
        src: "https://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E5%25B0%25BC%25E5%25B0%2594%25E6%25A3%25AE%25282%2529.mp4",
        img_src: "http://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E5%25B0%25BC%25E5%25B0%2594%25E6%25A3%25AE.jpg",
        title: "京东云 x 尼尔森网联"
      },
      {
        src: "https://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E5%2595%2586%25E6%25B4%25BE%25281%2529.mp4",
        img_src: "http://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/%25E5%2595%2586%25E6%25B4%25BE.jpg",
        title: "京东云 x 商派"
      },
      {
        src: "https://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/SMART.mp4",
        img_src: "http://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/smart.jpg",
        title: "京东云 x SMART"
      },
      {
        src: "https://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/TalkingData.mp4",
        img_src: "http://jdc-static.oss.cn-north-1.jcloudcs.com/jdc-about-static/2018%25E4%25BA%25AC%25E4%25B8%259C%25E4%25BA%2591%25E5%2590%2588%25E4%25BD%259C%25E4%25BC%2599%25E4%25BC%25B4%25E5%25A4%25A7%25E4%25BC%259A%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F/video/talking%2520data.jpg",
        title: "京东云 x TalkingData"
      },
    ]

    // my_video_list.sort(function() {
    //   return (0.5 - Math.random());
    // })
    this.setData({
      video_list: my_video_list
    })



    //计算中奖率
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let win = 0;
    let lose = 0;
    console.log(nums);
    for (let index = 0; index < 238; index++) {
      nums.sort(function () {
        return (0.5 - Math.random());
      })
      console.log(index + "----" + nums);
      if (nums[0] == 0) {
        win++;
      } else {
        lose++;
      }
    }
    console.log("win--------------" + win);
    console.log("lose--------------" + lose);

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
  playVideo: function(event) {
    if (event.currentTarget.dataset.index != undefined) {
      var index = event.currentTarget.dataset.index;
      var currentVideo = JSON.stringify(this.data.video_list[index]);
      wx.navigateTo({
        url: '../playvideo/playvideo?currentVideo=' + encodeURIComponent(currentVideo)
      })
    } else {}
  },
  //获取单选按钮值
  radioChange: function(e) {
    var company = 'video_form.company';
    this.setData({
      [company]: e.detail.value
    })
  },
  //获取手机号值
  getPhoneValue: function(e) {
    var phone = 'video_form.phone';
    this.setData({
      [phone]: e.detail.value
    })
  },
  // confirmForm: function() {
  //   //查看获取的用户信息
  //   var dataWarning = [];
  //   var flag = 0;

  //   /*校验数据开始 */
  //   //校验单选按钮
  //   if (this.data.video_form.company == "") {
  //     flag = 1;
  //     dataWarning.push("请选择喜欢的视频");
  //   }
  //   if (this.data.video_form.phone == "") {
  //     flag = 1;
  //     dataWarning.push("手机号不能为空");
  //   } else {
  //     if ((/^1[345789]\d{9}$/.test(this.data.video_form.phone))) {} else {
  //       flag = 1;
  //       dataWarning.push("手机号格式错误");
  //     }
  //   }

  //   var that = this;
  //   /*校验数据结束 */
  //   if (flag == 0) {
  //     this.setData({
  //       alreadyConfirm: true
  //     })
  //     //数值正确，调接口
  //     //查看用户信息
  //     wx.getSetting({
  //       success: (response) => {
  //         if (!response.authSetting['scope.userInfo']) {
  //           //用户不同意获取用户信息，提示并打开设置
  //           wx.openSetting({
  //             success: (res) => {}
  //           })
  //         } else {
  //           wx.request({
  //             data: {
  //               "open_id": that.data.userInfo.openid,
  //               "mobile": that.data.video_form.phone,
  //               "video_value": that.data.video_form.company,
  //             },
  //             method: "POST",
  //             url: "https://solutions.jdcloud.com/api/v1/partnerUser",
  //             success(res) {
  //               if (res.data.code) {
  //                 that.setData({
  //                   showConfirmModal: true,
  //                 });
  //               } else {}
  //             }
  //           })
  //         }
  //       }
  //     })

  //   } else {
  //     wx.showModal({
  //       title: '提示',
  //       content: dataWarning.join("\r\n"),
  //     })
  //   }

  // },
  //查看是否选择过视频
  checkResult: function() {
    var that = this;
    wx.request({
      method: "GET",
      url: "https://solutions.jdcloud.com/api/v1/partnerUser/" + that.data.userInfo.openid,
      success(vres) {
        if (vres.data.code == 200 && vres.data.data && vres.data.data.length > 0) {
          //已经选过视频
          that.setData({
            alreadyChoose: true
          })
          for (var index = 0; index < that.data.items.length; index++) {
            if (that.data.items[index].name == vres.data.data[0].video_value) {
              var itemCheck = "items[" + index + "].checked";
              that.setData({
                [itemCheck]: true
              });
            } else {}
          }
        } else {
          that.setData({
            alreadyChoose: false
          })
        }
      }
    })
  },
  //关闭对话框
  closeDlDialog: function() {
    this.setData({
      showConfirmModal: false,
    });
    this.checkResult();
  }

})