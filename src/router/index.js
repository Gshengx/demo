import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
  {
    path: "/tree",
    name: "Tree",
    component: () =>
      import(/* webpackChunkName: "TreeDemo" */ "../views/TreeDemo.vue"),
  },
  // 幸运大转盘
  {
    path: "/trunbox",
    name: "TrunBox",
    component: () =>
      import(/* webpackChunkName: "TrunBoxDemo" */ "../views/TrunBoxDemo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
