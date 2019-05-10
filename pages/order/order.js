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
    currentPage: 0,
    allPageCount: 1,
    orders: [],
    currentTab: 'unpaid',
    ordersUnpaid: {
      allCount: 0,
      list: []
    },
    ordersUngrouped: {
      allCount: 0,
      list: []
    },
    ordersUntaked: {
      allCount: 0,
      list: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNextOrders('unpaid')
    this.getNextOrders('ungrouped')
    this.getNextOrders('untaked')
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
    this.getNextOrders(this.data.currentTab)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取下一页订单
   */
  getNextOrders (currentTab) {
    const _this = this

    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    // 待付款
    if (currentTab === 'unpaid') {
      app.api.getOrders({
        PageIndex: this.data.currentPage + 1,
        Type: -1,
        PayStatus: 0
      }).then(res => {
        console.log('待付款', res)
        _this.setData({
          currentPage: res.PageIndex,
          allPageCount: res.AllPageCount,
          'ordersUnpaid.allCount': res.AllCount,
          'ordersUnpaid.allCount': res.Data.length,
          'ordersUnpaid.list': _this.data.ordersUnpaid.list.concat(res.Data)
        })
      })
    }
    // 待取货
    if (currentTab === 'untaked') {
      app.api.getOrders({
        PageIndex: this.data.currentPage + 1,
        Type: -1,
        OrderStatus: 2
      }).then(res => {
        console.log('待取货', res)
        _this.setData({
          currentPage: res.PageIndex,
          allPageCount: res.AllPageCount,
          'ordersUntaked.allCount': res.AllCount,
          'ordersUntaked.allCount': res.Data.length,
          'ordersUntaked.list': _this.data.ordersUntaked.list.concat(res.Data)
        })
      })
    }
    // 待成团
    if (currentTab === 'ungrouped') {
      app.api.getCrowdOrders({
        PageIndex: this.data.currentPage + 1,
        IsContainParticipation: true,
        OrderType: 1,
        PayStatus: 1,
      }).then(res => {
        console.log('待成团', res)
        _this.setData({
          currentPage: res.PageIndex,
          allPageCount: res.AllPageCount,
          'ordersUngrouped.allCount': res.AllCount,
          'ordersUngrouped.list': _this.data.ordersUngrouped.list.concat(res.Data)
        })
      })
    }
  },

  /**
   * 切换订单标签
   */
  changeOrderTab (e) {
    let { key } = e.detail
    this.setData({
      currentPage: 0,
      allPageCount: 1,
      currentTab: key
    })
    if (key === 'unpaid') {
      this.setData({
        'ordersUnpaid.list': []
      })
    }
    if (key === 'ungrouped') {
      this.setData({
        'ordersUngrouped.list': []
      })
    }
    if (key === 'untaked') {
      this.setData({
        'ordersUntaked.list': []
      })
    }
    this.getNextOrders(key)
  }
  
})