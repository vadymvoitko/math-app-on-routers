import Vue from 'vue'
import Router from 'vue-router'
import jQuery from 'jquery'
import HelloWorld from '@/components/HelloWorld'
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
Vue.use(Router)

const routes = [
    {path: '/start', component: start },
    {path: '/message', component: message },
    {path: '/success', component: success },
    {path: '/finish', component: finish }
]


export default new Router({
  routes
})
