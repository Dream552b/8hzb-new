<template>
  <div
    class="fixed z-[90] flex flex-col items-center bottom-[100px] right-[26px]"
  >
    <div @click="onDownload" class="w-full flex flex-col items-center">
      <img class="w-[54px] h-[54px]" src="@/assets/icon-download.png" alt="" />
      <div
        class="w-[80%] text-[8px] text-center rounded-[10px] bg-[#333535] text-[#fff] my-[-6px]"
      >
        下载APP
      </div>
    </div>
    <div
      class="w-[34px] h-[34px] mt-[18px] bg-[#66D8D7] rounded-[2px] flex flex-col items-center justify-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.25)]"
    >
      <img class="w-[16px] h-[16px]" src="@/assets/icon-top-f.png" alt="" />

      <van-back-top right="9vw" bottom="26.5vw" class="custom" offset="0">
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
:deep(.van-back-top) {
  color: #000;
  height: 25px;
  // width: 100px;
  box-shadow: none !important;
  right: 40px !important;
}
</style>
