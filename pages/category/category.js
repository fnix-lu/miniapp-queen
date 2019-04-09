// pages/category/category.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: {
      showCart: false,
      showCover: false
    },
    currentBrandId: '',
    brand: {
      currentPage: 0,
      allPageCount: 1,
      list: []
    },
    goods: {
      currentPage: 0,
      allPageCount: 1
    },
    goodsMap: {
      'brand-id': []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    _this.getBrands()
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
   * 切换显示购物车弹层
   */
  toggleShowCart () {
    this.setData({
      'flag.showCover': !this.data.flag.showCover,
      'flag.showCart': !this.data.flag.showCart
    })
  },

  /**
   * 获取品牌
   */
  getBrands () {
    const _this = this
    
    if (_this.data.brand.currentPage >= _this.data.brand.allPageCount) {
      return
    }
    app.api.getBrands({
      PageIndex: _this.data.brand.currentPage + 1,
      PageSize: 10
    }).then(res => {
      if (res.Code === 1000) {
        _this.setData({
          'brand.currentPage': res.PageIndex,
          'brand.allPageCount': res.AllPageCount,
          'brand.list': _this.data.brand.list.concat(res.Data),
        })
        // 设置初始选中的品牌
        if (res.PageIndex === 1) {
          _this.setData({
            'currentBrandId': res.Data[0].Id
          })
        }
        // 获取初始品牌的商品
        _this.getGoods()
      }
    })
  },

  /**
   * 获取商品
   */
  getGoods () {
    const _this = this

    app.api.getGoods({
      BrandId: _this.data.currentBrandId
    }).then(res => {
      console.log(res)

      if (res.Code === 1000) {
        _this.setData({
          // 'goodsMap[_this.data.currentBrandId]': _this.data.goodsMap[_this.data.currentBrandId]
        })
      }
    })
  },

  /**
   * 切换品牌
   */
  changeBrand (e) {
    this.setData({
      currentBrandId: e.currentTarget.dataset.id
    })
    // 获取对应品牌的商品
    this.getGoods()
  }
})