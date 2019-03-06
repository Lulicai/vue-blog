import axios from "axios";
import { Upload } from "element-ui";
var qs = require("qs");

const state = {
  articleContent: null,
  editRes: null,
  articleListTable: null,
  createArticleRes: null,
  uploadRes: null
};

const actions = {
  async getArticleList({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/getArticles",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function (response) {
        commit("getArticleList", response.data);
      })
      .catch(function (response) {
        commit("getArticleList", response);
      });
  },
  async createNewArticle({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/createArticle",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function (response) {
        commit("createNewArticle", response.data);
      })
      .catch(function (response) {
        commit("createNewArticle", response);
      });
  },
  async getArticleById({ commit }, payload) {
    let config = {
      method: "get",
      url: "/api/getArticleById/" + payload.id
    };
    await axios(config)
      .then(function (response) {
        commit("getArticleById", response.data);
      })
      .catch(function (response) {
        commit("getArticleById", response);
      });
  },
  async editArticleById({ commit }, payload) {
    let config = {
      method: "post",
      url: "/api/editArticleById",
      data: qs.stringify(payload)
    };
    await axios(config)
      .then(function (response) {
        commit("editArticleById", response.data);
      })
      .catch(function (response) {
        commit("editArticleById", response);
      });
  },
  async uploadfile({ commit }, payload) {
    console.log(70, payload);
    let config = {
      method: "post",
      url: "/api/uploadImg",
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    await axios(config)
      .then(function(response) {
        commit("uploadfile", response.data);
      })
      .catch(function (response) {
        commit("uploadfile", response);
      });
  }
};

const mutations = {
  getArticleList(state, payload) {
    state.articleListTable = payload;
  },
  createNewArticle(state, payload) {
    state.createArticleRes = payload;
  },
  getArticleById(state, payload) {
    state.articleContent = payload;
  },
  editArticleById(state, payload) {
    state.editRes = payload;
  },
  uploadfile(state, payload) {
    state.uploadRes = payload;
  }
};

export default {
  state,
  actions,
  mutations
};
