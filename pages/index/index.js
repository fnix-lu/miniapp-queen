// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '定位',
    currentTab: 'hot',
    currentBrandId: '',
    brand: {
      currentPage: 0,
      allPageCount: 1,
      list: []
    },
    hotGroup: {
      currentPage: 0,
      allPageCount: 1,
      list: []
    },
    goodsList: [ // 分页累加存储各品牌的商品
      // {
      //   brandId: 'aaa',
      //   currentPage: 0,
      //   allPageCount: 1,
      //   list: []
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotGroup()
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
    this.getGoodsByBrandId()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 获取下一页热门组合
   */
  getHotGroup () {
    const _this = this
    const { hotGroup } = this.data

    if (hotGroup.currentPage >= hotGroup.allPageCount) {
      return
    }
    app.api.getGoods({
      PageIndex: hotGroup.currentPage + 1,
      ProductSpecificationType: 3
    }).then(res => {
      console.log(res)
    })
  },

  /**
   * 获取下一页品牌
   */
  getBrands() {
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
        // 如果是第一次请求品牌，设置初始选中的品牌（首页有'全部'，无需另行设置初始品牌）
        // if (res.PageIndex === 1) {
        //   _this.setData({
        //     'currentBrandId': res.Data[0].Id
        //   })
        // }
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
      ProductSpecificationType: 2, // 多规格
      IsContainSpecification: true,
      IsDefaultSpecification: true
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

      console.log(goodsList)
    })
  },

  /**
   * 点击热门组合标签
   */
  tapTabHot () {
    this.setData({
      currentTab: 'hot'
    })
  },

  /**
   * 点击品牌分类标签
   */
  tapTabBrand() {
    const _this = this
    const { brand } = this.data
    this.setData({
      currentTab: 'brand'
    })

    // 如果还没获取品牌数据
    if (brand.list.length === 0) {
      _this.getBrands()
    }
  },

  /**
   * 获取定位城市
   */
  getLocation () {
    app.getLocation()
  }
})