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
    couponType: '商品抵用券',
    isUsed: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCoupons()
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
      IsUsed: this.data.isUsed
    }).then(res => {
      console.log('请求卡券列表返回', res)
      _this.setData({
        currentPage: res.PageIndex,
        allPageCount: res.AllPageCount,
        coupons: _this.data.coupons.concat(res.Data)
      })
    })
  }
})