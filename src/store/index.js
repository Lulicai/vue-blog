import Vue from "vue";
import Vuex from "vuex";
import login from "./login/";
import register from "./register/";
import user from "./user/";
import classify from "./class/";
import article from "./article/";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    register,
    user,
    classify,
    article
  }
});
