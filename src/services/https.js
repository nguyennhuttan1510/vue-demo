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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    console.log("🚀 ~ file: https.js ~ line 18 ~ error", error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
