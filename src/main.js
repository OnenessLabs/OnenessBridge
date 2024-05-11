import './assets/css/main.css'

// element-plus css
import "element-plus/es/components/dialog/style/css";
import "element-plus/es/components/loading/style/css"
import "element-plus/es/components/notification/style/css"
import "element-plus/es/components/tabs/style/css"
import "element-plus/es/components/input/style/css"
import "element-plus/es/components/message/style/css"
import '@mdi/font/css/materialdesignicons.css'
import pinia, { useWeb3Store } from "@/stores/index.js";
import HttpApi from "@/packages/HttpApi/index.js";
import TokenManage from "@/packages/HttpApi/tokenManage.js";

import { createApp } from 'vue'
import directiveConnectWallet from "@/directives/connectWallet.js"

import App from './App.vue'
import router from './router'
import OnsUi from "@/packages/ons-ui/index.js";

const app = createApp(App)
app.use(pinia).use(router).use(directiveConnectWallet).use(OnsUi);
app.provide("$httpApi", new HttpApi()).provide("$tokenManage", new TokenManage())
app.mount("#app");

// Google Analytics
router.beforeEach((to, from, next) => {
  // if (window.gtag) {
  //   window?.gtag('event', 'page_show', {
  //     name: to.path || to.name,
  //   });
  // }
  next();
});