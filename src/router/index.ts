import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
    meta: {
      title: "相关",
    },
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
