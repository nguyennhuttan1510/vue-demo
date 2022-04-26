import { createApp } from "vue";
import App from "./App.vue";
import "./assets/global.scss";
import "./assets/index.css";
import router from "./router";
import store from "./store";
// import { defineComponent } from "vue";
// import the library
import moshaToast from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
createApp(App).use(store).use(moshaToast).use(router).mount("#app");
