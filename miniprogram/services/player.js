const { getTrackById } = require('../data/audio')

const manager = wx.getBackgroundAudioManager()
const AUDIO_CACHE_KEY = 'audioCache:v1'
const AUDIO_CACHE_LIMIT = 3
const DEFAULT_TIMER_VALUE = '30'
const TIMER_MINUTES = {
  '15': 15,
  '30': 30,
  '60': 60,
}

let initialized = false
let state = {
  trackId: '',
  trackTitle: '雨声加风扇',
  trackUrl: '',
  isPlaying: false,
  statusText: '已暂停',
  volume: 70,
  timerValue: DEFAULT_TIMER_VALUE,
}
const listeners = []
let sleepTimer

function getCacheEntries() {
  try {
    const entries = wx.getStorageSync(AUDIO_CACHE_KEY)
    return Array.isArray(entries) ? entries : []
  } catch {
    return []
  }
}

function setCacheEntries(entries) {
  try {
    wx.setStorageSync(AUDIO_CACHE_KEY, entries)
  } catch {
    // Storage failures should not block playback.
  }
}

function fileExists(filePath) {
  if (!filePath || !wx.getFileSystemManager) {
    return false
  }

  try {
    wx.getFileSystemManager().accessSync(filePath)
    return true
  } catch {
    return false
  }
}

function removeSavedAudio(filePath) {
  if (!filePath || !wx.removeSavedFile) {
    return
  }

  wx.removeSavedFile({
    filePath,
    fail() {
      // The file may already have been removed by the system or user cleanup.
    },
  })
}

function pruneAudioCache(entries) {
  const validEntries = entries.filter((entry) => fileExists(entry.filePath))
  if (validEntries.length <= AUDIO_CACHE_LIMIT) {
    return validEntries
  }

  const sortedEntries = validEntries.slice().sort((left, right) => left.lastUsedAt - right.lastUsedAt)
  const entriesToRemove = sortedEntries.slice(0, sortedEntries.length - AUDIO_CACHE_LIMIT)
  entriesToRemove.forEach((entry) => removeSavedAudio(entry.filePath))

  const removedPaths = entriesToRemove.map((entry) => entry.filePath)
  return validEntries.filter((entry) => removedPaths.indexOf(entry.filePath) < 0)
}

function getCachedTrackPath(track) {
  const now = Date.now()
  const entries = getCacheEntries()
  const staleEntries = entries.filter((item) => item.trackId === track.id && item.url !== track.url)
  staleEntries.forEach((item) => removeSavedAudio(item.filePath))

  const reusableEntries = entries.filter((item) => staleEntries.indexOf(item) < 0)
  const entry = reusableEntries.find((item) => item.trackId === track.id && item.url === track.url)
  if (!entry || !fileExists(entry.filePath)) {
    setCacheEntries(pruneAudioCache(reusableEntries.filter((item) => item !== entry)))
    return ''
  }

  entry.lastUsedAt = now
  setCacheEntries(pruneAudioCache(reusableEntries))
  return entry.filePath
}

function saveCacheEntry(track, filePath) {
  const now = Date.now()
  const entries = getCacheEntries().filter((entry) => entry.trackId !== track.id)
  entries.push({
    trackId: track.id,
    url: track.url,
    filePath,
    cachedAt: now,
    lastUsedAt: now,
  })
  setCacheEntries(pruneAudioCache(entries))
}

function cacheTrackAfterPlayback(track, callback) {
  const cachedPath = getCachedTrackPath(track)
  if (cachedPath) {
    callback(cachedPath)
    return
  }

  wx.downloadFile({
    url: track.url,
    success(response) {
      if (response.statusCode && response.statusCode >= 400) {
        callback('')
        return
      }

      wx.saveFile({
        tempFilePath: response.tempFilePath,
        success(saveResponse) {
          saveCacheEntry(track, saveResponse.savedFilePath)
          callback(saveResponse.savedFilePath)
        },
        fail() {
          callback('')
        },
      })
    },
    fail() {
      callback('')
    },
  })
}

