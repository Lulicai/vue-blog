<template>
  <div class="animate_style3 body_bg">
    <div class="bg">
      <div class="title_style animate_style">THIS IS
        <br>LILY'S BLOG
      </div>
      <p
        class="sitedes_style animate_style"
      >A free, fully, interesting site to record technology about Front End Engineer .</p>
      <div class="next_style animate_style" @click="nextClick">next</div>
      <div
        :class="[bg_2, animate_style2]"
        id="bg2"
      >
        <ul class="nav_style">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/">文章列表</router-link></li>
          <li><router-link to="/admin/user">个人中心</router-link></li>
        </ul>
        <div class="main_content">
          <section>
            <h1 class="article_title_style">关于vue web框架的特殊技巧</h1>
            <p>adsadadada</p>
            <img src="http://localhost:3000/timg.jpeg" class="img_style" alt="">
            <div class="full_style">全文</div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      scrollTop: null,
      bg_2: "bg_2",
      animate_style2: "animate_style2",
      currentPosition: null,
      timer: null,
      speed: 10
    };
  },
  mounted() {
    window.addEventListener("scroll", this.paperScroll);
  },
  methods: {
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
    }
  },
  components: {},
  created() {}
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
.body_bg{
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
  margin-top: 8rem;
  margin-bottom: 2rem;
  font-weight: 900;
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
  width: 40%;
  margin: 0 auto;
  margin-bottom: 2rem;
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
.nav_style li:first-child a{
  background: #fff;
  color: #1e252d;
  display: block
}
.nav_style li a{
  text-decoration: none;
  color: #fff
}
.main_content {
  background: #fff;
  overflow: hidden;
}
.main_content section{
  height: auto;
}
.main_content .article_title_style{
  margin: 0;
  padding: 3rem 0;
  font-size: 2rem;
}
.full_style{
  width: 100px;
  border: 2px solid #1e252d;
  color: 1e252d;
  margin: 0 auto;
  font-weight: 600;
  margin-bottom: 30px;
  margin-top: 20px;
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
.animate_style3{
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
.img_style{
  width: 60%;
}
.article_content_style{
  padding: 10px;
}
</style>

