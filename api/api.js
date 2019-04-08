const HOST = 'http://39.98.241.13:997/api'

const fetch = (url, data) => new Promise((resolve, reject) => {
  wx.request({
    url: `${HOST}/${url}`,
    data: {
      Plantform: 1,
      ...data
    },
    success: res => {
      if (res.code === 200) {
        resolve(res.data)
      }
    },
    fail: reject(res)
  })
})

module.exports = {
  getBrands () {
    return fetch('product/GetProducts')
  }
}