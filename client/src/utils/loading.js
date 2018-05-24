
function open () {
  wx.showLoading({
    title: '加载中'
  })
  // wx.showNavigationBarLoading()
}

function close () {
  wx.hideLoading()
  // wx.hideNavigationBarLoading()
}
export default {
  open,
  close
}
