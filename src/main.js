// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VueClipboard)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
// 过滤器
Vue.filter('money', function (value) {
  if (!value) return '0.00'
  let result = value.toFixed(2)
  result = parseFloat(result)
  result = result.toLocaleString()
  let len = result.split('.').length
  if (len === 1) {
    result = result + '.00'
  } else if (len === 2) {
    if (result.split('.')[1].length === 1) {
      result = result + '0'
    }
  }
  return result
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
