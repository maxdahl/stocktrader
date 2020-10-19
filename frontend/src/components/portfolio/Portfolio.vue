<template>
  <div>
    <h1>Portfolio</h1>
    <div class="row">
      <app-user-stock
        v-for="portfolio in user.portfolio"
        :key="portfolio.id"
        :portfolio="portfolio"
      ></app-user-stock>
    </div>
  </div>
</template>

<script>
import Stock from "./Stock.vue";

import { mapGetters } from "vuex";
import * as types from "../../store/types";

export default {
  computed: {
    ...mapGetters({
      user: types.USER
    })
  },

  components: {
    appUserStock: Stock
  }
};
</script>

<style scoped>
</style>
