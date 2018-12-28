import axios from "axios";
var qs = require("qs");

const state = {
  resData: ""
};

const actions = {
  async RegisterPost({ commit }, payload) {
    // console.log(payload)
    let config = {
      method: "post",
      url: "/api/register",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("RegisterPost", response.data);
      })
      .catch(function(response) {
        console.log(response);
      });
  }
};

const mutations = {
  RegisterPost(state, payload) {
    // state.code = payload
    state.resData = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
