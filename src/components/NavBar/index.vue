<template>
  <div class="content-wrap flex items-center px-[18px] fixed z-[100]">
    <!-- <img
      class="w-[375px] h-[90px] absolute left-[0px] top-[0px] z-[-1]"
      src="@/assets/bg-top.png"
      alt=""
    /> -->

    <img
      class="w-[74px] h-[26px]"
      alt="logo"
      src="@/assets/img-logo.png"
      @click="getMenuList"
    />
    <CategorySelection
      @changeOpen="changeOpen"
      @changeActiveIndex="changeActiveIndex"
      :tabsData="tabsData"
      :activeIndex="activeIndex"
    />

    <van-tabs
      ref="tabsRef"
      v-model:active="activeIndex"
      @click-tab="onClickTab"
      class="tabs-wrap pl-[4px]"
      background="f3ffff"
      color="#f3ffff"
    >
      <van-tab
        v-for="(item, index) in tabsData"
        :title="item.shortNameZh"
        :key="index"
      >
      </van-tab>
    </van-tabs>

    <img
      class="w-[14px] h-[13px] ml-[10px]"
      alt="logo"
      src="@/assets/icon-more.png"
      v-show="!isOpen"
    />
    <img
      class="w-[14px] h-[13px] ml-[10px]"
      alt="logo"
      src="@/assets/icon-more-active.png"
      v-show="isOpen"
    />
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import CategorySelection from "@/components/CategorySelection/index.vue";
import { getHotCompetitionList } from "@/api/game";

import { showFailToast, showSuccessToast, showToast } from "vant";
import "vant/es/toast/style";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();

const props = defineProps({});

const emit = defineEmits(["refreshListData"]);

const isOpen = ref(false);
const tabsRef = ref(null);
const baseTabs = [
  {
    shortNameZh: "热门",
    path: "/home"
  },
  {
    shortNameZh: "篮球",
    path: "/basketball"
  },
  {
    shortNameZh: "足球",
    path: "/football"
  },
  {
    shortNameZh: "赛果",
    path: "/competition-results"
  },
  {
    shortNameZh: "回放",
    path: "/home",
    rests: 1 // 其他
  }
];
let tabsData = ref([]);

const activeIndex = ref(0);
const activeIndexTest = ref(0);

const changeOpen = isBoolean => {
  isOpen.value = isBoolean;
};

// 切换tabs
const changeActiveIndex = activeIndex => {
  tabsRef.value.scrollTo(activeIndex);

  emit("refreshListData", tabsData.value[activeIndex]);
};
// 点击tabs
const onClickTab = item => {
  tabsRef.value.scrollTo(item.name);

  // 白名单tabbar切换
  let whiteList = baseTabs.slice(0, baseTabs.length - 1);

  let isFindData = whiteList.find(
    el => el.path === tabsData.value[item.name].path
  );

  if (tabsData.value[item.name].path) {
    router.replace({
      path: tabsData.value[item.name].path
    });
  }

  //其他tab
  if (tabsData.value[item.name].rests) {
    console.log("tabsData.value[item.name]", tabsData.value[item.name]);

    emit("refreshListData", tabsData.value[item.name]);
  }
};

const getMenuList = async () => {
  let isCacheTabs = proxy.$cache.session.getJSON("tabsData");
  if (isCacheTabs) {
    tabsData.value = isCacheTabs;
    return;
  }

  const { data, code } = await getHotCompetitionList();
  if (code !== 200) return;

  if (data.length) {
    data.map(item => {
      item.path = "/home";
      item.rests = 1;
    });
  }

  tabsData.value = baseTabs.concat(data);
  proxy.$cache.session.setJSON("tabsData", tabsData.value);
};

getMenuList();

onMounted(() => {
  watch(
    () => route.path,
    () => {
      let tabIndex = tabsData.value.findIndex(item => item.path == route.path);

      changeActiveIndex(tabIndex);
    },
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    { immediate: true }
  );
});
</script>

<style lang="less" scoped>
.content-wrap {
  overflow-x: hidden;
  height: 44px;
  background: #fff;
  .tabs-wrap {
    width: calc(100vw - 36px - 80px - 15px);

    :deep(.van-tabs__nav) {
      display: flex;
      align-items: center;
    }

    :deep(.van-tab) {
      color: #000;
      height: 25px;
      background: #fff;
    }

    :deep(.van-tab--active) {
      color: #fff;
      font-weight: var(--van-font-bold);
      background: #2dc5c4;
      border-radius: 20px;
      height: 25px;
    }
  }
}
</style>
