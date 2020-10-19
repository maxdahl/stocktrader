<template>
  <div class="col-sm-6 col-md-4">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          {{ stock.name }}
          <br />
          <small>(Price: {{stock.price}} €)</small>
        </h3>
      </div>

      <div class="card-body">
        <div class="alert alert-danger" v-if="insufficientMoney">You do not have enough money</div>
        <div class="float-left">
          <input
            placeholder="Amount"
            type="number"
            class="form-control"
            :class="{'danger': !canBuy}"
            v-model.number="amount"
          />
        </div>
        <div class="float-right">
          <button
            class="btn"
            :class="{'btn-success': canBuy, 'btn-danger': !canBuy}"
            @click="buyStock"
            :disabled="!canBuy"
          >Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as types from "../../store/types";

export default {
  props: ["stock"],
  data() {
    return {
      amount: 0
    };
  },

  computed: {
    insufficientMoney() {
      return (
        this.amount * this.stock.price > this.$store.getters[types.USER].funds
      );
    },

    canBuy() {
      const canBuy =
        this.amount > 0 &&
        Number.isInteger(this.amount) &&
        !this.insufficientMoney;

      return canBuy;
    }
  },

  methods: {
    buyStock() {
      const order = {
        id: this.stock.id,
        price: this.stock.price,
        amount: +this.amount
      };

      this.$store
        .dispatch(types.BUY_STOCK, order)
        .catch(err => console.log(this.$apollo));
      this.amount = 0;
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}

.card-header {
  background: rgba(183, 203, 224, 0.5);
}

.danger {
  border: 1px solid red;
}
</style>