function playSource(src) {
  manager.src = src
  applyVolume(state.volume)
  manager.play()
}

function clearSleepTimer() {
  if (typeof sleepTimer === 'number') {
    clearTimeout(sleepTimer)
    sleepTimer = undefined
  }
}

function scheduleSleepTimer(value) {
  clearSleepTimer()
  const minutes = TIMER_MINUTES[value]
  if (!minutes) {
    return
  }

  sleepTimer = setTimeout(() => {
    sleepTimer = undefined
    pause()
  }, minutes * 60 * 1000)
}

function getPlayerState() {
  return Object.assign({}, state)
}

function notify() {
  const snapshot = getPlayerState()
  listeners.slice().forEach((listener) => {
    listener(snapshot)
  })
}

function setState(patch) {
  state = Object.assign({}, state, patch)
  notify()
}

function applyVolume(volume) {
  if (typeof manager.volume === 'number' || typeof manager.volume === 'undefined') {
    manager.volume = volume / 100
  }
}

function ensureInitialized() {
  if (initialized) {
    return
  }

  initialized = true
  applyVolume(state.volume)

  manager.onPlay(() => {
    setState({
      isPlaying: true,
      statusText: '播放中',
    })
  })
  manager.onPause(() => {
    setState({
      isPlaying: false,
      statusText: '已暂停',
    })
  })
  manager.onStop(() => {
    setState({
      isPlaying: false,
      statusText: '已停止',
    })
  })
  manager.onEnded(() => {
    const track = getTrackById(state.trackId)
    if (!track || !state.trackUrl) {
      return
    }

    cacheTrackAfterPlayback(track, (filePath) => {
      if (state.trackId !== track.id || !state.isPlaying) {
        return
      }

      playSource(filePath || track.url)
    })
  })
  manager.onError(() => {
    setState({
      isPlaying: false,
      statusText: '播放失败',
    })
  })
}

function subscribe(listener) {
  ensureInitialized()
  listeners.push(listener)
  listener(getPlayerState())

  return function unsubscribe() {
    const index = listeners.indexOf(listener)
    if (index >= 0) {
      listeners.splice(index, 1)
    }
  }
}

function playTrackById(id) {
  ensureInitialized()
  const track = getTrackById(id)
  if (!track) {
    return false
  }

  setState({
    trackId: track.id,
    trackTitle: track.title,
    trackUrl: track.url,
    isPlaying: true,
    statusText: '播放中',
  })

  manager.title = track.title
  manager.epname = '宝宝安睡白噪音'
  manager.singer = 'BabySleep'
  manager.coverImgUrl = '/assets/player-artwork.png'
  playSource(getCachedTrackPath(track) || track.url)
  scheduleSleepTimer(state.timerValue)

  return true
}

function play() {
  ensureInitialized()
  if (!state.trackUrl) {
    return false
  }

  applyVolume(state.volume)
  manager.play()
  scheduleSleepTimer(state.timerValue)
  return true
}

function pause() {
  ensureInitialized()
  manager.pause()
  return true
}

function togglePlay() {
  if (state.isPlaying) {
    return pause()
  }

  return play()
}

function setVolume(volume) {
  ensureInitialized()
  const nextVolume = Math.max(0, Math.min(100, Number(volume) || 0))
  applyVolume(nextVolume)
  setState({
    volume: nextVolume,
  })
  return true
}

function setSleepTimer(value) {
  ensureInitialized()
  const nextValue = value === 'none' || TIMER_MINUTES[value] ? value : DEFAULT_TIMER_VALUE
  setState({
    timerValue: nextValue,
  })

  if (nextValue === 'none') {
    clearSleepTimer()
  } else if (state.isPlaying) {
    scheduleSleepTimer(nextValue)
  } else {
    clearSleepTimer()
  }

  return true
}

module.exports = {
  getPlayerState,
  playTrackById,
  play,
  pause,
  togglePlay,
  setVolume,
  setSleepTimer,
  subscribe,
}
