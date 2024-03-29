import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexPage from '@/views/Index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
