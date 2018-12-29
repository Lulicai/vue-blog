import axios from "axios";
var qs = require("qs");

const state = {
  resData: "",
  userRes: null
};

const actions = {
  async GetUserList({ commit }, payload) {
    // console.log(payload)
    let config = {
      method: "post",
      url: "/api/getAllUser",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("GetUserList", response.data);
      })
      .catch(function(response) {
        console.log(response);
      });
  },
  async editUserRank({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/editUserRank",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("editUserRank", response.data);
      })
      .catch(function(response) {
        console.log(response);
      });
  }
};

const mutations = {
  GetUserList(state, payload) {
    // state.code = payload
    state.resData = payload;
  },
  editUserRank(state, payload) {
    state.userRes = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
