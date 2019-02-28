<template>
  <div class="about">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>文章详情</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="detail_content">
      <h1 class="title_style">{{articleContent.data.title}}</h1>
      <div class="classType_style">分类：{{articleContent.data.classType}}</div>
      <div class="brief_style">文章简介: {{articleContent.data.brief}}</div>
      <div class="division_style"></div>
      <div class="ql-container">
        <div class="ql-editor" v-html="articleContent.data.contentToMark"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["getArticleById"]),
    getArticleContent() {
      let params = {
        id: this.$route.query.articleId
      };
      this.getArticleById(params);
    }
  },
  computed: {
    ...mapState({
      articleContent: state => state.article.articleContent
    })
  },
  created() {
    this.getArticleContent();
  }
};
</script>

<style scoped>
.detail_content {
  background: white;
  padding: 15px;
  margin-top: 15px;
}
.title_style {
  text-align: center;
}
.classType_style {
  text-align: center;
}
.brief_style {
  text-align: center;
}
.division_style {
  width: 100%;
  border-top: 1px solid #ccc;
  margin-top: 15px;
}
.maincontent_style {
  /* text-align: center; */
}
</style>