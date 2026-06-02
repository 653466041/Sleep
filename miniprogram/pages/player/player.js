const player = require('../../services/player')
const share = require('../../utils/share')
const navigation = require('../../utils/navigation')

function getRouteOptions() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage && currentPage.options ? currentPage.options : {}
}

Component({
  data: {
    trackId: '',
    trackTitle: '自然助眠音',
    trackUrl: '',
    isPlaying: false,
    statusText: '已暂停',
    timerValue: '30',
    volume: 70,
    timerOptions: [
      { label: '15分钟', value: '15' },
      { label: '30分钟', value: '30' },
      { label: '60分钟', value: '60' },
      { label: '无', value: 'none' },
    ],
  },

  lifetimes: {
    attached() {
      share.showMiniProgramShareMenu()

      this.unsubscribePlayer = player.subscribe((state) => {
        this.setData({
          trackId: state.trackId,
          trackTitle: state.trackTitle,
          trackUrl: state.trackUrl,
          isPlaying: state.isPlaying,
          statusText: state.statusText,
          volume: typeof state.volume === 'number' ? state.volume : this.data.volume,
          timerValue: state.timerValue || this.data.timerValue,
        })
      })
      this.loadTrackFromRoute()
    },

    detached() {
      if (this.unsubscribePlayer) {
        this.unsubscribePlayer()
        this.unsubscribePlayer = null
      }
    },
  },

  pageLifetimes: {
    show() {
      this.loadTrackFromRoute()
    },
  },

  methods: {
    loadTrackFromRoute() {
      const options = getRouteOptions()
      const id = String(options.id || '')
      if (!id || id === this.data.trackId) {
        return
      }

      player.playTrackById(id)
    },

    onBackTap() {
      navigation.navigateBackOrHome()
    },

    onFavoriteTap() {
      wx.showToast({
        title: '已收藏',
        icon: 'none',
      })
    },

    onPreviousTap() {
      wx.showToast({
        title: '上一首',
        icon: 'none',
      })
    },

    onNextTap() {
      wx.showToast({
        title: '下一首',
        icon: 'none',
      })
    },

    onPlayPauseTap() {
      player.togglePlay()
    },

    onTimerTap(event) {
      const timerValue = String(event.currentTarget.dataset.value || '30')
      this.setData({
        timerValue,
      })
      player.setSleepTimer(timerValue)
    },

    onVolumeChanging(event) {
      const volume = Number(event.detail.value)
      player.setVolume(volume)
    },

    onShareAppMessage() {
      return share.getTrackShare(this.data.trackTitle, this.data.trackId)
    },

    onShareTimeline() {
      return share.getTrackTimelineShare(this.data.trackTitle, this.data.trackId)
    },
  },
})
