const HOME_PATH = '/pages/index/index'

function navigateBackOrHome() {
  if (getCurrentPages().length > 1) {
    wx.navigateBack()
    return
  }

  wx.reLaunch({
    url: HOME_PATH,
  })
}

module.exports = {
  navigateBackOrHome,
}

