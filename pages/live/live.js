Page({
  onLoad: function () {
    this.setData({
      state: "play",
      fullScreen: false,
    })
   
  },
  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
 },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  bindPlay() {
    this.ctx.play({
      success: res => {
        console.log('play success')
        this.setData({
          state: "play"
        })
      },
      fail: res => {
        console.log('play fail')
      }
    })
  },
  bindFullScreen() {
    this.ctx.requestFullScreen({
      direction: 90,
      success: res => {
        console.log('requestFullScreen success')
        this.setData({
          fullScreen: true,
        })
      },
      fail: res => {
        console.log('requestFullScreen fail')
      }
    })
  },
  exitFullscreen() {
    this.ctx.exitFullScreen({
      success: res => {
        console.log('exitFullScreen success')
        this.setData({
          fullScreen: false,
        })
      },
      fail: res => {
        console.log('requestFullScreen fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        this.setData({
          state: "pause"
        })
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindMute() {
    this.ctx.mute({
      success: res => {
        console.log('mute success')
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  }
})

