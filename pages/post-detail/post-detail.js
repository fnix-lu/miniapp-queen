// pages/post-detail/post-detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: '',
    postMemberId: '',
    postContent: {},
    currentPage: 0,
    allPageCount: 1,
    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    console.log(query)
    let { postId, postMemberId } = query
    this.setData({
      postId,
      postMemberId
    })
    this.getPostContent()
    this.getPostComments()
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
   * 获取帖子内容
   */
  getPostContent () {
    const _this = this
    app.api.getPostContent({
      Id: this.data.postId,
      IsContainImage: true
    }).then(res => {
      console.log('帖子内容', res)
      _this.setData({
        postContent: res.Data
      })
    })
  },

  /**
   * 获取下一页评论列表
   */
  getPostComments (data) {
    const _this = this
    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    app.api.getPostComments({
      PageIndex: this.data.currentPage + 1,
      GirlForumId: this.data.postId,
      GirlForumMemberId: this.data.postMemberId,
      ...data
    }).then(res => {
      console.log('评论列表', res)
      _this.setData({
        comments: res.Data
      })
    })
  }
})