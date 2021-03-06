import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ArticleListBlog from "./views/ArticleListBlog.vue";
import Error from "./views/Error.vue";
import NoRank from "./views/NoRank.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: ["1", "2", "3"]
    },
    {
      path: "/articlelist",
      name: "articlelist",
      component: ArticleListBlog,
      meta: ["1", "2", "3"]
    },
    {
      path: "/articleDetailBlog",
      name: "articleDetailBlog",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/articleDetailBlog.vue"),
      meta: ["1", "2", "3"]
    },
    {
      path: "/admin",
      name: "admin",
      redirect: "/admin/user",
      meta: ["1", "2", "3"],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/layout/AdminLayout.vue"),
      children: [
        {
          path: "user",
          meta: ["1", "2"],
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/AdminIndex.vue")
        },
        {
          path: "class",
          meta: ["1", "2", "3"],
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/classify.vue")
        },
        {
          path: "createarticle",
          meta: ["1", "2", "3"],
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/NewArticle.vue")
        },
        {
          path: "editarticle",
          meta: ["1", "2", "3"],
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/EditArticle.vue")
        },
        {
          path: "articledetail",
          name: "articledetail",
          meta: ["1", "2", "3"],
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/ArticleDetail.vue")
        },
        {
          path: "article",
          meta: ["1", "2", "3"],
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Article.vue")
        },
        {
          path: "havenorank",
          meta: ["1", "2", "3"],
          component: NoRank
        },
        {
          path: "/errorinfo",
          meta: ["1", "2", "3"],
          component: Error
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      meta: ["1", "2", "3"],
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "Register",
      meta: ["1", "2", "3"],
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
    }
  ]
});
//权限设置
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else if (to.path === "/register") {
    next();
  } else if (to.matched.length === 0) {
    //没有匹配到的路径跳转到错误页面
    from.name ? next({ name: from.name}) : next('/errorinfo');
  } else {
    //查看权限
    if (to.path.indexOf("admin") > -1) {
      let params = {
        token: localStorage.getItem("token")
      };
      router.app.$options.store.dispatch("getUserInfo", params).then(() => {
        let userInfo = router.app.$options.store.state.login.userInfo;
        if(router.app.$options.store.state.login.userInfo.code == 401 || !userInfo.data.rank){
          next("/login");
        } else {
          if (to.matched.every(item => item.meta.indexOf(userInfo.data.rank) > -1)) {
            next();
          } else {
            next("/admin/havenorank");
          }
        }
      });
      if (!localStorage.getItem("token")) {
        next("/login");
      }
    } else {
      next();
    }
  }
});

export default router;
