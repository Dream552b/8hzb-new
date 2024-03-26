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
  if (!detectWechatBrowser() && !isQQBrowser()) {
    router.replace("/");
  }
});
</script>

<template>
  <div class="w-full h-screen flex-col overflow-y-hidden">
    <img class="w-full" src="@/assets/img-guide.png" alt="" />
  </div>
</template>

<style scoped></style>
