import {
  type AudioCategory,
  type AudioTrack,
  categoryTitles,
  getTracksByCategory,
} from '../../data/audio'
import * as player from '../../services/player'
import {
  getCategoryShare,
  getCategoryTimelineShare,
  showMiniProgramShareMenu,
} from '../../utils/share'
import { navigateBackOrHome } from '../../utils/navigation'

type ListTrack = AudioTrack & {
  meta: string
  active: boolean
}

type NatureInstance = WechatMiniprogram.Component.TrivialInstance & {
  unsubscribePlayer?: () => void
}

const categoryFallback: AudioCategory = 'nature'
const categoryDisplayTitles: Record<AudioCategory, string> = {
  womb: '哭闹安抚',
  nature: '自然放松',
  melody: '陪伴入睡',
}

function normalizeCategory(value: unknown): AudioCategory {
  if (value === 'womb' || value === 'melody' || value === 'nature') {
    return value
  }

  return categoryFallback
}

function formatDuration(seconds: number): string {
  const minutes = Math.max(1, Math.round(seconds / 60))
  return `${minutes}:00`
}

function getRouteCategory(): AudioCategory {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as unknown as {
    options?: Record<string, string | undefined>
  }
  const options = currentPage && currentPage.options ? currentPage.options : {}
  return normalizeCategory(options.type)
}

function toListTrack(track: AudioTrack, index: number, category: AudioCategory): ListTrack {
  return {
    ...track,
    meta: `${formatDuration(track.duration)} · ${categoryDisplayTitles[category] || categoryTitles[category]}`,
    active: false,
  }
}

function setCategoryData(component: WechatMiniprogram.Component.TrivialInstance, category: AudioCategory) {
  const currentData = component.data as {
    miniTrackId?: string
  }
  const tracks = getTracksByCategory(category).map((track, index) =>
    toListTrack(track, index, category),
  )
  const firstTrack = tracks[0]
  const selectedTrack = tracks.find((track) => track.id === currentData.miniTrackId) || firstTrack

  component.setData({
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
}

Component({
  data: {
    pageTitle: categoryDisplayTitles[categoryFallback],
    currentCategory: categoryFallback,
    tracks: [] as ListTrack[],
    miniTitle: '',
    miniStatus: '已暂停',
    miniIcon: 'rainy',
    miniPlaying: false,
    miniTrackId: '',
  },

  lifetimes: {
    attached() {
      showMiniProgramShareMenu()
      setCategoryData(this, getRouteCategory())
      const instance = this as NatureInstance
      instance.unsubscribePlayer = player.subscribe((state) => {
        instance.setData({
          miniTitle: state.trackTitle || instance.data.miniTitle,
          miniStatus: state.statusText,
          miniPlaying: state.isPlaying,
        })
      })
    },

    detached() {
      const instance = this as NatureInstance
      if (instance.unsubscribePlayer) {
        instance.unsubscribePlayer()
        instance.unsubscribePlayer = undefined
      }
    },
  },

  pageLifetimes: {
    show() {
      setCategoryData(this, getRouteCategory())
    },
  },

  methods: {
    loadCategory(category: AudioCategory) {
      setCategoryData(this, category)
    },

    onBackTap() {
      navigateBackOrHome()
    },

    onTrackTap(event: WechatMiniprogram.BaseEvent) {
      const id = String(event.currentTarget.dataset.id || '')
      if (!id) {
        return
      }

      const selectedTrack = this.data.tracks.find((track: ListTrack) => track.id === id)
      this.setData({
        tracks: this.data.tracks.map((track: ListTrack) => ({
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
        player.playTrackById(String(this.data.miniTrackId))
      }
    },

    onShareAppMessage() {
      return getCategoryShare(String(this.data.pageTitle), String(this.data.currentCategory))
    },

    onShareTimeline() {
      return getCategoryTimelineShare(String(this.data.pageTitle), String(this.data.currentCategory))
    },
  },
})
