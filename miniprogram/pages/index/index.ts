import * as player from '../../services/player'
import { categoryTitles, getTrackById } from '../../data/audio'
import {
  getHomeShare,
  getHomeTimelineShare,
  showMiniProgramShareMenu,
} from '../../utils/share'

type RecentTrack = {
  id: string
  title: string
  meta: string
  icon: string
}

type IndexInstance = WechatMiniprogram.Component.TrivialInstance & {
  unsubscribePlayer?: () => void
}

const categoryShortTitles = {
  womb: '哭闹安抚',
  nature: '自然放松',
  melody: '陪伴入眠',
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const restSeconds = seconds % 60

  if (!restSeconds) {
    return `${minutes}分钟`
  }

  return `${minutes}分钟${restSeconds}秒`
}

function toRecentTrack(id: string): RecentTrack | undefined {
  const track = getTrackById(id)
  if (!track) {
    return undefined
  }

  return {
    id: track.id,
    title: track.title,
    meta: `${categoryShortTitles[track.category] || categoryTitles[track.category]} · ${formatDuration(track.duration)}`,
    icon: track.icon,
  }
}

function updateRecentTracks(recentTracks: RecentTrack[], trackId: string): RecentTrack[] {
  const recentTrack = toRecentTrack(trackId)
  if (!recentTrack) {
    return recentTracks
  }

  const restTracks = recentTracks.filter((track) => track.id !== trackId)
  return [recentTrack, ...restTracks].slice(0, 3)
}

Component({
  data: {
    currentTab: 'home',
    playerTitle: '雨声加风扇',
    playerStatus: '已暂停',
    playerPlaying: false,
    playerTrackId: 'audio-034',
    recentTracks: [
      {
        id: 'audio-034',
        title: '雨声加风扇',
        meta: '哭闹安抚 · 5分钟',
        icon: 'mode_fan',
      },
      {
        id: 'audio-015',
        title: '溪流加鸟鸣',
        meta: '自然放松 · 5分钟',
        icon: 'water_drop',
      },
      {
        id: 'audio-001',
        title: '嘘嘘加钢琴',
        meta: '陪伴入眠 · 2分钟49秒',
        icon: 'hearing',
      },
    ],
  },

  lifetimes: {
    attached() {
      showMiniProgramShareMenu()

      const instance = this as IndexInstance
      instance.unsubscribePlayer = player.subscribe((state) => {
        const recentTracks = state.trackId
          ? updateRecentTracks(this.data.recentTracks, state.trackId)
          : this.data.recentTracks

        instance.setData({
          playerTitle: state.trackTitle || this.data.playerTitle,
          playerStatus: state.statusText,
          playerPlaying: state.isPlaying,
          playerTrackId: state.trackId || this.data.playerTrackId,
          recentTracks,
        })
      })
    },

    detached() {
      const instance = this as IndexInstance
      if (instance.unsubscribePlayer) {
        instance.unsubscribePlayer()
        instance.unsubscribePlayer = undefined
      }
    },
  },

  methods: {
    onMenuTap() {
      wx.showToast({
        title: '白噪音',
        icon: 'none',
      })
    },

    onCategoryTap(event: WechatMiniprogram.BaseEvent) {
      const type = String(event.currentTarget.dataset.type || 'nature')
      wx.navigateTo({
        url: `../nature/nature?type=${encodeURIComponent(type)}`,
      })
    },

    onPlayTap(event: WechatMiniprogram.BaseEvent) {
      const id = String(event.currentTarget.dataset.id || 'audio-034')
      wx.navigateTo({
        url: `../player/player?id=${encodeURIComponent(id)}`,
      })
    },

    onTimerTap() {
      wx.navigateTo({
        url: `../player/player?id=${encodeURIComponent(String(this.data.playerTrackId))}`,
      })
    },

    onPauseTap() {
      if (!player.togglePlay()) {
        player.playTrackById(String(this.data.playerTrackId))
      }
    },

    onPlayerTap() {
      wx.navigateTo({
        url: `../player/player?id=${encodeURIComponent(String(this.data.playerTrackId))}`,
      })
    },

    onNavTap(event: WechatMiniprogram.BaseEvent) {
      const tab = event.currentTarget.dataset.tab || 'home';
      this.setData({
        currentTab: String(tab),
      })
    },

    onShareAppMessage() {
      return getHomeShare()
    },

    onShareTimeline() {
      return getHomeTimelineShare()
    },
  },
})
