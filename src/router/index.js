import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import { checkAuth } from "./common";
import Admin from "@/pages/Admin-Dashboard";
import Dashboard from "@/pages/Dashboard.vue";
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard,
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
