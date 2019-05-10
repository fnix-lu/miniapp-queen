// components/group-member/group-member.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isLeader: {
      type: Boolean,
      value: false
    },
    isFirst: {
      type: Boolean,
      value: false
    },
    headImage: {
      type: String,
      value: '/assets/img/headimg_null.png'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
