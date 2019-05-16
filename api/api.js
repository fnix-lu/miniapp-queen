// const HOST = 'http://localhost:62407/api'
const HOST = 'http://39.98.241.13:997/api'



const fetch = (url, data = {}, method = 'GET') => new Promise((resolve, reject) => {
  wx.showLoading({
    title: '请稍候...',
    mask: true
  })
  console.log('fetch is begin!' + url)
  const memberInfo = wx.getStorageSync('memberInfo')

  wx.request({
    url: `${HOST}/${url}`,
    data: {
      Platform: 1,
      // CustomerId: '5d7f97ca-7563-4c38-a6e6-ce35ef65cf3b',
      MemberId: memberInfo ? memberInfo.Id : '',
      // Id: '5d7f97ca-7563-4c38-a6e6-ce35ef65cf3b',
      ...data
    },
    header: {
      'content-type': 'application/json'
    },
    method,
    complete () {
      wx.hideLoading()
    },
    success (res) {
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
  


  // 获取学校列表
  getSchools (data) {
    return fetch('agentregion/GetAgentRegions', data)
  },



  // 获取闺蜜圈列表
  getForumList (data) {
    console.log('start fetch forums data!')
    var result= fetch('forum/GetGirlForums', data)
    //console.log(result)
    return result
  },
  // 获取帖子内容
  getPostContent (data) {
    return fetch('forum/GetGirlForumById', data)
  },
  // 获取帖子评论列表
  getPostComments (data) {
    return fetch('forum/GetLeavesByGirlForumId', data)
  },
  // 发表对帖子的留言
  submitComment (data) {
    return fetch('forum/LeaveMessageForGirlForum', data,'POST')
  },
  // 发表对留言的回复
  submitReply (data) {
    return fetch('forum/ReplyForLeaveMessage', data,'POST')
  },
  // 发布帖子
  submitPost (data) {
    return fetch('forum/AddGirlForum', data, 'POST')
  },
  // 获取我的闺蜜圈消息
  getReplyMessages (data) {
    return fetch('forum/GetGirlForumReplyAndLeaves', data)
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
  // 提交订单
  submitOrder (data) {
    return fetch('order/AddOrder', data, 'POST')
  },



  // 获取发起支付的参数
  getPaymentParams (data) {
    return fetch('pay/CreateWechatPayment', data, 'POST')
  },



  // 获取订单列表
  getOrders (data) {
    return fetch('order/GetOrders', data)
  },



  // 获取待成团
  getCrowdOrders (data) {
    return fetch('croworder/GetCrowdOrders', data)
  },



  // 获取卡券列表
  getCoupons (data) {
    return fetch('coupon/GetCoupons', data)
  },
  // 获取卡包列表
  getCouponPackages (data) {
    return fetch('coupon/GetCouponBags', data)
  },



  // 登录
  login (data) {
    return fetch('customer/AddMember', data, 'POST')
  },
  // 提交反馈
  submitFeedback (data) {
    return fetch('customer/AddMemberSuggest', data, 'POST')
  },
  // 保存个人资料
  submitProfile (data) {
    return fetch('customer/UpdateMember', data, 'POST')
  },
  // 获取用户资料
  getMemberInfo (data) {
    return fetch('customer/GetMemberById', data)
  },



  // 获取首页轮播广告
  getAdvertisements (data) {
    return fetch('advertise/GetAdvertises', data)
  }
}