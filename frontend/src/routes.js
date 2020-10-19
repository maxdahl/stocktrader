import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import Stocks from "./components/stocks/Stocks.vue";

import Portfolio from "./components/portfolio/Portfolio.vue";

import UserAuth from "./components/user/auth/Auth.vue";
import SignIn from "./components/user/auth/SignIn.vue";
import SignUp from "./components/user//auth/SignUp.vue";

export const routes = [
  //home
  {
    path: "",
    name: "home",
    components: { default: Home, appHeader: Header }
  },

  //user auth routes
  {
    path: "/user/auth",
    component: UserAuth,
    children: [
      {
        path: "signup",
        component: SignUp,
        name: "user-signup"
      },
      {
        path: "signin",
        component: SignIn,
        name: "user-signin"
      }
    ]
  },

  //stocks
  {
    path: "/stocks",
    name: "stocks",
    components: { default: Stocks, appHeader: Header }
  },

  //portfolio
  {
    path: "/portfolio",
    name: "portfolio",
    components: { default: Portfolio, appHeader: Header }
  },

  //catch-all
  {
    path: "*",
    redirect: "/"
  }
];
