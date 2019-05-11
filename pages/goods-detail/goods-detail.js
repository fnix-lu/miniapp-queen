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
      specification: {},
      amount: 1
    },
    groups: [],
    currentGroup: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.getGoodsById(query.goodsId)
    this.getCrowdOrdersById(query.goodsId)
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
      ProductSpecificationType: 2, // 多规格
      IsContainSpecification: true // 包含所有规格列表
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
          'selected.specification': res.Data.Specifications[0] // 默认选中第一个规格，显示对应价格
        })
      }
      console.log('商品信息', _this.data.goods)
    })
  },

  /**
   * 选择规格
   */
  selectSpecification (e) {
    const { currentTarget: { dataset: { item } } } = e
    this.setData({
      'selected.specification': item
    })
  },

  /**
   * 选择数量
   */
  selectAmount (e) {
    const { detail: { value, type } } = e // type: minus plus
    this.setData({
      'selected.amount': value
    })
  },

  /**
   * 获取正在进行的拼团
   */
  getCrowdOrdersById (id) {
    const _this = this
    app.api.getCrowdOrders({
      PageSize: 10000,
      IsContainParticipation: true,
      ProductId: id
    }).then(res => {
      console.log('拼团列表', res)
      _this.setData({
        groups: res.Data
      })
    })
  },

  /**
   * 弹出参团提示框，设置提示框数据
   */
  showModalJoin (e) {
    const _this = this
    let { group } = e.currentTarget.dataset

    this.setData({
      currentGroup: group
    }, () => {
      _this.setData({
        'flag.modalJoin': true
      })
    })
  },

  /**
   * 隐藏参团提示框
   */
  hideModalJoin () {
    this.setData({
      'flag.modalJoin': false
    })
  }
})