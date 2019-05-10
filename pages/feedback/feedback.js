// pages/feedback/feedback.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    phone: ''
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

  handleInputText (e) {
    this.setData({
      text: e.detail.value
    })
  },
  
  handleInputPhone (e) {
    this.setData({
      phone: e.detail.detail.value
    })
  },

  submitFeedback () {
    const _this = this
    app.api.submitFeedback({
      MemberContent: this.data.text,
      SuggestMobile: this.data.phone
    }).then(res => {
      console.log('反馈提交结果', res)
      if (res.Data) {
        _this.setData({
          text: '',
          phone: ''
        })
        wx.showToast({
          title: '感谢您的反馈！',
        })
      } else {
        wx.showToast({
          title: '提交失败，请重试！',
        })
      }
    })
  }
})