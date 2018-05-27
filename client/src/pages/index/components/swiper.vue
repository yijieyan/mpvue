<template lang="html">
  <div class="swiper-containr">
    <swiper
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="3000"
        indicator-color="#ea5a49"
        :circular="true"
      >
      <div v-for="(item, index) in imgs" :key="index">
        <swiper-item>
          <img v-for="(itemA, indexA) in item"
              :src="itemA.src"  :key="itemA._id"
              class="slide-image swiper-containr-img"
              @click="gotoDetailClick(itemA._id)"
          />
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'topSwiper',
  props: {
    imgs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    gotoDetailClick (id) {
      wx.navigateTo({
        url: '/pages/detail/main?id='+id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper-containr {
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    margin-top: 20px;
    .swiper-containr-img {
      width: 33.3333%;
      height: 120px;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
    }
  }
</style>
