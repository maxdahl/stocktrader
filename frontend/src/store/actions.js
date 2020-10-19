import axios from "../axios";

import * as types from "./types";

const actions = {
  [types.LOAD_DATA]({ commit }) {
    axios
      .get("data.json")
      .then(response => {
        const data = response.data;
        if (data.funds) commit(types.SET_MONEY, data.funds);

        if (data.stockPortfolio)
          commit(types.SET_USER_STOCKS, data.stockPortfolio);

        if (data.stocks) commit(types.SET_STOCKS, data.stocks);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default actions;
