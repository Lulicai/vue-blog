<template>
  <div class="animate_style3 body_bg">
    <div
      :class="{'pop_nav':true,'hidden-md-and-up':true,'pop_nav_border':pop_nav_border,'pop_nav_border2':pop_nav_border}"
      @click="show_sidebar"
    >
      <i class="el-icon-caret-left"></i>
      <span>MENU</span>
    </div>
    <div class="bg">
      <div class="title_style animate_style">THIS IS
        <br>LILY'S BLOG
      </div>
      <el-row justify="center">
        <el-col
          :xl="{span: 8, offset: 8}"
          :lg="{span: 8, offset: 8}"
          :md="{span: 8, offset: 8}"
          :sm="24"
        >
          <p
            class="sitedes_style animate_style"
          >A free, fully, interesting site to record technology about Front End Engineer .</p>
        </el-col>
      </el-row>
      <div class="next_style animate_style" @click="nextClick">next</div>
      <div :class="[bg_2, animate_style2]" id="bg2">
        <ul class="nav_style hidden-sm-and-down">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/articlelist">文章列表</router-link>
          </li>
          <li>
            <router-link to="/admin/user">个人中心</router-link>
          </li>
        </ul>
        <div class="main_content">
          <el-row>
            <el-col
              :xl="12"
              :lg="12"
              :md="12"
              :sm="24"
              v-for="(item,index) in articleList"
              :key="index"
            >
              <section class="section_style">
                <h1 class="article_title_style">{{item.title}}</h1>
                <div class="img_wraper">
                  <img v-if="item.imgUrl" :src="item.imgUrl" class="img_style" alt>
                  <img v-else src="../assets/pic08.jpg" class="img_style" alt>
                </div>
                <p class="article_brief_style">{{item.brief}}</p>
                <div class="full_style" @click="godetail(item.id)">全文</div>
              </section>
            </el-col>
          </el-row>
        </div>
        <div class="more_style">
          <span @click="gomore">更多...</span>
        </div>
      </div>
    </div>
    <siderbar ref="child"></siderbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Siderbar from "../components/frontend/Siderbar.vue";
export default {
  name: "home",
  data() {
    return {
      scrollTop: null,
      bg_2: "bg_2",
      animate_style2: "animate_style2",
      currentPosition: null,
      timer: null,
      speed: 10,
      articleList: [],
      pop_nav_border: false,
      pop_nav_border1: false
    };
  },
  components: { Siderbar },
  computed: {
    ...mapState({
      articleListTable: state => state.article.articleListTable
    })
  },
  methods: {
    ...mapActions(["getArticleList"]),
    nextClick() {
      this.timer = setInterval(this.runToTop, 10);
    },
    runToTop() {
      this.currentPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.currentPosition += this.speed; //speed变量
      if (this.currentPosition < 400) {
        window.scrollTo(0, this.currentPosition);
      } else {
        window.scrollTo(0, 400);
        clearInterval(this.timer);
      }
    },
    getList(page) {
      this.pageNo = page;
      let params = {
        pageNo: page
      };
      this.getArticleList(params).then(() => {
        if (this.articleListTable.code === "0000") {
          let arr = this.articleList;
          setTimeout(() => {
            this.articleList = this.articleListTable.data.rows;
          }, 200);
        } else {
          this.$message({
            message: this.resData.message,
            type: "warning"
          });
        }
      });
    },
    godetail(id) {
      this.$router.push({
        path: "articleDetailBlog",
        query: { articleId: id }
      });
    },
    gomore() {
      this.$router.push({
        path: "articlelist"
      });
    },
    show_sidebar() {
      this.$refs.child.show_sidebar();
    },
    scrolling(eee) {
      if (
        document.documentElement.scrollTop >= 600 ||
        document.body.scrollTop >= 600
      ) {
        this.pop_nav_border = true;
        // this.pop_nav_border1 = false;
      } else {
        this.pop_nav_border = false;
        this.pop_nav_border1 = true;
      }
    }
  },
  created() {
    this.getList(1);
  },
  mounted() {
    window.addEventListener("scroll", this.scrolling);
  },
  beforeDestroy() {
    window.scrollTo(0, 0);
    window.removeEventListener("scroll", this.scrolling);
  }
};
</script>
<style scoped>
.bg {
  padding: 100px 0;
  width: 100%;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  background-image: url("../assets/bg.jpg");
}
.body_bg {
  background: #1e252d;
  height: auto;
}
.bg_2 {
  /* padding: 100px 0; */
  width: 100%;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  line-height: 40px;
  text-align: center;
}
.bg_2 {
  /* color: #fff; */
  /* background-image: url("../assets/homebg.jpg"); */
  width: 80%;
  margin: 0 auto;
}
.title_style {
  color: #fff;
  font-size: 5rem;
  margin-top: 7rem;
  margin-bottom: 2rem;
  font-weight: 900;
}
@media screen and (max-width: 736px) {
  .title_style {
    color: #fff;
    font-size: 5rem;
    margin-top: 0rem;
    margin-bottom: 2rem;
    font-weight: 900;
  }
  .bg_2 {
    width: 100%;
    margin: 0 auto;
  }
  .bg{
    background-size: contain; 
  }
}
.next_style {
  color: #fff;
  font-size: 2rem;
  width: 100px;
  border: 2px solid #fff;
  margin: 0 auto;
  margin-bottom: 4rem;
  cursor: pointer;
}
.sitedes_style {
  color: white;
  font-size: 1.5rem;
  /* width: 40%; */
  margin-bottom: 2rem;
  padding: 0 1rem;
}
.next_style:hover {
  color: aqua;
  border: 2px solid aqua;
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
}
.nav_style li:first-child a {
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
  padding-top: 50px;
}
.main_content section {
  height: auto;
}
.main_content .article_title_style {
  margin: 0 auto;
  padding: 1rem 0;
  font-size: 1.5rem;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.full_style {
  width: 100px;
  border: 2px solid #1e252d;
  color: 1e252d;
  margin: 0 auto;
  font-weight: 600;
  margin-bottom: 30px;
  margin-top: 20px;
  cursor: pointer;
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
.img_style {
  width: 15rem;
  height: 16rem;
}
.article_content_style {
  padding: 10px;
}
.section_style {
  /* width: 49.8%; */
  /* float: left; */
  border-right: 2px solid #eeeeee;
  border-top: 2px solid #eeeeee;
  overflow: hidden;
}
.article_brief_style {
  width: 60%;
  margin: 0 auto;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 100px;
  line-height: 30px;
  height: 55px;
}
.img_wraper {
  /* height: 17rem; */
  overflow: hidden;
}
.more_style {
  border: 2px solid #eee;
  color: #1e252d;
  background: #fff;
}
.more_style span {
  border: 1px solid #1e252d;
  display: inline-block;
  padding: 0px 50px;
  margin: 10px 0px;
  cursor: pointer;
  border-radius: 10px;
}
.pop_nav {
  position: fixed;
  color: #fff;
  right: 2rem;
  top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 4px;
  z-index: 2;
}
.pop_nav_border {
  border: 1px solid #1e252d;
  color: #1e252d;
}
.pop_nav_border1 {
  border: none;
  color: #fff;
}
.pop_nav i {
  font-size: 25px;
}
</style>

