import axios from "axios";
var qs = require("qs");

const state = {
  resData: "",
  userInfo: null
};

const actions = {
  async LoginPost({ commit }, payload) {
    // console.log(payload)
    let config = {
      method: "post",
      url: "/api/login",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        // console.log(20,response.data);
        commit("LoginPost", response.data);
      })
      .catch(function(response) {
        console.log(response);
      });
  },
  async getUserInfo({ commit }, payload){
    let config = {
      method: "post",
      url: "/api/getUserInfo",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        // console.log(20,response.data);
        commit("getUserInfo", response.data);
      })
      .catch(function(response) {
        console.log(response);
      });
  }
};

const mutations = {
  LoginPost(state, payload) {
    // console.log(state, payload);
    state.resData = payload;
  },
  getUserInfo(state, payload) {
    state.userInfo = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
