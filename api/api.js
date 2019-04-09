const HOST = 'http://39.98.241.13:997/api'

const fetch = (url, data = {}, method = 'GET') => new Promise((resolve, reject) => {
  wx.request({
    url: `${HOST}/${url}`,
    data: {
      Platform: 1,
      ...data
    },
    header: {
      'content-type': 'application/json'
    },
    method,
    success (res) {
      res.statusCode === 200 ? resolve(res.data) : reject(res)
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
  }
}