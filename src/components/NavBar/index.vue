<template>
  <div class="content-wrap flex items-center px-[18px] fixed z-[100]">
    <img class="w-[74px] h-[26px]" alt="logo" src="@/assets/img-logo.png" />
    <CategorySelection @changeOpen="changeOpen" />

    <van-tabs v-model:active="active" class="tabs-wrap pl-[4px]" color="#fff">
      <van-tab
        v-for="(item, index) in tabsData"
        :title="item.title"
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
import { ref, reactive } from "vue";
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import CategorySelection from "@/components/CategorySelection/index.vue";

const isOpen = ref(false);

const tabsData = reactive([
  {
    title: "热门",
    to: {
      name: "Home"
    }
  },
  {
    title: "篮球",
    to: {
      name: "Basketball"
    }
  },
  {
    title: "足球",
    to: {
      name: "Football"
    }
  },
  {
    title: "赛果",
    to: {
      name: "CompetitionResults"
    }
  },
  {
    icon: "icon-my",
    title: "回放",
    to: {
      name: "My"
    }
  },
  {
    title: "法甲"
  },
  {
    title: "NBA"
  },
  {
    title: "CBA"
  }
]);

const changeOpen = isBoolean => {
  isOpen.value = isBoolean;
};
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
