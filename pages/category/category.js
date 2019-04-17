// pages/category/category.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: {
      showCart: false,
      showCover: false,
      isCartAllSelected: false
    },
    currentBrandId: '',
    brand: {
      currentPage: 0,
      allPageCount: 1,
      list: []
    },
    goodsList: [ // 分页累加存储各品牌的商品，由于每个品牌下的商品均为分页获取，不适合做品牌混合的商品列表，菜单无法左右联动
      // {
      //   brandId: 'aaa',
      //   currentPage: 0,
      //   allPageCount: 1,
      //   list: []
      // }
    ],
    cart: [
      { id: 'x0000', name: 'A', checked: false },
      { id: 'y1111', name: 'Z', checked: false }
    ]
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
   * 获取下一页品牌
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
          'brand.list': _this.data.brand.list.concat(res.Data)
        })
        // 如果是第一次请求品牌，设置初始选中的品牌
        if (res.PageIndex === 1) {
          _this.setData({
            'currentBrandId': res.Data[0].Id
          })
        }
        // 如果尚未获取任何品牌的商品，获取初始品牌的商品
        if (_this.data.goodsList.length === 0) {
          _this.getGoodsByBrandId()
        }
      }
    })
  },

  /**
   * 切换品牌
   */
  changeBrand(e) {
    this.setData({
      currentBrandId: e.currentTarget.dataset.id
    })
    // 如果该品牌商品未曾获取过，则获取该品牌的商品
    let { currentBrandId, goodsList } = this.data
    let index = goodsList.findIndex((item) => {
      return item.brandId === currentBrandId
    })
    if (index < 0) {
      this.getGoodsByBrandId()
    }
  },

  /**
   * 获取对应品牌的下一页商品
   */
  getGoodsByBrandId () {
    const _this = this
    let { currentBrandId, goodsList } = _this.data

    let index = goodsList.findIndex((item) => {
      return item.brandId === currentBrandId
    })

    let pageIndex = 1

    if (index > -1) {
      if (goodsList[index].currentPage >= goodsList[index].allPageCount) {
        return
      } else {
        pageIndex = goodsList[index].currentPage + 1
      }
    }

    app.api.getGoods({
      BrandId: currentBrandId,
      PageIndex: pageIndex,
      ProductSpecificationType: 1 // 单品
    }).then(res => {
      if (res.Code === 1000) {
        if (index > -1) {
          _this.setData({
            ['goodsList[' + index + '].currentPage']: res.PageIndex,
            ['goodsList[' + index + '].allPageCount']: res.AllPageCount,
            ['goodsList[' + index + '].list']: _this.data.goodsList[index].list.concat(res.Data),
          })
        } else {
          _this.data.goodsList.push({
            brandId: currentBrandId,
            currentPage: res.PageIndex,
            allPageCount: res.AllPageCount,
            list: res.Data
          })
          _this.setData({
            goodsList: _this.data.goodsList
          })
        }
      }

      console.log('自由搭配单品显示列表 累加', goodsList)
    })
  },

  /**
   * 选择列表商品数量
   */
  handleSelectGoods (e) {
    let { value } = e.detail
    console.log(value)
  },

  /**
   * 购物车勾选单个商品
   */
  handleCartItemChange (e) {
    const { currentTarget: { dataset: { index } } } = e
    this.setData({
      ['cart[' + index + '].checked']: !this.data.cart[index].checked
    })
    this.setData({
      'flag.isCartAllSelected': this.isCartAllSelected()
    })
    console.log('购物车', this.data.cart)
    console.log('是否已全选', this.data.flag.isCartAllSelected)
  },

  /**
   * 购物车全选、反选
   */
  handleCartAllChange () {
    const _this = this
    let { flag, cart } = this.data
    this.setData({
      'flag.isCartAllSelected': !flag.isCartAllSelected
    })
    cart.forEach((item, index) => {
      _this.setData({
        ['cart[' + index + '].checked']: flag.isCartAllSelected
      })
    })
  },

  /**
   * 检查购物车是否已全部选中
   */
  isCartAllSelected () {
    return this.data.cart.every(item => item.checked)
  },

  /**
   * 提交订单
   */
  toSettlement () {
    console.log('去结算的商品', this.getToSettleItems())
  },

  /**
   * 返回选中的商品id组成的数组
   */
  getToSettleItems () {
    let arr = []
    return arr
  }
})