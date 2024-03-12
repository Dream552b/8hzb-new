<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  //1 准备中, 0 视频错误, 2. 暂无视频
  videoStatusNum: {
    type: Number,
    default: 1
  }
});
</script>

<template>
  <div>
    <div
      class="text-[10px] text-[#fff] w-full h-full flex flex-col justify-center items-center z-10 absolute left-0 top-0 bottom-0 right-0 m-auto"
    >
      <img
        class="w-[125px] h-[30px] mb-[6px]"
        src="@/assets/img-video-logo.png"
        alt=""
        @click="onIsPlay"
      />
      <div v-if="props.videoStatusNum === 0">加载失败，请切换线路….</div>
      <div v-if="props.videoStatusNum === 1">赛事直播准备中….</div>
      <div v-if="props.videoStatusNum === 2">暂无直播源….</div>
    </div>
  </div>
</template>

<style scoped></style>
