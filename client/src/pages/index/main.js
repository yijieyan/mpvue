import Vue from 'vue'
import App from './index'

const index = new Vue(App)
index.$mount()

export default {
  config: {
    enablePullDownRefresh: true
  }
}
