import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import store from "./store";
import router from "./router/router";


import "@/scss/common.scss";
import "@/scss/public.scss";

createApp(App).use(store).use(ElementPlus).use(router).mount("#app");
