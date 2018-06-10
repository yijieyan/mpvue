<template lang="html">
  <div class="comment-container">
    <div class="addComment" v-if="isShowComment">
      <p>评论:</p>
      <textarea   placeholder="请输入你的评论"
                v-model="comment" maxlength="200" class="textarea"/>
      <div class="device">
          <span>获取手机型号:</span>
          <switch @change="getPhoneType" color="#ea5a49" :checked="phoneChecked"/>
          <span v-show="phoneChecked">{{phone}}</span>
      </div>
      <div class="device">
          <span>获取地理位置:</span>
          <switch @change="getLocation" color="#ea5a49" :checked="locationChecked"/>
          <span v-show="locationChecked">{{location}}</span>
      </div>
      <button type="default" class="btn" @click="addComment">评论</button>
    </div>

    <ul class="commentList" v-if="commentList.length">
      <p class="title">评论:</p>
      <li v-for="(item, index) in commentList" :key="item._id" class="item" @click="goToDetail(item.bookId)">
        <h3>
          <img :src="item.userInfo.avatar"/>
          <span class="username">{{item.userInfo.username}}</span>
          <p>{{item.content}}</p>
        </h3>

        <div class="phoneInfo">
          <span>{{item.phone}} -- </span>
          <span>{{item.location}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from '../utils/APIService'

export default {
  props: {
    bookId: {
      type: String,
      default: ''
    },
    commentList: {
      type: Array,
      default: () => {
        return []
      }
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      comment: '',
      phoneChecked: false,
      locationChecked: false,
      phone: '未知型号',
      location: '未知地点',
      openId: ''
    }
  },
  computed: {
    isShowComment () {
      let openId = wx.getStorageSync('user') ? JSON.parse(wx.getStorageSync('user')).openId: ''
      this.openId = openId
      let flag = this.commentList.filter(item => item.openId === openId).length
      if (openId && !flag && this.status) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goToDetail (bookId) {
      this.$emit('goToDetail', bookId)
    },
    getPhoneType (e) {
      this.phoneChecked = e.target.value
      let obj = wx.getSystemInfoSync()
      this.phone = obj.model
    },
    getLocation (e) {
      this.locationChecked = e.target.value
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          let latitude = res.latitude
          let longitude = res.longitude
          let url = `http://api.map.baidu.com/geocoder/v2/?location=${latitude},${longitude}&output=json&pois=1&ak=W249gDL1xVk2ytozu6tzG4x4TY5sDrjW`
          wx.request({
            url, //仅为示例，并非真实的接口地址
            success: (res) => {
              if (res.data.status === 0) {
                this.location = res.data.result.addressComponent.city
              }
            }
          })
        }
      })
    },
    async addComment () {
      let res = await http.post('/comment/addComment', {
        content: this.comment,
        phone: this.phone,
        location: this.location,
        openId: this.openId,
        bookId: this.bookId
      })
      if (res.code === 0) {
        this.$emit('init')
        this.comment = ''
        this.phone = '未知型号'
        this.location = '未知地点'
        this.phoneChecked = false
        this.locationChecked = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment-container {
    margin-top: 10px;
    .addComment {
      .textarea {
        height: 160rpx;
        width: 100%;
        background: #eee;
        color: #000;
        font-size: 16px;
        padding-left: 10px;
        padding-top: 10px;
        box-sizing: border-box;
      }
      .device {
        padding: 10px;
        box-sizing: border-box;
        >span {
          font-size: 20px;
          color: #000;
          margin-right: 20px;
          margin-left: 10px;
        }
      }
      .btn {
        background: #ea5a49;
        color: #fff;
        margin: 10px;
      }
    }
    .commentList {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      margin-top: 10px;
      background: #eee;
      .title {
        padding-top:10px;
        padding-left: 20rpx;
        box-sizing: border-box;
        color: #000;
        font-size: 14px;
      }
      .item {
        margin-top: 10px;
        position: relative;
        box-sizing: border-box;
        background: #fff;
        h3 {
          >img {
            width: 60rpx;
            height: 60rpx;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
            margin-top: 10rpx;
            margin-left: 10px;
          }
          span {
            font-size: 12px;
            color: #000;
          }
          p {
            text-indent: 2em;
            font-size: 14px;
            color: #000;
            margin-top: 10rpx;
            margin-bottom: 10rpx;
          }
        }

        .phoneInfo {
          position: absolute;
          top: 10rpx;
          right: 20rpx;
          font-size: 12px;
        }
      }
    }
  }
</style>
