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
          title: "热门",
          noCache: true
        }
      },
      {
        path: "basketball",
        name: "Basketball",
        component: () => import("@/views/basketball/index.vue"),
        meta: {
          title: "篮球",
          noCache: true

        }
      },
      {
        path: "football",
        name: "Football",
        component: () => import("@/views/football/index.vue"),
        meta: {
          title: "足球",
          noCache: true

        }
      },
      {
        path: "competition-results",
        name: "CompetitionResults",
        component: () => import("@/views/competition-results/index.vue"),
        meta: {
          title: "赛果",
          noCache: true

        }
      },
      {
        path: "my",
        name: "My",
        component: () => import("@/views/my/index.vue"),
        meta: {
          title: "我的",
          noCache: true
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
  {
    path: "/details",
    // component: Layout,
    children: [
      {
        path: "player/index",
        name: "PlayerDetails",
        component: () => import("@/views/player/index.vue"),
        meta: {
          title: "详情",
        }
      }
    ],
  },
  {
    path: "/adv",
    children: [
      {
        path: "download-page/index",
        name: "DownloadPage",
        component: () => import("@/views/download-page/index.vue"),
        meta: {
          title: "8号直播",
        }
      }
    ],
  },
];

export default routes;
