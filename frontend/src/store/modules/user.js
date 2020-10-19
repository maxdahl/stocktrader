import * as types from "../types";
import * as queries from "../queries";
import axios from "../../axios";
import apollo from "../../vue-apollo";

const state = {
  user: {
    id: "",
    email: "",
    funds: 0,
    portfolio: [],
    isLoggedIn: false
  }
};

const getters = {
  [types.USER](state) {
    return state.user;
  }
};

const mutations = {
  [types.SIGNIN](state, payload) {
    state.user = { ...payload, isLoggedIn: true };
  },

  [types.SIGNOUT](state) {
    state.user = {
      id: "",
      email: "",
      funds: 0,
      portfolio: [],
      isLoggedIn: false
    };
  },

  [types.UPDATE_USER](state, user) {
    state.user = {
      ...state.user,
      ...user
    };
  },

  [types.UPDATE_PORTFOLIO](state, { id, data }) {
    if (data.amount <= 0) {
      const index = state.user.portfolio.findIndex(el => el.id == id);
      state.user.portfolio.splice(index, 1);
    } else {
      const portfolio = state.user.portfolio.find(el => el.id == id);
      portfolio.amount = data.amount;
    }
  }
};

const actions = {
  [types.SIGNIN]({ commit }, { email, password }) {
    return apollo.defaultClient
      .mutate({
        mutation: queries.SIGNIN_QUERY,
        variables: {
          email,
          password
        }
      })
      .then(resp => {
        const { id, email, funds, portfolio } = resp.data.login;
        const user = { id, email, funds, portfolio };
        commit(types.SIGNIN, user);
      });
  },

  [types.GET_USER]({ commit, state }) {
    return apollo.defaultClient
      .query({
        query: queries.GET_USER_QUERY
      })
      .then(resp => {
        if (resp.data.getUser && resp.data.getUser !== null) {
          const user = resp.data.getUser;
          commit(types.SIGNIN, user);
          return state.user;
        } else {
          commit(types.SIGNOUT);
          return {};
        }
      });
  },

  [types.UPDATE_USER]({ commit, state }, data) {
    const id = state.user.id;

    return apollo.defaultClient
      .mutate({
        mutation: queries.UPDATE_USER,
        variables: {
          id,
          data
        }
      })
      .then(resp => {
        const userData = resp.data.updateUser;
        commit(types.UPDATE_USER, userData);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
