import * as types from "../types";
import * as queries from "../queries";
import axios from "../../axios";
import apollo from "../../vue-apollo";

const state = {};

const getters = {};

const mutations = {
  [types.BUY_STOCK](state, stock) {
    const userStock = state.userStocks.find(el => el.id == stock.id);
    userStock.amount += stock.amount;
  },

  [types.SET_USER_STOCKS](state, stocks) {
    state.userStocks = stocks;
  }
};

const actions = {
  [types.UPDATE_PORTFOLIO](context, { id, data }) {
    const userId = context.rootState.user.user.id;

    apollo.defaultClient
      .mutate({
        mutation: queries.UPDATE_PORTFOLIO,
        variables: {
          id,
          userId,
          data
        }
      })
      .then(resp => {
        const portfolio = resp.data.updatePortfolio;
        context.commit(types.UPDATE_PORTFOLIO, { id, data: portfolio });
      });
  },

  [types.SELL_STOCK](context, stock) {
    const user = context.rootState.user.user;
    const portfolio = user.portfolio.find(el => el.stock.id == stock.id);

    if (!portfolio) return;
    if (portfolio.amount < stock.amount) stock.amount = portfolio.amount;

    const revenue = stock.amount * stock.price;
    context.dispatch(types.UPDATE_USER, { funds: user.funds + revenue });
    context.dispatch(types.UPDATE_PORTFOLIO, {
      id: portfolio.id,
      data: { amount: portfolio.amount - stock.amount }
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
