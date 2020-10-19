<template>
  <div class="row">
    <app-stock v-for="(stock) in stockData" :key="stock.id" :stock="stock"></app-stock>
  </div>
</template>

<script>
import * as types from "../../store/types";

import Stock from "./Stock.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      stockData: types.STOCKS
    })
  },
  components: {
    appStock: Stock
  }
};
</script>

<style scoped>
</style>
