import Vue from "vue";
import HappyScroll from "vue-happy-scroll";
import VueRouter from "vue-router";

import App from "./App.vue";
import "./index.less";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(HappyScroll);

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
  components: {
    App,
  },
});
