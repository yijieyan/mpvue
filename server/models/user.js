const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

let userSchema = new Schema({
  openId: String, // openId
  username: String, // 用户名
  phone: String, // 手机号
  email: String, // 邮箱
  avatar: String, // 头像
  country: String, // 国家
  city: String, // 城市
  gender: String, // 性别
  province: String // 省份
}, {versionKey: false, timestamps: true})
userSchema.plugin(autoIncrement.plugin, {
  model: 'user',
  field: 'userId',
  startAt: 10000,
  incrementBy: 1
})
module.exports = mongoose.model('user', userSchema)
