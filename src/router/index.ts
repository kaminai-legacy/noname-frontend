import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'base',
    component: () => import('@/views/main/Root.vue'),
    children: [
      {
        path: '',
        name: 'homepage',
        component: () => import('@/views/main/HomePage.vue'),
      },
      {
        path: 'roadmap',
        name: 'roadmap',
        component: () => import('@/views/main/Roadmap.vue'),
      },
      {
        path: 'vue-example',
        name: 'vue-example',
        component: () => import('@/views/main/VueExample.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/main/About.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/Root.vue'),
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      { path: 'dashboard', redirect: { name: 'admin-dashboard' } },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/Users.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
