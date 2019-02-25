import axios from "axios";
var qs = require("qs");

const state = {
  articleContent: null,
  editRes: null,
  articleListTable: null
};

const actions = {
  async getArticleList({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/getArticles",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function(response) {
        commit("getArticleList", response.data);
      })
      .catch(function(response) {
        commit("getArticleList", response);
      });
  }
};

const mutations = {
  getArticleList(state, payload) {
    state.articleListTable = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
