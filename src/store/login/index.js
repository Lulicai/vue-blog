import axios from "axios";
var qs = require("qs");

const state = {
  resData: ""
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
  }
};

const mutations = {
  LoginPost(state, payload) {
    // console.log(state, payload);
    state.resData = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
