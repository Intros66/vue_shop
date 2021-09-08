import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './router/permit'
import "element-ui/lib/theme-chalk/index.css";
import "../plugins/element";
import "./assets/font/iconfont.css";
import "./assets/css/global.less";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
