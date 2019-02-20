import axios from "axios";
var qs = require("qs");

const state = {
  resData: "",
  classRes: null,
  newClassRes: null,
  deleteClassRes: null
};

const actions = {
  async getClassList({ commit }, payload) {
    // console.log(payload)
    let config = {
      method: "post",
      url: "/api/getAllClass",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("getClassList", response.data);
      })
      .catch(function(response) {
        console.log(response);
        commit("getClassList", response);
      });
  },
  async editClass({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/editClass",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("editClass", response.data);
      })
      .catch(function(response) {
        console.log(response);
        commit("editClass", response);
      });
  },
  async createClass({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/createClass",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("createClass", response.data);
      })
      .catch(function(response) {
        console.log(response);
        commit("createClass", response);
      });
  },
  async deleteClass({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/deleteClass",
      data: qs.stringify(payload)
    };
    await axios(config).then(function(response) {
      commit("deleteClass", response.data);
    });
  }
};

const mutations = {
  getClassList(state, payload) {
    // state.code = payload
    state.resData = payload;
  },
  editClass(state, payload) {
    state.classRes = payload;
  },
  createClass(state, payload) {
    state.newClassRes = payload;
  },
  deleteClass(state, payload) {
    state.deleteClassRes = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
