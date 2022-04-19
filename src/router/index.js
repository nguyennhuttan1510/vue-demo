import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Admin from "../pages/Admin-Dashboard.vue";
import { checkAuth } from "./common";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      checkAuth(to, from, next);
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
