const mongoose = require('mongoose')
const Schema = mongoose.Schema

let commentSchema = new Schema({
  openId: String, // openId
  content: String, // 评论的内容
  bookId: String, // 书的id
  phone: {
    type: String,
    default: '未知的类型'
  },
  location: {
    type: String,
    default: '未知地点'
  }
}, {versionKey: false, timestamps: true})

module.exports = mongoose.model('comment', commentSchema)
