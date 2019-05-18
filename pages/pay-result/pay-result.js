// pages/pay-result/pay-result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: '',
    successPaidOrderId: '',
    croworderserial:'',
    crods:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    console.log('支付结果页', query)
    let { orderType = '', successPaidOrderId = '', croworderserial='' } = query

    app.api.getCrowdOrders({
      PageIndex: 1,
      PageSize: 1,
      IsContainParticipation: true,
      OrderType: 1,
      PayStatus: 1,
      SerialNumber: croworderserial
    }).then(res => {
      //获取产品信息
      this.setData({
        orderType,
        successPaidOrderId,
        crods:res.Data
      })
    })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      let { goods } = res.target.dataset

      return {
        title: '快来加入我的拼单队伍吧！',
        path: '/pages/goods-detail/goods-detail?goodsId=' + goods.ProductId,
        imageUrl: goods.ProductImageUrl
      }
    }
  }
})