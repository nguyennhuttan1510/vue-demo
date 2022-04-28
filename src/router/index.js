import { createRouter, createWebHistory } from "vue-router";
import { checkAuth } from "./common";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Dashboard from "@/pages/Dashboard";
import { PATHNAME } from "@/constants";
const routes = [
  {
    path: PATHNAME.LOGIN,
    name: "login",
    component: Login,
  },
  {
    path: PATHNAME.DASHBOARD,
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: PATHNAME.PRODUCT,
    name: "products",
    component: Products,
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
