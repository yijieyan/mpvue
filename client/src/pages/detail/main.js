import Vue from 'vue'
import App from './index'

const index = new Vue(App)
index.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#ea5a49',
    navigationBarTextStyle: '#fff'
  }
}
