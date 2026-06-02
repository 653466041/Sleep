const HOME_PATH = '/pages/index/index'

export function navigateBackOrHome(): void {
  if (getCurrentPages().length > 1) {
    wx.navigateBack()
    return
  }

  wx.reLaunch({
    url: HOME_PATH,
  })
}

