const HOST = 'http://39.98.241.13:997/api'

const fetch = (url, data = {}, method = 'GET') => new Promise((resolve, reject) => {
  wx.showLoading({
    title: '努力加载中...',
    mask: true
  })
  wx.request({
    url: `${HOST}/${url}`,
    data: {
      Platform: 1,
      // CustomerId: '5d7f97ca-7563-4c38-a6e6-ce35ef65cf3b',
      MemberId: '5d7f97ca-7563-4c38-a6e6-ce35ef65cf3b',
      // Id: '5d7f97ca-7563-4c38-a6e6-ce35ef65cf3b',
      ...data
    },
    header: {
      'content-type': 'application/json'
    },
    method,
    success (res) {
      wx.hideLoading()
      // res.statusCode === 200 ? resolve(res.data) : reject(res)
      if (res.statusCode !== 200) {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
        return
      }
      if (res.data.Code === 1000) {
        resolve(res.data)
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
    }
  })
})

module.exports = {
  // 获取品牌列表
  getBrands (data) {
    return fetch('product/GetProductBrands', data)
  },
  
  // 获取商品列表
  getGoods (data) {
    return fetch('product/GetProducts', data)
  },

  // 获取单个商品详情
  getSingleGoods (data) {
    return fetch('product/GetProductById', data)
  },

  // 获取省份
  getProvinces (data) {
    return fetch('system/GetProvinces', data)
  },

  // 获取城市
  getCities (data) {
    return fetch('system/GetCities', data)
  },

  // 获取闺蜜圈列表
  getForumList (data) {
    return fetch('forum/GetGirlForums', data, 'POST')
  },

  // 获取帖子内容
  getPostContent (data) {
    return fetch('forum/GetGirlForumById', data, 'POST')
  },

  // 获取帖子评论列表
  getPostComments (data) {
    return fetch('/forum/GetGirlForumReplyAndLeaves', data, 'POST')
  },

  // 发布帖子
  submitPost (data) {
    return fetch('/forum/AddGirlForum', data, 'POST')
  },

  // 获取购物车列表
  getCart (data) {
    return fetch('order/GetBuyShopCarts', data)
  },

  // 新增购物车商品
  addCart (data) {
    return fetch('order/AddBuyShopCart', data, 'POST')
  },

  // 修改购物车商品
  editCart(data) {
    return fetch('order/UpdateBuyShopCart', data, 'POST')
  },

  // 删除单个购物车商品
  deleteCartItem (data) {
    return fetch('order/DeleteBuyShopCart', data, 'POST')
  },

  // 清空购物车
  clearCart (data) {
    return fetch('order/ClearBuyShopCart', data, 'POST')
  },

  // 获取卡券列表
  getCoupons (data) {
    return fetch('coupon/GetCoupons', data)
  },

  // 登录
  login (data) {
    return fetch('customer/AddMember', data, 'POST')
  },

  // 提交反馈
  submitFeedback (data) {
    return fetch('customer/AddMemberSuggest', data, 'POST')
  },

  // 获取首页轮播广告
  getAdvertisements (data) {
    return fetch('advertise/GetAdvertises', data)
  }
}