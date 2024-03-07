<script setup>
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";

import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const navbarRef = ref(null);
const childComponentRef = ref(null);

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});

const showNavPath = [
  // 显示nav白名单
  "/",
  "/basketball",
  "/football",
  "/competition-results"
];

const changeTab = tabbarIndex => {
  navbarRef.value.onClickTab({ name: tabbarIndex });
};

// 热门页面 其他tab的刷新列表方法
const refreshListData = tabObj => {
  if (!childComponentRef.value.refreshListData) return;
  childComponentRef.value?.refreshListData(tabObj);
};
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="useDarkMode() ? 'light' : 'light'">
      <router-view v-slot="{ Component }" class="view-wrap">
        <keep-alive :include="cachedViews">
          <div>
            <nav-bar
              ref="navbarRef"
              v-show="showNavPath.find(item => item === route.path)"
              @refreshListData="refreshListData"
            />

            <component :is="Component" ref="childComponentRef" />
          </div>
        </keep-alive>
      </router-view>

      <tabbar @changeTab="changeTab" />
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
