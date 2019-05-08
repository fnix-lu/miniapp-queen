// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetTime: new Date('2019-5-1 00:00:00').getTime(),
    flag: {
      showOrderDetail: false
    },
    // orderStatus: 
    currentPage: 0,
    allPageCount: 1,
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 获取下一页订单
   */
  getNextOrders () {
    const _this = this
    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    app.api.getOrders({
      PageIndex: this.data.currentPage + 1,
      // 订单状态
    })
  }
  
})