<template>
  <div class="about">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/admin/article">文章管理</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="create_new_user">
      <el-button type="primary" @click="createNewArticle">创建文章</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="updateAt" :formatter="dateForm" label="创建日期"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="classType" label="分类名称"></el-table-column>
      <el-table-column prop="user.telephone" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="goArticleDetail(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small" @click="goEditArticle(scope.row)" >编辑文章</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="10"
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="this.count"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      pageNo: 1,
      count: null
    };
  },
  computed: {
    ...mapState({
      articleListTable: state => state.article.articleListTable
    })
  },
  methods: {
    ...mapActions(["getArticleList"]),
    goArticleDetail(row) {
      this.$router.push({
        path: "articledetail",
        query: { articleId:  row.id}
      });
    },
    goEditArticle(row){
      this.$router.push({
        path: "editarticle",
        query: { articleId:  row.id}
      });
    },
    createNewArticle() {
      this.$router.push({ path: "/admin/createarticle" });
    },
    handleCurrentChange(val) {
      this.getList(val);
    },
    dateForm(params) {
      return this.$moment(params).format("YYYY-MM-DD");
    },
    getList(page) {
      this.pageNo = page;
      let params = {
        pageNo: page
      };
      this.getArticleList(params).then(() => {
        if (this.articleListTable.code === "0000") {
          this.tableData = this.articleListTable.data.rows;
          this.count = this.articleListTable.data.count;
        } else {
          this.$message({
            message: this.resData.message,
            type: "warning"
          });
        }
      });
    }
  },
  created() {
    this.getList(this.pageNo);
  }
};
</script>

<style scoped>
.create_new_user {
  margin: 10px;
  margin-left: 0px;
}
</style>

