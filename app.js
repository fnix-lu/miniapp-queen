//app.js
const api = require('./api/api.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // this.login()
    
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
    settlementGoodsList: [
      // 新增订单接口需要的商品项的数据结构，跳转至结算页前先将数据格式化为以下字段，保存至该全局变量
      // {
      //   Id,
      //   SerialNumber,
      //   MemberId,
      //   ProductCode,
      //   ProductName,
      //   ProductImageUrl,
      //   ProductSpecificationId,
      //   ProductSpecificationName,
      //   SalePrice,
      //   SettlementPrice,
      //   CostPrice,
      //   SaleCount,
      //   Remark,
      //   BrandId,
      //   CreatorName,
      //   CreateTime,
      //   UpdaterName,
      //   UpdateTime,
      //   RecordStatus,
      //   IsTestData
      // }
    ]
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
  },
  /**
   * 支付
   */
  payment (serialNumber, orderType) {
    const _this = this
    this.api.getPaymentParams({
      SerialNumber: serialNumber
    }).then(res => {
      console.log('支付参数', res)
      // 发起支付
      wx.requestPayment({
        timeStamp: res.Data.TimeStamp,
        nonceStr: res.Data.NonceStr,
        package: res.Data.Package,
        signType: res.Data.SignType,
        paySign: res.Data.PaySign,
        success ({ errMsg }) {
          console.log('success', errMsg)
          if (errMsg === 'requestPayment:ok') {
            // 轮询普通订单获得支付状态
            let timer = setInterval(() => {
              _this.api.getSingleOrderBySerial({
                Serial: serialNumber
              }).then(res => {
                console.log('轮询', res)
                let order = res.Data
                // 轮询直到订单状态为已支付
                if (order.PayStatus === '已支付') {
                  clearInterval(timer)
                  // 如果订单为拼单，调用新建拼单订单接口生成拼单订单
                  if (orderType === 1) {
                    _this.api.submitCrowdOrder({
                      ProductSpecificationId: _this.globalData.settlementGoodsList[0].ProductSpecificationId,
                      CrowCode: _this.globalData.settlementGoodsList[0].Code,
                      SalePrice: _this.globalData.settlementGoodsList[0].SalePrice,
                      GroupPrice: _this.globalData.settlementGoodsList[0].SettlementPrice,
                      SaleCount: _this.globalData.settlementGoodsList[0].SaleCount,
                      IsMaster: true,
                      NormalOrderId:order.Id,
                      NormalOrderSerial:order.SerialNumber
                    }).then(res => {
                      if (res.Data) {
                        // 新建拼单成功后跳转至支付结果页
                        wx.redirectTo({
                          url: `/pages/pay-result/pay-result?orderType=1&serialNumber=${res.Data.CrowdOrderSerialNumber}`,
                        })
                      }
                    })
                  } else if (orderType === 0) {
                    // 普通订单轮询到已支付则直接跳转至支付结果页
                    wx.redirectTo({
                      url: `/pages/pay-result/pay-result?orderType=0`,
                    })
                  }
                }
              })
            }, 1000)
          }
        },
        fail ({ errMsg }) {
          console.log('fail', errMsg)
          if (errMsg === 'requestPayment:fail cancel') {
            wx.navigateBack()
          } else {
            wx.showModal({
              title: '提示',
              content: '支付失败，请稍后在我的订单中重新支付',
              showCancel: false,
              confirmColor: '#FC7B7B',
              success(res) {
                if (res.confirm) {
                  wx.navigateBack()
                }
              }
            })
          }
        }
      })
    })
  }

})