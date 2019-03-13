<template>
  <div class="animate_style3 body_bg">
    <div
      :class="{'pop_nav':true,'hidden-md-and-up':true,'pop_nav_border':pop_nav_border,'pop_nav_border2':pop_nav_border}"
      @click="show_sidebar"
    >
      <i class="el-icon-caret-left"></i>
      <span>MENU</span>
    </div>
    <div class="bg" id="bg">
      <el-row justify="center">
        <el-col
          :xl="{span: 8, offset: 8}"
          :lg="{span: 8, offset: 8}"
          :md="{span: 8, offset: 8}"
          :sm="24"
          :xs='24'
        >
          <p
            class="sitedes_style animate_style"
          >A free, fully, interesting site to record technology about Front End Engineer .</p>
        </el-col>
      </el-row>
      <div class="bg_2 animate_style2" id="bg2">
        <ul class="nav_style hidden-sm-and-down">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li class="">
            <router-link to="/articlelist">文章列表</router-link>
          </li>
          <li>
            <router-link to="/admin/user">个人中心</router-link>
          </li>
        </ul>
        <div class="main_content">
            <h1 class="art_title">{{articleContent.data.title}}</h1>
            <p class="art_brief">{{articleContent.data.brief}}</p>
            <img v-if="articleContent.data.imgUrl" class="art_img_style" :src="articleContent.data.imgUrl" alt="">
            <div v-html="articleContent.data.contentToMark"></div>
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
  components: { Siderbar },
  data() {
    return {
      pop_nav_border: false,
      pop_nav_border1: false
    };
  },
  created() {
    this.getArticleContent();
  },
  methods: {
      ...mapActions(["getArticleById"]),
      getArticleContent() {
      let params = {
        id: this.$route.query.articleId
      };
      this.getArticleById(params);
    },
    show_sidebar() {
      this.$refs.child.show_sidebar();
    }
  },
  computed: {
    ...mapState({
      articleContent: state => state.article.articleContent
    })
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
  width: 100%;
  width: 80%;
  margin: 0 auto;
}
.bg {
  overflow: scroll;
}
.sitedes_style {
  color: white;
  font-size: 1.5rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  text-align: center;
  padding: 0 1rem;
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
  padding-left: 5rem;
  padding-right: 5rem;
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
.art_title{
    text-align: center;
    margin: 0 auto;
    margin-top: 4rem;
    width: 40%;
    font-size: 40px;
}
.art_brief{
    margin: 0 auto;
    margin-top: 2rem;
    width: 60%;
    text-align: center;
    line-height: 30px;
}
.art_img_style{
    width: 90%;
    height: 400px;
    display: block;
    margin: 30px auto;
}
@media screen and (max-width: 736px) {
  .bg_2 {
    width: 100%;
    margin: 0 auto;
  }
  .article_main {
    margin-left: 10px;
    /* overflow: hidden; */
    padding-right: 10px;
    padding-bottom: 10px;
    width: 57%;
  }
  .main_content{
    padding: 0 2rem;
    margin-top: 2rem;
  }
  .art_title{
    width: 100%;
  }
  .art_img_style{
    height: auto;
  }
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