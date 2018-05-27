<template lang="html">
  <div class="container">
    <Banner :bannerData="bannerData"/>
    <Desc :descData="descData"/>
    <div class="" v-if="openId">
        <Comment :commentList="commentList" :openId="openId" :bookId="bookId" @init="initHanldClick"/>
    </div>
  </div>
</template>

<script>
import http from '../../utils/APIService'
import Banner from './components/bananer.vue'
import Desc from './components/desc.vue'
import Comment from './components/comment.vue'
import loading from '../../utils/loading'
export default {
  components: {
    Banner,
    Desc,
    Comment
  },
  data () {
    return {
      bannerData: {},
      descData: {},
      openId: '',
      bookId:'',
      commentList:[]
    }
  },
  mounted () {
    let id = this.$root.$mp.query.id
    this.openId = wx.getStorageSync('user') ? JSON.parse(wx.getStorageSync('user')).openId: ''
    this.init(id)
  },
  methods: {
    async init (id) {
      loading.open()
      let res = await http.get('/books/getBookDetail', {id})
      if (res.code === 0) {
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        this.bookId = res.data._id
        this.bannerData = {
          poster: res.data.poster,
          title: res.data.title,
          author: res.data.author
        }

        this.descData = {
          rate: res.data.rate,
          price: res.data.price,
          publisher: res.data.publisher,
          avatar: res.data.avatar,
          username: res.data.username,
          tags: res.data.tags,
          summary: res.data.summary
        }
      } else {
        console.log('get book detail fail')
      }

      // 获取评论信息
      let ret = await http.get('/comment/getCommentList', {bookId:this.bookId})
      if (ret.code === 0) {
        this.commentList = ret.data
      }
      loading.close()
    },
    initHanldClick () {
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
