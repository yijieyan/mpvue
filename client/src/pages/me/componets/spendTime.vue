<template lang="html">
  <div class="spentTime">
    <progress :percent="percent" active activeColor="#EA5149" show-info=true />
    <span class="desc">{{days}}</span>
  </div>
</template>

<script>
export default {
  name: 'year',
  data () {
    return {
    }
  },
  methods: {
    // 判断是否为闰年
    isrunyear () {
      let year = new Date().getFullYear()
      if (year % 4 === 0 && year % 100 !== 0 ) {
        return true
      } else if (year % 400 === 0) {
        return true
      } else {
        return false
      }
    },
    spendDays () {
      // 判断今年过去的天数占全年的百分比
      let time = new Date()
      time.setMonth(0)
      time.setDate(1)
      let d = (new Date() - time)/1000/3600/24
      return d
    }
  },
  computed: {
    percent () {
      let fullDays = 365
      let spendDays = this.spendDays();
      if (this.isrunyear()) {
        fullDays = 366
      }

      return Math.floor(spendDays/fullDays* 100)
    },
    days () {
      return `${new Date().getFullYear()} 年已经过去了${parseInt(this.spendDays())}天`
    }
  }
}
</script>

<style lang="scss" scoped>
  .spentTime {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 0 20px 20px;
    box-sizing: border-box;
    .desc {
      margin-top: 20px;
      text-align: center;
      font-size: 20px;
      height: 20px;
      line-height: 20px;
    }
  }
</style>
