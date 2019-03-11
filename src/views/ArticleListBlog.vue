<template>
  <div class="animate_style3 body_bg">
    <div class="bg" id="bg">
      <p
        class="sitedes_style animate_style"
      >A free, fully, interesting site to record technology about Front End Engineer .</p>
      <div :class="[bg_2, animate_style2]" id="bg2">
        <ul class="nav_style">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li class="active">
            <router-link to="/articlelist">文章列表</router-link>
          </li>
          <li>
            <router-link to="/admin/user">个人中心</router-link>
          </li>
        </ul>
        <div class="main_content">
          <div
            class="articlelist_style animate_style"
            v-for="(item,index) in articleList"
            :key="index"
            @click="routerToDetail(item.id)"
          >
            <img :src="item.imgUrl" alt class="article_title_img" v-if="item.imgUrl">
            <img src="../assets/pic01.jpg" alt class="article_title_img" v-else>
            <div class="article_main">
              <h3 class="article_title">{{item.title}}</h3>
              <p class="article_breif">{{item.brief}}</p>
            </div>
          </div>
          <p class="refreshText" v-if="show" @click="loadmore">加载更多...</p>
          <p class="nodata" v-else >对不起客官,没有更多了==3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      scrollTop: null,
      bg_2: "bg_2",
      animate_style2: "animate_style2",
      timer: null,
      speed: 10,
      articleList: [],
      pageNo: 1,
      count: null,
      show:true
    };
  },
  computed: {
    ...mapState({
      articleListTable: state => state.article.articleListTable
    })
  },
  created() {
    this.pageNo = 1;
  },
  mounted() {
    // window.addEventListener("scroll", this.loadmore);
  },
  methods: {
    ...mapActions(["getArticleList"]),
    getList(page) {
      this.pageNo = page;
      let params = {
        pageNo: page
      };
      this.getArticleList(params).then(() => {
        if (this.articleListTable.code === "0000") {
          let arr = this.articleList;
          if (this.articleListTable.data.rows.length > 0) {
            setTimeout(() => {
              this.articleList = arr.concat(this.articleListTable.data.rows);
            }, 200);
          }else{
              this.show = false;
          }
        } else {
          this.$message({
            message: this.resData.message,
            type: "warning"
          });
        }
      });
    },
    loadmore(eee) {
        ++this.pageNo;
        this.getList(this.pageNo);
    },
    routerToDetail(id){
        this.$router.push({
            path:'articleDetailBlog',
            query: { articleId:  id}
        })
    }
  },
   created() {
    this.getList(this.pageNo)
  }
};
</script>

<style scoped>
.body_bg {
  padding: 100px 0;
  width: 100%;
  height: auto;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../assets/bg.jpg");
}
.bg_2 {
  width: 80%;
  margin: 0 auto;
}
.bg {
  overflow: scroll;
}
.sitedes_style {
  color: white;
  font-size: 1.5rem;
  width: 40%;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.nav_style {
  /* width: 80%; */
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 auto;
  list-style: none;
  display: flex;
}
.nav_style li {
  line-height: 70px;
  width: 15%;
  cursor: pointer;
  text-align: center;
}
.nav_style .active a {
  background: #fff;
  color: #1e252d;
  display: block;
}
.nav_style li a {
  text-decoration: none;
  color: #fff;
}
.main_content {
  background: #fff;
  overflow: hidden;
  padding-bottom: 20px;
  min-height: 600px;
}
.animate_style {
  -webkit-animation-name: fadeInOut;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-duration: 1s;
  -webkit-animation-direction: alternate;
}
.animate_style2 {
  -webkit-animation-name: fadeInOut;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-duration: 800ms;
  -webkit-animation-direction: alternate;
}
.animate_style3 {
  -webkit-animation-name: fadeInOut;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-duration: 800ms;
  -webkit-animation-direction: alternate;
}
@-webkit-keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.articlelist_style {
  width: 80%;
  height: 150px;
  overflow: hidden;
  margin: 0px auto;
  margin-top: 30px;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  cursor: pointer;
}
.article_title_img {
  width: 35%;
}
.article_main {
  margin-left: 30px;
  /* overflow: hidden; */
  padding-right: 10px;
  padding-bottom: 10px;
}
.article_main p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 100%;
}
.article_title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.refreshText {
  text-align: center;
  border: 1px solid #1e252d;
  border-radius: 5px;
  width: 20%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px 0;
  cursor: pointer;
}
.refreshText:hover{
    background:#4876FF;
    border: 1px solid #4876FF;
    color: #fff;
}
.nodata{
    text-align: center;
}
</style>