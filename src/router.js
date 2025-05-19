import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      component: () => import("@/components/FullLayoutPage.vue"),
      children: [
        {
          path: "",
          redirect: "HelloWorld",
        },
        {
          path: "HelloWorld",
          name: "HelloWorld",
          component: () => import("@/components/HelloWorld.vue"),
          props: true,
        },
        {
          path: "NewPage",
          name: "NewPage",
          component: () => import("@/components/NewPage.vue"),
          props: true,
        },
      ],
    },
  ],
});


export default router;
