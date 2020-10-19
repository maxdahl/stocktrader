<template>
  <div class="col-sm-6 col-md-4">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          {{ stock.name }}
          <br />
          <small>Price: {{stock.price}} € / {{portfolio.originalPrice}} €</small>
          <br />
          <small>{{profit}}</small>
          <br />
          <small>Amount: {{portfolio.amount}}</small>
        </h3>
      </div>

      <div class="card-body">
        <div class="float-left">
          <input
            placeholder="Amount"
            type="number"
            class="form-control"
            :class="{'danger': !canSell}"
            v-model.number="amount"
          />
        </div>
        <br />
        <br />
        <div class="float-left">
          <button
            class="btn btn-success"
            :class="{'btn-danger': !canSell}"
            @click="sellStock(false)"
            :disabled="!canSell"
          >Sell</button>

          <button class="btn btn-success" @click="sellStock(true)">Sell All</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "../../store/types";

export default {
  props: ["portfolio"],
  data() {
    return {
      amount: 0
    };
  },

  computed: {
    stock() {
      const stocks = this.$store.state.stocks.stocks;
      const stock = stocks.find(el => {
        return el.id == this.portfolio.stock.id;
      });

      return stock;
    },

    insufficientAmount() {
      return this.amount > this.portfolio.amount;
    },

    canSell() {
      return (
        this.amount > 0 &&
        Number.isInteger(this.amount) &&
        !this.insufficientAmount
      );
    },

    profit() {
      return 0;
    }
  },

  methods: {
    sellStock(sellAll = false) {
      if (sellAll) this.amount = this.portfolio.amount;

      const stock = {
        id: this.stock.id,
        price: this.stock.price,
        amount: this.amount
      };

      this.$store.dispatch(types.SELL_STOCK, stock);
      this.amount = 0;
    }
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>
