import Layout from "@/layout/index.vue";
import Home from "@/views/home/index.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "热门"
        }
      },
      {
        path: "basketball",
        name: "Basketball",
        component: () => import("@/views/basketball/index.vue"),
        meta: {
          title: "篮球"
        }
      },
      {
        path: "football",
        name: "Football",
        component: () => import("@/views/football/index.vue"),
        meta: {
          title: "足球",
        }
      },
      {
        path: "competition-results",
        name: "CompetitionResults",
        component: () => import("@/views/competition-results/index.vue"),
        meta: {
          title: "赛果",
        }
      },
      {
        path: "my",
        name: "My",
        component: () => import("@/views/my/index.vue"),
        meta: {
          title: "我的",
        }
      },

    ]
  },

  {
    path: "/race",
    // component: Layout,
    children: [
      {
        path: "racelist/:id",
        name: "RaceList",
        component: () => import("@/views/race-list/index.vue"),
        meta: {
          title: "自定义",
        }
      }
    ],
  },
];

export default routes;
