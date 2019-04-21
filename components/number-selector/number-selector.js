// components/number-selector/number-selector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 0
    },
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: Infinity
    },
    step: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentValue: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange (e) {
      const { currentValue, min, max, step } = this.data
      const { currentTarget: { dataset: { type } } } = e
      let newValue = currentValue

      if (type === 'reduce') {
        newValue = currentValue - step < min ? min : currentValue - step
      }
      if (type === 'add') {
        newValue = currentValue + step > max ? max : currentValue + step
      }

      this.setData({
        currentValue: newValue
      })

      if (currentValue !== newValue) {
        this.triggerEvent('change', {
          value: this.data.currentValue,
          type
        })
      }
    }
  },

  lifetimes: {
    attached () {
      this.setData({
        currentValue: this.data.value
      })
    }
  }
})
