// pages/coupon/coupon.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,
    allPageCount: 1,
    coupons: [],
    flag: {
      showRules: false
    },
    couponType: 1,
    isUsed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.couponType === 1 && !this.data.isUsed) {
      this.getCouponPackages()
    } else {
      this.getCoupons()
    }
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
    if (this.data.couponType === 1 && !this.data.isUsed) {
      this.getCouponPackages()
    } else {
      this.getCoupons()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 显示优惠券使用规则
   */
  showCouponRules () {
    this.setData({
      'flag.showRules': true
    })
  },

  /**
   * 关闭优惠券使用规则
   */
  hideCouponRules () {
    this.setData({
      'flag.showRules': false
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
      CouponType: this.data.couponType,
      IsUsed: this.data.isUsed
    }).then(res => {
      console.log('请求卡券列表返回', res)
      _this.setData({
        currentPage: res.PageIndex,
        allPageCount: res.AllPageCount,
        coupons: _this.data.coupons.concat(res.Data)
      })
    })
  },

  /**
   * 获取下一页卡包列表
   */
  getCouponPackages () {
    const _this = this

    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    app.api.getCouponPackages({
      PageIndex: this.data.currentPage + 1,
      CouponType: this.data.couponType,
      IsUsed: this.data.isUsed
    }).then(res => {
      console.log('请求卡包列表', res)
      _this.setData({
        currentPage: res.PageIndex,
        allPageCount: res.AllPageCount,
        coupons: _this.data.coupons.concat(res.Data)
      })
    })
  },

  /**
   * 初始化页码信息
   */
  initCouponList () {
    this.setData({
      currentPage: 0,
      allPageCount: 1,
      coupons: []
    })
  },

  /**
   * 切换卡券类型
   */
  changeCouponType (e) {
    let { couponType } = e.currentTarget.dataset
    this.setData({
      couponType
    })
    this.initCouponList()
    this.getCoupons()
  },

  /**
   * 切换卡券使用状态
   */
  changeCouponState (e) {
    let { key } = e.detail
    let isUsed = false
    if (key === 'true') {
      isUsed = true
    }
    if (key === 'false') {
      isUsed = false
    }
    this.setData({
      isUsed
    })
    this.initCouponList()
    this.getCoupons()
  }
})