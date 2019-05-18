// pages/post-new/post-new.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    text: '',
    images: [],
    resImages:{}
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
    this.uploadImages()
  },

  /**
   * 上传图片
   */
  uploadImages () {
    let _url = app.api.getAPIURL()
    const memberInfo = wx.getStorageSync('memberInfo')
    console.log(_url)
    let { images } = this.data
    let uploaders = images.map((path, index) => new Promise((resolve, reject) => {
      wx.uploadFile({
        url: _url+'/image/UploadImageFiles', // 上传接口
        filePath: path,
        name: 'image',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        formData: {
          "MemberId": memberInfo.Id
        },
        success: resolve,
        fail: reject
      })
    }))

    Promise.all(uploaders).then(res => {
      // 所有图片上传完毕后的结果
      console.log('图片上传结果', res)
      let uploadedImages = res.map(item => JSON.parse(item.data).Data)
      console.log('上传后的图片信息集合', uploadedImages)
      let memberInfo = wx.getStorageSync('memberInfo')
      app.api.submitPost({
        Name: this.data.title,
        Description: this.data.text,
        // ImageUrl: d.Data[0].ImageUrl,
        // ImageHeight: d.Data[0].ImageHeight,
        // ImageWidth: d.Data[0].ImageWidth,
        // MemberId: memberInfo.Id
      }).then(res => {
        console.log('发帖结果', res)
        wx.showToast({
          title: '闺蜜圈发布成功',
        })
      })
    })
  }
})