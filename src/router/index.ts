import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import pinia from "@/store";

import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import guest from "@/middleware/guest";

import middlewarePipeline from "@/router/middlewarePipeline";

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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // TODO error
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // },
})

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;
  const context = { to, from, next, pinia};

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router
