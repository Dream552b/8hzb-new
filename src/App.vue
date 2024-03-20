<script setup>
import { onMounted, getCurrentInstance, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();

// 判断是否为微信浏览器
function detectWechatBrowser() {
  const ua = window.navigator.userAgent.toLowerCase();
  return /micromessenger/.test(ua);
}

// 判断是否为QQ浏览器
function isQQBrowser() {
  const ua = window.navigator.userAgent.toLowerCase();
  return /qq/.test(ua) && !/micromessenger/.test(ua);
}

onMounted(() => {
  setTimeout(() => {
    let sign = route.query.from;
    if (sign === "app") {
      proxy.$cache.session.set("from", sign);
    }
  }, 500);

  if (detectWechatBrowser() || isQQBrowser()) {
    router.replace("/guide-page/index");
  }
  // else {
  //   router.replace("/");
  // }
});
</script>

<template>
  <router-view />
</template>

<style>
#app {
  background: #f7f7f7;
}
</style>
