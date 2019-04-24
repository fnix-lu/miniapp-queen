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
    postCol2: [],
    flag: {
      showCover: false,
      showMenu: false
    }
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
    this.hideLayers()
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
   * 切换菜单显示
   */
  toggleMenuShow () {
    this.setData({
      'flag.showMenu': !this.data.flag.showMenu,
      'flag.showCover': !this.data.flag.showMenu
    })
  },

  /**
   * 隐藏弹层
   */
  hideLayers () {
    Object.keys(this.data.flag).forEach(key => {
      this.data.flag[key] = false
    })
    this.setData({
      flag: this.data.flag
    })
  },

  /**
   * 获取下一页帖子列表
   */
  getForumList () {
    const _this = this
    if (this.data.currentPage >= this.data.allPageCount) {
      return
    }
    app.api.getForumList({
      IsContainImage: true,
      IsDefaultImage: true
    }).then(res => {
      console.log('论坛帖子列表', res)
      // 遍历结果，按图片高宽比分列


      _this.setData({
        postCol1: res.Data
      })
    })
  }
})