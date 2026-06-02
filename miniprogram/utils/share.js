const SHARE_IMAGE_URL = '/assets/player-artwork.png'
const DEFAULT_SHARE_TITLE = 'BabySleep 白噪音哄睡'
const DEFAULT_SHARE_PATH = '/pages/index/index'

function withShareImage(content) {
  return Object.assign(
    {
      imageUrl: SHARE_IMAGE_URL,
    },
    content,
  )
}

function showMiniProgramShareMenu() {
  wx.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  })
}

function getHomeShare() {
  return withShareImage({
    title: DEFAULT_SHARE_TITLE,
    path: DEFAULT_SHARE_PATH,
  })
}

function getHomeTimelineShare() {
  return withShareImage({
    title: DEFAULT_SHARE_TITLE,
    query: '',
  })
}

function getCategoryShare(title, category) {
  const type = encodeURIComponent(category || 'nature')
  return withShareImage({
    title: `${title || DEFAULT_SHARE_TITLE} - BabySleep`,
    path: `/pages/nature/nature?type=${type}`,
  })
}

function getCategoryTimelineShare(title, category) {
  const type = encodeURIComponent(category || 'nature')
  return withShareImage({
    title: `${title || DEFAULT_SHARE_TITLE} - BabySleep`,
    query: `type=${type}`,
  })
}

function getTrackShare(title, id) {
  const trackId = encodeURIComponent(id || '')
  return withShareImage({
    title: `${title || DEFAULT_SHARE_TITLE} - BabySleep`,
    path: trackId ? `/pages/player/player?id=${trackId}` : DEFAULT_SHARE_PATH,
  })
}

function getTrackTimelineShare(title, id) {
  const trackId = encodeURIComponent(id || '')
  return withShareImage({
    title: `${title || DEFAULT_SHARE_TITLE} - BabySleep`,
    query: trackId ? `id=${trackId}` : '',
  })
}

module.exports = {
  getCategoryShare,
  getCategoryTimelineShare,
  getHomeShare,
  getHomeTimelineShare,
  getTrackShare,
  getTrackTimelineShare,
  showMiniProgramShareMenu,
}
