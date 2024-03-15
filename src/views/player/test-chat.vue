<script setup>
import { ref } from "vue";
import VideoPlayer from "./components/VideoPlayer.vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const originData = ref([
  {
    name: "高清",
    url: "https://play.xshuijiu.cn/live/sd-2-3739456.m3u8"
  }
]);
const originDataIndex = ref(0);
const isBackVideo = ref(false);

const iframeUrl = ref(`https://chat.8hzb.chat/chatRoom/chat/2/3739456`);

const show = ref(true);
</script>

<template>
  <div class="h-full">
    <div style="display: flex; flex-direction: column; height: 100%">
      <div style="height: 300px">
        <VideoPlayer
          ref="VideoPlayerRef"
          :videoOrigin="originData[originDataIndex]"
          :isBackVideo="isBackVideo"
        />
      </div>
      <div style="height: 100%; flex: 1">
        <iframe
          v-if="show"
          style="width: 100%; height: 100%"
          frameborder="0"
          :src="iframeUrl"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
