// pages/coupon-all/coupon-all.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    currentPage: 0,
    allPageCount: 1,
    coupons: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options ) {
    let{orderId}=options
    console.log(orderId)
    this.setData({
      orderId
    })
    this.getCouponsByOrderId()
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
    this.getCouponsByOrderId()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 根据 OrderId 获取下一页卡券列表
   */
  getCouponsByOrderId () {
    const _this = this

    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    app.api.getCoupons({
      PageIndex: this.data.currentPage + 1,
      CouponType: 1,
      IsUsed: false,
      OrderId: this.data.orderId
    }).then(res => {
      console.log('请求卡包内的卡券', res)
      _this.setData({
        currentPage: res.PageIndex,
        allPageCount: res.AllPageCount,
        coupons: _this.data.coupons.concat(res.Data)
      })
    })
  }

})