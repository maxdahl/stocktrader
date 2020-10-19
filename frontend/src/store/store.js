import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import stocks from "./modules/stocks";
import portfolio from "./modules/portfolio";
import user from "./modules/user";
import actions from "./actions";

const store = new Vuex.Store({
  actions: {
    ...actions
  },

  modules: {
    stocks,
    portfolio,
    user
  }
});

export { store };
