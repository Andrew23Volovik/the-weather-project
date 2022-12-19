import Vue from 'vue';
import VueRouter from 'vue-router';
import TheHome from '@/views/TheHome.vue';
import TheFavorite from '@/views/TheFavorite.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/the-weather-project',
    redirect: { name: 'Home' },
  },
  {
    path: '/home',
    name: 'Home',
    component: TheHome,
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: TheFavorite,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
