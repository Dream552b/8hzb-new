<template>
  <div
    class="fixed z-[90] flex flex-col items-center bottom-[100px] right-[26px]"
  >
    <div @click="onDownload">
      <img class="w-[34px] h-[34px]" src="@/assets/icon-download.png" alt="" />
      <div
        class="text-[6px] text-center rounded-[10px] bg-[#333535] text-[#fff] px-[2px] my-[-6px]"
      >
        下载APP
      </div>
    </div>
    <div
      class="mt-[12px] bg-[#66D8D7] rounded-[2px] px-[6px] py-[6px] flex flex-col items-center in-box shadow-[1px_4px_4px_0px_rgba(0,0,0,0.25)]"
    >
      <img class="w-[12px] h-[12px]" src="@/assets/icon-top-f.png" alt="" />

      <van-back-top right="8.4vw" bottom="12.5vh" class="custom" offset="0">
        <span></span>
      </van-back-top>

      <!-- <img
        class="w-[12px] h-[12px] mt-[10px]"
        src="@/assets/icon-search.png"
        alt=""
      />
      <img
        class="w-[12px] h-[12px] mt-[10px]"
        src="@/assets/icon-share.png"
        alt=""
      />
      <img
        class="w-[12px] h-[12px] mt-[10px]"
        src="@/assets/icon-rqcode.png"
        alt=""
      /> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const onDownload = () => {
  router.push({
    path: `/adv/download-page/index`,
    query: {}
  });
};
</script>

<style lang="less" scoped>
.in-box {
  display: inline-block;
}

:deep(.van-back-top) {
  color: #000;
  height: 25px;
  box-shadow: none !important;
}
</style>
