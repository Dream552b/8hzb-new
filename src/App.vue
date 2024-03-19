<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

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
  console.log(
    "detectWechatBrowser() || isQQBrowser()",
    detectWechatBrowser(),
    isQQBrowser()
  );

  if (detectWechatBrowser() || isQQBrowser()) {
    router.replace("/guide-page/index");
  } else {
    router.replace("/");
  }
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
