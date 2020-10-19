import Vue from "vue";
import App from "./App.vue";
import apolloProvider from "./vue-apollo";

//Bootstrap Boilerplate
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Router Boilerplate
import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);

//VueX Boilerplate
import { store } from "./store/store";
import * as types from "./store/types";

Vue.filter("currency", value => {
  return "€" + value.toLocaleString();
});

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const user = store.getters[types.USER];
  const isAuthRoute = to.name === "user-signup" || to.name === "user-signin";

  if (!user.isLoggedIn) {
    store.dispatch(types.GET_USER).then(user => {
      if (user.isLoggedIn) {
        if (isAuthRoute) {
          router.push("/");
        } else next();
      } else {
        if (!isAuthRoute) {
          router.push({ name: "user-signin" });
        } else next();
      }
    });
  } else {
    if (isAuthRoute) {
      router.push("/");
    } else next();
  }
});

new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  render: h => h(App)
});
