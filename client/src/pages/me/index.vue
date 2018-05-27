<template lang="html">
  <section class="container">
    <div class="userInfo">
      <img :src="userInfo.avatar" class="avatar"/>
      <button open-type="getUserInfo"  v-if="!islogin">
        <span class="username">{{userInfo.username}}</span>
      </button>
      <span class="username" v-else>{{userInfo.username}}</span>
    </div>
    <spendTime/>
    <button type="warn" size="default" :plain="false" @click="handleScanCode">扫码录入图书</button>
  </section>
</template>

<script>
import http from '../../utils/APIService'
import spendTime from './componets/spendTime.vue'
export default {
  name: 'me',
  data() {
    return {
      islogin: false,
      userInfo: {
        username: '未登陆',
        avatar: 'http://img.mukewang.com/user/59ed52ea0001ed3902000200-100-100.jpg',
        openId: ''
      }
    }
  },
  components: {
    spendTime
  },
  created() {
    this.init()
  },
  methods: {
    init() {
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
                      that.islogin = true
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
          console.log(res)
          this.addBooksByIsbn(9787550026209)

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
}
</style>
