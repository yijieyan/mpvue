<template lang="html">
  <div class="container">
    <Banner :bannerData="bannerData"/>
    <Desc :descData="descData"/>
    <div class="">
        <Comment :commentList="commentList"  :bookId="bookId" :status="true" @init="initHanldClick"/>
    </div>
  </div>
</template>

<script>
import http from '../../utils/APIService'
import Banner from './components/bananer.vue'
import Desc from './components/desc.vue'
import Comment from '../../components/comment.vue'
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
      commentList:[],
      title: ''
    }
  },
  mounted () {
    let id = this.$root.$mp.query.id
    this.bookId = id
    this.openId = wx.getStorageSync('user') ? JSON.parse(wx.getStorageSync('user')).openId: ''
    this.init(id)
    this.getComment(id)
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
     console.log(res.target)
   }
   return {
     title: this.title,
     path: '/pages/detail/main?id='+ this.bookId
   }
  },
  methods: {
    async init (id) {
      loading.open()
      let res = await http.get('/books/getBookDetail', {id})
      if (res.code === 0) {
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        this.title = res.data.title
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
        loading.close()
      } else {
        loading.close()
        console.log('get book detail fail')
      }
    },
    async getComment (id) {
      // 获取评论信息
      let ret = await http.get('/comment/getCommentList', {bookId:id})
      if (ret.code === 0) {
        this.commentList = ret.data
      }
    },
    initHanldClick () {
      this.init(this.bookId)
      this.getComment(this.bookId)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
