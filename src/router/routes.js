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
        path: "/",
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
    path: "/",
    // component: Layout,
    children: [
      {
        path: '/live/:sportsType/:matchID',
        name: "Live",
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
  {
    path: "/",
    children: [
      {
        path: "login/index",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta: {
          title: "登录",
        }
      },
      {
        path: "user-agreement/index",
        name: "UserAgreement",
        component: () => import("@/views/login/user-agreement.vue"),
        meta: {
          title: "用户协议",
        }
      },
      {
        path: "privacy-agreement/index",
        name: "PrivacyAgreement",
        component: () => import("@/views/login/privacy-agreement.vue"),
        meta: {
          title: "隐私政策",
        }
      },

      {
        path: "guide-page/index",
        name: "GuidePage",
        component: () => import("@/views/guide-page/index.vue"),
        meta: {
          title: "",
        }
      },
      {
        path: "test/index/:sportsType/:matchID",
        name: "Test-player",
        component: () => import("@/views/player/test-chat.vue"),
        meta: {
          title: "测试视频",
        }
      }
    ],
  }
];

export default routes;
