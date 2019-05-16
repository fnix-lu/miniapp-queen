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
    comments: [],
    replyText: '',
    replyTargetId: '',
    replyTargetName: '',
    replyInputFocus: false
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
    this.getPostComments()
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
      /*
      最开始的时候
      getPostContent()
      getPostComments()放在一起执行
      但是服务单没有做好程序管控，导致异步资源出问题
      */
      this.getPostComments()
    })
  },

  /**
   * 获取下一页评论列表
   */
  getPostComments () {
    const _this = this
    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    app.api.getPostComments({
      PageIndex: this.data.currentPage + 1,
      GirlForumId: this.data.postId,
      IsContainReply: true
    }).then(res => {
      console.log('评论列表', res)
      _this.setData({
        currentPage: res.PageIndex,
        allPageCount: res.AllPageCount,
        comments: _this.data.comments.concat(res.Data)
      })
    })
  },

  /**
   * 初始化评论列表
   */
  initPostComments () {
    this.setData({
      currentPage: 0,
      allPageCount: 1,
      comments: []
    })
  },

  /**
   * 留言文本框输入事件
   */
  handleInputReplyText (e) {
    this.setData({
      replyText: e.detail.value
    })
  },
  
  /**
   * 拉起回复框
   */
  prepareToReply (e) {
    let {
      replyTargetId,
      replyTargetName
    } = e.currentTarget.dataset
    this.setData({
      replyTargetId,
      replyTargetName,
      replyInputFocus: true
    })
  },

  /**
   * 输入框为空时失去焦点，初始化 replyTargetId, replyTargetName
   */
  handleReplyInputBlur () {
    if (!this.data.replyText) {
      this.setData({
        replyTargetId: '',
        replyTargetName: ''
      })
    }
  },

  handleSubmitReplyText () {
    const _this = this
    let {
      replyTargetId, // 要回复的留言的主键
      postId,        // 要留言的帖子的主键
      replyText      // 内容
    } = this.data
    
    if (replyTargetId) {
      const memberInfo = wx.getStorageSync('memberInfo')
      // 如果，存在 replyTargetId, 为对留言进行回复
      console.log(this.data.replyText)
      app.api.submitReply({
        // 请求参数
        //闺蜜圈主键
        GirlForumId: this.data.postId,
        //回复留言的会员主键
        ReplyLeaveMessageMemberId: memberInfo.Id,
        //闺蜜圈发布者主键
        GirlForumMemberId:this.data.postContent.MemberId,
        //回复内容
        ReplyLeaveMessageContent:this.data.replyText,
        //留言的主键
        GirlForumsLeaveId: replyTargetId
      }).then(res => {
        // 初始化整个评论列表
        _this.initPostComments()
        // 重新获取评论列表
        _this.getPostComments()
      })
    } else {
      const memberInfo = wx.getStorageSync('memberInfo')
      // 否则，为对帖子进行留言
      app.api.submitComment({
        // 请求参数
        //帖子作者
        GirlForumMemberId:this.data.postContent.MemberId,
        //帖子主键
        ForumId: this.data.postContent.Id,
        //留言会员主键
        LeaveMessageMemberId: memberInfo.Id,
        //帖子主键
        GirlForumId:this.data.postId,
        //留言内容
        LeaveMessageContent:this.data.replyText
      }).then(res => {
        // 初始化整个评论列表
        _this.initPostComments()
        // 重新获取评论列表
        _this.getPostComments()
      })
    }
  }
})