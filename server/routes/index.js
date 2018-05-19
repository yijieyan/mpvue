const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = {'title': 123}
})

module.exports = router
