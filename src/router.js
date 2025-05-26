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
          redirect: "HomePage",
        },
        {
          path: "HomePage",
          name: "HomePage",
          component: () => import("@/components/HomePage.vue"),
          props: true,
        },
        {
          path: "/quiz/:id",
          name: "Quiz",
          component: () => import("@/components/QuizPage.vue"),
          props: true,
        },
      ],
    },
  ],
});


export default router;
