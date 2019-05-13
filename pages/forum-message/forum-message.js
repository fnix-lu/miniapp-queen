// pages/forum-message/forum-message.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,
    allPageCount: 1,
    messages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNextReplyMessages()
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
    this.getNextReplyMessages()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取下一页消息列表
   */
  getNextReplyMessages () {
    const _this = this

    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }

    app.api.getReplyMessages({
      PageIndex: this.data.currentPage + 1,

    }).then(res => {
      console.log('我的消息', res)
      _this.setData({
        messages: _this.data.messages.concat(res.Data)
      })
    })
  }
})