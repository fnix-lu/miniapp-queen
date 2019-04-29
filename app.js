//app.js
const api = require('./api/api.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    this.login()
    
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    // 获取当前城市
    // this.getLocation()
  },
  globalData: {
    // userInfo: null
  },
  api,
  /**
   * 获取定位城市
   */
  getLocation () {
    wx.getLocation({
      success: res => {
        console.log(res)
      }
    })
  },
  /**
   * 登录
   */
  login () {
    // if (valid) {
    //   // resolve
    // } else if (auth) {
    //   // request -> resolve
    // } else {
    //   // auth
    // }
    const _this = this

    let memberInfo = wx.getStorageSync('memberInfo')

    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          console.log('微信授权信息', res)
          if (!res.authSetting['scope.userInfo']) {
            wx.navigateTo({
              url: '/pages/auth/auth'
            })
          } else if (!memberInfo || !memberInfo.Id) {
            wx.login({
              success: ({ code }) => {
                console.log('Code', code)
                // 发送 res.code 到后台
                // 请求成功后设置 memberInfo
                // resolve()
                wx.getUserInfo({
                  lang: 'zh_CN',
                  success: ({ userInfo }) => {
                    console.log('UserInfo',userInfo)
                    let gender = '保密'
                    if (userInfo.gender === 1) gender = '男'
                    if (userInfo.gender === 2) gender = '女'
                    api.login({
                      WXAuthCode: code,
                      WechatNickName: userInfo.nickName,
                      Gender: gender,
                      Province: userInfo.province,
                      City: userInfo.city,
                      CutomerType: 1,
                      HeadImgUrl: userInfo.avatarUrl
                    }).then(res => {
                      console.log('After Login', res)
                      wx.setStorageSync('memberInfo', res.Data)
                      resolve()
                    })
                  }
                })
              }
            })
          } else {
            resolve()
          }
        }
      })
    })

    // if (!auth) {
    //   // auth
    // } else if (valid) {
    //   // resolve
    // } else {
    //   // request -> resolve
    // }



    // 判断登录态是否有效，如果无效，发起登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     if (res.code) { // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //       // 如果接口是需要用户授权信息的：
    //       //   判断是否有授权，没有则跳转到授权页完成授权和登录
    //       //   有授权则 res.code + 用户信息调用接口，设置用户信息
    //       // 如果接口不需要用户授权而由服务端请求用户信息的，直接 res.code 请求接口，设置用户信息
    //     }
    //   }
    // })
  },
  /**
   * 登录2
   */
  login2 () {
    // 如果接口是需要用户授权信息的：
    //   判断是否有授权，没有则跳转到授权页完成授权和登录
    //   有授权则 res.code + 用户信息调用接口，设置用户信息
    // 如果接口不需要用户授权而由服务端请求用户信息的，直接 res.code 请求接口，设置用户信息

    // 判断登录态是否有效，如果无效，发起登录
    wx.login({
      success: res => {
        console.log(res)
        if (res.code) { // 发送 res.code 到后台换取 openId, sessionKey, unionId

        }
      }
    })
  }
})