<template lang="html">
  <div class="container">
      <TopSwiper :imgs="imgs"/>
      <BookList :bookLists="lists" />
      <p class="more" v-if="more">没有更多数据了</p>
  </div>
</template>

<script>
import http from '../../utils/APIService'
import chunk from 'chunk'
import BookList from '../../components/list.vue'
import TopSwiper from './components/swiper.vue'
import loading from '../../utils/loading'
export default {
  name: 'index',
  data () {
    return {
      page: 1,
      count: 10,
      lists: [],
      imgs: [],
      more: false
    }
  },
  components: {
    BookList,
    TopSwiper
  },
  created () {
    this.init()
  },
  methods: {
    async init (f) {

      this.more = false
      loading.open()
      let res = await http.get('/books/getBook', {page: this.page, count: this.count})
      if (res.code === 0) {
        if (res.data.length < 10 && this.page > 0) {
          this.more = true
        }

        let arr = res.data.map(item => {
          return {
            poster: item.poster,
            title: item.title,
            author: item.author,
            publisher: item.publisher,
            rate: item.rate,
            count: 0,
            donatePerson: 'tom',
            _id: item._id
          }
        })
        loading.close()
        if (f === 'more') {
          this.lists = this.lists.concat(arr)
          return ''
        } else if (f === true){
          wx.stopPullDownRefresh()
        }

        this.lists = arr

        this.imgs = chunk(res.data.slice(0,9).map(item => {
          return {
            src: item.poster,
            _id: item._id
          }
        }), 3)
      } else {
        conosle.log(`get booklist fail`)
      }
    }
  },
  onPullDownRefresh () {
    this.page = 1
    this.init(true)
  },
  onReachBottom () {
    // 默认距离底部50px
    this.page++
    this.init('more')
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    .more {
      text-align: center;
      font-size: 14px;
      padding-bottom: 10px;
      padding-top: 10px;
    }
  }
</style>
