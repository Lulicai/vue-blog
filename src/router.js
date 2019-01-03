import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Error from "./views/Error.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      redirect: "/admin/user",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/layout/AdminLayout.vue"),
      children: [
        {
          path: "user",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/AdminIndex.vue")
        },
        {
          path: "class",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Home.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "Register",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
    },
    {
      path: "/errorinfo",
      component: Error
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name}) : next('/errorinfo');
  } else {
    next(); //如果匹配到正确跳转
  }
})
export default router;
