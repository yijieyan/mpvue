let router = require('koa-router')()
let Comment = require('../models/comment')
let User = require('../models/user')
router.prefix('/comment')

/**
 * 获取对某一本书的评论
 * @type {[type]}
 */
router.get('/getCommentList', async (ctx, next) => {
  try {
    let {bookId} = ctx.query
    let comment = await Comment.find({bookId})
    console.log(comment)
    for (let i = 0; i < comment.length; i++) {
      let user = await User.findOne({openId: comment[i].openId})
      comment[i]._doc.userInfo = {
        username: user.username,
        avatar: user.avatar
      }
    }
    ctx.body = {code: 0, data: comment}
  } catch (err) {
    ctx.body = {code: -1, errmsg: 'get comment fail'}
  }
})

router.post('/addComment', async (ctx, next) => {
  try {
    let {content, phone, location, openId, bookId} = ctx.request.body
    await Comment.create({content, phone, location, openId, bookId})
    ctx.body = {code: 0, data: 'add comment successful'}
  } catch (err) {
    ctx.body = {code: -1, errmsg: 'add comment fail'}
  }
})
module.exports = router
