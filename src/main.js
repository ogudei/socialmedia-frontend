// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as axios from 'axios'
import * as VeeValidate from 'vee-validate'
import moment from 'moment'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.$axios = axios

// register vee validate plugin
Vue.use(VeeValidate)
Vue.config.productionTip = false

Vue.filter('timeAgo', date => moment(date).fromNow())
Vue.filter('joined', date => moment(date).format('MMMM YYYY'))
Vue.filter('dob', date => moment(date).format('MMMM Do YYYY'))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
