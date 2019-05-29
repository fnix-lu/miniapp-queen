// components/coupon-item/coupon-item.js
const app = getApp()

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
      showBarCode: false,
      showSingleCouponRule: false
    },
    couponBarCode: '',
    singleCouponRule: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示取货码
     */
    showBarCode (e) {
      const _this = this
      let { orderId,Id } = e.currentTarget.dataset
      let barCode = ''

      if (Id) {
        app.api.GetCouponById({
          Id: Id
        }).then(res => {
          barCode = res.Data[0].BarCode
        })
      } else {
        barCode = this.data.couponData.BarCode
      }
      this.setData({
        couponBarCode: barCode,
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
    },

    /**
     * 显示单个卡券规则
     */
    showSingleCouponRule (e) {
      const { rule } = e.currentTarget.dataset
      this.setData({
        singleCouponRule: rule,
        'flag.showSingleCouponRule': true
      })
    },

    /**
     * 关闭单个卡券规则
     */
    hideSingleCouponRule () {
      this.setData({
        'flag.showSingleCouponRule': false
      })
    },
  }
})
