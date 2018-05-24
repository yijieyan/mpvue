let router = require('koa-router')()
let http = require('../libs/http')
let Book = require('../models/book')
router.prefix('/books')

/**
 * 添加图书
 * @type {[type]}
 */
router.post('/addBook', async (ctx, next) => {
  try {
    let {isbn, openId} = ctx.request.body
    let book = await Book.findOne({isbn})
    if (!book || !book.doubanId) {
      let options = {
        uri: `https://api.douban.com/v2/book/isbn/${isbn}`
      }
      let res = await http(options)
      let author = res.author.join(',')

      await Book.create({
        openId,
        rate: res.rating.average,
        author,
        pubdate: res.pubdate,
        poster: res.image,
        doubanId: res.id,
        publisher: res.publisher,
        title: res.title,
        price: res.price,
        summary: res.summary,
        isbn
      })

      ctx.body = {code: 0, data: `add book successful`}
      return
    }
    ctx.body = {code: -1, errmsg: `this book is exist`}
  } catch (err) {
    ctx.body = {
      code: -1, errmsg: `addBook fail`
    }
  }
})

/**
 * 获取图书
 * @type {Number}
 */
router.get('/getBook', async (ctx, next) => {
  try {
    let {page = 1, count = 10} = ctx.query
    let bookLists = await Book.find({}).select('-_id -createdAt -updatedAt').skip(((+page - 1) * (+count))).limit(+count)
    ctx.body = {code: 0, data: bookLists}
  } catch (err) {
    ctx.body = {code: -1, errmsg: `get book fail,${err}`}
  }
})

module.exports = router
