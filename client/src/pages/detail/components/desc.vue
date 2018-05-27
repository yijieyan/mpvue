<template lang="html">
  <section class="desc-container">
    <div class="item">
      <div class="left">
        <img :src="descData.avatar" />
        <span>{{descData.username}}</span>
      </div>
      <div class="right">
        <span>{{descData.rate}} 分</span>
        <Rate :value="descData.rate" size="12"/>
      </div>
    </div>
    <div class="item">
      <div class="left">
        <span>出版社{{descData.publisher}}</span>
      </div>
      <div class="right">
        <span>CNY {{descData.price}}</span>
      </div>
    </div>

    <div class="tags">
      <span v-for="(item, index) in descData.tags" :key="item.title">{{item.title}} {{item.count}}</span>
    </div>

    <div class="summary">
      <p>{{descData.summary}}</p>
    </div>
  </section>
</template>

<script>
import Rate from '../../../components/rate.vue'
export default {
  props: {
    descData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    Rate
  }
}
</script>

<style lang="scss" scoped>
  .desc-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 20px 20rpx 0 20rpx;
    box-sizing: border-box;
    .item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      font-size: 12px;
      color: #000;
      justify-content: space-between;
      margin-bottom: 20rpx;
      .left {
        >img {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 20rpx;
        }
      }
      .right {
        >span {
          margin-right: 20rpx;
        }
      }
    }
    .tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      span {
        height: 80rpx;
        border: 1rpx solid #ea5a49;
        border-radius: 30rpx;
        color: #ea5a49;
        padding: 10rpx;
        box-sizing: border-box;
        margin: 10rpx;
      }
    }
    .summary {
      >p {
        padding-top: 10px;
        padding-bottom: 10px;
        box-sizing: border-box;
        text-indent: 2em;
        font-size: 18px;
        color: #000;
      }
    }
  }
</style>
