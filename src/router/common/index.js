export const checkAuth = (to, from, next) => {
  const token = localStorage.getItem("token");
  console.log("🚀 ~ file: index.js ~ line 3 ~ checkAuth ~ token", token);
  if (token) {
    next();
  } else {
    window.location.href = "/";
  }
};
