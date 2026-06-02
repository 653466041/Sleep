const SHARE_IMAGE_URL = '/assets/player-artwork.png'
const DEFAULT_SHARE_TITLE = 'BabySleep 白噪音哄睡'
const DEFAULT_SHARE_PATH = '/pages/index/index'

function withShareImage<T extends { imageUrl?: string }>(content: T): T {
  return {
    imageUrl: SHARE_IMAGE_URL,
    ...content,
  }
}

export function showMiniProgramShareMenu(): void {
  wx.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  })
}

export function getHomeShare(): WechatMiniprogram.Page.ICustomShareContent {
  return withShareImage({
    title: DEFAULT_SHARE_TITLE,
    path: DEFAULT_SHARE_PATH,
  })
}

export function getHomeTimelineShare(): WechatMiniprogram.Page.ICustomTimelineContent {
  return withShareImage({
    title: DEFAULT_SHARE_TITLE,
    query: '',
  })
}

export function getCategoryShare(
  title: string,
  category: string,
): WechatMiniprogram.Page.ICustomShareContent {
  const type = encodeURIComponent(category || 'nature')
  return withShareImage({
    title: `${title || DEFAULT_SHARE_TITLE} - BabySleep`,
    path: `/pages/nature/nature?type=${type}`,
  })
}

export function getCategoryTimelineShare(
  title: string,
  category: string,
): WechatMiniprogram.Page.ICustomTimelineContent {
  const type = encodeURIComponent(category || 'nature')
  return withShareImage({
    title: `${title || DEFAULT_SHARE_TITLE} - BabySleep`,
    query: `type=${type}`,
  })
}

export function getTrackShare(
  title: string,
  id: string,
): WechatMiniprogram.Page.ICustomShareContent {
  const trackId = encodeURIComponent(id || '')
  return withShareImage({
    title: `${title || DEFAULT_SHARE_TITLE} - BabySleep`,
    path: trackId ? `/pages/player/player?id=${trackId}` : DEFAULT_SHARE_PATH,
  })
}

export function getTrackTimelineShare(
  title: string,
  id: string,
): WechatMiniprogram.Page.ICustomTimelineContent {
  const trackId = encodeURIComponent(id || '')
  return withShareImage({
    title: `${title || DEFAULT_SHARE_TITLE} - BabySleep`,
    query: trackId ? `id=${trackId}` : '',
  })
}
