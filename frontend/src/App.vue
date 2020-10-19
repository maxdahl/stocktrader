<template>
  <div class="container">
    <!-- <app-header></app-header> -->
    <router-view name="appHeader"></router-view>
    <br />
    <div class="row">
      <div class="col-12">
        <transition name="slide" mode="out-in" type="animation">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import * as types from "./store/types";

import axios from "./axios";

export default {
  created() {
    this.$store.dispatch(types.SET_STOCKS);
    // const body = {
    //   query: `
    //   {
    //     portfolios(userId: "5d1d8ddc94372a1372601d37") {id stock {name} amount owner {email}}
    //   }
    //   `
    // };

    // axios.post("", body).then(resp => {
    //   console.log(resp);
    // });
  },

  components: {
    appHeader: Header
  }
};
</script>

<style>
body {
  padding: 30px;
}

.slide-enter-active {
  animation: slide-in 0.2s;
}

.slide-leave-active {
  animation: slide-out 0.5s;
}

@keyframes slide-out {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-500px);
  }
}

@keyframes slide-in {
  from {
    transform: translateX(200px);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
