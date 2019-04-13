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
      provinceIndex: '1',
      province: '',
      cityIndex: '1',
      city: '',
      schoolIndex: '1',
      school: 'b'
    },
    range: {
      province: ['江苏', '浙江'],
      city: ['苏州', '无锡'],
      school: ['a', 'b']
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
      'profile.province': province[value]
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
      'profile.city': city[value]
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
    app.api.getProvinces({
      PageSize: 50
    }).then(res => {
      console.log('province', res)
    })
  },

  /**
   * 请求省份对应的城市
   */
  getCitiesByProvinceId () {
    app.api.getCities({
      PageSize: 50
    }).then(res => {
      console.log('city', res)
    })
  }
})