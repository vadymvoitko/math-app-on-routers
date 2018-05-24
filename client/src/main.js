// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import VueTimers from 'vue-timers'
import 'bootstrap/dist/css/bootstrap.css'
// import values in vars with created names like start ets
import start from '../components/start.vue'
import message from '../components/message.vue'
import success from '../components/success.vue'
import finish from '../components/finish.vue'
Vue.use(VueTimers)
global.jQuery = jQuery
let Bootstrap = require('bootstrap')
//  register them
Vue.component('start', start)
Vue.component('message', message)
Vue.component('success', success)
Vue.component('finish', finish)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
    Bootstrap,
  components: { App },
  template: '<App/>'
})
