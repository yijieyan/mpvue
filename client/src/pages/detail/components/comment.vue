<template lang="html">
  <div class="comment-container">
    <p>评论:</p>
    <div class="addComment" v-if="!commentList.length">
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

      <button type="default" class="btn" @click="addComment">提交</button>
    </div>

    <ul class="commentList">
      <li v-for="(item, index) in commentList" :key="item._id">
        <h3>
          <img :src="item.userInfo.avatar"/>
          <span>{{item.userInfo.username}}</span>
        </h3>
        <p>{{item.content}}</p>
        <div class="phoneInfo">
          <span>{{item.phone}}</span>
          <span>{{item.location}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from '../../../utils/APIService'

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
    openId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      comment: '',
      phoneChecked: false,
      locationChecked: false,
      phone: '未知型号',
      location: '未知地点'
    }
  },
  methods: {
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
      this.comment = ''
      this.phone = '未知型号'
      this.location = '未知地点'
      this.phoneChecked = false
      this.locationChecked = false
      if (res.code === 0) {
        this.$emit('init')
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
      margin-left: 10px;
      margin-top: 10px;
      h3 {
        height: 80rpx;
        >img {
          width: 60rpx;
          height: 60rpx;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 10px;
        }
        span {
          font-size: 20px;
          color: #000;
        }
      }
      p {
        text-indent: 2em;
        font-size: 16px;
        color: #000;
        background: #eee;
        margin-left: -10px;
        padding: 10px;
        box-sizing: border-box;
      }
      .phoneInfo {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
</style>
