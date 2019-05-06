// pages/profile/profile.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile: {
      phone: '',
      birthday: '',
      provinceIndex: 0,
      province: '',
      cityIndex: 0,
      city: '',
      schoolIndex: 0,
      school: ''
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
    const _this = this
    const memberInfo = wx.getStorageSync('memberInfo')
    this.setData({
      'profile.phone': memberInfo.PhoneNumber || '',
      'profile.birthday': memberInfo.Birthday || '',
      'profile.province': memberInfo.Province || '',
      'profile.city': memberInfo.City || '',
      'profile.school': memberInfo.School || ''
    })
    this.getProvincesAll().then(() => {
      // 如果有省份初值，获取对应的城市列表
      if (_this.data.profile.province) {
        _this.getCitiesByProvinceId()
      }
    })
    this.getSchoolsAll()
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
      'profile.schoolIndex': value,
      'profile.school': school[value].School
    })
  },

  /**
   * 获取选中项的index, field为遍历的对象中用于显示的字段，省市为Name，学校为School
   */
  getRangeIndexOf (key, field) {
    const { profile, range } = this.data
    let index = 0
    for (let i = 0; i < range[key].length; i++) {
      if (range[key][i][field].indexOf(profile[key]) > -1) {
        index = i
        break
      }
    }
    return index
  },

  /**
   * 请求所有省份
   */
  getProvincesAll () {
    const _this = this
    return app.api.getProvinces({
      PageSize: 50
    }).then(res => {
      console.log('province', res)
      _this.setData({
        'range.province': res.Data
      })
      _this.setData({
        'profile.provinceIndex': _this.getRangeIndexOf('province', 'Name')
      })
    })
  },

  /**
   * 请求省份对应的所有城市
   */
  getCitiesByProvinceId () {
    const _this = this
    const { profile, range } = this.data
    app.api.getCities({
      PageSize: 50,
      ProvinceId: range.province[profile.provinceIndex].Id
    }).then(res => {
      console.log('city', res)
      _this.setData({
        'range.city': res.Data
      })
      _this.setData({
        'profile.cityIndex': _this.getRangeIndexOf('city', 'Name')
      })
    })
  },

  /**
   * 请求所有学校
   */
  getSchoolsAll () {
    const _this = this
    app.api.getSchools({
      PageSize: 100000
    }).then(res => {
      console.log('school', res)
      _this.setData({
        'range.school': res.Data
      })
      _this.setData({
        'range.schoolIndex': _this.getRangeIndexOf('school', 'School')
      })
    })
  },

  /**
   * 保存个人资料
   */
  submitProfile () {
    const _this = this
    const { phone, birthday, province, city, school } = this.data.profile
    app.api.submitProfile({
      Id: wx.getStorageSync('memberInfo').Id,
      PhoneNumber: phone,
      Birthday: birthday,
      Province: province,
      City: city,
      Region: school
    }).then(res => {
      console.log('保存资料', res)
      if (res.Data) {
        wx.showToast({
          title: '保存成功',
          mask: true,
          duration: 1000
        })
        _this.updataMemberInfo()
        let timer = setTimeout(() => {
          clearTimeout(timer)
          wx.navigateBack()
        }, 1000)
      }
    })
  },

  /**
   * 获取最新用户信息并更新本地存储
   */
  updataMemberInfo () {
    app.api.getMemberInfo({
      Id: wx.getStorageSync('memberInfo').Id
    }).then(res => {
      wx.setStorageSync('memberInfo', res.Data)
    })
  }
})