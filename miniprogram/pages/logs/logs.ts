// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'
import {
  getHomeShare,
  getHomeTimelineShare,
  showMiniProgramShareMenu,
} from '../../utils/share'

Component({
  data: {
    logs: [],
  },
  lifetimes: {
    attached() {
      showMiniProgramShareMenu()
      this.setData({
        logs: (wx.getStorageSync('logs') || []).map((log: string) => {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log
          }
        }),
      })
    }
  },
  methods: {
    onShareAppMessage() {
      return getHomeShare()
    },

    onShareTimeline() {
      return getHomeTimelineShare()
    },
  },
})
