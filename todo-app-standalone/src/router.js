import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/components/LoginPage.vue"),
    },
    {
      path: "/login",
      name: "login.auth",
      component: () => import ("@/components/LoginPage.vue"),
    },
    {
      path: "/todo",
      name: "todo.list",
      component: () => import("@/components/TodoPage.vue"),
    },
  ],
});

export default router;