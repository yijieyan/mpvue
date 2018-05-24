let router = require('koa-router')()
router.prefix('/wx')
let http = require('../libs/http')
let {APPID, SECRET} = require('../config')

router.post('/openId', async (ctx, next) => {
  try {
    let {code} = ctx.request.body
    let options = {
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`,
      method: 'get'
    }
    let ret = await http(options)
    ctx.body = {code: 0, openId: ret.openid}
  } catch (err) {
    ctx.body = {code: -1, errmsg: 'get openid fail'}
  }
})

module.exports = router
