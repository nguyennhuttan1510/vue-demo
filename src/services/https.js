import axios from "axios";

export const HTTP = axios.create({
  baseURL: `http://dev.okxe.vn:9060`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    timeout: 10000,
  },
});

HTTP.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log("🚀 ~ file: https.js ~ line 18 ~ error", error);
    return Promise.reject(error);
  }
);
