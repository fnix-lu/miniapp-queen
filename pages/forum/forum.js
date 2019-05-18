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
    h1: 0,
    h2: 0,
    flag: {
      showCover: false,
      showMenu: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
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
    //console.log(this.data.currentPage +'，'+this.data.allPageCount)
    app.api.getForumList({
      PageIndex: this.data.currentPage + 1,
      MemberId: '',
      IsContainImage: true,
      IsDefaultImage: true,
      RecordStatus: 2
    }).then(res => {
      console.log('论坛帖子列表', res)
      // 遍历结果，按图片高宽比分列
      res.Data.forEach(item => {
        let { h1, h2, postCol1, postCol2 } = _this.data

        if (h1 <= h2) {
          postCol1.push(item)
          h1 += item.ImageHeight / item.ImageWidth
        } else {
          postCol2.push(item)
          h2 += item.ImageHeight / item.ImageWidth
        }

        _this.setData({
          h1,
          h2,
          postCol1,
          postCol2,
          currentPage: res.PageIndex,
          allPageCount: res.AllPageCount
        })
      })
    })
  }
})