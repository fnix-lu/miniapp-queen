// pages/settlement/settlement.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagDrawerSelect: false,
    currentCoupon: '不使用优惠',
    currentCouponId: '',
    currentPage: 0,
    allPageCount: 1,
    coupons: [],
    profile: {
      provinceIndex: 0,
      province: '',
      cityIndex: 0,
      city: '',
      schoolIndex: 0,
      school: ''
    },
    range: {
      province: [],
      city: [],
      school: []
    },
    settlementGoodsList: [],
    totalSettlementPrice: 0,
    orderType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    const _this = this
    let { settlementGoodsList } = app.globalData

    settlementGoodsList.forEach(item => {
      _this.data.totalSettlementPrice += item.SettlementPrice * item.SaleCount
    })

    this.setData({
      settlementGoodsList,
      totalSettlementPrice: this.data.totalSettlementPrice,
      orderType: query.orderType * 1
    })
    //console.log(this.data.settlementGoodsList)
    //console.log(this.data.orderType)

    const memberInfo = wx.getStorageSync('memberInfo')
    this.setData({
      'profile.province': memberInfo.Province || '',
      'profile.city': memberInfo.City || '',
      'profile.school': memberInfo.School || ''
    })
    this.getProvincesAll().then(() => {
      // 如果有省份初值，获取对应的城市列表
      if (_this.data.profile.province) {
        _this.getCitiesByProvinceId()
      }
    })
    this.getSchoolsAll()
    //coupon money not be supported this page! by arison 20190524
    //this.getCoupons()
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

  /**
   * 切换选择列表弹层
   */
  toggleDrawerSelect () {
    this.setData({
      flagDrawerSelect: !this.data.flagDrawerSelect,
    })
  },

  /**
   * 选择优惠券
   */
  selectCoupon (e) {
    console.log(e)
    this.setData({
      currentCoupon: e.detail.value,
      currentCouponId: e.currentTarget.dataset.couponId
    })
    this.toggleDrawerSelect()
  },

  /**
   * 选择生日
   */
  changeBirthday(e) {
    const { detail: { value } } = e
    this.setData({
      'profile.birthday': value,
    })
  },

  /**
   * 选择省份
   */
  changeProvince(e) {
    const { data: { range: { province } } } = this
    const { detail: { value } } = e
    this.setData({
      'profile.provinceIndex': value,
      'profile.province': province[value].Name
    })
    this.getCitiesByProvinceId()
  },

  /**
   * 选择城市
   */
  changeCity(e) {
    const { data: { range: { city } } } = this
    const { detail: { value } } = e
    this.setData({
      'profile.cityIndex': value,
      'profile.city': city[value].Name
    })
  },

  /**
   * 选择学校
   */
  changeSchool(e) {
    const { data: { range: { school } } } = this
    const { detail: { value } } = e
    console.log('select cschol')
    this.setData({
      'profile.schoolIndex': value,
      'profile.school': school[value].School
    })
  },

  /**
   * 获取选中项的index, field为遍历的对象中用于显示的字段，省市为Name，学校为School
   */
  getRangeIndexOf(key, field) {
    const { profile, range } = this.data
    let index = 0
    for (let i = 0; i < range[key].length; i++) {
      if (range[key][i][field].indexOf(profile[key]) > -1) {
        index = i
        break
      }
    }
    return index
  },

  /**
   * 请求所有省份
   */
  getProvincesAll() {
    const _this = this
    return app.api.getProvinces({
      PageSize: 50
    }).then(res => {
      console.log('province', res)
      _this.setData({
        'range.province': res.Data
      })
      _this.setData({
        'profile.provinceIndex': _this.getRangeIndexOf('province', 'Name')
      })
    })
  },

  /**
   * 请求省份对应的所有城市
   */
  getCitiesByProvinceId() {
    const _this = this
    const { profile, range } = this.data
    app.api.getCities({
      PageSize: 50,
      ProvinceId: range.province[profile.provinceIndex].Id
    }).then(res => {
      console.log('city', res)
      _this.setData({
        'range.city': res.Data
      })
      _this.setData({
        'profile.cityIndex': _this.getRangeIndexOf('city', 'Name')
      })
    })
  },

  /**
   * 请求所有学校
   */
  getSchoolsAll() {
    const _this = this
    app.api.getSchools({
      PageSize: 100000
    }).then(res => {
      console.log('school', res)
      _this.setData({
        'range.school': res.Data
      })
      _this.setData({
        'range.schoolIndex': _this.getRangeIndexOf('school', 'School')
      })
    })
  },

  /**
   * 获取下一页卡券列表
   */
  getCoupons () {
    const _this = this

    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    app.api.getCoupons({
      PageIndex: this.data.currentPage + 1,
      CouponType: 2,
      IsUsed: false
    }).then(res => {
      console.log('现金券', res)
      _this.setData({
        currentPage: res.PageIndex,
        allPageCount: res.AllPageCount,
        coupons: _this.data.coupons.concat(res.Data)
      })
    })
  },

  /**
   * 提交订单
   */
  submitOrder () {
    let {
      profile,
      settlementGoodsList,
      orderType,
      currentCouponId,
    } = this.data

    if (!profile.school) {
      wx.showToast({
        title: '请先确认学校',
        icon: 'none'
      })
      // return
    }
    // 提交订单
    app.api.submitOrder({
      ProvinceName: profile.province,
      CityName: profile.city,
      SchoolName: profile.school,
      CouponId: currentCouponId,
      PayType: 2,
      Type: orderType,
      Details: settlementGoodsList
    }).then(res => {
      console.log('提交订单', res)
      // 成功提交后获取支付参数
      let serialNumber = res.Data.SerialNumber

      app.payment(serialNumber, orderType)

      // app.api.getPaymentParams({
      //   SerialNumber: serialNumber
      // }).then(res => {
      //   console.log('支付参数', res)
      //   // 发起支付
      //   wx.requestPayment({
      //     timeStamp: res.Data.TimeStamp,
      //     nonceStr: res.Data.NonceStr,
      //     package: res.Data.Package,
      //     signType: res.Data.SignType,
      //     paySign: res.Data.PaySign,
      //     success ({ errMsg }) {
      //       console.log('success', errMsg)
      //       if (errMsg === 'requestPayment:ok') {
      //         // 轮询普通订单获得支付状态
      //         let timer = setInterval(() => {
      //           app.api.getSingleOrderBySerial({
      //             Serial: serialNumber
      //           }).then(res => {
      //             console.log('轮询', res)
      //             let order = res.Data
      //             // 轮询直到订单状态为已支付
      //             if (order.PayStatus === '已支付') {
      //               clearInterval(timer)
      //               // 如果订单为拼单，调用新建拼单订单接口生成拼单订单
      //               if (orderType === 1) {
      //                 app.api.submitCrowdOrder({
      //                   ProductSpecificationId: settlementGoodsList[0].ProductSpecificationId,
      //                   SalePrice: settlementGoodsList[0].SalePrice,
      //                   GroupPrice: settlementGoodsList[0].SettlementPrice,
      //                   SaleCount: settlementGoodsList[0].SaleCount,
      //                   IsMaster: true
      //                 }).then(res => {
      //                   if (res.Data) {
      //                     // 新建拼单成功后跳转至支付结果页
      //                     wx.redirectTo({
      //                       url: `/pages/pay-result/pay-result?orderType=${orderType}`,
      //                     })
      //                   }
      //                 })
      //               } else if (orderType === 0) {
      //                 // 普通订单轮询到已支付则直接跳转至支付结果页
      //                 wx.redirectTo({
      //                   url: `/pages/pay-result/pay-result?orderType=${orderType}`,
      //                 })
      //               }
      //             }
      //           })
      //         }, 1000)
      //       }
      //     },
      //     fail ({ errMsg }) {
      //       console.log('fail', errMsg)
      //       if (errMsg === 'requestPayment:fail cancel') {
      //         wx.navigateBack()
      //       } else {
      //         wx.showModal({
      //           title: '提示',
      //           content: '支付失败，请稍后在我的订单中重新支付',
      //           showCancel: false,
      //           confirmColor: '#FC7B7B',
      //           success (res) {
      //             if (res.confirm) {
      //               wx.navigateBack()
      //             }
      //           }
      //         })
      //       }
      //     }
      //   })
      // })

    })
  }
})