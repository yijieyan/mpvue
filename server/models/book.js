const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookSchema = new Schema({
  openId: String, // openId
  rate: Number, // 评分
  author: String, // 作者
  pubdate: Date, // 出版日期
  poster: String, // 海报图
  doubanId: String, // 豆瓣id
  publisher: String, // 出版社
  title: String, // 书名
  price: String, // 价格
  summary: String, // 描述
  isbn: String, // isbn编号
  tags: [], // 标签
  count: {
    type: Number,
    default: 0
  }
}, {versionKey: false, timestamps: true})

module.exports = mongoose.model('book', bookSchema)
