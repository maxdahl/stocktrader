<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link tag="li" class="navbar-brand" :to="{name: 'home'}">
        <a>The Stock Trader</a>
      </router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'portfolio'}">
            <a class="nav-link">Portfolio</a>
          </router-link>
          <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'stocks'}">
            <a class="nav-link">Stocks</a>
          </router-link>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item">
            <a class="nav-link" href="#">Cash: {{user.funds | currency}}</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#" @click="randomizeStocks">End Day</a>
          </li>

          <li class="dropdown nav-item nav-item-right" @click="handleDropdown">
            <a
              href="#"
              class="dropdown-toggle nav-link"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              ref="dropdown"
            >Save / Load Data</a>

            <span class="caret"></span>
            <div class="bg-dark dropdown-menu" :class="{'show': isDropdownOpen}">
              <ul class="nav">
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="saveData">Save Data</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="loadData">Load Data</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types";

import axios from "../axios";

export default {
  data() {
    return {
      isDropdownOpen: false
    };
  },

  computed: {
    // npm install --save-dev babel-preset-stage-2
    // add ["stage-2"] to .babelrc
    ...mapGetters({
      user: types.USER
    })
  },
  methods: {
    ...mapActions({
      randomizeStocks: types.RND_STOCKS,
      loadData: types.LOAD_DATA
    }),

    handleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;

      if (this.isDropdownOpen) {
        const self = this;
        document.onclick = function(e) {
          if (e.target != self.$refs.dropdown) {
            self.isDropdownOpen = false;
          }
        };
      }
    },

    saveData() {
      // const data = {
      //   funds: this.userMoney,
      //   stockPortfolio: this.$store.getters[types.USER_STOCKS],
      //   stocks: this.$store.getters[types.STOCKS]
      // };
      // console.log(data);
      // axios.put("data.json", data);
    }
  }
};
</script>

<style scoped>
</style>
