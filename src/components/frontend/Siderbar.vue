<template>
  <div :class="[oblectClass]">
    <div class="sidebar_nav_wraper">
      <div class="shutdown" @click="shutdown"><i class="el-icon-close"></i></div>
      <ul class="sidebar_nav">
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
    </div>
  </div>
</template>
<script>
export default {
  name: "siderbar",
  data() {
    return {
      oblectClass: {
        sidebar_style: true,
        hidden: true,
        hidden2: false,
        animation_style: false,
        "hidden-md-and-up": true
      }
    };
  },
  methods: {
    show_sidebar() {
      this.oblectClass.animation_style = true;
      this.oblectClass.hidden = false;
      this.oblectClass.hidden2 = false;
    },
    shutdown() {
      this.oblectClass.animation_style = false;
      this.oblectClass.hidden2 = true;
    }
  }
};
</script>

<style scoped>
.sidebar_style {
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 999;
}
.sidebar_nav_wraper {
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  background: #fff;
  padding-top: 2rem;
}
.sidebar_nav {
  list-style: none;
  margin-top: 2rem;
}
.sidebar_nav li {
  padding: 1rem;
  margin: 0 10px;
  border-bottom: 2px solid #eee;
}
.sidebar_nav li a {
  color: #1e252d;
  text-decoration: none;
}
.shutdown {
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
}
.hidden {
  transform: translateX(1000px);
}
.hidden2 {
  transition: all 800ms ease-out;
  transform: translateX(1000px);
}
.animation_style {
  transition: all 800ms ease-in;
}
</style>