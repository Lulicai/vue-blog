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
        commit("editUserStatus", response);
      });
  },
  async editUserStatus({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/editUserStatus",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("editUserStatus", response.data);
      })
      .catch(function(response) {
        console.log(response);
        commit("editUserStatus", response);
      });
  },
  async editUser({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/editUser",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("editUser", response.data);
      })
      .catch(function(response) {
        console.log(response);
        commit("editUser", response);
      });
  }
};

const mutations = {
  GetUserList(state, payload) {
    // state.code = payload
    state.resData = payload;
  },
  editUserStatus(state, payload) {
    state.userRes = payload;
  },
  editUser(state, payload) {
    state.userRes = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
