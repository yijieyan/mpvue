<template lang="html">
  <div class="banner-container">
    <img :src="bannerData.poster" mode="aspectFill" class="poster"/>
    <div class="layer">
      <img :src="bannerData.poster" mode="aspectFit" class="image"/>
      <p class="title">{{bannerData.title}}</p>
      <p class="author">{{bannerData.author}}</p>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    bannerData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner-container {
    position: relative;
    .poster {
      width: 100%;
      height: 500rpx;
      filter: blur(15px);
      overflow: hidden;
    }
    .layer {
      position: absolute;
      top:50rpx;
      width: 100%;
      text-align: center;
      .image {
        width: 240rpx;
        height: 300rpx;
      }
      .title {
        font-size: 20px;
        color: #fff;
      }
      .author {
        font-size: 14px;
        color: #fff;
      }
    }
  }
</style>
