import Vue from "vue";
import Vuex from "vuex";

import uiBreakPoint from "./uiBreakPoint.store";
import web3modal from "./web3modal.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    web3modal,
    uiBreakPoint,    
  },
  //strict: process.env.NODE_ENV !== "production"
});
