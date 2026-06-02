const { categoryTitles, getTracksByCategory } = require('../../data/audio')
const player = require('../../services/player')

const categoryFallback = 'nature'
const categoryDisplayTitles = {
  womb: '哭闹安抚',
  nature: '自然放松',
  melody: '陪伴入睡',
}

function normalizeCategory(value) {
  if (value === 'womb' || value === 'melody' || value === 'nature') {
    return value
  }

  return categoryFallback
}

function formatDuration(seconds) {
  const minutes = Math.max(1, Math.round(seconds / 60))
  return `${minutes}:00`
}

function getRouteCategory() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage && currentPage.options ? currentPage.options : {}
  return normalizeCategory(options.type)
}

function toListTrack(track, index, category) {
  return {
    ...track,
    meta: `${formatDuration(track.duration)} · ${categoryDisplayTitles[category] || categoryTitles[category]}`,
    active: false,
  }
}

Component({
  data: {
    pageTitle: categoryDisplayTitles[categoryFallback],
    currentCategory: categoryFallback,
    tracks: [],
    miniTitle: '',
    miniStatus: '已暂停',
    miniIcon: 'rainy',
    miniPlaying: false,
    miniTrackId: '',
  },

  lifetimes: {
    attached() {
      this.loadCategory(getRouteCategory())
      this.unsubscribePlayer = player.subscribe((state) => {
        this.setData({
          miniTitle: state.trackTitle || this.data.miniTitle,
          miniStatus: state.statusText,
          miniPlaying: state.isPlaying,
        })
      })
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
      this.loadCategory(getRouteCategory())
    },
  },

  methods: {
    loadCategory(category) {
      const activeId = this.data.miniTrackId
      const tracks = getTracksByCategory(category).map((track, index) =>
        toListTrack(track, index, category),
      )
      const firstTrack = tracks[0]
      const selectedTrack = tracks.find((track) => track.id === activeId) || firstTrack

      this.setData({
        pageTitle: categoryDisplayTitles[category] || categoryTitles[category],
        currentCategory: category,
        tracks: tracks.map((track) => ({
          ...track,
          active: selectedTrack ? track.id === selectedTrack.id : false,
        })),
        miniTitle: selectedTrack ? selectedTrack.title : '',
        miniStatus: selectedTrack ? '已暂停' : '暂无音频',
        miniIcon: selectedTrack ? selectedTrack.icon : 'rainy',
        miniTrackId: selectedTrack ? selectedTrack.id : '',
      })
    },

    onBackTap() {
      wx.navigateBack()
    },

    onTrackTap(event) {
      const id = String(event.currentTarget.dataset.id || '')
      if (!id) {
        return
      }

      const selectedTrack = this.data.tracks.find((track) => track.id === id)
      this.setData({
        tracks: this.data.tracks.map((track) => ({
          ...track,
          active: track.id === id,
        })),
        miniTitle: selectedTrack ? selectedTrack.title : this.data.miniTitle,
        miniIcon: selectedTrack ? selectedTrack.icon : this.data.miniIcon,
        miniTrackId: id,
      })

      wx.navigateTo({
        url: `../player/player?id=${encodeURIComponent(id)}`,
      })
    },

    onTimerTap() {
      wx.navigateTo({
        url: `../player/player?id=${encodeURIComponent(String(this.data.miniTrackId))}`,
      })
    },

    onMiniPlayerTap() {
      wx.navigateTo({
        url: `../player/player?id=${encodeURIComponent(String(this.data.miniTrackId))}`,
      })
    },

    onPauseTap() {
      if (!player.togglePlay() && this.data.miniTrackId) {
        player.playTrackById(this.data.miniTrackId)
      }
    },
  },
})
