import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'

import index from './components/index.vue'

Vue.use(vueRouter)

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/index',
    component: index
  }
  
  
]

const router = new vueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
