<template>
  <div>
    <h1>Trade or view your portfolio</h1>
    <h6>You may save and load your data</h6>
    <h6>Click on "End Day" to randomize stock prices</h6>
    <hr />
    <p>Your funds: {{ user.funds | currency}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import * as types from "../store/types";

export default {
  computed: {
    ...mapGetters({
      user: types.USER
    })
  }
};
</script>

<style scoped>
</style>
