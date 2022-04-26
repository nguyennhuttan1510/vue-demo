import { HTTP } from "../../services/https";

export const checkAuth = (to, from, next) => {
  const token = localStorage.getItem("token");
  HTTP.defaults.headers.common["Authorization"] = token;
  if (token) {
    next();
  } else {
    window.location.href = "/";
  }
};
