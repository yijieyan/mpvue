<template lang="html">
  <section class="container">
    <div class="userInfo">
      <img :src="userInfo.avatar || '../../../static/img/unlogin.png'" class="avatar"/>
      <span class="username">{{userInfo.username}}</span>
    </div>
    <spendTime/>
    <button class="btn" type="warn" size="default" :plain="false" @click="handleScanCode" v-if="userInfo.openId">扫码录入图书</button>
    <button class="btn" open-type="getUserInfo" lang="zh_CN"  @getuserinfo="login" v-else>点击登录</button>
  </section>
</template>

<script>
import http from '../../utils/APIService'
import spendTime from './componets/spendTime.vue'
export default {
  name: 'me',
  data() {
    return {
      userInfo: {
        username: '',
        avatar: '',
        openId: ''
      }
    }
  },
  components: {
    spendTime
  },
  onShow () {

    let user = wx.getStorageSync('user')
    if (user) {
      user = JSON.parse(user);
    } else {
      this.userInfo.username = ''
      this.userInfo.avatar = ''
      this.userInfo.openId = ''
    }
    this.userInfo.username = user.username
    this.userInfo.avatar = user.avatar
    this.userInfo.openId = user.openId
  },
  methods: {
    login() {
      let that = this
      wx.login({
        success: async function(res) {
          if (res.code) {
            //发起网络请求
            let ret = await http.post('/wx/openId', {code: res.code})
            that.userInfo.openId = ret.openId
            wx.getSetting({
              success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    success: async function(res) {

                      that.userInfo.username = res.userInfo.nickName
                      that.userInfo.avatar = res.userInfo.avatarUrl
                      let user = {
                        openId: that.userInfo.openId,
                        username: res.userInfo.nickName,
                        avatar: res.userInfo.avatarUrl
                      }
                      wx.setStorageSync('user', JSON.stringify(user))

                      await http.post('/users/addUserInfo', {
                        username: res.userInfo.nickName,
                        avatar: res.userInfo.avatarUrl,
                        openId: that.userInfo.openId,
                        country: res.userInfo.country,
                        city: res.userInfo.city,
                        gender: res.userInfo.gender,
                        province: res.userInfo.province
                      })
                    }
                  })
                }
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    },
    // 扫码
    handleScanCode() {
      wx.scanCode({
        success: (res) => {
          this.addBooksByIsbn(res.result)
        }
      })
    },
    // 添加图书
    async addBooksByIsbn (isbn) {
      try {
        let res = await http.post('/books/addBook', {isbn, openId: this.userInfo.openId})
        if (res.code === 0) {
          wx.showToast({
            title: `添加图书成功`,
            icon: 'success',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: `图书已经存在`,
            icon: 'none',
            duration: 3000
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .userInfo {
        margin-top: 50px;
        text-align: center;
        .avatar {
            width: 90px;
            height: 90px;
            border-radius: 50%;
        }
        .username {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            margin: 20px auto;
            font-size: 24px;
        }
    }
    .btn {
      background: #ea5a49;
      color: #fff;
      margin-top: 10px;
    }
}
</style>
