import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import PeopleView from '../views/People/PeopleView.vue'
import OrderView from '../views/Order/OrderView.vue'
import OrderAdd from '../views/Order/OrderAdd.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pessoas',
    name: 'pessoas',
    component: PeopleView
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: OrderView
  },
  {
    path: '/cadastrar-pedido',
    name: 'cadastrar pedido',
    component: OrderAdd
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
