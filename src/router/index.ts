import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import pinia from "@/store";
import { useUserStore } from '@/store/user'

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
      // {
      //   path: '',
      //   name: 'homepage',
      //   component: () => import('@/views/main/HomePage.vue'),
      // },
      // {
      //   path: 'roadmap',
      //   name: 'roadmap',
      //   component: () => import('@/views/main/Roadmap.vue'),
      // },
      // {
      //   path: 'vue-example',
      //   name: 'vue-example',
      //   component: () => import('@/views/main/VueExample.vue'),
      // },
      // {
      //   path: 'about',
      //   name: 'about',
      //   component: () => import('@/views/main/About.vue'),
      // },
      {
        path: "/",
        name: "home",
        meta: { middleware: [guest] },
        component: () => import(/* webpackChunkName: "home" */ "@/views/main/Home.vue"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { middleware: [auth] },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/main/Dashboard.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: { middleware: [auth] },
        component: () => import(/* webpackChunkName: "user" */ "@/views/main/User.vue"),
      },
      {
        path: "/users",
        name: "users",
        meta: { middleware: [auth, admin] },
        component: () => import(/* webpackChunkName: "users" */ "@/views/main/Users.vue"),
        beforeEnter: ((to, from, next) => {
          const store = useUserStore(pinia)
          const currentPage = parseInt(String(to.query.page)) || 1;
          store.getUsers(currentPage).then(() => {
            to.params.page = String(currentPage);
            next();
          });
        })
      },
      {
        path: "/login",
        name: "login",
        meta: { middleware: [guest] },
        component: () => import(/* webpackChunkName: "login" */ "@/views/main/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        meta: { middleware: [guest] },
        component: () =>
          import(/* webpackChunkName: "register" */ "@/views/main/Register.vue"),
      },
      {
        path: "/reset-password",
        name: "resetPassword",
        meta: { middleware: [guest] },
        component: () =>
          import(/* webpackChunkName: "reset-password" */ "@/views/main/ResetPassword.vue"),
      },
      {
        path: "/forgot-password",
        name: "forgotPassword",
        meta: { middleware: [guest] },
        component: () =>
          import(
            /* webpackChunkName: "forgot-password" */ "@/views/main/ForgotPassword.vue"
          ),
      },
      {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: () =>
          import(/* webpackChunkName: "not-found" */ "@/views/main/NotFound.vue"),
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
