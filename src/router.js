import { createRouter, createWebHashHistory } from "vue-router"
import { getToken } from './utils/auth'

import Layout from './components/layout/Layout.vue'

export const routes = [
  
  {
    path: "/",
    name: 'root',
    redirect: 'dashboard',
    component: Layout,
    children: []
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./pages/LandingGeneral.vue"),
  },
  {
    path: "/admin/login",
    name: "login_admin",
    component: () => import("./pages/LoginAdmin.vue"),
  },
  {
    path: "/empresas/login",
    name: "login_empresas",
    component: () => import("./pages/LoginEmpresas.vue"),
  },
  {
    path: "/trabajadores/login",
    name: "login_trabajadores",
    component: () => import("./pages/LoginTrabajadores.vue"),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('./pages/NotFound.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('./pages/Error.vue')
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  hash: false,
  routes,
});
