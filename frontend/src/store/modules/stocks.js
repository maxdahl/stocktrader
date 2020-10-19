import * as types from "../types";
import * as queries from "../queries";
import apollo from "../../vue-apollo";
import axios from "../../axios";

const state = {
  stocks: []
};

const getters = {
  [types.STOCKS](state) {
    return state.stocks;
  }
};

const mutations = {
  [types.SET_STOCKS](state, payload) {
    state.stocks = payload;
  }
};

const actions = {
  [types.BUY_STOCK](context, stock) {
    const user = context.rootState.user.user;
    const portfolio = user.portfolio.find(el => el.stock.id == stock.id);
    console.log(this.$apollo);
    if (!portfolio) {
      return apollo.defaultClient
        .mutate({
          mutation: queries.CREATE_PORTFOLIO,
          variables: {
            data: {
              stock: stock.id,
              amount: stock.amount,
              owner: user.id,
              originalPrice: stock.price
            }
          }
        })
        .then(resp => {
          return context.dispatch(types.GET_USER);
        })
        .catch(err => {
          console.log("VUEX", err);
          throw err;
        });
    } else {
      return context.dispatch(types.UPDATE_PORTFOLIO, {
        id: portfolio.id,
        data: { amount: stock.amount, buy: true }
      });
    }

    // const revenue = stock.amount * stock.price;
    // context.dispatch(types.UPDATE_USER, { funds: user.funds + revenue });
    // context.dispatch(types.UPDATE_PORTFOLIO, {
    //   id: portfolio.id,
    //   data: { amount: portfolio.amount - stock.amount }
    // });
    // const state = context.rootState.portfolio;
    // const totalPrice = stock.price * stock.amount;

    // if (state.userMoney < totalPrice) return;

    // const userStock = state.userStocks.find(el => el.id == stock.id);

    // if (!userStock)
    //   state.userStocks.push({
    //     amount: 0,
    //     id: stock.id,
    //     orgPrice: stock.price
    //   });

    // context.commit(types.BUY_STOCK, stock);
    // context.commit(types.SET_MONEY, state.userMoney - totalPrice);
  },

  [types.SET_STOCKS]({ commit }) {
    const body = {
      query: `{
        getStocks {
          id
          name
          price
        }
      }`
    };

    return axios.post("", body).then(resp => {
      const stockData = resp.data.data.getStocks;
      commit(types.SET_STOCKS, stockData);
    });
  },

  [types.RND_STOCKS]({ commit }) {
    const body = {
      query: `
        mutation {
          randomizeStocks {
            id
            name
            price
          }
        }
      `
    };

    return axios.post("", body).then(resp => {
      const stockData = resp.data.data.randomizeStocks;
      commit(types.SET_STOCKS, stockData);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
