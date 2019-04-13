// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile: {
      phone: '',
      birthday: '',
      province: '',
      city: '',
      school: ''
    },
    range: {
      province: ['江苏', '浙江'],
      city: ['苏州', '无锡'],
      school: ['a', 'b']
    }
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
   * 选择生日
   */
  changeBirthday (e) {
    const { detail: { value } } = e
    this.setData({
      'profile.birthday': value
    })
  }

  /**
   * 选择省份
   */

  /**
   * 选择城市
   */

  /**
   * 选择学校
   */
})