let router = require('koa-router')()
let http = require('../libs/http')
let Book = require('../models/book')
let User = require('../models/user')
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
        isbn,
        tags: res.tags
      })

      ctx.body = {code: 0, data: `add book successful`}
    } else {
      ctx.body = {code: -1, errmsg: `this book is exist`}
    }
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
    let bookLists = await Book.find({}).select('-createdAt -updatedAt').skip(((+page - 1) * (+count))).limit(+count)
    for (let i = 0; i < bookLists.length; i++) {
      let item = bookLists[i]
      let userInfo = await User.findOne({openId: item.openId})
      bookLists[i]._doc.username = userInfo.username
    }
    ctx.body = {code: 0, data: bookLists}
  } catch (err) {
    ctx.body = {code: -1, errmsg: `get book fail,${err}`}
  }
})

/**
 * 获取图书的详情
 * @type {[type]}
 */
router.get('/getBookDetail', async (ctx, next) => {
  try {
    let {id} = ctx.query
    console.log('11111:', id)
    let bookDetail = await Book.findOne({_id: id})
    await bookDetail.save({count: bookDetail.count++})
    let userInfo = await User.findOne({openId: bookDetail.openId})
    let obj = Object.assign({}, bookDetail._doc, {
      avatar: userInfo.avatar,
      username: userInfo.username
    })
    ctx.body = {code: 0, data: obj}
  } catch (err) {
    ctx.body = {code: -1, errmsg: `get book detail fail`}
  }
})

/**
 * 通过openId 获取图书列表
 * @type {[type]}
 */
router.get('/getBookListByOpenId', async (ctx, next) => {
  try {
    let {openId} = ctx.query
    let bookLists = await Book.find({openId}).select('-createdAt -updatedAt')
    ctx.body = {code: 0, data: bookLists}
  } catch (err) {
    ctx.body = {code: -1, errmsg: `get bookList fail`}
  }
})

module.exports = router
