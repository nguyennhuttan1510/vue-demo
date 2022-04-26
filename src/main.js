import { createApp } from "vue";
import App from "./App.vue";
import "./assets/global.scss";
import "./assets/index.css";
import router from "./router";
import store from "./store";
import moshaToast from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
createApp(App).use(store).use(moshaToast).use(router).mount("#app");
