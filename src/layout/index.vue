<script setup>
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";

import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});

const showNavPath = [
  // 显示nav白名单
  "/home",
  "/basketball",
  "/football",
  "/competition-results"
];
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
      <!-- <nav-bar v-if="showNavPath.filter(item => item === route.path)" /> -->

      <router-view v-slot="{ Component }" class="view-wrap">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <tabbar />
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
  .view-wrap {
    box-sizing: border-box;
    // padding-top: 44px;
  }
}
</style>
