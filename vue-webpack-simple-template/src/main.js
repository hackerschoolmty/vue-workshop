import Vue from 'vue'
import store from './vuex/store'
import VueRouter from 'vue-router'

import App from './App.vue'
import CategoryTable from './components/CategoriesTable.vue'
import CategoryUl from './components/CategoriesUl.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/categories/table', component: CategoryTable },
  { path: '/categories/ul', component: CategoryUl }
]

const router = new VueRouter({
  routes
})

new Vue({
  store,
  router
}).$mount('#app')
