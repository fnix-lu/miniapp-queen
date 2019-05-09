// pages/post-new/post-new.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    text: '',
    images: []
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
   * 输入标题
   */
  handleInputTitle (e) {
    this.setData({
      title: e.detail.value
    })
  },

  /**
   * 输入内容
   */
  handleInputText(e) {
    this.setData({
      text: e.detail.value
    })
  },

  /**
   * 选择图片
   */
  chooseImage () {
    const _this = this
    wx.chooseImage({
      sourceType: 'album',
      success: res => {
        console.log('选择图片', res)
        let { tempFilePaths, tempFiles } = res
        _this.setData({
          images: tempFilePaths
        })
      }
    })
  },

  /**
   * 预览图片
   */
  previewImage (e) {
    let { images } = this.data
    let { index } = e.currentTarget.dataset
    wx.previewImage({
      urls: images,
      current: images[index]
    })
  },

  /**
   * 移除图片
   */
  removeImage (e) {
    const _this = this
    let { images } = this.data
    let { index } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '删除该图片？',
      confirmColor: '#FC7B7B',
      success: res => {
        if (res.confirm) {
          images.splice(index, 1)
          _this.setData({
            images
          })
        }
      }
    })
  },

  /**
   * 发布帖子
   */
  submitPost () {
    app.api.submitPost({
      Name: this.data.title,
      Description: this.data.text
    }).then(res => {
      console.log('发帖结果', res)
    })
  },

  /**
   * 上传图片
   */
  uploadImages () {
    let { images } = this.data
    let uploaders = images.map((path, index) => new Promise((resolve, reject) => {
      wx.uploadFile({
        url: '', // 上传接口
        filePath: path,
        name: 'image',
        header: {},
        formData: {
          index
        },
        success: resolve,
        fail: reject
      })
    }))

    Promise.all(uploaders).then(res => {
      // 所有图片上传完毕后的结果
      console.log('图片上传结果', res)
    })
  }
})