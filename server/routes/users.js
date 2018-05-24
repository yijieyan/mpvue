let router = require('koa-router')()
let User = require('../models/user')
router.prefix('/users')

router.post('/addUserInfo', async (ctx, next) => {
  try {
    let {username, avatar, openId, country, city, gender, province} = ctx.request.body
    let u = await User.findOne({openId})
    if (!u) {
      await User.create({
        username, avatar, openId, country, city, gender, province
      })
    }
    ctx.body = {code: 0, data: 'add userInfo successful'}
  } catch (err) {
    ctx.body = {code: -1, errmsg: `add userInfo fail `}
  }
})

module.exports = router
