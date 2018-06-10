<template lang="html">
  <div class="container">
    <div v-if="openId">
      <Comment :commentList="commentList" :status="false" @goToDetail="goToDetail" @init="initHanldClick" v-if="commentList.length"/>
      <div :class="commentList.length ? ['bookList', 'border'] : ['bookList']" v-if="lists.length">
        <p class="addBook">我添加的图书:</p>
        <BookList :bookLists="lists" />
      </div>
      <p class="tip" v-else>您还没有添加图书</p>
    </div>
    <div class="tip" v-else>
      <p>您还没有登录。</p>
    </div>
  </div>
</template>

<script>
import Comment from '../../components/comment.vue'
import BookList from '../../components/list.vue'
import http from '../../utils/APIService'

export default {
  data () {
    return {
      openId: '',
      commentList: [],
      lists: []
    }
  },
  components: {
    Comment,
    BookList
  },
  onPullDownRefresh () {
    this.getComment(this.openId)
  },
  onShow () {
    this.openId = wx.getStorageSync('user') ? JSON.parse(wx.getStorageSync('user')).openId: ''
    this.getComment(this.openId)
  },
  methods: {
    initHanldClick () {
      conosle.log('111111', this.openId)
      this.getComment(this.openId)
    },
    async getComment (openId) {
      wx.showNavigationBarLoading()
      let res = await http.get('/comment/getCommentsByOpenId', {
        openId
      })
      if (res.code === 0) {
        this.commentList = res.data
      }
      this.getBookList(openId);
    },
    async getBookList (openId) {
      let res = await http.get('/books/getBookListByOpenId', {openId})
      if (res.code === 0) {
        this.lists = res.data
      }
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },
    goToDetail (bookId) {
      wx.navigateTo({
        url: '/pages/detail/main?id='+bookId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    .tip {
      margin-top: 20px;
      text-align: center;
      font-size: 16px;
    }
    .addBook {
      margin-top: 10px;
      padding-top: 20rpx;
      padding-bottom: 20rpx;
      text-align: left;
      padding-left: 20rpx;
      box-sizing: border-box;
      font-size: 16px;
    }
    .border {
      border-top: 1rpx solid #ea5a49;
    }
  }
</style>
