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
