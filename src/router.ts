import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/server',
    name: 'server',
    component: () => import('./sample/ServerData.vue')
  }, {
    path: '/local',
    name: 'local',
    component: () => import('./sample/LocalData.vue')
  }]
})
