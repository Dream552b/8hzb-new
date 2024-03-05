import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";

// svg icon
import "virtual:svg-icons-register";

import cache from './utils/cache'

import App from "./App.vue";
import router from "./router";

import { parseTime, getMinutesPassed } from '@/utils/time.js'

const app = createApp(App);

// 全局方法挂载
// 缓存对象
app.config.globalProperties.$cache = cache
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.getMinutesPassed = getMinutesPassed;

app.use(store);
app.use(router);
app.mount("#app");
