<template lang="html">
  <div class="rate-container" :style="styleFont">
    <span>☆☆☆☆☆</span>
    <span class="rate-container-show" :style="rateObj">
      <span>★★★★★</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: Number,
      default: 14
    },
    theme: {
      type: String,
      default: '#ea5a49'
    }
  },
  data () {
    return {
      rateObj: '',
      styleFont: `color: ${this.theme};font-size: ${this.size}px;`
    }
  },
  // updated () {
  //   setTimeout(() => {
  //       this.setStyle()
  //     },0)
  // },
  computed: {
    stars () {
      this.rateObj = `width: ${this.value/2}em;`
    }
  },
  methods: {
    setStyle () {
      this.rateObj = `width: ${this.value/2}em;`
    }
  }
}
</script>

<style lang="scss" scoped>
  .rate-container {
    position: relative;
    display: inline-block;
    .rate-container-show {
      position: absolute;
      display: inline-block;
      top:0;
      left:0;
      width: 0em;
      overflow:hidden;
    }
  }
</style>
