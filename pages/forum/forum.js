// pages/forum/forum.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,
    allPageCount: 1,
    postList: [],
    postCol1: [],
    postCol2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getForumList()
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
   * 获取下一页帖子列表
   */
  getForumList () {
    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    app.api.getForumList({
      IsContainImage: true,
      IsDefaultImage: true
    })
  }
})