// pages/profile/profile.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile: {
      phone: '',
      birthday: '2019-3-30',
      provinceIndex: '0',
      province: '',
      cityIndex: '0',
      city: '',
      schoolIndex: '0',
      school: 'b'
    },
    range: {
      province: [],
      city: [],
      school: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvincesAll()
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
   * 选择生日
   */
  changeBirthday (e) {
    const { detail: { value } } = e
    this.setData({
      'profile.birthday': value,
    })
  },

  /**
   * 选择省份
   */
  changeProvince (e) {
    const { data: { range: { province } } } = this
    const { detail: { value } } = e
    this.setData({
      'profile.provinceIndex': value,
      'profile.province': province[value].Name
    })
    this.getCitiesByProvinceId()
  },

  /**
   * 选择城市
   */
  changeCity (e) {
    const { data: { range: { city } } } = this
    const { detail: { value } } = e
    this.setData({
      'profile.cityIndex': value,
      'profile.city': city[value].Name
    })
  },

  /**
   * 选择学校
   */
  changeSchool (e) {
    const { data: { range: { school } } } = this
    const { detail: { value } } = e
    this.setData({
      'profile.school': school[value]
    })
  },

  /**
   * 获取选中项的index
   */
  selectedIndexOf (key) {
    const { profile, range } = this.data
    return range[key].indexOf(profile[key])
  },

  /**
   * 请求所有省份
   */
  getProvincesAll () {
    const _this = this
    app.api.getProvinces({
      PageSize: 50
    }).then(res => {
      console.log('province', res)
      if (res.Code === 1000) {
        _this.setData({
          'range.province': res.Data
        })
      }
    })
  },

  /**
   * 请求省份对应的城市
   */
  getCitiesByProvinceId () {
    const _this = this
    const { profile, range } = this.data
    app.api.getCities({
      PageSize: 50,
      ProvinceId: range.province[profile.provinceIndex].Id
    }).then(res => {
      if (res.Code === 1000) {
        console.log('city', res)
        _this.setData({
          'range.city': res.Data
        })
      }
    })
  }
})