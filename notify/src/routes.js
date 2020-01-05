// Default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Pages
import Home from '@/pages/Home'
import Notify from '@/pages/Notify'

// Routering
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/notify',
      name: 'notify',
      component: Notify,
    },
  ]
})