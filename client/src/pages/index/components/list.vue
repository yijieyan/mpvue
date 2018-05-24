<template lang="html">
  <ul class="list-container">
    <li class="list-item" v-for="(item, index) in bookLists" :key="item.id">
      <div class="list-item-left">
        <img :src="item.poster"/>
      </div>
      <div class="list-item-middle">
        <h4 class="list-item-middle-name">{{item.title}}</h4>
        <div class="list-item-middle-author">
          {{item.author}}
        </div>
        <div class="list-item-middle-publisher">
          {{item.publisher}}
        </div>
      </div>
      <div class="list-item-right">
        <div class="list-item-right-top">
          <span>{{item.rate}}</span>
          <Rate :value="item.rate/2" size="12"/>
        </div>
        <div class="list-item-middle">
          浏览数:{{item.count}}
        </div>
        <div class="list-item-bottom">
          {{item.donatePerson}}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import Rate from './rate.vue'
export default {
  props: {
    bookLists: {
      type: Array,
      default: () => {
        return []
      }
    },
    imgs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      styleObje: {},
      index:2
    }
  },
  components: {
    Rate
  }
}
</script>

<style lang="scss" scoped>
  .list-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .list-item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      .list-item-left {
        width: 90px;
        >img {
          width: 80px;
          height: 105px;
          padding: 5px;
          box-sizing: border-box;
        }
      }
      .list-item-middle {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: 160px;
        text-align: left;
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        box-sizing: border-box;
        .list-item-middle-name {
          color:#eb6150;
          font-size: 18px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .list-item-middle-author {
          color: #000;
          font-size: 16px;
          margin-top: 10px;
          margin-bottom: 5px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .list-item-middle-publisher {
          color: #000;
          font-size: 16px;
          margin-top: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .list-item-right {
        display: flex;
        flex-direction: column;
        flex-wrap:nowrap;
        width: calc(100% - 250px);
        .list-item-right-top {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          padding-left: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
          box-sizing: border-box;
          >span {
            font-size: 16px;
            color: #000;
            margin-right: 10px;
          }
        }
        .list-item-middle {
          color:#eb6150;
          font-size: 16px;
          margin-top: 10px;
          margin-bottom: 5px;
          padding-left: 20px;
          box-sizing: border-box;
          text-align: left;
        }
        .list-item-bottom {
          color: #000;
          font-size: 16px;
          padding-left: 20px;
          box-sizing: border-box;
          text-align: left;
        }
      }
    }
  }
</style>
