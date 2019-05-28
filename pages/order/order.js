// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetTime: new Date('2019-5-1 00:00:00').getTime(),
    flag: {
      showOrderDetail: false,
      showCancelModal: false
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
    console.log('loading...')
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      let { goods } = res.target.dataset

      return {
        title: '快来加入我的拼单队伍吧！',
        path: '/pages/goods-detail/goods-detail?goodsId=' + goods.ProductId,
        imageUrl: goods.ProductImageUrl
      }
    }
  },

  /**
   * 获取下一页订单
   */
  getNextOrders (currentTab) {
    console.log("getNextOrders exec!")
    const _this = this

    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    // 待付款
    if (currentTab === 'unpaid') {
      app.api.getOrders({
        PageIndex: this.data.currentPage + 1,
        PageSize: 10000,
        Type: -1,
        PayStatus: 0
      }).then(res => {
        console.log('tab111', res)
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
        OrderStatus: 2,
        PayStatus:1,
        IsContainDetail:true
      }).then(res => {
        console.log('tab333', res)
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
        PageSize: 10000,
        IsContainParticipation: true,
        OrderType: 1,
        PayStatus: 1,
      }).then(res => {
        console.log('tab222', res)
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
    // 初始化页码
    this.setData({
      currentPage: 0,
      allPageCount: 1,
      currentTab: key
    })
    // 初始化列表
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
  },

  /**
   * 手动取消订单，联系客服处理
   */
  // handleCancel () {
  //   this.setData({
  //     'flag.showCancelModal': true
  //   })
  // },

  /**
   * 关闭点击取消订单时的提示对话框
   */
  // hideCancelModal () {
  //   this.setData({
  //     'flag.showCancelModal': false
  //   })
  // }

  /**
   * 切换显示联系客服处理的提示框
   */
  toggleShowCancelModal () {
    this.setData({
      'flag.showCancelModal': !this.data.flag.showCancelModal
    })
  },

  /**
   * 去我的券包
   */
  navigateToCoupon (e) {
    let {
      orderId
    } = e.currentTarget.dataset
    console.log(orderId)
    wx.navigateTo({
      url: '/pages/coupon/coupon?orderId=' + orderId,
    })
  },

  /**
   * 订单支付
   */
  handlePay (e) {
    let { serialNumber, orderTypeName } = e.currentTarget.dataset

    let orderType = 0
    if (orderTypeName === '拼单订单') {
      orderType = 1
    }

    app.payment(serialNumber, orderType)
  },

  /**
   * 倒计时结束从数组移除订单（未考虑极端情况）
   */
  autoCancelOrder (e) {
    console.log(e)
    let { orderId } = e.currentTarget.dataset
    let { ordersUnpaid } = this.data

    let i = ordersUnpaid.list.findIndex(item => {
      return item.Id === orderId
    })

    if (i > -1) {
      ordersUnpaid.list.splice(i, 1)
      ordersUnpaid.allCount--
    }
    
    this.setData({
      ordersUnpaid
    })
  },
  autoCancelCrowdOrder (e) {
    console.log(e)
    let { orderId } = e.currentTarget.dataset
    let { ordersUngrouped } = this.data

    let i = ordersUngrouped.list.findIndex(item => {
      return item.Id === orderId
    })

    if (i > -1) {
      ordersUngrouped.list.splice(i, 1)
      ordersUngrouped.allCount--
    }

    this.setData({
      ordersUngrouped
    })
  }
  
})