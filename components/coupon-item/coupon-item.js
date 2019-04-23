// components/coupon-item/coupon-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: {
      showBarCode: false
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示取货码
     */
    showBarCode () {
      this.setData({
        'flag.showBarCode': true
      })
    },

    /**
     * 关闭取货码
     */
    hideBarCode () {
      this.setData({
        'flag.showBarCode': false
      })
    }
  }
})
