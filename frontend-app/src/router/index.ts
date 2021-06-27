import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Result from '../views/Result.vue';
import Search from '../views/Search.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/result',
    name: 'Result',
    component: () => import(/* webpackChunkName: "result" */ '../views/Result.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
