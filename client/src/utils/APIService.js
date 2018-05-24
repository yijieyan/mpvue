import config from '../config'
function request (url, method, data) {
  url = `${config.baseUrl}${url}`
  return new Promise((resolve, reject) => {
    wx.request({
      url, // 仅为示例，并非真实的接口地址
      method,
      data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

class APIService {
  get (url, data) {
    return request(url, 'get', data).then(res => res).catch(err => err)
  }

  post (url, data) {
    return request(url, 'post', data).then(res => res).catch(err => err)
  }
}
export default new APIService()
