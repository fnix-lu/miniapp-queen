// pages/goods-detail/goods-detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: {
      drawerBuy: false,
      modalJoin: false
    },
    goods: {},
    selected: {
      specification: '',
      amount: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.getGoodsById(query.goodsId)
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
   * 切换购买弹层
   */
  toggleDrawerBuy () {
    this.setData({
      'flag.drawerBuy': !this.data.flag.drawerBuy
    })
  },

  /**
   * 获取对应商品id的商品信息
   */
  getGoodsById (id) {
    const _this = this
    app.api.getSingleGoods({
      Id: id,
      IsContainSpecification: true,
      IsDefaultSpecification: true
    }).then(res => {
      if (!res.Data) {
        wx.showToast({
          title: '加载失败，请稍后再试',
          icon: 'none'
        })
        return
      }
      if (res.Code === 1000 && res.Data) {
        _this.setData({
          goods: res.Data,
          'selected.specification': res.Data.Specifications[0].Name
        })
      }
    })
  },

  /**
   * 选择规格
   */
  selectSpecification (e) {
    const { currentTarget: { dataset: { item } } } = e
    this.setData({
      'selected.specification': item.Name
    })
  },

  /**
   * 选择数量
   */
  selectAmount (e) {
    const { detail: { value, type } } = e
    console.log(value,type)
    this.setData({
      'selected.amount': value
    })
  }
})